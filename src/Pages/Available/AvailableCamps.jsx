import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AvailableCard from './AvailableCard';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner';
import { useState } from 'react';

const AvailableCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [isTowColumns, setIsTowColumns] = useState(false)

  const {
     data: camps = [], 
     isLoading, 
     isError 
    } = useQuery({
    queryKey: ['allCamps'],
    queryFn: async () => {
      const res = await axiosSecure.get('/see/allcamps');
      return res.data;
    },
  });

  const handleToggle =()=>{
    setIsTowColumns(!isTowColumns)
  }

  if (isLoading) return <LoaderSpinner></LoaderSpinner>
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load camps.</p>;

  return (
    <section className="py-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">All Available Camps</h2>

      {camps.length === 0 ? (
        <p className="text-center text-gray-500">No camps available right now.</p>
      ) : (
     <div>
      <div className='flex justify-end mb-4'>
        <button 
        onClick={handleToggle}
        className='hidden md:block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition'
        >
          {isTowColumns ? 'switch to 3 column' : 'switch to 2 column'}
        </button>
      </div>
         <div className={`grid grid-cols-1 ${isTowColumns ? 'md:grid-cols-2' : 'md:grid-cols-3'} grid-cols-1 gap-6`}>
          {camps.map((camp) => <AvailableCard 
          key={camp._id}
          camp={camp}
          ></AvailableCard>)}
        </div>
     </div>
      )}
    </section>
  );
};

export default AvailableCamps;
