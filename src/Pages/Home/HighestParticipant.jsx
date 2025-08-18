import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner'
import AvailableCard from '../Available/AvailableCard';
import { Link } from 'react-router';

const HighestParticipant = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: camps = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ['highestParticipantCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get('/camps/popular');
            return res?.data
        },
    });

    // console.log(camps);

    if (isLoading) return <LoaderSpinner></LoaderSpinner>
    if (isError) return <p className="text-center  text-red-500">Something went wrong.</p>;

    return (
        <section data-aos="fade-up" className="">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#F97A00]">Popular Medical Camps</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {camps.map((camp) => <AvailableCard
                    key={camp._id}
                    camp={camp}
                ></AvailableCard>)}
            </div>
            <div className="flex justify-end mt-8 ">
                <Link to="/available">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        See All Camps
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default HighestParticipant;
