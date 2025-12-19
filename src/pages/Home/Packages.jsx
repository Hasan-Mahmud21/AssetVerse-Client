import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { motion } from "framer-motion";

const Packages = () => {
  const axiosPublic = useAxios();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-3">Pricing Plans</h2>
          <p className="text-gray-500">
            Choose the plan that fits your organization
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`rounded-xl border shadow-sm p-8 flex flex-col ${
                pkg.name === "Premium"
                  ? "border-primary scale-105"
                  : "border-base-300"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>

              <p className="text-3xl font-extrabold mb-4">
                ${pkg.price}
                <span className="text-base font-medium text-gray-500">
                  /month
                </span>
              </p>

              <p className="mb-4 text-sm text-gray-600">
                Up to {pkg.employeeLimit} employees
              </p>

              <ul className="flex-1 space-y-2 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-primary">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary w-full">Get Started</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
