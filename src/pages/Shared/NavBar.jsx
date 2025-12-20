import React from "react";
import Logo from "../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { user, logOutUser, role } = useAuth();

  const handleLogOut = () => {
    logOutUser().catch((err) => console.log(err));
  };

  // Standardized link styling
  const navActionClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  /* MATCHING ROUTER.JSX PATHS
   */

  const hrLinks = (
    <>
      <li>
        <Link to="/hr/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/hr/assets">Asset List</Link>
      </li>
      <li>
        <Link to="/hr/add-asset">Add Asset</Link>
      </li>
      <li>
        <Link to="/hr/requests">All Requests</Link>
      </li>
      <li>
        <Link to="/hr/employees">Employee List</Link>
      </li>
      <li>
        <Link to="/hr/upgrade">Upgrade Package</Link>
      </li>
    </>
  );

  const employeeLinks = (
    <>
      <li>
        <Link to="/employee/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/employee/my-assets">My Assets</Link>
      </li>
      <li>
        <Link to="/employee/my-team">My Team</Link>
      </li>
      <li>
        <Link to="/employee/request-asset">Request Asset</Link>
      </li>
      <li>
        <Link to="/employee/profile">My Profile</Link>
      </li>
    </>
  );

  // Helper to identify user type based on your Router logic
  const isHrManager = role === "hr-manager" || role === "hr";

  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="navbar max-w-7xl mx-auto px-4 min-h-[4.5rem]">
        {/* START: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden p-0 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white rounded-2xl w-64 gap-2 border border-slate-100"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {!user ? (
                <>
                  <li>
                    <NavLink to="/auth/emp-register">Join as Employee</NavLink>
                  </li>
                  <li>
                    <NavLink to="/auth/hr-register">Join as HR Manager</NavLink>
                  </li>
                </>
              ) : isHrManager ? (
                hrLinks
              ) : (
                employeeLinks
              )}
            </ul>
          </div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* CENTER: Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <NavLink to="/" className={navActionClass}>
              Home
            </NavLink>

            {user && (
              <NavLink
                to={isHrManager ? "/hr/dashboard" : "/employee/dashboard"}
                className={navActionClass}
              >
                Dashboard
              </NavLink>
            )}

            {!user && (
              <>
                <NavLink to="/auth/emp-register" className={navActionClass}>
                  Join as Employee
                </NavLink>
                <NavLink to="/auth/hr-register" className={navActionClass}>
                  Join as HR Manager
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* END: User Profile & Auth */}
        <div className="navbar-end gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
              >
                <div className="avatar">
                  <div className="w-9 rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-white">
                    <img
                      src={user?.photoURL || "https://i.pravatar.cc/100"}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-black text-slate-900 leading-none truncate w-20">
                    {user?.displayName?.split(" ")[0] || "User"}
                  </p>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-white rounded-2xl w-64 border border-slate-100 gap-1"
              >
                <li className="menu-title text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                  Account Management
                </li>

                {/* Dynamically show links based on HR or Employee role */}
                {isHrManager ? hrLinks : employeeLinks}

                <div className="divider my-1 opacity-50"></div>

                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-rose-500 hover:bg-rose-50 font-bold flex justify-between"
                  >
                    Sign Out
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="btn bg-slate-900 hover:bg-slate-800 text-white border-none px-8 rounded-xl font-bold transition-all shadow-lg active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
