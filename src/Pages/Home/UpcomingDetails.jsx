import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const upcomingDetails = () => {

    const {id} = useParams()
    console.log(id);

    const [camp, setCamp] = useState({})

    useEffect(()=>{
        fetch(`/upcomings.json`)
        .then(res=> res.json())
        .then(data=> {
            const singleCamp = data?.find(item => item._id === id)
            setCamp(singleCamp)
        })
    },[id])

//       useEffect(() => {
//     fetch("/upcomings.json") // 👈 just fetch the JSON file
//       .then(res => res.json())
//       .then(data => {
//         const singleCamp = data.find(c => c._id === id); // 👈 find by id
//         setCamp(singleCamp);
//       });
//   }, [id]);

    console.log(camp);

    return (
        <div className="max-w-4xl  mx-auto px-4 py-10 pt-24">
            <img
                src={camp?.photo}
                alt={camp?.campName}
                className="w-full h-full object-contain rounded-xl mb-6 shadow"
            />
            <h2 className="text-3xl font-bold mb-3 text-indigo-700">{camp?.campName}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <p><span className="font-semibold">Camp Fees:</span> ${camp?.fees}</p>
                <p><span className="font-semibold">Registration Starts: </span>{camp?.datetime}</p>
                <p><span className="font-semibold">Location:</span> {camp?.location}</p>
                <p><span className="font-semibold">Healthcare Professional:</span> {camp?.doctor}</p>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{camp?.description}</p>
            </div>  
        </div>
    );
};

export default upcomingDetails;