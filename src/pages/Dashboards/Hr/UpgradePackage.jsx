import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaCrown,
  FaRocket,
  FaUserFriends,
} from "react-icons/fa";

const UpgradePackage = () => {
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // FETCH PACKAGES
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });

  const handleUpgrade = async (plan) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        email: user.email,
        plan,
      });
      window.location.assign(res.data.url);
    } catch (error) {
      console.error(error);
      toast.error("Payment failed to initialize");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Elevate Your Team
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Scale your asset management as your company grows. Choose the plan
          that fits your needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-4">
        {packages.map((pkg) => {
          const isPremium = pkg.name.toLowerCase() === "premium";
          const isStandard = pkg.name.toLowerCase() === "standard";

          return (
            <div
              key={pkg._id}
              className={`relative flex flex-col p-8 transition-all duration-300 border rounded-3xl group hover:shadow-2xl hover:-translate-y-2 ${
                isPremium
                  ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-blue-100"
                  : "bg-white border-slate-100 text-slate-900 shadow-sm"
              }`}
            >
              {isPremium && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Icon & Title */}
              <div className="mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    isPremium
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {isPremium ? (
                    <FaCrown size={24} />
                  ) : isStandard ? (
                    <FaRocket size={22} />
                  ) : (
                    <FaUserFriends size={22} />
                  )}
                </div>
                <h3 className="text-2xl font-bold capitalize tracking-tight">
                  {pkg.name}
                </h3>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tight">
                    {pkg.price === 0 ? "Free" : `$${pkg.price}`}
                  </span>
                  {pkg.price > 0 && (
                    <span
                      className={
                        isPremium ? "text-slate-400" : "text-slate-500"
                      }
                    >
                      /one-time
                    </span>
                  )}
                </div>
              </div>

              {/* Features List */}
              <ul className="flex-1 space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <FaCheckCircle
                    className={isPremium ? "text-blue-400" : "text-blue-600"}
                  />
                  <span>
                    Up to <strong>{pkg.employeeLimit}</strong> Employees
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <FaCheckCircle
                    className={isPremium ? "text-blue-400" : "text-blue-600"}
                  />
                  <span>Unlimited Asset Tracking</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <FaCheckCircle
                    className={isPremium ? "text-blue-400" : "text-blue-600"}
                  />
                  <span>Email Support</span>
                </li>
              </ul>

              {/* Action Button */}
              {pkg.price > 0 ? (
                <button
                  onClick={() => handleUpgrade(pkg.name)}
                  className={`w-full py-4 rounded-xl font-bold transition-all active:scale-95 ${
                    isPremium
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : "bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200"
                  }`}
                >
                  Upgrade Now
                </button>
              ) : (
                <div className="w-full py-4 rounded-xl font-bold bg-slate-100 text-slate-400 text-center border border-dashed border-slate-300 italic">
                  Default Plan
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradePackage;
