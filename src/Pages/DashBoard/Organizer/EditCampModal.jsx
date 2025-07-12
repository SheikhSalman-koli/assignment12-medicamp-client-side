import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { uploadPhoto } from '../../../Components/SharedComponents/Utils';

const EditCampModal = ({ camp, onClose, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            campName: camp.campName,
            // image: camp.photo,
            fees: camp.fees,
            dateTime: new Date(camp.dateTime).toISOString().slice(0, 16),
            location: camp.location,
            doctor: camp.doctor,
            participantCount: camp.participantCount || 0,
            description: camp.description,
        },
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (updated) => {
            const res = await axiosSecure.patch(`/camps/${camp._id}`, updated);
            return res.data;
        },
        onSuccess: () => {
            refetch();
            onClose();
        },
    });

    const onSubmit = async (data) => {
        let photo 
        const updatedDoc = {
            ...data
        }
        const image = data?.photo?.[0]
        if(image){
           photo = await uploadPhoto(image)
           updatedDoc.photo = photo
        } 
        // console.log(updatedDoc);
        await mutateAsync(updatedDoc);
    };

    return (
            <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 overflow-y-auto  p-6 md:p-10 transition-all duration-300">
                <div className="bg-white w-full max-w-2xl mx-auto rounded shadow-lg p-6 relative transform transition-all duration-300 scale-100 animate-fadeIn">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                        onClick={onClose}
                    >
                        <FaTimes />
                    </button>

                    <h3 className="text-xl font-semibold mb-4">Edit Camp Details</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Camp Name */}
                        <div>
                            <label className="font-medium">Camp Name</label>
                            <input {...register('campName')} className="w-full p-2 border rounded" />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="font-medium">Image URL</label>
                            <input 
                            type="file"
                            accept="image/*"
                            {...register('photo')} className="w-full p-2 border rounded" />
                        </div>

                        {/* Camp Fees */}
                        <div>
                            <label className="font-medium">Camp Fees</label>
                            <input type="number" {...register('fees')} className="w-full p-2 border rounded" />
                        </div>

                        {/* Date & Time */}
                        <div>
                            <label className="font-medium">Date & Time</label>
                            <input
                                type="datetime-local"
                                {...register('dateTime')}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="font-medium">Location</label>
                            <input {...register('location')} className="w-full p-2 border rounded" />
                        </div>

                        {/* Healthcare Professional */}
                        <div>
                            <label className="font-medium">Healthcare Professional</label>
                            <input {...register('doctor')} className="w-full p-2 border rounded" />
                        </div>

                        {/* Participants (readonly or disabled) */}
                        <div>
                            <label className="font-medium">Participant Count</label>
                            <input
                                type="number"
                                {...register('participantCount')}
                                className="w-full p-2 border rounded bg-gray-100"
                                readOnly
                            />
                        </div>

                        {/* Description (spans 2 columns) */}
                        <div className="md:col-span-2">
                            <label className="font-medium">Description</label>
                            <textarea
                                {...register('description')}
                                rows={3}
                                className="w-full p-2 border rounded resize-none"
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                            <button
                                type="submit"
                                // disabled={isPending}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {isPending ? 'Updating...' : 'Update'}
                              
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border rounded text-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default EditCampModal;
