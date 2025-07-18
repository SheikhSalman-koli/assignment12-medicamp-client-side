import React from 'react';
import Banner from '../../Components/Banner';
import axios from 'axios';
import HighestParticipant from './HighestParticipant';
import FeedbackAndRatings from './FeedbackAndRatings';
import BeVolunteer from './DedicatedSection/BeVolunteer';
import Donate from './DedicatedSection/Donate';
import HomeActionSection from './DedicatedSection/ActionSection';

const Home = () => {

    return (
        <div className='max-w-11/12 mx-auto'>
            <Banner></Banner>
            <HighestParticipant></HighestParticipant>
            <FeedbackAndRatings></FeedbackAndRatings>
            <HomeActionSection></HomeActionSection>
        </div>
    );
};

export default Home;