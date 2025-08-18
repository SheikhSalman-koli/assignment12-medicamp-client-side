import React from 'react';
import Navber from '../Components/Navber/Navber';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='bg-base-200'>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;