import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBirthdayCake,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaUserTag,
} from "react-icons/fa";

const EmployeeRegister = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEmployeeRegistration = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Creating your employee profile...");

    try {
      // 1. Create Firebase user
      const result = await registerUser(data.email, data.password);
      console.log(result);

      // 2. Update Firebase display name
      await updateUserProfile({
        displayName: data.name,
      });

      // 3. Employee data for backend
      const employeeData = {
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        role: "employee",
      };

      // 4. Save to backend database
      const res = await axiosPublic.post("/users/employee", employeeData);
      console.log("FINAL SERVER RESPONSE:", res.data);

      if (res.data?.success) {
        toast.success("Registration Successful!", { id: toastId });
        navigate("/auth/login", { state: { registered: true } });
      } else {
        // This will now show "Email already exists in Database"

        toast.error(res.data?.message || "Failed to save employee", {
          id: toastId,
        });
        console.log("Backend Response:", res.data);
      }
    } catch (error) {
      toast.error(error.message || "Registration failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-100 blur-[120px] rounded-full opacity-50"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-100 blur-[120px] rounded-full opacity-50"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-white p-10 rounded-4xl border border-slate-100 shadow-2xl shadow-blue-100/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">
              <FaUserTag size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Join the Team
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              Create your employee account to manage assets.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleEmployeeRegistration)}
            className="space-y-5"
          >
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FaUser className="text-blue-500" size={14} /> Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                  errors.name ? "border-rose-400" : "border-slate-200"
                } focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-sm`}
                {...register("name", { required: "Full name is required" })}
              />
              {errors.name && (
                <p className="text-rose-500 text-[10px] font-bold uppercase tracking-tighter">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FaEnvelope className="text-blue-500" size={14} /> Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@company.com"
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                  errors.email ? "border-rose-400" : "border-slate-200"
                } focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-sm`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-rose-500 text-[10px] font-bold uppercase tracking-tighter">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FaLock className="text-blue-500" size={14} /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                    errors.password ? "border-rose-400" : "border-slate-200"
                  } focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-sm`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "At least 6 characters required",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-500 text-[10px] font-bold uppercase tracking-tighter">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FaBirthdayCake className="text-blue-500" size={14} /> Date of
                Birth
              </label>
              <input
                type="date"
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                  errors.dateOfBirth ? "border-rose-400" : "border-slate-200"
                } focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-sm text-slate-500`}
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
              />
              {errors.dateOfBirth && (
                <p className="text-rose-500 text-[10px] font-bold uppercase tracking-tighter">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  Register as Employee{" "}
                  <FaArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={14}
                  />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;
