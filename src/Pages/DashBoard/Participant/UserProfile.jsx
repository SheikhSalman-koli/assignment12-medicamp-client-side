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
        queryKey: ['participantProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // console.log(participant);

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
        // const image = data?.photo?.[0]
        // const photo = await uploadPhoto(image)
        const updatedData = {
            ...data,
            // photo
        }
        // console.log(updatedData);
        await updateProfile(updatedData);
    };

    if (isLoading) return <LoaderSpinner></LoaderSpinner>


    return (
        <div className="w-full px-4 md:px-8 py-6 mt-8 pt-24  lg:pt-6">
            <div className="w-full max-w-4xl mx-auto bg-white border-1 border-blue-600 rounded-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

                {!editing ? (
                    <div className="flex flex-col lg:flex-row items-center gap-4 text-center">
                        {/* <div className='flex-1'>
                            <img
                                src={participant?.photo}
                                alt="Participant"
                                className="w-28 md:w-60 h-28 md:h-60 rounded-full object-cover border"
                            />
                        </div> */}
                           <div className='flex-1 flex justify-center'>
                            <div>
                                <img
                                    src={participant?.photo}
                                    alt="Participant"
                                    className="w-28 md:w-60 h-28 md:h-60 rounded-full object-cover border"
                                />
                            </div>
                        </div>
                         <div className="flex-1">
                            <p><strong>Name:</strong> {participant?.name}</p>
                            <p><strong>Email:</strong> {participant?.email}</p>
                            <p><strong>Contact:</strong> {participant?.contact || 'N/A'}</p>
                            <p><strong>Role:</strong> {participant?.role}</p>

                            {/* Read-only system fields */}
                            <p>
                                <strong>Created At:</strong>{" "}
                                {participant?.created_at
                                    ? new Date(participant.created_at).toLocaleString()
                                    : "N/A"}
                            </p>
                            <p>
                                <strong>Last Login:</strong>{" "}
                                {participant?.last_log_at
                                    ? new Date(participant.last_log_at).toLocaleString()
                                    : "N/A"}
                            </p>

                            <button
                                onClick={() => setEditing(true)}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Update Profile
                            </button>
                        </div>
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
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                // accept="image/*"
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
                                className="btn btn-outline"
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