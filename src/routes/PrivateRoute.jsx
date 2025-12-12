// import React from "react";

import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }
  if (!user) {
    return (
      <Navigate to="/auth/login" state={location.pathname} replace="true" />
    );
  }
  return children;
};

export default PrivateRoute;
