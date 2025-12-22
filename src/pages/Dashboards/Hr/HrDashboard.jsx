import { Link, useLocation } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  FaBox,
  FaClipboardList,
  FaUsers,
  FaPlus,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";
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

const COLORS = ["#3b82f6", "#f59e0b"];

const HrDashboard = () => {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (location.state?.loggedIn) {
      toast.success("Login Successful!");
    }
  }, [location.state]);

  const { data: returnableData = [], isLoading: pieLoading } = useQuery({
    queryKey: ["returnable-vs-non"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/returnable-vs-non");
      return res.data;
    },
  });

  const { data: topAssets = [], isLoading: barLoading } = useQuery({
    queryKey: ["top-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/top-requested-assets");
      return res.data;
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Executive Overview
          </h1>
          <p className="text-slate-500 font-medium">
            Monitoring asset lifecycle and team productivity.
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
          <FaChartLine /> Real-time Analytics Enabled
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={<FaBox />}
          title="Total Assets"
          link="/hr/assets"
          gradient="from-blue-600 to-blue-400"
          description="Manage inventory"
        />
        <DashboardCard
          icon={<FaPlus />}
          title="New Entry"
          link="/hr/add-asset"
          gradient="from-indigo-600 to-indigo-400"
          description="Register items"
        />
        <DashboardCard
          icon={<FaClipboardList />}
          title="Pending"
          link="/hr/requests"
          gradient="from-amber-500 to-orange-400"
          description="Review requests"
        />
        <DashboardCard
          icon={<FaUsers />}
          title="Team Size"
          link="/hr/employees"
          gradient="from-emerald-600 to-teal-400"
          description="Employee list"
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Asset Distribution
            </h2>
            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500 uppercase">
              Returnable Ratio
            </span>
          </div>

          {pieLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <span className="loading loading-ring loading-lg text-blue-600"></span>
            </div>
          ) : returnableData.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-slate-400 font-medium italic">
              No data detected
            </div>
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
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    stroke="none"
                  >
                    {returnableData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        cornerRadius={8}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Demand Ranking</h2>
            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500 uppercase">
              Top 5 Requested
            </span>
          </div>

          {barLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <span className="loading loading-ring loading-lg text-blue-600"></span>
            </div>
          ) : topAssets.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-slate-400 font-medium italic">
              No requests recorded
            </div>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topAssets}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="requests"
                    fill="#3b82f6"
                    radius={[10, 10, 10, 10]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER BANNER */}
      <div className="relative overflow-hidden bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
        <div className="relative z-10 md:flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome to AssetVerse Pro 🎉
            </h2>
            <p className="text-slate-400 max-w-md">
              Your end-to-end solution for corporate asset tracking. Start by
              reviewing pending requests or adding new inventory to the system.
            </p>
          </div>
          <Link
            to="/hr/requests"
            className="mt-6 md:mt-0 btn border-none bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6"
          >
            Review Requests <FaArrowRight size={14} />
          </Link>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, link, gradient, description }) => (
  <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
    <div
      className={`w-14 h-14 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white text-2xl shadow-lg mb-4 transition-transform group-hover:scale-110`}
    >
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-extrabold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-400 font-medium mb-4">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center gap-2 text-blue-600 text-xs font-bold hover:gap-3 transition-all"
      >
        Enter Module <FaArrowRight size={10} />
      </Link>
    </div>
  </div>
);

export default HrDashboard;
