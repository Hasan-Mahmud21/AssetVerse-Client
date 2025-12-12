import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registered) {
      toast.success("Registration Successful!");
    }
  }, [location]);

  const handleLogin = async (data) => {
    try {
      // 1. Firebase Sign-In
      const result = await signInUser(data.email, data.password);
      const firebaseUser = result.user;

      // 2. Fetch user from backend DB using email
      const { data: dbUser } = await axiosPublic.get(
        `/users/${firebaseUser.email}`
      );

      if (!dbUser) {
        toast.error("User does not exist in database!");
        return;
      }

      // 3. Redirect based on role
      if (dbUser.role === "hr") {
        navigate("/hr/dashboard", { state: { loggedIn: true } });
      } else if (dbUser.role === "employee") {
        navigate("/employee/dashboard", { state: { loggedIn: true } });
      } else {
        toast.error("Invalid role — cannot redirect");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login Failed!");
    }
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
                  message: "At least 6 characters required",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <a className="link link-hover text-sm mt-1">Forgot password?</a>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full my-2">
            Login
          </button>

          {/* Register Links */}
          <p className="text-center text-sm mt-4">New here?</p>

          <div className="flex flex-col gap-1 text-center mt-2">
            <Link to="/auth/emp-register" className="text-primary underline">
              Register as Employee
            </Link>

            <Link to="/auth/hr-register" className="text-primary underline">
              Register as HR Manager
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
