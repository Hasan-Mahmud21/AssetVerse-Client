import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["asset-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset-requests/hr/${user.email}`);
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/asset-requests/approve/${id}`);

      if (res.data.success) {
        toast.success("Request approved");
        refetch();
      }
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/asset-requests/reject/${id}`);

      if (res.data.success) {
        toast.success("Request rejected");
        refetch();
      }
    } catch {
      toast.error("Rejection failed");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading requests...</div>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">All Asset Requests</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.employeeEmail}</td>
                <td>{req.assetName}</td>
                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "badge-warning"
                        : req.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                <td className="flex gap-2">
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
