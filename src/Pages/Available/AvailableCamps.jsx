import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AvailableCard from './AvailableCard';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner';
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

const AvailableCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [isTowColumns, setIsTowColumns] = useState(false)
  const [search, setSearch] = useState('')
  const [input, setInput] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(input);
    }, 500);
    return () => clearTimeout(timeout);
  }, [input]);


  const {
    data: camps = [],
    isLoading,
    isFetching,
    isError
  } = useQuery({
    queryKey: ['allCamps', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/see/allcamps?searchParams=${search}`);
      return res.data;
    },
  });

  const handleToggle = () => {
    setIsTowColumns(!isTowColumns)
  }

// console.log(camps);

  if (isLoading) return <LoaderSpinner></LoaderSpinner>
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load camps.</p>;

  return (
    <section className="py-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">All Available Camps</h2>
      <div className='flex justify-between mb-4'>
            <label className="input">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              {/* <IoSearch /> */}
              <input
                type="search"
                placeholder="Search "
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </label>

            <button
              onClick={handleToggle}
              className={`hidden md:block bg-blue-600 text-white btn rounded shadow hover:bg-blue-700 transition`}
            >
              {isTowColumns ? 'switch to 3 column' : 'switch to 2 column'}
            </button>

          </div>
      {camps.length === 0 ? (
        <p className="text-center text-gray-500">No camps available right now.</p>
      ) : (
        <div>


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
