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
        <NavLink  to='/'>Home</NavLink>
        <NavLink  to='/available'>All Camps</NavLink>
        <NavLink  to='/all-feedback'>Feedbacks</NavLink>
    </>

    return (
        <div className='bg-base-100  fixed z-50 top-0 w-full border-b-2 border-base-300'>
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2">
                            {links}
                            {user &&
                                <>
                                    <NavLink to='/dashboard' >Dashboard</NavLink>
                                    <NavLink to='/report' >Report</NavLink>
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
                                <NavLink to='/dashboard' >Dashboard</NavLink>
                                <NavLink to='/report' >Report</NavLink>
                            </>
                        }
                    </ul>
                </div>

                <div className="navbar-end">
                    <label className="toggle text-base-content">
                        <input type="checkbox" value="synthwave" className="theme-controller" />
                        <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
                        <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
                    </label>
                    {user ? <>
                        <div className="dropdown ml-3">
                            <div tabIndex={0}>
                                <img src={user?.photoURL} className='w-10 h-10 rounded-full border-1' alt="" />
                            </div>
                            <div
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 -ml-25 mt-3 w-35 p-2 shadow space-y-2"
                            >
                                {/* <p className='text-base font-semibold'>{user?.displayName}</p> */}
                                <NavLink to='/dashboard' className='pl-0'>Dashboard</NavLink>
                                <button
                                    onClick={handleLogout}
                                    type='submit'
                                    className='btn btn-outline text-base font-semibold'
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