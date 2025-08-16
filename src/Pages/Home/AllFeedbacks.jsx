import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner';
import { useQuery } from '@tanstack/react-query';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';

const AllFeedbacks = () => {

    const axiosSecure = useAxiosSecure();

    const { 
        data: feedbacks = [],
         isLoading 
        } = useQuery({
        queryKey: ['allFeedbacks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/feedbackall');
            return res.data;
        }
    });

    if (isLoading) return <LoaderSpinner></LoaderSpinner>


    return (
        <div className="max-w-11/12 mx-auto pt-24">
            <h2 className="text-2xl font-semibold mb-4 text-center">Participant Feedback and Ratings</h2>

            <div className="grid gap-4 md:grid-cols-2">
                {feedbacks.map((fb) => (
                    <div key={fb._id} className="border p-4 rounded shadow bg-white">
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
                        <p className="text-gray-700"><span className='font-bold'>{fb.participantName}'s comment:</span> {fb.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllFeedbacks;