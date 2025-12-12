import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch assets using TanStack Query
  const {
    data: assets = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["assets", user?.email],
    enabled: !!user?.email, // important!
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?hrEmail=${user.email}`);
      return res.data.assets;
    },
  });

  // Delete asset
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this asset?"
    );
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/assets/${id}`);
      if (res.data.success) {
        toast.success("Asset deleted");
        refetch(); // 🔥 auto refresh list
      }
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  // Client-side search
  const filteredAssets = assets.filter(
    (asset) =>
      asset.assetName.toLowerCase().includes(search.toLowerCase()) ||
      asset.assetType.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center mt-10">Loading assets...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load assets
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Asset List</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search assets..."
        className="input input-bordered w-full max-w-sm mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No assets found
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset._id}>
                  <td>
                    <img
                      src={asset.image}
                      alt={asset.assetName}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetType}</td>
                  <td>{asset.quantity}</td>
                  <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-xs btn-outline" disabled>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
