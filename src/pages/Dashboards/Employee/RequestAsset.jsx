import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const LIMIT = 10;

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 🔥 Fetch paginated assets
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["availableAssets", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets/available?page=${page}&limit=${LIMIT}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const assets = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // 🔥 Submit request
  const handleSubmitRequest = async () => {
    if (!note.trim()) {
      toast.error("Please add a note");
      return;
    }

    try {
      setSubmitting(true);

      await axiosSecure.post("/asset-requests", {
        assetId: selectedAsset._id,
        employeeEmail: user.email,
        note,
      });

      toast.success("Asset request submitted");
      setSelectedAsset(null);
      setNote("");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    } finally {
      setSubmitting(false);
    }
  };

  const goToPage = (p) => {
    setSearchParams({ page: p });
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading assets...</p>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Request an Asset</h2>

      {assets.length === 0 ? (
        <p className="text-gray-500">No assets available right now.</p>
      ) : (
        <>
          {/* ASSET GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <div key={asset._id} className="card bg-base-100 shadow">
                <figure>
                  <img
                    src={asset.image}
                    alt={asset.assetName}
                    className="h-48 w-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h3 className="card-title">{asset.assetName}</h3>
                  <p>
                    <strong>Type:</strong> {asset.assetType}
                  </p>
                  <p>
                    <strong>Available:</strong> {asset.quantity}
                  </p>

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={asset.quantity <= 0}
                      onClick={() => setSelectedAsset(asset)}
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🔢 PAGINATION */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((n) => {
              const p = n + 1;
              return (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`btn btn-sm ${
                    page === p ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* REQUEST MODAL */}
      {selectedAsset && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Request: {selectedAsset.assetName}
            </h3>

            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Add a note"
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
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={handleSubmitRequest}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RequestAsset;
