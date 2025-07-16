import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Rating from "react-rating";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/useAuth";
import { uploadPhoto } from "../../../Components/SharedComponents/Utils";


const FeedbackModal = ({ isOpen, onClose, regData }) => {
    const {user} = UseAuth()
    const axiosSecure = useAxiosSecure()
    const [rating, setRating] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        watch
    } = useForm();
    const comment = watch('comment')

    const onSubmit = async (data) => {

        const photo =await uploadPhoto(user?.photoURL)

        const feedbackData = {
            registrationId: regData._id,
            campId: regData.campId,
            feedbackFor: regData?.campName,
            participantEmail: regData.participantEmail,
            participantName: regData.participantName,
            rating: parseFloat(rating),
            comment: data.comment,
            date: new Date().toISOString(),
            photo,
            campPhoto: regData?.photo
        };
       
          try {
            await axiosSecure.post('/feedback', feedbackData);
            Swal.fire('Thank you!', 'Your feedback has been submitted.', 'success');
            reset();
            onClose();
          } catch (error) {
            Swal.fire('Error', `Failed to submit feedback for ${error.message}`, 'error');
          }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 shadow-lg">

                <h2 className="text-2xl font-semibold text-center">Ragistration Feedback</h2>
                <div className="text-center border-b-1 pb-2">
                    <h3 className="text-xl">Give Feedback For <span className="font-medium text-primary">{regData?.campName}</span></h3>
                    <p>Don't forget to share your experience with us</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  
                    <div className="text-center">
                        {/* <label className="block font-medium mb-1">Your Rating:</label> */}
                        <Rating
                            initialRating={rating}
                            emptySymbol={<FaRegStar className="text-yellow-400 text-2xl" />}
                            fullSymbol={<FaStar className="text-yellow-500 text-2xl" />}
                            onChange={(rate) => setRating(rate)}
                        />
                    </div>

                    <label className="block">
                        <textarea
                            placeholder='comment here'
                            {...register('comment')}
                            className="w-full border p-2 mt-1 rounded"
                        />
                    </label>

                    <div className="flex justify-between gap-2">
                        <button type="button" 
                        onClick={onClose} 
                        className="text-gray-500 btn">
                        Cancel</button>

                        <button type="submit" 
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!rating || !comment}
                        >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackModal
