import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const BeVolunteer = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        Swal.fire({
            icon: 'success',
            title: 'Thank you!',
            text: 'Your volunteer application has been submitted.',
            confirmButtonColor: '#10B981',
        });
        onClose()
    };

    const handleClose = () => {
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center overflow-y-auto p-4 z-50">
            <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
                <div
                    className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">Be A Volunteer</h2>
                    <button
                        onClick={handleClose}
                        className="btn btn-sm text-[20px]">x</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="font-medium">Full Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full input input-bordered"
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
                            className="w-full input input-bordered"
                            placeholder="Your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="font-medium">Phone</label>
                        <input
                            type="tel"
                            {...register("phone", { required: "Phone is required" })}
                            className="w-full input input-bordered"
                            placeholder="Phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="font-medium">Preferred Role</label>
                        <select
                            {...register("role", { required: "Role is required" })}
                            className="w-full select select-bordered"
                        >
                            <option value="">Select role</option>
                            <option value="Medical Assistant">Medical Assistant</option>
                            <option value="Registration Desk">Registration Desk</option>
                            <option value="Logistics Support">Logistics Support</option>
                            <option value="Awareness Campaign">Awareness Campaign</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-success w-full">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BeVolunteer
