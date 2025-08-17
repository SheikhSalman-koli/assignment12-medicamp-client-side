
import { FaUserCog, FaPlusCircle, FaTasks, FaClipboardList, FaHome, FaChartPie } from 'react-icons/fa';
import { NavLink } from 'react-router';

const OrganizerNav = () => {
    const navLinkStyle = ({ isActive }) =>
        isActive
            ? 'flex items-center gap-2 p-2 rounded-lg bg-blue-100 text-blue-700 font-semibold'
            : 'flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100';

    return (
        <nav className="space-y-2">
            {/* <NavLink to="/dashboard" className={navLinkStyle}>
                <FaHome /> Home
            </NavLink> */}

            <NavLink to="/dashboard/stats" className={navLinkStyle}>
                <FaChartPie /> Organizer Stats
            </NavLink>
            <NavLink to="/dashboard/organizer-profile" className={navLinkStyle}>
                <FaUserCog /> Organizer Profile
            </NavLink>

            <NavLink to="/dashboard/add-camp" className={navLinkStyle}>
                <FaPlusCircle /> Add A Camp
            </NavLink>

            <NavLink to="/dashboard/manage-camps" className={navLinkStyle}>
                <FaTasks /> Manage Camps
            </NavLink>

            <NavLink to="/dashboard/manage-registered" className={navLinkStyle}>
                <FaClipboardList /> Manage Registrations
            </NavLink>
        </nav>
    );
};

export default OrganizerNav;
