import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import LoaderSpinner from '../../Components/SharedComponents/LoaderSpinner';
import OrganizerHome from './Organizer/OrganizerHome';
import ParticipantHome from './Participant/ParticipantHome';

const DashHome = () => {

    const{role, isRoleLoading} = useUserRole()

    if(isRoleLoading) return <LoaderSpinner></LoaderSpinner>

    return (
        <div className='lg:mt-8 pl-3'>
            dash Home
            {/* {
                !isRoleLoading && role === 'admin' && <OrganizerHome></OrganizerHome>
            }
            {
                !isRoleLoading && role === 'user' && <ParticipantHome></ParticipantHome>
            } */}
        </div>
    );
};

export default DashHome;