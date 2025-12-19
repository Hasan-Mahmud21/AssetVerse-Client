import Logo from "../../components/Logo/Logo";
import { Link, NavLink } from "react-router"; // Using 'react-router' as per your router file
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { user, logOutUser, role } = useAuth();

  const handleLogOut = () => {
    logOutUser().catch((error) => console.log(error));
  };

  // Helper for active link styling
  const navActionClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  // Public Links (Visible when logged out)
  const publicLinks = (
    <>
      <NavLink to="/" className={navActionClass}>
        Home
      </NavLink>
      <NavLink to="/auth/emp-register" className={navActionClass}>
        Join as Employee
      </NavLink>
      <NavLink to="/auth/hr-register" className={navActionClass}>
        Join as HR Manager
      </NavLink>
    </>
  );

  // Employee Specific Links (Based on your router paths)
  const employeeLinks = (
    <>
      <li>
        <Link to="/employee/my-assets">My Assets</Link>
      </li>
      <li>
        <Link to="/employee/my-team">My Team</Link>
      </li>
      <li>
        <Link to="/employee/request-asset">Request Asset</Link>
      </li>
    </>
  );

  // HR Manager Specific Links (Based on your router paths)
  const hrManagerLinks = (
    <>
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
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="navbar max-w-7xl mx-auto px-4 min-h-18">
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-slate-600"
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
              {publicLinks}
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 group transition-transform active:scale-95"
          >
            <Logo />
            {/* <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">
              AssetVerse
            </span> */}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <NavLink to="/" className={navActionClass}>
              Home
            </NavLink>
            {/* Show Dashboard link if logged in, otherwise show registration links */}
            {user ? (
              <NavLink
                to={
                  role === "hr-manager"
                    ? "/hr/dashboard"
                    : "/employee/dashboard"
                }
                className={navActionClass}
              >
                Dashboard
              </NavLink>
            ) : (
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

        {/* Auth End Section */}
        <div className="navbar-end gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="group flex items-center gap-3 p-1 pr-4 rounded-full bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all"
              >
                <div className="avatar">
                  <div className="w-10 rounded-full ring-2 ring-white shadow-sm overflow-hidden bg-slate-200">
                    <img
                      src={user?.photoURL || "https://i.pravatar.cc/100"}
                      alt="profile"
                    />
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-black text-slate-900 leading-none mb-1">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">
                    {role === "hr-manager" ? "HR Manager" : "Employee"}
                  </p>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-4 z-[1] p-3 shadow-2xl menu dropdown-content bg-white rounded-2xl w-64 border border-slate-100 gap-1 font-bold text-slate-600"
              >
                <li className="menu-title text-[10px] uppercase tracking-widest text-slate-400 mb-2">
                  Management
                </li>

                {/* Dynamically Render Links based on Router structure */}
                {role === "hr-manager" ? hrManagerLinks : employeeLinks}

                <div className="divider my-1 opacity-50"></div>

                {/* Profile link mapping */}
                <li>
                  <Link
                    to={
                      role === "hr-manager"
                        ? "/hr/profile"
                        : "/employee/profile"
                    }
                  >
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                  >
                    Sign Out
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
