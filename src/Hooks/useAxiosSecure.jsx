import axios from 'axios';
import React from 'react';
import UseAuth from './useAuth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
})

const useAxiosSecure = () => {
    const {logout} = UseAuth()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    axiosSecure.interceptors.request.use(config => {

        config.headers.Authorization = `Bearer ${token}`

        return config
    })

    axiosSecure.interceptors.response.use(
        res => res, 
        err =>{
            if(err.status === 401 || err.status === 403){
                logout()
                .then(()=>{
                    navigate('/signin')
                }).catch(err=> toast.error(err.message))
            }
        return Promise.reject(err) 
    }
    )

    return axiosSecure
};

export default useAxiosSecure;