import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["hr-employees", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/hr/${user.email}/employees`
      );
      return res.data;
    },
  });

  const handleRemove = async (email) => {
    const confirm = window.confirm(
      "Remove this employee from your team?"
    );
    if (!confirm) return;

    try {
      const res = await axiosSecure.patch("/hr/remove-employee", {
        employeeEmail: email,
      });

      if (res.data.success) {
        toast.success("Employee removed");
        refetch();
      }
    } catch {
      toast.error("Failed to remove employee");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading employees...</div>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">My Employees</h2>

      <p className="mb-4 text-gray-500">
        {employees.length} employees in your team
      </p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Assets</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name || "N/A"}</td>
                <td>{emp.email}</td>
                <td>
                  {emp.createdAt
                    ? new Date(emp.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td>{emp.assignedAssets?.length || 0}</td>
                <td>
                  <button
                    onClick={() => handleRemove(emp.email)}
                    className="btn btn-xs btn-error"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
