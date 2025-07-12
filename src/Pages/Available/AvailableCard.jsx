import React from 'react';
import { Link } from 'react-router';

const AvailableCard = ({ camp }) => {
    return (
        <div
            className="bg-white rounded-xl shadow-md border hover:shadow-lg p-4 transition space-y-3"
        >
            <img
                src={camp.photo}
                alt={camp.campName}
                className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold">{camp.campName}</h3>
            <p><span className="font-medium">Fees:</span> ${camp.fees}</p>
            <p><span className="font-medium">Date & Time:</span> {new Date(camp.dateTime).toLocaleString()}</p>
            <p><span className="font-medium">Location:</span> {camp.location}</p>
            <p><span className="font-medium">Healthcare Professional:</span> {camp.doctor}</p>
            <p><span className="font-medium">Participants:</span> {camp.participantCount}</p>
            <Link to={`/camp-details/${camp._id}`}>
                <button className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                    View Details
                </button>
            </Link>
        </div>
    );
};

export default AvailableCard;