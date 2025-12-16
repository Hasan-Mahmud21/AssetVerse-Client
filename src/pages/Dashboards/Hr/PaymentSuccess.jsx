import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const axiosPublic = useAxios();

  const plan = params.get("plan");

  useEffect(() => {
    if (!plan) return;

    axiosPublic
      .patch("/users/upgrade-package", { plan })
      .then(() => {
        toast.success("Package upgraded successfully!");
        navigate("/hr/dashboard");
      })
      .catch(() => {
        toast.error("Package upgrade failed");
        navigate("/hr/dashboard");
      });
  }, [plan, axiosPublic, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Processing your payment...</h2>
    </div>
  );
};

export default PaymentSuccess;
