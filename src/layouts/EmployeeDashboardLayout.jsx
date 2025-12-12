import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
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

  const handleLogout = async () => {
    await logOutUser();
  };

  return (
    <div className="drawer drawer-mobile min-h-screen bg-base-200">
      {/* Drawer Toggle for Small Screens */}
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
          {/* Mobile Nav Toggle */}
          <label
            htmlFor="employee-dashboard-drawer"
            className="btn btn-ghost md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars size={22} />
          </label>

          <h2 className="text-xl font-bold">Employee Dashboard</h2>

          {/* User Profile */}
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

        {/* DYNAMIC PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <div className="drawer-side">
        <label
          htmlFor="employee-dashboard-drawer"
          className="drawer-overlay"
          onClick={() => setIsOpen(false)}
        ></label>

        <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content shadow-xl">
          <h3 className="text-lg font-bold mb-3 text-primary">
            Employee Navigation
          </h3>

          <li>
            <NavLink to="/employee/dashboard">
              <FaLaptop className="text-primary" /> My Assets
            </NavLink>
          </li>

          <li>
            <NavLink to="/employee/team">
              <FaUsers className="text-primary" /> My Team
            </NavLink>
          </li>

          <li>
            <NavLink to="/employee/request-asset">
              <FaClipboardCheck className="text-primary" /> Request Asset
            </NavLink>
          </li>

          <li>
            <NavLink to="/employee/profile">
              <FaUserCircle className="text-primary" /> Profile
            </NavLink>
          </li>

          <li onClick={handleLogout}>
            <NavLink to="/auth/login">
              <FaSignOutAlt className="text-red-500" /> Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDashboardLayout;
