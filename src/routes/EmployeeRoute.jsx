import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxios();
  const location = useLocation();

  // 🔑 ALWAYS call hooks at top level
  const {
    data: role,
    isLoading: roleLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);

      if (!res.data?.role) {
        throw new Error("Role not found in user data");
      }

      return res.data.role; // "employee"
    },
  });

  // ⏳ Wait for Firebase auth
  if (loading) {
    return <div className="text-center mt-20">Checking auth...</div>;
  }

  // 🚫 Not logged in → login page
  if (!user?.email) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // ⏳ Wait for role check
  if (roleLoading) {
    return <div className="text-center mt-20">Checking permissions...</div>;
  }

  // ❌ Role fetch failed
  if (isError) {
    console.error("Employee role fetch error:", error);
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to verify employee role.
      </div>
    );
  }

  // ❌ Not employee
  if (role !== "employee") {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // ✅ Authorized employee
  return children;
};

export default EmployeeRoute;
