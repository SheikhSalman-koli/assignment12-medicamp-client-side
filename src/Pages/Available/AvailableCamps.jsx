import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AvailableCard from './AvailableCard';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner';
import { useEffect, useState } from 'react';

const AvailableCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [isTowColumns, setIsTowColumns] = useState(false)
  const [search, setSearch] = useState('')
  const [input, setInput] = useState('')
  const [sortOption, setSortOption] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(input);
    }, 800);
    return () => clearTimeout(timeout);
  }, [input]);

  const {
    data: camps = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['allCamps', search, sortOption],
    queryFn: async () => {
      const res = await axiosSecure.get(`/see/allcamps?searchParams=${search}&sortParams=${sortOption}`);
      return res.data;
    },
  });
//  console.log(camps);
  const handleToggle = () => {
    setIsTowColumns(!isTowColumns)
  }

  if (isLoading) return <LoaderSpinner></LoaderSpinner>
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load camps.</p>;

  return (
    <section className="py-12 pt-24 max-w-11/12 mx-auto ">
      <h2 className="text-3xl text-[#F97A00] font-bold  text-center mb-8">All Camps</h2>

      <div className='flex justify-between flex-col md:flex-row gap-3 mb-4'>
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
          <input
            type="search"
            placeholder="Search "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered"
        >
          <option value="" disabled>
            Sort by
          </option>
          <option value="most-registered">Most Registered</option>
          <option value="fees">Camp Fees</option>
          <option value="alphabetical">Alphabetical</option>
        </select>

        <button
          onClick={handleToggle}
          className={`${camps.length < 0 && 'invisible'} hidden md:block bg-blue-600 text-white btn rounded shadow hover:bg-blue-700 transition`}
        >
          {isTowColumns ? 'switch to 4 column' : 'switch to 3 column'}
        </button>

      </div>
      {camps.length === 0 ? (
        <p className="text-center text-gray-500">No camps available right now.</p>
      ) : (
        <div>


          <div className={`grid grid-cols-1 ${isTowColumns ? 'md:grid-cols-3' : 'md:grid-cols-4'} grid-cols-1 gap-6`}>
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
