import { Link, useLocation } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaBox, FaClipboardList, FaUsers, FaPlus } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#2563eb", "#f97316"];

const HrDashboard = () => {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  // Show login success toast
  useEffect(() => {
    if (location.state?.loggedIn) {
      toast.success("Login Successful!");
    }
  }, [location.state]);

  // Pie Chart Data
  const { data: returnableData = [], isLoading: pieLoading } = useQuery({
    queryKey: ["returnable-vs-non"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/returnable-vs-non");
      return res.data;
    },
  });

  // Bar Chart Data
  const { data: topAssets = [], isLoading: barLoading } = useQuery({
    queryKey: ["top-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/top-requested-assets");
      return res.data;
    },
  });

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">HR Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={<FaBox />}
          title="Assets"
          link="/hr/assets"
          color="text-primary"
        />
        <DashboardCard
          icon={<FaPlus />}
          title="Add Asset"
          link="/hr/add-asset"
          color="text-secondary"
        />
        <DashboardCard
          icon={<FaClipboardList />}
          title="Requests"
          link="/hr/requests"
          color="text-warning"
        />
        <DashboardCard
          icon={<FaUsers />}
          title="Employees"
          link="/hr/employees"
          color="text-info"
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PIE CHART */}
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Asset Distribution (Returnable vs Non-returnable)
          </h2>

          {pieLoading ? (
            <p className="text-center text-gray-400">Loading chart...</p>
          ) : returnableData.length === 0 ? (
            <p className="text-center text-gray-400">No data available</p>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={returnableData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    label
                  >
                    {returnableData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* BAR CHART */}
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Top 5 Most Requested Assets
          </h2>

          {barLoading ? (
            <p className="text-center text-gray-400">Loading chart...</p>
          ) : topAssets.length === 0 ? (
            <p className="text-center text-gray-400">
              No request data available
            </p>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topAssets}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="requests"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* WELCOME */}
      <div className="bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Welcome to AssetVerse 🎉</h2>
        <p className="text-gray-500">
          Manage assets, approve requests, analyze usage, and monitor your team
          — all in one place.
        </p>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, link, color }) => (
  <div className="bg-base-100 p-6 rounded-xl shadow flex items-center gap-4">
    <div className={`text-4xl ${color}`}>{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <Link to={link} className="text-primary underline text-sm">
        View
      </Link>
    </div>
  </div>
);

export default HrDashboard;
