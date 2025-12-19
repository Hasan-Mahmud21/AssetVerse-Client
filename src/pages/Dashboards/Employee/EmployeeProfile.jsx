import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const EmployeeProfile = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employee-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/employee/profile/${user.email}`);
      return res.data;
    },
  });

  const handleUpdate = async () => {
    try {
      await axiosPublic.patch(`/employee/profile/${user.email}`, formData);
      toast.success("Profile updated");
      setEditing(false);
      refetch();
    } catch {
      toast.error("Update failed");
    }
  };

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {/* PROFILE PHOTO */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profile.photoURL || "https://i.ibb.co/0jYtM7B/user.png"}
          className="w-24 h-24 rounded-full border"
          alt="profile"
        />
      </div>

      {/* FORM */}
      <div className="grid gap-4">
        <div>
          <label className="font-semibold">Name</label>
          <input
            defaultValue={profile.name}
            disabled={!editing}
            className="input input-bordered w-full"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="font-semibold">Email (Read Only)</label>
          <input
            value={profile.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Date of Birth</label>
          <input
            type="date"
            defaultValue={profile.dateOfBirth}
            disabled={!editing}
            className="input input-bordered w-full"
            onChange={(e) =>
              setFormData({
                ...formData,
                dateOfBirth: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Profile Photo URL</label>
          <input
            defaultValue={profile.photoURL}
            disabled={!editing}
            className="input input-bordered w-full"
            onChange={(e) =>
              setFormData({
                ...formData,
                photoURL: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* COMPANY INFO */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Company Affiliation</h3>
        {profile.company ? (
          <div className="flex items-center gap-3">
            {profile.company.logo && (
              <img src={profile.company.logo} className="w-10 h-10" alt="" />
            )}
            <span>{profile.company.name}</span>
          </div>
        ) : (
          <p className="text-gray-500">No company affiliated</p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex gap-3">
        {!editing ? (
          <button className="btn btn-outline" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Save Changes
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
