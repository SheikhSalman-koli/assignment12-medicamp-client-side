import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner';
import OrganizerHome from './Organizer/OrganizerHome';
import ParticipantHome from './Participant/ParticipantHome';
import OrganizerProfile from './Organizer/OrganizerProfile';
import Analytics from './Participant/Analytics';
import { useNavigate } from 'react-router';

const DashHome = () => {

    const{role, isRoleLoading} = useUserRole()

    if(isRoleLoading) return <LoaderSpinner></LoaderSpinner>
     
    return (
        <div className=''>
            {
                !isRoleLoading && role === 'admin' && <OrganizerProfile></OrganizerProfile>
            }
            {
                !isRoleLoading && role === 'user' && <Analytics></Analytics>
            }
        </div>
    );
};

export default DashHome;