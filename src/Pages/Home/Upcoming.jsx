import React, { useEffect, useState } from 'react';
import UpcomingCards from './UpcomingCards';

const Upcoming = () => {

    const [camps, setCamp] = useState([])

    useEffect(()=>{
        fetch('/upcomings.json')
        .then(res=>res.json())
        .then(data=> setCamp(data))
    },[])

    // console.log(camps);


    return (
          <section className="">
            <h2 className="text-3xl text-[#F97A00] font-bold  text-center mb-8">Upcoming Medical Camps</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {camps?.map((camp) => <UpcomingCards
                    key={camp?._id}
                    camp={camp}
                ></UpcomingCards>)}
            </div>
        </section>
    );
};

export default Upcoming;