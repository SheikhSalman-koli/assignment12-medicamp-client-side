import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import UseAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';

const PaymentForm = () => {
    const { regId } = useParams()
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth()
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const {
        data: registered = {},
        refetch
    } = useQuery({
        queryKey: ['registration', regId],
        queryFn: async () => {
            const res = await axiosSecure(`/registration/${regId}`)
            return res?.data
        }
    })
    const amount = parseInt(registered?.campFees)
    const amountInCents = amount * 100

    // console.log(registered);

    const handlePayment = async (event) => {
        event.preventDefault();
        setProcessing(true)

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('')
            console.log('[PaymentMethod]', paymentMethod);
            // create payment intent
            const res = await axiosSecure.post(`/payment/intent`, {
                amountInCents,
                regId
            })
            const clientSecret = res?.data?.clientSecret

            // confirm message
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                }
            })

            if (result.error) {
                setError(result?.error.message)
            } else {
                setError('')

                if (result?.paymentIntent?.status === 'succeeded') {
                    const transactionId = result?.paymentIntent.id
                    toast.success(`Payment successful! Transaction ID: ${transactionId}`)

                    const paymentData = {
                        payerEmail: user?.email,
                        payertName: user?.displayName,
                        regCampId: registered?.campId,
                        regCampName: registered?.campName,
                        transactionId: transactionId,
                        date: new Date().toISOString(),
                        payment_status: 'paid',
                        amount: registered?.campFees,
                    }

                    const res = await axiosSecure.post('/payments', paymentData);
                    if(res?.data.insertedId){
                        navigate('/dashboard/registered-camps')
                    }
                    refetch()
                }
            }

            setSucceeded(true)
            setProcessing(false)
        }
    };



    return (

        <div className="max-w-md mx-auto p-6 bg-white mt-8 shadow-2xl rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">💳 Payment Info</h2>

            <form onSubmit={handlePayment} className="space-y-6">
                <div className="p-4 rounded-md border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                    <CardElement className="p-2 text-gray-700 text-base" />
                </div>

                {error && <p className="text-rose-600 text-sm text-center">{error}</p>}
                {succeeded && <p className="text-green-600 text-sm text-center">Payment successful!</p>}

                <button
                    type="submit"
                    disabled={!stripe || processing || succeeded}
                    className={`w-full py-3 rounded-md text-white font-semibold transition duration-300 ${processing || succeeded
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
                        }`
                    }
                >
                    {processing ? 'Processing...' : `Pay $${registered?.campFees}`}
                </button>
            </form>
        </div>

    );
};

export default PaymentForm;