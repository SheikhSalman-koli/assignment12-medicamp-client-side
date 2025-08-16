import { useState } from "react";
import LearnMoreModal from "./LearnMoreModal";

export default function AboutSection() {

    const [openModal, setOpenModal] = useState(false)

    const handleModal =()=>{
        setOpenModal(true)
    }


  return (
    <section className="bg-gray-50 py-16" id="about">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb"
              alt="About Us"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Right: Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About Us
            </h2>
            {/* <p className="text-gray-600 leading-relaxed mb-6">
              We are a community-driven platform dedicated to making a positive
              impact through volunteering and donations. Our mission is to
              connect people with meaningful causes, empower communities, and
              inspire generosity.  
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Whether it’s supporting local campaigns, helping during crises, or
              building a sustainable future, we believe every small action
              counts towards a big change. Together, we can create a better
              tomorrow.
            </p> */}
            <p className="text-gray-600 leading-relaxed mb-6">MediCamp is a professional medical camp designed to bring quality healthcare directly to communities. Our mission is to provide comprehensive medical checkups, specialist consultations, and health awareness sessions in a convenient and organized manner.</p>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
            onClick={handleModal}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      {
      openModal && 
      <LearnMoreModal 
      onClose={()=> setOpenModal(false)}
      />
      }
    </section>
  );
}
