import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const UpgradePackage = () => {
  const axiosPublic = useAxios(); // ✅ public (GET packages)
  const axiosSecure = useAxiosSecure(); // ✅ secure (Stripe)
  const { user } = useAuth();

  // FETCH PACKAGES
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });

  // HANDLE UPGRADE
  const handleUpgrade = async (plan) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        email: user.email,
        plan,
      });

      // ✅ Stripe redirect (allowed)
      window.location.assign(res.data.url);
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  if (isLoading) return <p className="text-center">Loading packages...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upgrade Package</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="card p-6 bg-base-100 shadow rounded-xl">
            <h3 className="text-xl font-bold capitalize">{pkg.name}</h3>
            <p>Employees: {pkg.employeeLimit}</p>
            <p className="font-semibold">
              {pkg.price === 0 ? "Free" : `$${pkg.price / 100}`}
            </p>

            {pkg.price > 0 && (
              <button
                onClick={() => handleUpgrade(pkg.name)}
                className="btn btn-primary mt-4 w-full"
              >
                Upgrade
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePackage;
