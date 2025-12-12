import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import { toast } from "react-toastify";

const HrRegister = () => {
  const [loading, setLoading] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxios(); // useAxios for public (unauthenticated) routes
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Upload to ImgBB

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

    const response = await axios.post(url, formData);
    return response.data.data.url; // hosted image URL
  };

  // HANDLE HR REGISTRATION

  const handleHrRegistration = async (data) => {
    setLoading(true);

    try {
      // 1. Upload image to ImgBB
      const imageFile = data.photo[0];
      const companyLogoURL = await uploadImageToImgBB(imageFile);

      // 2. Create Firebase user
      const result = await registerUser(data.email, data.password);
      const firebaseUser = result.user;
      console.log(firebaseUser);

      // 3. Update Firebase displayName + photoURL
      await updateUserProfile({
        displayName: data.name,
        photoURL: companyLogoURL,
      });

      // 4. Prepare HR data for backend
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

      // 5. Save to BACKEND DATABASE
      const res = await axiosPublic.post("/users/hr", hrUserData);

      if (res.data?.success) {
        // Use NAVIGATE STATE so toast shows after redirect
        navigate("/auth/login", {
          state: { registered: true },
        });
      } else {
        toast.error(res.data?.message || "Failed to save user in database");
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
          Join as HR Manager
        </h2>

        <form onSubmit={handleSubmit(handleHrRegistration)}>
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

          {/* Company Name */}
          <div>
            <label className="label-text font-semibold">Company Name</label>
            <input
              type="text"
              className="input input-bordered w-full my-2"
              {...register("company", { required: "Company name is required" })}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>

          {/* Company Logo */}
          <div>
            <label className="label-text font-semibold">Company Logo</label>
            <input
              type="file"
              className="file-input input-bordered w-full my-2"
              {...register("photo", { required: "Company logo is required" })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
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

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full my-2"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register as HR Manager"}
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

export default HrRegister;
