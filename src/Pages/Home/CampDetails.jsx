
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useState } from 'react';
import RegisterModal from './RegisterModal';
import toast from 'react-hot-toast';
import UseAuth from '../../Hooks/useAuth';

const CampDetails = () => {
    const { campId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth()
    const [showModal, setShowModal] = useState(false);
    //    const [loader, setLoader]

    const {
        data: camp,
        isLoading,
        isError,
        refetch: refetchCamp
    } = useQuery({
        queryKey: ['camp-details', campId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/camp-details/${campId}`);
            return res.data;
        },
        enabled: !!campId,
    });

    //   check already joined the group or not
    const {
        data: isRegistered,
        isLoading: checking,
        refetch: refetchRegitration
    } = useQuery({
        queryKey: ['isRegistered', campId, user?.email],
        enabled: !!user?.email && !!campId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/registrations/check?campId=${campId}&email=${user?.email}`);
            return res.data.registered;
        }
    });

    const handleJoinSubmit = async (formData) => {
        const registration = {
            ...formData,
            campId: camp._id,
            status: 'pending'
        };

        try {
            const res = await axiosSecure.post('/registrations', registration);
            if (res?.data) {
                toast.success('Registration successful');
                refetchCamp()
                refetchRegitration()
            }
        } catch (error) {
            toast.error(error.message);
        }
        // console.log(registration);
    };

    if (isLoading) return <p className="text-center py-10">Loading camp details...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load camp details.</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <img
                src={camp.photo}
                alt={camp.campName}
                className="w-full h-64 object-cover rounded-xl mb-6 shadow"
            />
            <h2 className="text-3xl font-bold mb-3 text-indigo-700">{camp.campName}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <p><span className="font-semibold">Camp Fees:</span> ${camp.fees}</p>
                <p><span className="font-semibold">Date & Time:</span> {new Date(camp.dateTime).toLocaleString()}</p>
                <p><span className="font-semibold">Location:</span> {camp.location}</p>
                <p><span className="font-semibold">Healthcare Professional:</span> {camp.doctor}</p>
                <p><span className="font-semibold">Participants:</span> {camp.participantCount}</p>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{camp.description}</p>
            </div>

            {/* Join Camp Button */}
            <div className="text-center">
                {/* <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Join Camp
        </button> */}
                {checking ? (
                    <p>Checking registration...</p>
                ) : isRegistered ? (
                    <p className="text-green-600 font-semibold">You have already joined this camp</p>
                ) : (
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary"
                    >
                        Join Camp
                    </button>
                )}

            </div>
            {/* Modal */}
            {showModal && (
                <RegisterModal
                    camp={camp}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleJoinSubmit}
                />
            )}
        </div>
    );
};

export default CampDetails;
