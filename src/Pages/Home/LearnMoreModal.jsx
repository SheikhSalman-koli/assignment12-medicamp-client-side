import React from 'react'

export default function LearnMoreModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-xl">
                <div
                    className="flex justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        About MediCamp
                    </h2>
                    <button
                        onClick={onClose}
                        className="btn btn-sm text-[20px]">x</button>
                </div>
                <div>

                    <p className="text-gray-600 leading-relaxed mb-4">
                        <strong>MediCamp</strong> is a professional healthcare initiative designed to provide
                        high-quality medical services directly to communities. Many people face challenges
                        accessing timely healthcare due to distance, busy schedules, or hospital wait times.
                        MediCamp ensures that patients receive organized, reliable, and professional care.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                        <li>Comprehensive general health checkups for adults and children</li>
                        <li>Specialist consultations (pediatrics, gynecology, cardiology, eye care, etc.)</li>
                        <li>Access to quality medicines and treatments</li>
                        <li>Health education sessions on hygiene, nutrition, and preventive care</li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        MediCamp focuses on <strong>delivering timely and professional medical care</strong>.
                        By organizing structured medical camps, communities receive reliable guidance, early
                        detection of health issues, and improved access to healthcare services.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Our goal is to <strong>enhance overall community health</strong> and provide trusted
                        medical services to those who need them most. Every patient benefits from quality care
                        in a convenient and professional setting.
                    </p>


                </div>

            </div>
        </div>
    )
}
