import React from 'react';
import useUserRole from '../Hooks/useUserRole'
import UseAuth from '../Hooks/useAuth';
import LoaderSpinner from '../Components/SharedComponents/LoaderSpinner';

const OrganizerRoute = ({children}) => {
    const {user, loading} = UseAuth()
    const {role, isRoleLoading} = useUserRole()

    if(loading || isRoleLoading) return <LoaderSpinner></LoaderSpinner>

    if(!user || role !== 'admin'){
       return <Navigate state={location?.pathname} to='/signin'></Navigate>
    }

    return children
};

export default OrganizerRoute;