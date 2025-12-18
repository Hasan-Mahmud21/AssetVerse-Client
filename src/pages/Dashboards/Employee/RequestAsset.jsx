import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

import toast from "react-hot-toast";

const RequestAsset = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  // Fetch available assets
  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["availableAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets/available");
      return res.data;
    },
  });

  const handleSubmitRequest = async () => {
    if (!note.trim()) {
      toast.error("Please add a note");
      return;
    }

    try {
      await axiosSecure.post("/asset-requests", {
        assetId: selectedAsset._id,
        employeeEmail: user.email,
        note,
      });

      toast.success("Asset request submitted!");
      setSelectedAsset(null);
      setNote("");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    }
  };

  if (isLoading) return <p>Loading assets...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Request an Asset</h2>

      {/* ASSET GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset._id} className="card bg-base-100 shadow">
            <figure>
              <img
                src={asset.image}
                alt={asset.name}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{asset.name}</h3>
              <p>Type: {asset.type}</p>
              <p>Available: {asset.quantity}</p>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedAsset(asset)}
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* REQUEST MODAL */}
      {selectedAsset && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Request: {selectedAsset.name}</h3>

            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Add a note (why do you need this asset?)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSelectedAsset(null);
                  setNote("");
                }}
              >
                Cancel
              </button>

              <button className="btn btn-primary" onClick={handleSubmitRequest}>
                Submit Request
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RequestAsset;
