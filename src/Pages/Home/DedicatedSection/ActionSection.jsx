import { useState } from "react";
import { useNavigate } from "react-router";
import BeVolunteer from "./BeVolunteer";
import DonateForm from "./Donate";

export default function HomeActionSection() {

    const [openVolunteer, setOpenVolunteer] = useState(false)
    const [openDonat, setOpneDonate] = useState(false)


    return (
        <section className="py-12 my-8 bg-gray-100 rounded-2xl">
            <div className="max-w-6xl mx-auto px-4 rounded-2xl">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
                    Get Involved in Our Mission
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Volunteer Card */}
                    <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold text-green-600 mb-2">
                                Become a Volunteer
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Join our passionate team and help deliver essential medical care to underserved communities.
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Make real impact on the ground</li>
                                <li>Flexible roles & time slots</li>
                                <li>Receive participation certificate</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setOpenVolunteer(true)}
                            className="btn btn-success mt-6 w-full text-white"
                        >
                            Be a Volunteer
                        </button>
                    </div>

                    {/* Donate Card */}
                    <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold text-purple-600 mb-2">
                                Support With a Donation
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Help us organize health camps by donating money or medical supplies.
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Transparent & secure donation</li>
                                <li>Support rural healthcare outreach</li>
                                <li>One-time or recurring options</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setOpneDonate(true)}
                            className="btn btn-primary mt-6 w-full"
                        >
                            Donate Now
                        </button>
                    </div>
                </div>
            </div>
            {
                openVolunteer &&
                <BeVolunteer
                    onClose={() => setOpenVolunteer(false)}
                ></BeVolunteer>
            }

            {
                openDonat &&
                <DonateForm
                    onClose={() => setOpneDonate(false)}
                ></DonateForm>
            }
        </section>
    );
}
