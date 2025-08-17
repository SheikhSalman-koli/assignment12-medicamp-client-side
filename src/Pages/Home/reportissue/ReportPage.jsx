import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ReportPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Report Submitted:", data);
    Swal.fire({
      icon: "success",
      title: "Report Submitted!",
      text: "Thank you for your feedback. We will review your report soon.",
      confirmButtonColor: "#3085d6",
    });

    reset()
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4 pt-24">
      <h1 className="text-2xl font-bold mb-6 text-center">Report an Issue</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Camp Name */}
        <div>
          <label className="block font-medium mb-1">Camp Name</label>
          <input
            type="text"
            {...register("campName", { required: "Camp name is required" })}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter camp name"
          />
          {errors.campName && <p className="text-red-500 mt-1">{errors.campName.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Issue Category</label>
          <select
            {...register("category", { required: "Please select an issue category" })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Select Issue --</option>
            <option value="doctor">Doctor behavior</option>
            <option value="location">Location problem</option>
            <option value="fees">Fees issue</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <p className="text-red-500 mt-1">{errors.category.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: "Please describe the issue" })}
            className="w-full border rounded-lg px-3 py-2"
            rows="4"
            placeholder="Write the issue in detail..."
          />
          {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportPage;
