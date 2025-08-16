import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const FollowupModal = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        Swal.fire({
            icon: "success",
            title: "Follow-Up Submitted!",
            text: "Your follow-up request has been submitted successfully. Our team will get back to you soon.",
            showConfirmButton: true,
        }).then(()=>{
             onClose()
             reset();
        })
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-xl">
                <div
                    className="flex justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        Follow-Up Form
                    </h2>
                    <button
                        onClick={onClose}
                        className="btn btn-sm text-[20px]">x</button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Phone</label>
                        <input
                            type="tel"
                            {...register("phone", { required: "Phone is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            rows="4"
                            {...register("message")}
                            placeholder="Any specific concerns or follow-up requests"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition font-medium"
                    >
                        Submit
                    </button>
                </form>

            </div>
        </div>
    );
};

export default FollowupModal;