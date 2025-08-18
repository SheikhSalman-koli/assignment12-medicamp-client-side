import { useState } from "react";
import { useNavigate } from "react-router";
import BeVolunteer from "./BeVolunteer";
import DonateForm from "./Donate";

export default function HomeActionSection() {

    const [openVolunteer, setOpenVolunteer] = useState(false)
    const [openDonat, setOpneDonate] = useState(false)


    return (
        <section data-aos="fade-up" id="action" className="py-12  bg-base-100 rounded-2xl">
            <div className="max-w-6xl mx-auto px-4 rounded-2xl">
                <h2 className="text-3xl text-[#F97A00] font-bold  text-center mb-10">
                    Get Involved in Our Mission
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Volunteer Card */}
                    <div className="bg-base-100 rounded-xl border-2 border-base-300 p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl text-[#F97A00]   font-semibold mb-2">
                                Become a Volunteer
                            </h3>
                            <p className="text-base-content mb-4">
                                Join our passionate team and help deliver essential medical care to underserved communities.
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                                <li>Make real impact on the ground</li>
                                <li>Flexible roles & time slots</li>
                                <li>Receive participation certificate</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setOpenVolunteer(true)}
                            className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition  mt-6"
                        >
                            Be a Volunteer
                        </button>
                    </div>

                    {/* Donate Card */}
                    <div className="bg-base-100  border-2 border-base-300 rounded-xl p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold text-[#F97A00] mb-2">
                                Support With a Donation
                            </h3>
                            <p className="text-base-content mb-4">
                                Help us organize health camps by donating money or medical supplies.
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                                <li>Transparent & secure donation</li>
                                <li>Support rural healthcare outreach</li>
                                <li>One-time or recurring options</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setOpneDonate(true)}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full mt-6"
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
