import { useForm } from 'react-hook-form';
import { uploadPhoto } from '../../../Components/SharedComponents/Utils';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';
import UseAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';

const AddCamp = () => {
  const {user} = UseAuth()
  const axiosSecure = useAxiosSecure()
  const [proccess, setProccess] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
 
  const onSubmit = async(data) => {
    setProccess(true)
    const newCamp = {
      campName: data?.campName,
      fees: data?.fees,
      dateTime: new Date(data?.dateTime).toISOString(),
      location: data?.location,
      doctor: data?.doctor,
      participantCount: 0,
      description: data?.description,
    };
    const image= data?.photo?.[0]
    const photo= await uploadPhoto(image)
    const campData = {
      ...newCamp,
      photo: photo,
      created_by: user?.email
    }
    // console.log('Camp Submitted:', campData);

      try { 
      const res = await axiosSecure.post('/camps', campData);
      if(res?.data?.insertedId){
        setProccess(false)
        Swal.fire('A camp added successfully!')
        reset()
      }
    } catch (error) {
      toast.error(error.message);
    }
    // reset();
  };

  return (
    <div className="max-w-11/12 mx-auto p-2 lg:p-6 mt-24 lg:mt-8 bg-white rounded-lg border-1 border-blue-600 my-8">
      <h2 className="text-3xl text-[#F97A00] font-bold  mb-6 text-center">Add A Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Camp Name */}
        <div>
          <label className="font-semibold">Camp Name</label>
          <input
            {...register('campName', { required: 'Camp name is required' })}
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter camp name"
          />
          {errors.campName && <p className="text-red-500 text-sm">{errors.campName.message}</p>}
        </div>

        {/* image */}
        <div>
          <label className="label">
            <span className="label-text">Upload Photo ( low size )</span>
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


        {/* Fees */}
        <div>
          <label className="font-semibold">Camp Fees (৳)</label>
          <input
            {...register('fees', { required: 'Camp fee is required', valueAsNumber: true })}
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Enter fee amount"
          />
          {errors.fees && <p className="text-red-500 text-sm">{errors.fees.message}</p>}
        </div>

        {/* Date & Time */}
        <div>
          <label className="font-semibold">Date & Time</label>
          <input
            {...register('dateTime', { required: 'Date & time is required' })}
            type="datetime-local"
            className="w-full p-2 border rounded"
          />
          {errors.dateTime && <p className="text-red-500 text-sm">{errors.dateTime.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Location</label>
          <input
            {...register('location', { required: 'Location is required' })}
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter location"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Healthcare Professional Name */}
        <div>
          <label className="font-semibold">Healthcare Professional</label>
          <input
            {...register('doctor', { required: 'Doctor name is required' })}
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Doctor's name"
          />
          {errors.doctor && <p className="text-red-500 text-sm">{errors.doctor.message}</p>}
        </div>

        {/* Description (full width) */}
        <div className="md:col-span-2">
          <label className="font-semibold">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full p-2 border rounded"
            placeholder="Describe the camp"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Submit Button (full width) */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={proccess}
            className={`w-full  text-white py-2 font-semibold rounded  transition ${proccess ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {proccess ? 'proccessing to add...' : 'Add Camp'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
