import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["my-assets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees/${user.email}/assets`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading assets...</div>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">My Assets</h2>

      {assets.length === 0 ? (
        <p className="text-gray-500">No assets assigned yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Assigned Date</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.assetName}</td>
                  <td>{new Date(asset.assignedDate).toLocaleDateString()}</td>
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
