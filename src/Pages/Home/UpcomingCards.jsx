import React from 'react'
import { Link } from 'react-router'

export default function UpcomingCards({camp}) {
  return (
     <div
            className="card bg-base-100 shadow-md rounded-2xl overflow-hidden p-4 space-y-3"
        >
            <figure>
                <img className='w-full h-48 object-cover rounded-xl border-1 border-gray-300'
                    src={camp?.photo}
                    alt={camp?.campName} />
            </figure>
            <div className="card-body p-0">
                <h2 className="font-bold mb-3">{camp?.campName}</h2>
                <p>{camp?.description?.split(" ").slice(0, 8).join(" ") + "..."}</p>
                <div className="card-actions justify-end">
                    <Link to={`/upcommingdetails/${camp?._id}`}>
                        <button className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
  )
}
