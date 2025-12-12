import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const EmployeeRegister = () => {
  const [loading, setLoading] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ---------------------------------------
  // HANDLE EMPLOYEE REGISTRATION
  // ---------------------------------------
  const handleEmployeeRegistration = async (data) => {
    setLoading(true);

    try {
      //  Create Firebase user
      const result = await registerUser(data.email, data.password);
      const firebaseUser = result.user;
      console.log(firebaseUser);

      //  Update Firebase display name
      await updateUserProfile({
        displayName: data.name,
      });

      // Employee data for backend
      const employeeData = {
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        role: "employee", // auto-assigned
      };

      // Save to backend database
      const res = await axiosPublic.post("/users/employee", employeeData);

      if (res.data?.success) {
        // Navigate with state so toast shows on login page
        navigate("/auth/login", {
          state: { registered: true },
        });
      } else {
        toast.error(res.data?.message || "Failed to save employee");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-lg p-6 bg-base-100 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Join as Employee
        </h2>

        <form onSubmit={handleSubmit(handleEmployeeRegistration)}>
          {/* Full Name */}
          <div>
            <label className="label-text font-semibold">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full my-2"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label-text font-semibold">Email</label>
            <input
              type="email"
              className="input input-bordered w-full my-2"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label-text font-semibold">Password</label>
            <input
              type="password"
              className="input input-bordered w-full my-2"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="label-text font-semibold">Date of Birth</label>
            <input
              type="date"
              className="input input-bordered w-full my-2"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full my-2"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register as Employee"}
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-400 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegister;
