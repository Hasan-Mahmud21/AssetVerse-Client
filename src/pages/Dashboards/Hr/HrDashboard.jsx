import { Link } from "react-router";
import { FaBox, FaClipboardList, FaUsers, FaPlus } from "react-icons/fa";

const HrDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">HR Dashboard</h1>

      {/* STAT / ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Assets */}
        <div className="bg-base-100 p-6 rounded-xl shadow flex items-center gap-4">
          <FaBox className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Assets</h3>
            <Link to="/hr/dashboard" className="text-primary underline text-sm">
              View Assets
            </Link>
          </div>
        </div>

        {/* Add Asset */}
        <div className="bg-base-100 p-6 rounded-xl shadow flex items-center gap-4">
          <FaPlus className="text-4xl text-secondary" />
          <div>
            <h3 className="text-lg font-semibold">Add Asset</h3>
            <Link to="/hr/add-asset" className="text-primary underline text-sm">
              Add New Asset
            </Link>
          </div>
        </div>

        {/* Requests */}
        <div className="bg-base-100 p-6 rounded-xl shadow flex items-center gap-4">
          <FaClipboardList className="text-4xl text-warning" />
          <div>
            <h3 className="text-lg font-semibold">Asset Requests</h3>
            <Link to="/hr/requests" className="text-primary underline text-sm">
              View Requests
            </Link>
          </div>
        </div>

        {/* Employees */}
        <div className="bg-base-100 p-6 rounded-xl shadow flex items-center gap-4">
          <FaUsers className="text-4xl text-info" />
          <div>
            <h3 className="text-lg font-semibold">Employees</h3>
            <Link to="/hr/employees" className="text-primary underline text-sm">
              Manage Team
            </Link>
          </div>
        </div>
      </div>

      {/* WELCOME MESSAGE */}
      <div className="mt-10 bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Welcome to AssetVerse 🎉</h2>
        <p className="text-gray-500">
          From here you can manage company assets, approve employee requests,
          and monitor your team efficiently.
        </p>
      </div>
    </div>
  );
};

export default HrDashboard;
