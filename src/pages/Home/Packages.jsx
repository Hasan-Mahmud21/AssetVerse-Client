import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi"; // Using consistent iconography

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
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <span className="loading loading-ring loading-lg text-blue-600"></span>
        <p className="text-slate-500 font-medium animate-pulse">
          Loading best plans...
        </p>
      </div>
    );
  }

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decor - consistent with Hero */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[10%] right-[5%] w-72 h-72 bg-blue-100 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-sky-100 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
            Flexible Pricing
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Scale AssetVerse <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-sky-500">
              as your team grows
            </span>
          </h3>
          <p className="mt-6 text-slate-500 max-w-xl mx-auto text-lg">
            Simple, transparent pricing designed for startups and enterprises
            alike.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, index) => {
            const isFeatured =
              pkg.name.toLowerCase().includes("premium") || pkg.price > 10;

            return (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative group rounded-[2.5rem] p-8 transition-all duration-300 ${
                  isFeatured
                    ? "bg-slate-900 text-white shadow-2xl shadow-blue-200 scale-105 z-20"
                    : "bg-slate-50 border border-slate-100 text-slate-900 hover:bg-white hover:shadow-xl z-10"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <h4
                  className={`text-xl font-bold mb-2 ${
                    isFeatured ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {pkg.name}
                </h4>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black">${pkg.price}</span>
                  <span
                    className={`text-sm ${
                      isFeatured ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    /month
                  </span>
                </div>

                <div
                  className={`py-3 px-4 rounded-xl mb-8 text-sm font-semibold flex items-center justify-between ${
                    isFeatured ? "bg-white/10" : "bg-blue-50 text-blue-700"
                  }`}
                >
                  <span>Team Size</span>
                  <span>Up to {pkg.employeeLimit}</span>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <HiCheckCircle
                        className={`w-5 h-5 shrink-0 ${
                          isFeatured ? "text-blue-400" : "text-emerald-500"
                        }`}
                      />
                      <span
                        className={
                          isFeatured ? "text-slate-300" : "text-slate-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-2xl font-bold transition-all transform active:scale-95 ${
                    isFeatured
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                      : "bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-900"
                  }`}
                >
                  Select {pkg.name}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Support Link */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-16 text-slate-500 text-sm"
        >
          Need a custom plan for 1000+ employees?{" "}
          <button className="text-blue-600 font-bold hover:underline">
            Contact Sales
          </button>
        </motion.p>
      </div>
    </section>
  );
};

export default Packages;
