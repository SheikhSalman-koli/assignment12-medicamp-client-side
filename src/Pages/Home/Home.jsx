import React from 'react';
import Banner from '../../Components/Banner';
import axios from 'axios';
import HighestParticipant from './HighestParticipant';

const Home = () => {

    return (
        <div className='max-w-11/12 mx-auto'>
            <Banner></Banner>
            <HighestParticipant></HighestParticipant>
        </div>
    );
};

export default Home;