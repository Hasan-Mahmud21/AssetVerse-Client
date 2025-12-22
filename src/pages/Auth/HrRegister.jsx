import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaUser,
  FaBuilding,
  FaImage,
  FaEnvelope,
  FaLock,
  FaBirthdayCake,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

const HrRegister = () => {
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

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;
    const response = await axios.post(url, formData);
    return response.data.data.url;
  };

  const handleHrRegistration = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Creating your corporate account...");

    try {
      const imageFile = data.photo[0];
      const companyLogoURL = await uploadImageToImgBB(imageFile);

      const result = await registerUser(data.email, data.password);
      console.log(result);

      await updateUserProfile({
        displayName: data.name,
        photoURL: companyLogoURL,
      });

      const hrUserData = {
        name: data.name,
        companyName: data.company,
        companyLogo: companyLogoURL,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        role: "hr",
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
      };

      const res = await axiosPublic.post("/users/hr", hrUserData);

      if (res.data?.success) {
        toast.success("HR Account Registered!", { id: toastId });
        navigate("/auth/login", { state: { registered: true } });
      } else {
        toast.error(res.data?.message || "Database sync failed", {
          id: toastId,
        });
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

      <div className="w-full max-w-2xl relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-white p-8 md:p-12 rounded-4xl border border-slate-100 shadow-2xl shadow-blue-100/50">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              HR Manager Registration
            </h2>
            <p className="text-slate-500 font-medium">
              Establish your company workspace on AssetVerse
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleHrRegistration)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <FaUser className="text-blue-500" /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-rose-500 text-[10px] font-bold uppercase">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <FaBuilding className="text-blue-500" /> Company Name
                </label>
                <input
                  type="text"
                  placeholder="Your Corporation"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
                  {...register("company", {
                    required: "Company name is required",
                  })}
                />
                {errors.company && (
                  <p className="text-rose-500 text-[10px] font-bold uppercase">
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Company Logo */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <FaImage className="text-blue-500" /> Company Logo
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full h-[46px] rounded-xl bg-slate-50 text-sm"
                  {...register("photo", { required: "Logo is required" })}
                />
                {errors.photo && (
                  <p className="text-rose-500 text-[10px] font-bold uppercase">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <FaBirthdayCake className="text-blue-500" /> Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-slate-500"
                  {...register("dateOfBirth", { required: "Required" })}
                />
                {errors.dateOfBirth && (
                  <p className="text-rose-500 text-[10px] font-bold uppercase">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> Professional Email
              </label>
              <input
                type="email"
                placeholder="admin@company.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-rose-500 text-[10px] font-bold uppercase">
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
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
                  {...register("password", {
                    required: "Password required",
                    minLength: { value: 6, message: "Too short" },
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
                <p className="text-rose-500 text-[10px] font-bold uppercase">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  Register Corporate Account{" "}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Already managing a team?{" "}
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

export default HrRegister;
