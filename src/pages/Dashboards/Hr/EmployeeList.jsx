import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["hr-employees", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/hr/${user.email}/employees`);
      return res.data;
    },
  });

  const handleRemove = async (email) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this employee from your team?"
    );
    if (!confirm) return;

    try {
      await axiosPublic.patch("/hr/remove-employee", {
        employeeEmail: email,
      });
      toast.success("Employee removed");
      refetch();
    } catch {
      toast.error("Failed to remove employee");
    }
  };

  if (isLoading) return <p>Loading employees...</p>;

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">My Employees</h2>

      {/* COUNT */}
      <p className="mb-4 text-sm text-gray-500">
        {employees.length}/{user?.packageLimit || 0} employees used
      </p>

      {employees.length === 0 ? (
        <p>No employees yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Photo</th>
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
                  <td>
                    <img
                      src={emp.photo || "https://i.ibb.co/0jYtM7B/user.png"}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>
                    {emp.joinDate
                      ? new Date(emp.joinDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{emp.assetsCount}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(emp.email)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
                    </button>
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

export default EmployeeList;
