import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, user, loading } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registered) {
      toast.success("Registration Successful!");
    }
  }, [location.state]);

  useEffect(() => {
    if (!loading && user?.email) {
      axiosPublic
        .get(`/users/${user.email}`)
        .then((res) => {
          const role = res.data?.role;
          if (role === "hr") {
            navigate("/hr/dashboard", { replace: true });
          } else if (role === "employee") {
            navigate("/employee/dashboard", { replace: true });
          } else {
            toast.error("Invalid role. Contact support.");
          }
        })
        .catch(() => {
          toast.error("Failed to fetch user role");
        });
    }
  }, [user, loading, axiosPublic, navigate]);

  const handleLogin = async (data) => {
    const toastId = toast.loading("Authenticating...");
    try {
      await signInUser(data.email, data.password);
      toast.success("Welcome Back!", { id: toastId });
    } catch (error) {
      toast.error(error.message || "Login Failed!", { id: toastId });
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
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 font-medium">
              Log in to your AssetVerse portal
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50 border ${
                  errors.email ? "border-rose-400" : "border-slate-200"
                } focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-rose-500 text-xs font-bold pl-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FaLock className="text-blue-500" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50 border ${
                    errors.password ? "border-rose-400" : "border-slate-200"
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium`}
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
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-500 text-xs font-bold pl-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
            >
              Sign In{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="h-px bg-slate-100 flex-1"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                New to AssetVerse?
              </span>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/auth/emp-register"
                className="w-full py-3 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all"
              >
                Join as Employee
              </Link>
              <Link
                to="/auth/hr-register"
                className="w-full py-3 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all"
              >
                Register as HR Manager
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
