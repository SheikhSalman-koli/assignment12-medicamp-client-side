import React, { use, useState } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../SharedComponents/Logo';
import './nav.css'
import UseAuth from '../../Hooks/useAuth';


const Navber = () => {
    const { user, logout } = UseAuth()
    console.log(user);


    const handleLogout = async () => {
        logout()
            .then(() => {
                alert('logged out successfull')
            }).catch(err => {
                toast.error(err.message)
            })
    }


    const links = <>
        <NavLink>Home</NavLink>
        <NavLink>Available Camps</NavLink>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    {/* <a className="btn btn-ghost text-xl hidden lg:block">logo+name</a> */}
                    <div className="hidden lg:block">
                        <Logo></Logo>
                    </div>
                    <div className="dropdown">
                        <div tabIndex={0} className="btn btn-ghost lg:hidden">
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
                            <div tabIndex={0} className="btn btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <div
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 -ml-24 mr-3 w-35 p-2 shadow"
                            >
                                <a>Item 1</a>
                                <button
                                    onClick={handleLogout}
                                    type='submit'
                                    className='btn'
                                >Log Out</button>
                            </div>

                        </div>
                    </> : <NavLink to='/signin'>Join Us</NavLink>}

                </div>
            </div>
        </div>
    );
};

export default Navber;