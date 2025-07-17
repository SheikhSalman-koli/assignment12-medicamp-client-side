import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoaderSpinner from '../../../Components/SharedComponents/LoaderSpinner';
import { useState } from 'react';
import AllTableSearch from '../../../Components/SharedComponents/AllTableSearch';


const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const[search, setSearch] = useState('')
  const[searchInput,setSearchInput] = useState('')

  const { 
    data: payments = [], 
    isLoading 
} = useQuery({
    queryKey: ['paymentHistory', user?.email, search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}&searchParams=${search}`);
      return res?.data;
    },
    // enabled: !!user?.email,
  });

  if (isLoading) return <LoaderSpinner></LoaderSpinner>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>
      <AllTableSearch
      value={searchInput}
      onChange={setSearchInput}
      onDebouncedChange={setSearch}
      placeholder='search'
      ></AllTableSearch>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm md:text-base border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Camp Name</th>
              <th className="border p-2">Fees</th>
              <th className="border p-2">Payment Status</th>
              <th className="border p-2">Confirmation Status</th>
              <th className="border p-2">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{payment.regCampName}</td>
                <td className="border p-2">${payment.amount}</td>
                <td className="border p-2 text-green-600 font-medium">Paid</td>
                <td className={`border p-2 font-medium ${payment.confirm_status ? 'text-blue-500' : 'text-red-400'}`}>
                    {payment.confirm_status ? 'Confirmed' : 'Pending'}                  
                </td>
                <td className="border p-2 text-xs break-all">{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <p className="text-center text-gray-500 py-4">No payment history available.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
