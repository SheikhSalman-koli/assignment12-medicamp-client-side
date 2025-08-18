import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import StatsCards from "./StatsCards";
import { FaChartBar } from "react-icons/fa";
import LoaderSpinner from "../../../Components/SharedComponents/LoaderSpinner";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

export default function OrganizerStats() {

  const axiosSecure = useAxiosSecure()

  const {
    data: stats,
    isLoading
  }
    = useQuery({
      queryKey: ['stats'],
      queryFn: async () => {
        const res = await axiosSecure.get('/stats')
        return res?.data
      }
    })

  // console.log(stats);

  if (isLoading) return <LoaderSpinner></LoaderSpinner>

  const data = [
    { name: "Total Registrations", value: stats?.totalRegistrations },
    { name: "Paid Registrations", value: stats?.paidRegistrations },
    { name: "Confirmed Registrations", value: stats?.confirmedRegistrations },
    { name: "Total Camps", value: stats?.totalCamps }
  ];

  return (
    <div className="p-6 pt-24 lg:pt-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3"><FaChartBar className="text-indigo-600 text-2xl" /> Organizer Stats</h2>

      <StatsCards
        stats={stats}
      />

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
