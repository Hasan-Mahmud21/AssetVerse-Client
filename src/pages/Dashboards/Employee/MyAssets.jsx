import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaPrint, FaUndo } from "react-icons/fa";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["my-assets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees/${user.email}/assets`);
      return res.data;
    },
  });

  /* 🔍 SEARCH + FILTER */
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = asset.assetName
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        filterType === "all" || asset.assetType === filterType;

      return matchesSearch && matchesType;
    });
  }, [assets, search, filterType]);

  const handlePrint = () => {
    window.print();
  };

  const handleReturn = (assetId) => {
    // optional future feature
    alert("Return request feature (optional)");
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading assets...</div>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow print:bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">My Assets</h2>

        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="btn btn-outline btn-sm flex items-center gap-1"
          >
            <FaPrint /> Print
          </button>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by asset name"
          className="input input-bordered w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* TABLE */}
      {filteredAssets.length === 0 ? (
        <p className="text-gray-500">No assets found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th className="print:hidden">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={
                        asset.assetImage || "https://i.ibb.co/0jYtM7B/user.png"
                      }
                      alt="asset"
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td>{asset.assetName}</td>
                  <td className="capitalize">{asset.assetType}</td>
                  <td>{asset.companyName || "—"}</td>
                  <td>
                    {asset.requestDate
                      ? new Date(asset.requestDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    {asset.approvedDate
                      ? new Date(asset.approvedDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        asset.status === "approved"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>

                  {/* RETURN BUTTON */}
                  <td className="print:hidden">
                    {asset.status === "approved" &&
                      asset.assetType === "returnable" && (
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => handleReturn(asset.assetId)}
                        >
                          <FaUndo /> Return
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAssets;
