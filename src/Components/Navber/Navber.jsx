import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../SharedComponents/Logo';
import './nav.css'
import UseAuth from '../../Hooks/useAuth';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Swal from 'sweetalert2';


const Navber = () => {
    const { user, logout } = UseAuth()

    const handleLogout = async () => {
        logout()
            .then(() => {
                Swal.fire('logged out successfull!')
            }).catch(err => {
                toast.error(err.message)
            })
    }


    const links = <>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/available'>Available Camps</NavLink>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-4">
                <div className="navbar-start">
                    {/* <a className="btn btn-ghost text-xl hidden lg:block">logo+name</a> */}
                    <div className="hidden lg:block">
                        <Logo></Logo>
                    </div>
                    <div className="dropdown">
                        <div tabIndex={0} className="lg:hidden">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg> */}
                            <Logo></Logo>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end">
                    {user ? <>
                        <div className="dropdown">
                            <div tabIndex={0}>
                                <img src={user?.photoURL} className='w-8 h-8 rounded-full border-1' alt="" />
                            </div>
                            <div
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 -ml-25 mt-3 w-35 p-2 shadow space-y-3"
                            >
                                <p className='text-base'>{user?.displayName}</p>
                                <NavLink to='/dashboard' className='font-bold'>Dashboard</NavLink>
                                <button
                                    onClick={handleLogout}
                                    type='submit'
                                    className='btn btn-outline text-primary'
                                >Log out <RiLogoutCircleRLine /></button>
                            </div>

                        </div>
                    </> : <Link to='/signin' className='font-bold'>Join Us</Link>}

                </div>
            </div>
        </div>
    );
};

export default Navber;