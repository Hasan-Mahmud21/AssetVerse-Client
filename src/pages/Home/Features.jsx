
import { motion } from "framer-motion";

const features = [
  {
    title: "Approval Workflow",
    desc: "HR approves requests with a single click.",
  },
  {
    title: "Return Tracking",
    desc: "Mark returnable assets and manage returns.",
  },
  {
    title: "Employee Limits",
    desc: "Package-based employee limits for HR accounts.",
  },
  {
    title: "Asset Inventory",
    desc: "Maintain quantity, images, status, and history.",
  },
  {
    title: "Company Profiles",
    desc: "Company name/logo support for HR managers.",
  },
  { title: "Analytics Ready", desc: "Build stats dashboards with clean data." },
];

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Features showcase
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Everything you need for clean and accountable asset operations.
        </p>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.04 }}
            className="p-6 rounded-2xl bg-base-100 shadow-sm border border-base-300"
          >
            <h3 className="font-bold text-slate-900">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
