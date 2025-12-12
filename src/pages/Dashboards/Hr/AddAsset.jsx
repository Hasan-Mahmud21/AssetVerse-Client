import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

    const res = await axios.post(url, formData);
    return res.data.data.url;
  };

  // Handle Add Asset
  const handleAddAsset = async (data) => {
    setLoading(true);

    try {
      // 1. Upload Image
      const imageFile = data.image[0];
      const imageUrl = await uploadImageToImgBB(imageFile);

      // 2. Prepare Asset Data
      const assetData = {
        assetName: data.assetName,
        assetType: data.assetType,
        quantity: Number(data.quantity),
        image: imageUrl,
        description: data.description,
        hrEmail: user.email,
      };

      // 3. Save to backend
      const res = await axiosSecure.post("/assets", assetData);

      if (res.data.success) {
        toast.success("Asset added successfully!");
        reset();
      } else {
        toast.error("Failed to add asset");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Asset</h2>

      <form onSubmit={handleSubmit(handleAddAsset)} className="space-y-4">
        {/* Asset Name */}
        <div>
          <label className="font-semibold">Asset Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("assetName", { required: "Asset name is required" })}
          />
          {errors.assetName && (
            <p className="text-red-500 text-sm">{errors.assetName.message}</p>
          )}
        </div>

        {/* Asset Type */}
        <div>
          <label className="font-semibold">Asset Type</label>
          <select
            className="select select-bordered w-full"
            {...register("assetType", { required: true })}
          >
            <option value="">Select type</option>
            <option>Laptop</option>
            <option>Mobile</option>
            <option>Chair</option>
            <option>Table</option>
            <option>Other</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="font-semibold">Quantity</label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("quantity", { required: true, min: 1 })}
          />
        </div>

        {/* Image */}
        <div>
          <label className="font-semibold">Asset Image</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("image", { required: true })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description")}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Asset"}
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
