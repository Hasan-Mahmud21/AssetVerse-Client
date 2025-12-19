import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const plan = params.get("plan");

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email && plan) {
      axiosSecure
        .patch("/payment-success", {
          email: user.email,
          plan,
        })
        .then(() => {
          toast.success("Package upgraded successfully 🎉");
        })
        .catch(() => {
          toast.error("Failed to update subscription");
        });
    }

    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [user, plan, navigate, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* TEXT */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-4">
          Your <span className="font-semibold capitalize">{plan}</span> package
          has been activated.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          You will be redirected to the home page shortly.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="btn btn-success w-full text-white"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
