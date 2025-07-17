import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";

export default function DonateForm({ onClose }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const donationType = watch("donationType");

    const onSubmit = async (data) => {
        Swal.fire({
            icon: 'success',
            title: 'Thank you!',
            text: 'Thank you for your generous donation!',
            // message: ' Thank you for your generous donation!',
            confirmButtonColor: '#10B981',
        });
        onClose()
        //  Thank you for your generous donation!
    };

    const handleClose = () => {
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center overflow-y-auto items-center p-4 z-50">
            <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
                <div
                    className="flex justify-between">
                    <h2 className="text-2xl font-semibold text-center  text-blue-700 mb-4">
                        Make a Donation
                    </h2>
                    <button
                        onClick={handleClose}
                        className="btn btn-sm text-[20px]"
                    >x</button>
                </div>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="font-medium">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="input input-bordered w-full"
                            placeholder="Your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="input input-bordered w-full"
                            placeholder="Your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="font-medium">Donation Type</label>
                        <select
                            {...register("donationType", { required: "Donation type is required" })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Choose type</option>
                            <option value="Money">Money</option>
                            <option value="Medical Supplies">Medical Supplies</option>
                        </select>
                        {errors.donationType && (
                            <p className="text-red-500 text-sm">{errors.donationType.message}</p>
                        )}
                    </div>

                    {donationType === "Money" && (
                        <div>
                            <label className="font-medium">Amount (in BDT)</label>
                            <input
                                type="number"
                                {...register("amount", {
                                    required: "Amount is required for monetary donation",
                                    min: { value: 1, message: "Minimum amount is 1" },
                                })}
                                className="input input-bordered w-full"
                                placeholder="e.g., 500"
                            />
                            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                        </div>
                    )}

                    {donationType === "Medical Supplies" && (
                        <div>
                            <label className="font-medium">Supplies Details</label>
                            <textarea
                                {...register("supplies", { required: "Please describe the supplies" })}
                                className="textarea textarea-bordered w-full"
                                placeholder="List the items you want to donate"
                            />
                            {errors.supplies && <p className="text-red-500 text-sm">{errors.supplies.message}</p>}
                        </div>
                    )}

                    <div>
                        <label className="font-medium">Message (Optional)</label>
                        <textarea
                            {...register("message")}
                            className="textarea textarea-bordered w-full"
                            placeholder="Any special note or message"
                        />
                    </div>

                    <button className="btn btn-primary w-full">Donate</button>
                </form>
            </div>
        </div>
    );
}
