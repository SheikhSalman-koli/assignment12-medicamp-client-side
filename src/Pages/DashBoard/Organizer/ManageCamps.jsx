import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import UseAuth from '../../../Hooks/useAuth';
import { useState } from 'react';
import EditCampModal from './EditCampModal';
import LoaderSpinner from '../../../Components/SharedComponents/LoaderSpinner';

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const queryClient = useQueryClient();
    const [selectedCamp, setSelectedCamp] = useState(null);
    // Fetch all camps created by this organizer
    const {
        data: camps = [],
        isLoading
    } = useQuery({
        queryKey: ['organizerCamps', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/camps?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Delete camp mutation
    const { mutateAsync: deleteCamp } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/camps/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['organizerCamps', user?.email]);
            Swal.fire('Deleted!', 'Camp has been removed.', 'success');
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to delete the camp.', 'error');
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the camp!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });
        if (confirm.isConfirmed) {
            await deleteCamp(id);
        }
    };

    if (isLoading) return <LoaderSpinner></LoaderSpinner>


    return (
        <div className="w-full p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Your Camps</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded shadow text-sm md:text-base border-collapse">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-2 border border-black text-left">#</th>
                            <th className="p-2 border border-black text-left">Camp Name</th>
                            <th className="p-2 border border-black text-left">Date & Time</th>
                            <th className="p-2 border border-black text-left">Location</th>
                            <th className="p-2 border border-black text-left">Healthcare Professional</th>
                            <th className="p-2 border border-black text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((camp, index) => (
                            <tr key={camp._id} className="border-b hover:bg-gray-100">
                                <td className="p-2 border border-black">{index + 1}</td>
                                <td className="p-2 border border-black">{camp?.campName}</td>
                                <td className="p-2 border border-black">
                                    {new Date(camp?.dateTime).toLocaleString('en-GB', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    })}
                                </td>
                                <td className="p-2 border border-black">{camp?.location}</td>
                                <td className="p-2 border border-black">{camp?.doctor}</td>
                                <td className="p-2 flex gap-4 justify-center">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => setSelectedCamp(camp)}
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(camp._id)}
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>

                        ))}
                        {camps.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No camps found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {selectedCamp && (
                <EditCampModal
                    camp={selectedCamp}
                    onClose={() => setSelectedCamp(null)}
                    refetch={() => queryClient.invalidateQueries(['organizerCamps', user?.email])}
                />
            )}
        </div>
    );
};

export default ManageCamps;
