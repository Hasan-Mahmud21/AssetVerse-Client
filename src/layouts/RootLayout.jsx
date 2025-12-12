import React from "react";
import { Outlet } from "react-router";
import NavBar from "../pages/Shared/NavBar";
import Footer from "../pages/Shared/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <header className="w-full shadow-sm bg-base-100">
        <NavBar></NavBar>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-base-100 shadow-inner">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
