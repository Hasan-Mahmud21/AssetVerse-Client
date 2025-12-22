import { Link } from "react-router";
import {
  FaBoxOpen,
  FaClipboardList,
  FaUser,
  FaArrowRight,
  FaRocket,
  FaHandsHelping,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Personal Workspace
          </h1>
          <p className="text-slate-500 font-medium">
            Tracking your active inventory and service requests.
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
          <FaRocket className="animate-pulse" /> Status: Active Member
        </div>
      </div>

      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-800">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ""} 👋
          </h2>
          <p className="text-slate-500 mt-2 max-w-md">
            Manage your assigned assets, track pending requests, and keep your
            professional profile up to date.
          </p>
        </div>
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl -mr-16 -mt-16 rounded-full"></div>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <EmployeeActionCard
          icon={<FaBoxOpen />}
          title="My Assets"
          link="/employee/my-assets"
          gradient="from-blue-600 to-blue-400"
          description="View your assigned items"
        />
        <EmployeeActionCard
          icon={<FaClipboardList />}
          title="Request Asset"
          link="/employee/request-asset"
          gradient="from-amber-500 to-orange-400"
          description="Apply for new inventory"
        />
        <EmployeeActionCard
          icon={<FaUser />}
          title="My Profile"
          link="/employee/profile"
          gradient="from-indigo-600 to-indigo-400"
          description="Manage account details"
        />
      </div>

      {/* QUICK HELP / INFO SECTION */}
      <div className="relative overflow-hidden bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
        <div className="relative z-10 md:flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 text-2xl border border-white/10">
              <FaHandsHelping />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">
                Need a specialized asset?
              </h2>
              <p className="text-slate-400 text-sm max-w-md">
                If you can't find what you need in the catalog, submit a custom
                request for company-approved hardware.
              </p>
            </div>
          </div>
          <Link
            to="/employee/request-asset"
            className="mt-6 md:mt-0 btn border-none bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 transition-all hover:gap-3"
          >
            Start Request <FaArrowRight size={14} />
          </Link>
        </div>
        {/* Glow effect */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] -ml-32 -mb-32 rounded-full"></div>
      </div>
    </div>
  );
};

const EmployeeActionCard = ({ icon, title, link, gradient, description }) => (
  <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
    <div
      className={`w-14 h-14 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white text-2xl shadow-lg mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3`}
    >
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-slate-400 font-medium mb-4">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center gap-2 text-blue-600 text-xs font-bold hover:gap-3 transition-all"
      >
        Open View <FaArrowRight size={10} />
      </Link>
    </div>
  </div>
);

export default EmployeeDashboard;
