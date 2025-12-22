import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-assets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee/assets/${user.email}`);
      return res.data;
    },
  });

  const handleReturn = async (id) => {
    try {
      await axiosSecure.patch(`/employee/return-asset/${id}`);
      toast.success("Asset returned successfully");
      refetch();
    } catch {
      toast.error("Failed to return asset");
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.assetName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = filterType ? asset.assetType === filterType : true;

    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading assets...</p>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">My Assets</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by asset name"
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>

        <button onClick={() => window.print()} className="btn btn-outline">
          Print
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Company</th>
              <th>Requested</th>
              <th>Approved</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset._id}>
                <td>
                  <img
                    src={asset.image}
                    alt={asset.assetName}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{asset.companyName}</td>
                <td>{new Date(asset.requestDate).toLocaleDateString()}</td>
                <td>
                  {asset.approvedDate
                    ? new Date(asset.approvedDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <span className="badge badge-info">{asset.status}</span>
                </td>
                <td>
                  {asset.status === "approved" &&
                    asset.assetType === "Returnable" && (
                      <button
                        onClick={() => handleReturn(asset._id)}
                        className="btn btn-xs btn-warning"
                      >
                        Return
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAssets.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No assets found</p>
        )}
      </div>
    </div>
  );
};

export default MyAssets;
