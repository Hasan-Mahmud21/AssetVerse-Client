
import { motion } from "framer-motion";

const items = [
  {
    title: "Full lifecycle tracking",
    desc: "Track inventory, assignment, and return history for every asset.",
  },
  {
    title: "Employee self-service",
    desc: "Employees request assets, view assignments, and manage profiles easily.",
  },
  {
    title: "HR-first workflows",
    desc: "Approvals, employee limits, and clear accountability in one place.",
  },
  {
    title: "Secure & audit-ready",
    desc: "Role-based access + clean logs help maintain compliance.",
  },
];

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Why teams choose AssetVerse
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Prevent asset loss, reduce manual work, and keep every device
          accountable from day one.
        </p>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, idx) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-base-100 shadow-sm border border-base-300"
          >
            <h3 className="font-bold text-slate-900">{it.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
