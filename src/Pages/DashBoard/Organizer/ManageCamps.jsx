import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import UseAuth from '../../../Hooks/useAuth';
import { useEffect, useState } from 'react';
import EditCampModal from './EditCampModal';
import LoaderSpinner from '../../../Components/SharedComponents/LoaderSpinner';
import AllTableSearch from '../../../Components/SharedComponents/AllTableSearch';
import { useLoaderData } from 'react-router';
import './button.css'
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const queryClient = useQueryClient();
    const [selectedCamp, setSelectedCamp] = useState(null);
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    // pagination
    // const coutn = useLoaderData()
    const [currentPage, setCurrentPage] = useState(0)
    const itemPerPage = 10
    useEffect(()=>{
        setCurrentPage(0)
    },[search])
    // console.log(pages);
    // Fetch all camps created by this organizer
    const {
        data = {},
        isLoading
    } = useQuery({
        queryKey: ['organizerCamps', user?.email, search, currentPage, itemPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/camps?email=${user?.email}&searchParams=${search}&page=${currentPage}&size=${itemPerPage}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    const items = data.total || 0;
    const camps = data.data || [];
    const numberOfPages = Math.ceil(items / itemPerPage)
    const pages = [...Array(numberOfPages).keys()]



    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }


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
        <div className="w-full p-4 pt-24 lg:pt-8">
            <h2 className="text-3xl text-[#F97A00] font-bold  mb-6 text-center">Manage Camps</h2>
            <AllTableSearch
                value={searchInput}
                onChange={setSearchInput}
                onDebouncedChange={setSearch}
                placeholder='search'
            ></AllTableSearch>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm md:text-base">
                    <thead className="bg-gray-100">
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
                            <tr key={camp._id} className="border-b hover:bg-gray-50">
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
                <div className={`text-center pagination my-5`}>
                    <button onClick={handlePrev} className='btn'><MdOutlineKeyboardDoubleArrowLeft /></button>
                    {pages.map(page => <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`btn ${currentPage === page && 'selected'}`}
                    >{page + 1}</button>)}
                    <button onClick={handleNext} className='btn'><MdKeyboardDoubleArrowRight /></button>
                </div>
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
