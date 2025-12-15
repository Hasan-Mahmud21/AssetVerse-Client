import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FaBars,
  FaLaptop,
  FaUsers,
  FaClipboardCheck,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const EmployeeDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutUser();
    navigate("/auth/login");
  };

  const navClass = ({ isActive }) =>
    isActive ? "bg-primary text-white font-semibold" : "hover:bg-base-200";

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      {/* Drawer Toggle */}
      <input
        id="employee-dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* Top Bar */}
        <div className="p-4 bg-base-100 shadow flex items-center justify-between">
          <label
            htmlFor="employee-dashboard-drawer"
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars size={22} />
          </label>

          <h2 className="text-xl font-bold">Employee Dashboard</h2>

          <div className="flex items-center gap-2">
            <span className="font-semibold hidden sm:block">
              {user?.displayName || "Employee"}
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
          htmlFor="employee-dashboard-drawer"
          className="drawer-overlay"
          onClick={() => setIsOpen(false)}
        />

        <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content shadow-xl">
          <h3 className="text-lg font-bold mb-3 text-primary">
            Employee Navigation
          </h3>

          <li>
            <NavLink to="/employee/dashboard" className={navClass}>
              <FaLaptop /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/employee/my-assets" className={navClass}>
              <FaLaptop /> My Assets
            </NavLink>
          </li>

          <li>
            <NavLink to="/employee/my-team" className={navClass}>
              <FaUsers /> My Team
            </NavLink>
          </li>

          <li>
            <NavLink to="/employee/request-asset" className={navClass}>
              <FaClipboardCheck /> Request Asset
            </NavLink>
          </li>

          <li>
            <NavLink to="/employee/profile" className={navClass}>
              <FaUserCircle /> Profile
            </NavLink>
          </li>

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

export default EmployeeDashboardLayout;
