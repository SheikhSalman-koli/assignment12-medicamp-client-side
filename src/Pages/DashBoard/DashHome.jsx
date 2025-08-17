import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner';
import OrganizerHome from './Organizer/OrganizerHome';
import ParticipantHome from './Participant/ParticipantHome';
import OrganizerProfile from './Organizer/OrganizerProfile';
import Analytics from './Participant/Analytics';
import { useNavigate } from 'react-router';
import OrganizerStats from './Organizer/OrganizerStats';

const DashHome = () => {

    const{role, isRoleLoading} = useUserRole()

    if(isRoleLoading) return <LoaderSpinner></LoaderSpinner>

    
     
    return (
        <div className=''>
            
            {
                !isRoleLoading && role === 'admin' && <OrganizerStats></OrganizerStats>
            }
            {
                !isRoleLoading && role === 'user' && <Analytics></Analytics>
            }
        </div>
    );
};

export default DashHome;