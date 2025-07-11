import React from 'react';
import UseAuth from '../Hooks/useAuth';
import LoaderSpinner from '../Components/SharedComponents/LoaderSpinner';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = UseAuth()
    
    const location = useLocation()

    if(loading) return <LoaderSpinner></LoaderSpinner>

    if(!user){
       return <Navigate state={location?.pathname} to='/signin'></Navigate>
    }

    return children
};

export default PrivateRoute;