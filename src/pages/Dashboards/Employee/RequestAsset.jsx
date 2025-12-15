import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch available assets
  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["available-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets/available");
      return res.data;
    },
  });
  const handleRequest = async (asset) => {
    try {
      const requestData = {
        assetId: asset._id,
        assetName: asset.assetName,
        employeeEmail: user.email,
        hrEmail: asset.hrEmail,
      };

      const res = await axiosSecure.post("/asset-requests", requestData);

      if (res.data.success) {
        toast.success("Asset request sent!");
        refetch(); // refresh asset list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to request asset");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading assets...</div>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Request Asset</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td>
                  <img
                    src={asset.image}
                    alt={asset.assetName}
                    className="w-12 h-12 rounded"
                  />
                </td>

                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{asset.quantity}</td>

                {/* 🔥 ACTION BUTTON GOES HERE */}
                <td>
                  <button
                    onClick={() => handleRequest(asset)}
                    className="btn btn-xs btn-primary"
                  >
                    Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAsset;
