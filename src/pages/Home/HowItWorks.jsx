// src/pages/Home/sections/HowItWorks.jsx
import { motion } from "framer-motion";

const steps = [
  { title: "HR registers company", desc: "HR creates account and adds assets into inventory." },
  { title: "Employees request assets", desc: "Employees browse available assets and request with notes." },
  { title: "HR approves & tracks", desc: "HR approves requests, assigns assets, and tracks returns." },
];

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center">
          How AssetVerse works
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-base-100 shadow-sm border border-base-300"
            >
              <div className="badge badge-primary badge-outline">Step {idx + 1}</div>
              <h3 className="mt-3 font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
