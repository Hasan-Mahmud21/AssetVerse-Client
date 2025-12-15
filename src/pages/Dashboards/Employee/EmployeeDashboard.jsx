import { Link } from "react-router";
import { FaBoxOpen, FaClipboardList, FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

      {/* WELCOME CARD */}
      <div className="bg-base-100 p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold">
          Welcome{user?.displayName ? `, ${user.displayName}` : ""} 👋
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your assets and requests from here.
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Assets */}
        <div className="bg-base-100 p-6 rounded-xl shadow flex items-center gap-4">
          <FaBoxOpen className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">My Assets</h3>
            <Link
              to="/employee/my-assets"
              className="text-primary underline text-sm"
            >
              View Assigned Assets
            </Link>
          </div>
        </div>

        {/* Request Asset */}
        <div className="bg-base-100 p-6 rounded-xl shadow flex items-center gap-4">
          <FaClipboardList className="text-4xl text-warning" />
          <div>
            <h3 className="text-lg font-semibold">Request Asset</h3>
            <Link
              to="/employee/request-asset"
              className="text-primary underline text-sm"
            >
              Request New Asset
            </Link>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-base-100 p-6 rounded-xl shadow flex items-center gap-4">
          <FaUser className="text-4xl text-info" />
          <div>
            <h3 className="text-lg font-semibold">My Profile</h3>
            <Link
              to="/employee/profile"
              className="text-primary underline text-sm"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="mt-10 bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Need an asset?</h2>
        <p className="text-gray-500">
          You can request company-approved assets and track their approval
          status directly from your dashboard.
        </p>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
