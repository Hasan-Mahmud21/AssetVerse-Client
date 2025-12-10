import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const HrRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth();
  const handleHrRegistration = (data) => {
    console.log("After submit", data);
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-lg p-6 bg-base-100 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Join as HR Manager
        </h2>
        <form onSubmit={handleSubmit(handleHrRegistration)}>
          {/* Full Name */}
          <div>
            <label className="label-text font-semibold ">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full my-2"
              placeholder="Your Name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* Company Name */}
          <div>
            <label className="label-text font-semibold ">Company Name</label>
            <input
              type="text"
              className="input input-bordered w-full my-2"
              placeholder="Company Name"
              {...register("company", { required: "Company name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* Company Logo URL */}
          <div>
            <label className="label-text font-semibold">Company Logo URL</label>
            <input
              type="text"
              className="input input-bordered w-full my-2"
              placeholder="Company Logo"
              {...register("companyLogo", {
                required: "Logo URL is required",
              })}
            />
            {errors.companyLogo && (
              <p className="text-red-500 text-sm">
                {errors.companyLogo.message}
              </p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="label-text font-semibold">Email</label>
            <input
              type="email"
              className="input input-bordered w-full my-2"
              placeholder="E-mail"
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
              placeholder="Password"
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

          <button type="submit" className="btn btn-primary w-full my-2">
            Register as HR Manager
          </button>
          <p>
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="text-blue-400 underline"
            >
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default HrRegister;
