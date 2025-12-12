import React from "react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-red-500">Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;
