import { FaStethoscope, FaUserMd, FaPills, FaHeartbeat, FaSignInAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
     {
      id: 1,
      title: "Log In & Join",
      description:
        "First, create an account or log in and register to join the medical camp.",
      icon: <FaSignInAlt className="text-blue-600 w-10 h-10" />,
    },
    {
      id: 2,
      title: "Make Payment",
      description:
        "Complete the payment securely online to confirm your participation.",
      icon: <FaCreditCard className="text-blue-600 w-10 h-10" />,
    },
    {
      id: 3,
      title: "Admin Confirmation",
      description:
        "Once the admin verifies your payment, your registration is officially confirmed.",
      icon: <FaCheckCircle className="text-blue-600 w-10 h-10" />,
    },
    {
      id: 4,
      title: "Consult with Specialists",
      description:
        "Meet qualified doctors for general checkups and specialist consultations as needed.",
      icon: <FaUserMd className="text-blue-600 w-10 h-10" />,
    },
    {
      id: 5,
      title: "Receive Treatment & Medicines",
      description:
        "Get professional medical treatment and access to quality medicines prescribed by our doctors.",
      icon: <FaPills className="text-blue-600 w-10 h-10" />,
    },
    {
      id: 6,
      title: "Health Guidance & Follow-up",
      description:
        "Attend health education sessions and receive follow-up guidance to maintain wellness.",
      icon: <FaHeartbeat className="text-blue-600 w-10 h-10" />,
    },
  ];

  return (
    <section data-aos="fade-up" className="bg-base-100 py-16 rounded-2xl" id="how-it-works">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl text-[#F97A00] font-bold  text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-base-100 border-2 border-base-300 p-6 rounded-xl hover:shadow-lg transition text-center">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
