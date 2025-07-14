import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoaderSpinner from '../../../Components/SharedComponents/LoaderSpinner';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import FeedbackModal from './FeedbackModal';

const RegisteredCamps = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const [isOpen, setIsopen] = useState(false)

    const {
        data: registrations = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['registeredCamps', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/registrations?email=${user?.email}`);
            return res.data;
        },
    });

    // make payment
    const handlePayment = (id) => {
        navigate(`/dashboard/payment/${id}`)
    };

    // give feedback
    const handleFeedback = (camp) => {

    };
    const closeModal = () => {
        setIsopen(false)
    }

    // delete registration
    const handleCancel = async (registrationId, campId) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "Cancel this camp registration?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(
                    `/registrations/${registrationId}?campId=${campId}`
                );

                if (res?.data?.deletedCount > 0) {
                    Swal.fire('Canceled!', 'Registration canceled.', 'success');
                    refetch();
                }
            } catch (err) {
                toast.error(err.message);
            }
        }
    };

    if (isLoading) return <LoaderSpinner></LoaderSpinner>

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Registered Camps</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border-collapse">
                    <thead>
                        <tr className="bg-base-200 text-base">
                            <th className="border p-2">#</th>
                            <th className="border p-2">Camp Name</th>
                            <th className="border p-2">Fees</th>
                            <th className="border p-2">Participant</th>
                            <th className="border p-2">Payment Status</th>
                            <th className="border p-2">Confirmation</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((camp, index) => (
                            <tr key={camp._id} className="hover">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{camp.campName}</td>
                                <td className="border p-2">$ {camp.campFees}</td>
                                <td className="border p-2">{camp.participantName}</td>

                                <td className="border p-2">
                                    <span
                                        className={`px-2 py-1 rounded text-white ${camp.payment_status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                    >
                                        {camp.payment_status}
                                    </span>
                                </td>

                                <td className="border p-2">
                                    {camp.confirm_status ? (
                                        <span className="text-green-600 font-semibold">Confirmed</span>
                                    ) : (
                                        <span className="text-yellow-500">Pending</span>
                                    )}
                                </td>

                                <td className="border p-2 space-y-1.5 lg:space-x-1.5">
                                    {/* Pay Button (only if unpaid) */}
                                    {camp?.payment_status !== 'paid' &&
                                        <button
                                            className="btn btn-xs btn-primary"
                                            onClick={() => handlePayment(camp?._id)}
                                        >
                                            Pay
                                        </button>
                                    }

                                    {/* Feedback Button */}
                                    {camp?.payment_status === 'paid' &&
                                        <button
                                            disabled={camp?.payment_status !== 'paid'}
                                            className="btn btn-xs btn-info"
                                            onClick={() => setIsopen(true)}
                                        >
                                            Feedback
                                        </button>
                                    }
                                    
                                    {/* Cancel Button */}
                                    <button
                                        disabled={camp?.payment_status === 'paid'}
                                        className={`btn btn-xs btn-error`}
                                        onClick={() => handleCancel(camp?._id, camp?.campId)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                                    {isOpen && <FeedbackModal
                                        isOpen={isOpen}
                                        onClose={closeModal}
                                        regData={camp}
                                    ></FeedbackModal>}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default RegisteredCamps;
