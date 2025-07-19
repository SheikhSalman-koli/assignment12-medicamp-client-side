import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { uploadPhoto } from '../../../Components/SharedComponents/Utils';
import UseAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoaderSpinner from '../../../Components/SharedComponents/LoaderSpinner';

const UserProfile = () => {

    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState(false);

    // Fetch user info
    const { data: participant = {}, isLoading } = useQuery({
        queryKey: ['participantProfile', user?.Email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (participant?.name || participant?.photo || participant?.contact) {
            reset({
                name: participant?.name,
                photo: participant?.photo,
                contact: participant?.contact || '',
            });
        }
    }, [participant?.name || participant?.photo || participant?.contact]);

    const {
        mutateAsync: updateProfile,
        isPending
    } = useMutation({
        mutationKey: ['updateparticipantProfile'],
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.patch(`/users/${user?.email}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['participantProfile', user?.email]);
            setEditing(false);
        },
    });

    const onSubmit = async (data) => {
        const image = data?.photo?.[0]
        const photo = await uploadPhoto(image)
        const updatedData = {
            ...data,
            photo
        }
        // console.log(updatedData);
        await updateProfile(updatedData);
    };

    if (isLoading) return <LoaderSpinner></LoaderSpinner>


    return (
        <div className="w-full px-4 md:px-8 py-6 mt-8">
            <div className="w-full max-w-4xl mx-auto bg-white border-1 border-blue-600 rounded-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

                {!editing ? (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <img
                            src={participant?.photo}
                            alt="Participant"
                            className="w-28 h-28 rounded-full object-cover border"
                        />
                        <div className="w-full sm:w-2/3">
                            <p><strong>Name:</strong> {participant?.name}</p>
                            <p><strong>Email:</strong> {participant?.email}</p>
                            <p><strong>Contact:</strong> {participant?.contact || 'N/A'}</p>
                        </div>
                        <button
                            onClick={() => setEditing(true)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Update Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="font-semibold">Name</label>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                type="text"
                                className="w-full p-2 border rounded"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="label">
                                <span className="label-text">Upload Photo</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register('photo', {
                                    required: 'Photo URL is required',
                                })}
                                placeholder="photo-url"
                                className={`input input-bordered w-full ${errors.photo ? 'input-error' : ''}`}
                            />
                            {errors.photo && (
                                <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
                            )}
                        </div>

                        {/* Contact */}
                        <div className="md:col-span-2">
                            <label className="font-semibold">Contact</label>
                            <input
                                {...register('contact')}
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Phone, WhatsApp, etc."
                            />
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                {isPending ? 'Updating...' : 'Save Change'}

                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserProfile;