import { motion } from "framer-motion";

const testimonials = [
  {
    company: "NexaSoft",
    quote: "AssetVerse reduced asset loss and made approvals fast.",
    person: "HR Lead",
  },
  {
    company: "BluePeak Labs",
    quote: "We finally have visibility across all devices and returns.",
    person: "Operations",
  },
  {
    company: "CoreFinance",
    quote: "Clean workflows and great tracking. Very easy for employees.",
    person: "Admin Team",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-base-100 border-y border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="grid lg:grid-cols-3 gap-8 items-start"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Trusted by teams
            </h2>
            <p className="mt-3 text-slate-600">
              Trust-building elements with realistic stats for presentation.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border">
                <p className="text-sm text-slate-500">Companies</p>
                <p className="text-2xl font-extrabold text-slate-900">100+</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border">
                <p className="text-sm text-slate-500">Assets tracked</p>
                <p className="text-2xl font-extrabold text-slate-900">25k+</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-3 gap-4">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.company}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-base-100 shadow-sm border border-base-300"
              >
                <p className="text-sm text-slate-700">“{t.quote}”</p>
                <div className="mt-4">
                  <p className="font-bold text-slate-900">{t.company}</p>
                  <p className="text-xs text-slate-500">{t.person}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
