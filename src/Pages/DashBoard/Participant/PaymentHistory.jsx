import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoaderSpinner from '../../../Components/SharedComponents/LoaderSpinner';
import { useEffect, useState } from 'react';
import AllTableSearch from '../../../Components/SharedComponents/AllTableSearch';
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';


const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const [currentPage, setCurrentPage] = useState(0)
  const perPage = 10

  useEffect(()=>{
    setCurrentPage(0)
  },[search])

  const {
    data = {},
    isLoading
  } = useQuery({
    queryKey: ['paymentHistory', user?.email, search, currentPage, perPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}&searchParams=${search}&page=${currentPage}&size=${perPage}`);
      return res?.data;
    },
    enabled: !!user?.email,
  });
  const items = data?.total || 0
  const payments = data?.data || []
  const numberOfPages = Math.ceil(items / perPage)
  const pages = [...Array(numberOfPages).keys()]

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

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
      <div className={`text-center my-4 pagination`}>
        <button onClick={handlePrev} className='btn'><MdOutlineKeyboardDoubleArrowLeft /></button>
        {pages.map((page) => <button
          onClick={() => setCurrentPage(page)}
          key={page}
          className={`btn ${currentPage === page && 'selected'}`}
        >
          {page + 1}</button>)}
        <button onClick={handleNext} className='btn'><MdKeyboardDoubleArrowRight /></button>
      </div>
    </div>
  );
};

export default PaymentHistory;
