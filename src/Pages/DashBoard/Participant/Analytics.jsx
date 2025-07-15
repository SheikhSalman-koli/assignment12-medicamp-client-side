import React from 'react';
import UseAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import LoaderSpinner from '../../../Components/SharedComponents/LoaderSpinner';

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
        <div className='flex justify-center items-center h-screen overflow-x-auto'>
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
    );
};

export default Analytics;