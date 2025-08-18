import { useQuery } from '@tanstack/react-query';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner';
import { Link } from 'react-router';

const FeedbackAndRatings = () => {
  const axiosSecure = useAxiosSecure();

  const { 
    data: feedbacks = [], 
    isLoading 
} = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/feedback');
      return res.data;
    },
  });
//   console.log(feedbacks);

  if (isLoading) return <LoaderSpinner></LoaderSpinner>

  return (
    <div data-aos="fade-up" className="">
      <h2 className="text-3xl text-[#F97A00] font-bold mb-4 text-center">Participant Feedback and Ratings</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="border-2 border-base-300 p-4 rounded hover:shadow-lg bg-base-100 transition">
            <h3 className="text-lg font-bold">Feedback For: {fb.feedbackFor}</h3>
            <div className='flex gap-2 items-center'>
                <p className="text-sm text-gray-500">By: {fb.participantName}</p>
            <img className='w-8 h-8 rounded-full border-1' src={fb?.photo} alt="" />
            </div>
            <Rating
              readonly
              initialRating={fb.rating}
              emptySymbol={<FaRegStar className="text-yellow-400 text-xl" />}
              fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
            />
            <p className="text-gray-500"><span className='font-bold'>{fb.participantName}'s comment:</span> {fb.comment}</p>
          </div>
        ))}
      </div>
     
    <div className='flex justify-end'>
          <Link to='/all-feedback'>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          See More Feedback
        </button>
        </Link>
    </div>
    
    </div>
  );
};

export default FeedbackAndRatings;

