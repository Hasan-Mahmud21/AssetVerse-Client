import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import HrRegister from "../pages/Auth/HrRegister";
import EmployeeRegister from "../pages/Auth/EmployeeRegister";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import Unauthorized from "../pages/unauthorized";
import HrDashboardLayout from "../layouts/HrDashboardLayout";
import HrDashboard from "../pages/Dashboards/Hr/HrDashboard";
import EmployeeDashboardLayout from "../layouts/EmployeeDashboardLayout";
import EmployeeDashboard from "../pages/Dashboards/Employee/EmployeeDashboard";
import AddAsset from "../pages/Dashboards/Hr/AddAsset";
import AssetList from "../pages/Dashboards/Hr/AssetList";
import RequestAsset from "../pages/Dashboards/Employee/RequestAsset";
import AllRequests from "../pages/Dashboards/Hr/AllRequests";
import MyAssets from "../pages/Dashboards/Employee/MyAssets";
import EmployeeList from "../pages/Dashboards/Hr/EmployeeList";
import UpgradePackage from "../pages/Dashboards/Hr/UpgradePackage";
import PaymentSuccess from "../pages/Dashboards/Hr/PaymentSuccess";
import MyTeam from "../pages/Dashboards/Employee/MyTeam";

export const router = createBrowserRouter([
  // PUBLIC PAGES
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  // AUTH PAGES
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "hr-register", element: <HrRegister /> },
      { path: "emp-register", element: <EmployeeRegister /> },
    ],
  },

  // HR PROTECTED ROUTES
  {
    path: "/hr",
    element: (
      <PrivateRoute>
        <HrRoute>
          <HrDashboardLayout />
        </HrRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <HrDashboard />,
      },
      {
        path: "add-asset",
        element: <AddAsset />,
      },
      {
        path: "assets",
        element: <AssetList />,
      },
      {
        path: "requests",
        element: <AllRequests />,
      },
      { path: "employees", element: <EmployeeList /> },
      {
        path: "upgrade",
        element: <UpgradePackage></UpgradePackage>,
      },
    ],
  },

  // EMPLOYEE PROTECTED ROUTES
  {
    path: "/employee",
    element: (
      <PrivateRoute>
        <EmployeeRoute>
          <EmployeeDashboardLayout></EmployeeDashboardLayout>
        </EmployeeRoute>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <EmployeeDashboard /> },
      {
        path: "request-asset",
        element: <RequestAsset />,
      },
      { path: "my-assets", element: <MyAssets /> },
      { path: "my-team", element: <MyTeam /> },
    ],
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },

  // UNAUTHORIZED PAGE
  { path: "/unauthorized", element: <Unauthorized /> },
]);
