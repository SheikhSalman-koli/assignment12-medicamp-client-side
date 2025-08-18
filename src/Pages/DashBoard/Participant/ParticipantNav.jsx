
import {
    FaChartBar,
    FaUserCircle,
    FaClipboardCheck,
    FaMoneyCheckAlt,
    FaHome,
} from 'react-icons/fa';
import { NavLink } from 'react-router';

const ParticipantNav = () => {
     const navLinkStyle = ({ isActive }) =>
        isActive
            ? 'flex items-center gap-2 p-2 rounded-lg bg-blue-100 text-blue-600 font-semibold'
            : 'flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100';

    return (
        <nav className="space-y-2">
            {/* <NavLink to="/dashboard" className={navLinkStyle}>
                <FaHome /> Home
            </NavLink> */}

            <NavLink to="/dashboard/analytics" className={navLinkStyle}>
                <FaChartBar /> Analytics
            </NavLink>

            <NavLink to="/dashboard/participant-profile" className={navLinkStyle}>
                <FaUserCircle /> My Profile
            </NavLink>

            <NavLink to="/dashboard/registered-camps" className={navLinkStyle}>
                <FaClipboardCheck /> Registered Camps
            </NavLink>

            <NavLink to="/dashboard/payment-history" className={navLinkStyle}>
                <FaMoneyCheckAlt /> Payment History
            </NavLink>
        </nav>
    );
};

export default ParticipantNav;
