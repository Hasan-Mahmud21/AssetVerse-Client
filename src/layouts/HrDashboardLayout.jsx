import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FaBars,
  FaPlus,
  FaListAlt,
  FaUsers,
  FaClipboardList,
  FaUserCircle,
  FaChartPie,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo/Logo"; // Optional: Use your new Logo component

const HrDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutUser();
    navigate("/auth/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-slate-50">
      <input
        id="hr-dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />

      {/* MAIN CONTENT AREA */}
      <div className="drawer-content flex flex-col">
        {/* REFINED TOP BAR */}
        <header className="sticky top-0 z-30 flex h-18 w-full items-center justify-between bg-white/80 px-4 shadow-sm backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-4">
            <label
              htmlFor="hr-dashboard-drawer"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <FaBars size={20} className="text-slate-600" />
            </label>
            <h2 className="text-lg font-bold tracking-tight text-slate-800 lg:text-xl">
              HR Management{" "}
              <span className="hidden sm:inline text-blue-600 text-sm font-medium ml-2">
                / Overview
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none">
                {user?.displayName || "HR Manager"}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">
                Admin Access
              </p>
            </div>
            <div className="avatar ring-2 ring-blue-100 rounded-full p-0.5 shadow-sm">
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL || "https://i.ibb.co/0jYtM7B/user.png"}
                  alt="User Profile"
                />
              </div>
            </div>
          </div>
        </header>

        {/* PAGE INJECTION */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <div className="drawer-side z-40">
        <label
          htmlFor="hr-dashboard-drawer"
          className="drawer-overlay"
          onClick={() => setIsOpen(false)}
        />

        <aside className="flex h-full w-72 flex-col bg-white border-r border-slate-100">
          {/* Sidebar Header */}
          <div className="flex h-18 items-center px-6 border-b border-slate-50">
            <Logo /> {/* Replace with your Logo component or text */}
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
              Main Menu
            </p>

            <ul className="space-y-2 font-medium">
              <li>
                <NavLink to="/hr/dashboard" className={navLinkClass}>
                  <span className="flex items-center gap-3">
                    <FaChartPie /> Dashboard
                  </span>
                  <FaChevronRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              </li>

              <li>
                <NavLink to="/hr/add-asset" className={navLinkClass}>
                  <span className="flex items-center gap-3">
                    <FaPlus /> Add Asset
                  </span>
                  <FaChevronRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              </li>

              <li>
                <NavLink to="/hr/assets" className={navLinkClass}>
                  <span className="flex items-center gap-3">
                    <FaListAlt /> Asset List
                  </span>
                  <FaChevronRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              </li>

              <li>
                <NavLink to="/hr/requests" className={navLinkClass}>
                  <span className="flex items-center gap-3">
                    <FaClipboardList /> All Requests
                  </span>
                  <FaChevronRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              </li>

              <li>
                <NavLink to="/hr/employees" className={navLinkClass}>
                  <span className="flex items-center gap-3">
                    <FaUsers /> Employees
                  </span>
                  <FaChevronRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              </li>
             

              <div className="pt-4 mt-4 border-t border-slate-50">
                <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  Settings
                </p>
                <li>
                  <NavLink to="/hr/upgrade" className={navLinkClass}>
                    <span className="flex items-center gap-3">
                      <FaUserCircle /> Upgrade Plan
                    </span>
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>

          {/* SIDEBAR FOOTER / LOGOUT */}
          <div className="p-4 border-t border-slate-50">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HrDashboardLayout;
