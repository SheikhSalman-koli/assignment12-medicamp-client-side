import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AvailableCard from './AvailableCard';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner';

const AvailableCamps = () => {
  const axiosSecure = useAxiosSecure();

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

  if (isLoading) return <LoaderSpinner></LoaderSpinner>
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load camps.</p>;

  return (
    <section className="py-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">All Available Camps</h2>

      {camps.length === 0 ? (
        <p className="text-center text-gray-500">No camps available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map((camp) => <AvailableCard 
          key={camp._id}
          camp={camp}
          ></AvailableCard>)}
        </div>
      )}
    </section>
  );
};

export default AvailableCamps;
