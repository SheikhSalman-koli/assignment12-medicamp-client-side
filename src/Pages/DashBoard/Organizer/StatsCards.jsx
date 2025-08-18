import { FaUsers, FaMoneyBillWave, FaCheckCircle, FaClinicMedical } from "react-icons/fa";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {/* Camps */}
      <div className="flex items-center p-6 bg-white rounded-2xl shadow-md">
        <div className="p-3 bg-red-100 rounded-full">
          <FaClinicMedical className="text-red-600 text-2xl" />
        </div>
        <div className="ml-4">
          <h4 className="text-2xl font-bold">{stats.totalCamps}</h4>
          <p className="text-gray-600">Camps</p>
        </div>
      </div>

      {/* Total Registrations */}
      <div className="flex items-center p-6 bg-white rounded-2xl shadow-md">
        <div className="p-3 bg-blue-100 rounded-full">
          <FaUsers className="text-blue-600 text-2xl" />
        </div>
        <div className="ml-4">
          <h4 className="text-2xl font-bold">{stats.totalRegistrations}</h4>
          <p className="text-gray-600">Total Registrations</p>
        </div>
      </div>

      {/* Paid Registrations */}
      <div className="flex items-center p-6 bg-white rounded-2xl shadow-md">
        <div className="p-3 bg-green-100 rounded-full">
          <FaMoneyBillWave className="text-green-600 text-2xl" />
        </div>
        <div className="ml-4">
          <h4 className="text-2xl font-bold">{stats.paidRegistrations}</h4>
          <p className="text-gray-600">Paid</p>
        </div>
      </div>

      {/* Confirmed Registrations */}
      <div className="flex items-center p-6 bg-white rounded-2xl shadow-md">
        <div className="p-3 bg-purple-100 rounded-full">
          <FaCheckCircle className="text-purple-600 text-2xl" />
        </div>
        <div className="ml-4">
          <h4 className="text-2xl font-bold">{stats.confirmedRegistrations}</h4>
          <p className="text-gray-600">Confirmed</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
