// components/RegisterModal.jsx
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/useAuth';

const RegisterModal = ({ camp, onClose, onSubmit }) => {
    const{user} = UseAuth()
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
} = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data)
    onClose()    
  };

  return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Join Camp: {camp.campName}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Camp Info (Read-only) */}
          <div>
            <label className="label">Camp Name</label>
            <input
              readOnly
              defaultValue={camp.campName}
              className="input input-bordered w-full"
              {...register('campName')}
            />
          </div>

          <div>
            <label className="label">Camp Fees</label>
            <input
              readOnly
              defaultValue={camp.fees}
              className="input input-bordered w-full"
              {...register('campFees')}
            />
          </div>

          <div>
            <label className="label">Location</label>
            <input
              readOnly
              defaultValue={camp.location}
              className="input input-bordered w-full"
              {...register('location')}
            />
          </div>

          <div>
            <label className="label">Healthcare Professional</label>
            <input
              readOnly
              defaultValue={camp.doctor}
              className="input input-bordered w-full"
              {...register('doctor')}
            />
          </div>

          {/* Participant Info */}
          <div>
            <label className="label">Participant Name</label>
            <input
              readOnly
              defaultValue={user?.displayName}
              className="input input-bordered w-full"
              {...register('participantName')}
            />
          </div>

          <div>
            <label className="label">Participant Email</label>
            <input
              readOnly
              defaultValue={user?.email}
              className="input input-bordered w-full"
              {...register('participantEmail')}
            />
          </div>

          <div>
            <label className="label">Age</label>
            <input
              type="number"
              placeholder="Age"
              className="input input-bordered w-full"
              {...register('age', { required: true })}
            />
          </div>

          <div>
            <label className="label">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              {...register('phone', { required: true })}
            />
          </div>

          <div>
            <label className="label">Gender</label>
            <select
              className="input input-bordered w-full"
              {...register('gender', { required: true })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="label">Emergency Contact</label>
            <input
              type="text"
              placeholder="Emergency Contact"
              className="input input-bordered w-full"
              {...register('emergencyContact', { required: true })}
            />
          </div>

          <div>
            <label className="label">Address</label>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full"
              {...register('Address', { required: true })}
            />
          </div>

          {/* Actions */}
          <div className="col-span-1 md:col-span-2 flex justify-between gap-3 mt-4">
                 <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>

             <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
