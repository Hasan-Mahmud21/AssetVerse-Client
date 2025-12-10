import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const handleLogin = (data) => {
    console.log("after login", data);
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-lg p-6 bg-base-100 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login to AssetVerse
        </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
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

            <a className="link link-hover">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-full my-2">
            Login
          </button>
          <p>
            New to AssetVerse? Register as an Employee
            <Link to="/hr-register" className="text-blue-400 underline">
              Register as an Employee
            </Link>
            or Register as Hr Manager
            <Link to="/emp-register" className="text-blue-400 underline">
              Register as Hr Manager
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
