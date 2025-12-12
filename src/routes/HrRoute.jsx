import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const HrRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxios();
  const location = useLocation();

  const {
    data: role,
    isLoading: roleLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email, //
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);

      if (!res.data?.role) {
        throw new Error("Role not found");
      }

      return res.data.role;
    },
  });

  if (loading) {
    return <div className="text-center mt-20">Checking auth...</div>;
  }
  if (!user?.email) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (roleLoading) {
    return <div className="text-center mt-20">Checking role...</div>;
  }
  if (isError) {
    console.error("Role fetch error:", error);
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to verify role. Please contact support.
      </div>
    );
  }

  if (role !== "hr") {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default HrRoute;
