import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoaderSpinner from '../../../Components/SharedComponents/LoaderSpinner';

const ManageRegCamps = () => {

    const axiosSecure = useAxiosSecure();

    const {
        data: registeredCamps = [],
        refetch,
        isLoading
    } = useQuery({
        queryKey: ['registeredCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/regConfirmation`);
            return res.data;
        },
    });

    const handleCancel = async (id, campId) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to cancel this registration.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
        });
        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/registrations/${id}?campId=${campId}`);
                refetch();
                Swal.fire('Cancelled', 'The registration has been cancelled.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to cancel the registration.', 'error');
            }
        }
    };
    

    const handleConfirm = async (id) => {
        const result = await Swal.fire({
            title: 'Confirm Registration?',
            text: 'Do you want to mark this registration as confirmed?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, confirm it',
            cancelButtonText: 'Cancel',
        });
        if (result.isConfirmed) {
            const res = await axiosSecure.patch(`/update-confirmation/${id}`)
            if(res?.data?.modifiedCount){
                refetch()
            }
        }
    }


    if (isLoading) return <LoaderSpinner></LoaderSpinner>

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Registered Camps</h2>

            <div className="overflow-x-auto">
                <table className="w-full border text-sm md:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">#</th>
                            <th className="border p-2">Camp Name</th>
                            <th className="border p-2">Fees</th>
                            <th className="border p-2">Participant</th>
                            <th className="border p-2">Payment Status</th>
                            <th className="border p-2">Confirmation Status</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registeredCamps.map((reg, index) => (
                            <tr key={reg._id} className="text-center">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{reg.campName}</td>
                                <td className="border p-2">${reg.campFees}</td>
                                <td className="border p-2">{reg.participantName}</td>
                                <td className={`border p-2 ${reg.payment_status === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
                                    {reg.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                                </td>
                                <td className="border p-2">
                                    {reg.confirm_status ? (
                                        <span className="text-blue-600">Confirmed</span>
                                    ) : (
                                        <span className="text-yellow-500">Pending</span>
                                    )}
                                </td>
                                <td className="border p-2 space-y-1.5">
                                    <button
                                        disabled={reg?.payment_status === 'unpaid' || reg?.confirm_status}
                                        className={`bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50 ${reg?.confirm_status && 'cursor-not-allowed'}`}
                                        onClick={() => handleConfirm(reg._id)}
                                    >
                                        confirm
                                    </button>

                                    <button
                                        disabled={reg?.payment_status === 'paid' && reg?.confirm_status}
                                        className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 ${reg?.confirm_status && 'cursor-not-allowed'}`}
                                        onClick={() => handleCancel(reg._id, reg.campId)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {registeredCamps.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No registrations found.</p>
                )}
            </div>
        </div>
    );
};

export default ManageRegCamps;
