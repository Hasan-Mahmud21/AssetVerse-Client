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
    queryKey: ["assetRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset-requests/hr/${user.email}`);
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/asset-requests/approve/${id}`);
      toast.success("Request approved");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/asset-requests/reject/${id}`);
      toast.success("Request rejected");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Rejection failed");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading requests...</div>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">All Asset Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">No asset requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Company</th>
                <th>Note</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.employeeEmail}</td>
                  <td className="font-semibold">{req.assetName}</td>
                  <td>{req.assetType}</td>
                  <td>{req.companyName}</td>
                  <td className="max-w-xs truncate">{req.note}</td>
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

                  <td className="text-center">
                    {req.status === "pending" ? (
                      <div className="flex gap-2 justify-center">
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
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
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

export default AllRequests;
