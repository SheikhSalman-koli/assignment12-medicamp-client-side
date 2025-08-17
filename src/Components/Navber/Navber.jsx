import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../SharedComponents/Logo';
import './nav.css'
import UseAuth from '../../Hooks/useAuth';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { GiHamburgerMenu } from "react-icons/gi";


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
        <NavLink className='font-bold' to='/'>Home</NavLink>
        <NavLink className='font-bold' to='/available'>All Camps</NavLink>
        <NavLink className='font-bold' to='/all-feedback'>Feedbacks</NavLink>
    </>

    return (
        <div className='bg-base-100 shadow-sm fixed z-50 top-0 w-full '>
            <div className="navbar  max-w-11/12 mx-auto p-0">
                <div className="navbar-start">
                    {/* <a className="btn btn-ghost text-xl hidden lg:block">logo+name</a> */}
                    <div className="hidden lg:block">
                        <Logo></Logo>
                    </div>
                    <div className="dropdown">
                        <div tabIndex={0} className="lg:hidden">
                            <GiHamburgerMenu />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                            {user && 
                            <>
                            <NavLink to='/dashboard' className='font-bold'>Dashboard</NavLink>
                           <NavLink to='/report' className='font-bold'>Report</NavLink>
                            </>
                            }
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                        {user && 
                        <>
                        <NavLink to='/dashboard' className='font-bold'>Dashboard</NavLink>
                         <NavLink to='/report' className='font-bold'>Report</NavLink>
                        </>
                        }
                    </ul>
                </div>

                <div className="navbar-end">
                    {user ? <>
                        <div className="dropdown">
                            <div tabIndex={0}>
                                <img src={user?.photoURL} className='w-10 h-10 rounded-full border-1' alt="" />
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
                    </> :
                        <>
                            <Link to='/signin' className='font-bold mr-0 btn btn-outline'>Sign In</Link>
                            <Link to='/signup' className='font-bold mr-0 btn btn-outline'>Sign Up</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navber;