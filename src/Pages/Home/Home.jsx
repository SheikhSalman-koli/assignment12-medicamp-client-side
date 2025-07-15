import React from 'react';
import Banner from '../../Components/Banner';
import axios from 'axios';
import HighestParticipant from './HighestParticipant';
import FeedbackAndRatings from './FeedbackAndRatings';

const Home = () => {

    return (
        <div className='max-w-11/12 mx-auto'>
            <Banner></Banner>
            <HighestParticipant></HighestParticipant>
            <FeedbackAndRatings></FeedbackAndRatings>
        </div>
    );
};

export default Home;