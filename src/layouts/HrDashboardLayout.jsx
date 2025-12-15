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
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const HrDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutUser();
    navigate("/auth/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "bg-primary text-white font-semibold" : "hover:bg-base-200";

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      {/* Drawer Toggle */}
      <input
        id="hr-dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* TOP BAR */}
        <div className="p-4 bg-base-100 shadow flex items-center justify-between">
          <label
            htmlFor="hr-dashboard-drawer"
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars size={22} />
          </label>

          <h2 className="text-xl font-bold">HR Dashboard</h2>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <span className="font-semibold hidden sm:block">
              {user?.displayName || "HR Manager"}
            </span>
            <img
              src={user?.photoURL || "https://i.ibb.co/0jYtM7B/user.png"}
              alt="User"
              className="w-10 h-10 rounded-full border shadow-sm"
            />
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label
          htmlFor="hr-dashboard-drawer"
          className="drawer-overlay"
          onClick={() => setIsOpen(false)}
        />

        <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content shadow-xl">
          <h3 className="text-lg font-bold mb-3 text-primary">HR Navigation</h3>

          <li>
            <NavLink to="/hr/dashboard" className={navLinkClass}>
              <FaChartPie /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/add-asset" className={navLinkClass}>
              <FaPlus /> Add Asset
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/assets" className={navLinkClass}>
              <FaListAlt /> Asset List
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/requests" className={navLinkClass}>
              <FaClipboardList /> All Requests
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/employees" className={navLinkClass}>
              <FaUsers /> Employees
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/profile" className={navLinkClass}>
              <FaUserCircle /> Profile
            </NavLink>
          </li>

          {/* LOGOUT */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:bg-red-50 p-2 rounded"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HrDashboardLayout;
