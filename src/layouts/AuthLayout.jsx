import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Logo></Logo>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
