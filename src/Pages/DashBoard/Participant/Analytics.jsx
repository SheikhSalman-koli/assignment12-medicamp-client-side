import React from 'react';
import UseAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import LoaderSpinner from '../../../Components/SharedComponents/LoaderSpinner';
import { FaChartBar } from 'react-icons/fa';

const Analytics = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()

    const {
        data: ragistrations = [],
        isLoading
    } = useQuery({
        queryKey: ['chartData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/chartData/${user?.email}`)
            return res?.data
        }
    })

    // console.log(ragistrations);
    if (isLoading) return <LoaderSpinner></LoaderSpinner>

    return (
        <div className='h-screen p-4 md:p-15 pt-24 space-y-4'>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><FaChartBar className="text-indigo-600 text-2xl" /> User Stats</h2>

        <div className='flex items-center overflow-x-auto mt-0 lg:mt-10 '>
            <ComposedChart width={730} height={250} data={ragistrations}>
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area type="step" dataKey="campFees" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="doctor" barSize={20} fill="#413ea0" />
                <Line type="step" dataKey="campName" stroke="#ff7300" />
                
            </ComposedChart>
        </div>
        </div>
    );
};

export default Analytics;