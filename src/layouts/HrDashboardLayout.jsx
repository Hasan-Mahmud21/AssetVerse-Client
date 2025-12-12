import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
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

  const handleLogout = async () => {
    await logOutUser();
  };

  return (
    <div className="drawer drawer-mobile min-h-screen bg-base-200">
      {/* Drawer Toggle Button (Mobile Only) */}
      <input
        id="hr-dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* Topbar */}
        <div className="p-4 bg-base-100 shadow flex items-center justify-between">
          {/* Mobile Sidebar Toggle */}
          <label
            htmlFor="hr-dashboard-drawer"
            className="btn btn-ghost md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars size={22} />
          </label>

          <h2 className="text-xl font-bold">HR Dashboard</h2>

          {/* Profile Section */}
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
        ></label>

        <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content shadow-xl">
          <h3 className="text-lg font-bold mb-3 text-primary">HR Navigation</h3>

          <li>
            <NavLink to="/hr/dashboard">
              <FaChartPie className="text-primary" /> Dashboard Overview
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/add-asset">
              <FaPlus className="text-primary" /> Add Asset
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/assets">
              <FaListAlt className="text-primary" /> Asset List
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/requests">
              <FaClipboardList className="text-primary" /> All Requests
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/employees">
              <FaUsers className="text-primary" /> Employee List
            </NavLink>
          </li>

          <li>
            <NavLink to="/hr/profile">
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

export default HrDashboardLayout;
