import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxios();
  const [role, setRole] = useState(null);
  const location = useLocation();
  console.log("location", location);

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/${user.email}`).then((res) => {
        setRole(res.data.role);
      });
    }
  }, [user, axiosPublic]);

  if (loading || role === null)
    return <div className="text-center mt-20">Loading...</div>;

  if (role !== "employee") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default EmployeeRoute;
