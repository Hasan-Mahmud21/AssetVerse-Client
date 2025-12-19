import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const plan = params.get("plan");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email && plan) {
      axiosSecure.patch("/payment-success", {
        email: user.email,
        plan,
      });
      toast.success("Package upgraded successfully");
    }
  }, [user, plan]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold">Payment Successful 🎉</h2>
      <p className="mt-4">Your subscription has been updated.</p>
    </div>
  );
};

export default PaymentSuccess;
