import { motion } from "framer-motion";
import {
  HiOutlineUserAdd,
  HiOutlineDesktopComputer,
  HiOutlineShieldCheck,
} from "react-icons/hi";

const steps = [
  {
    title: "Organization Setup",
    desc: "Register your company and populate your secure digital vault with laptops, monitors, and equipment.",
    icon: <HiOutlineUserAdd />,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Empower Your Team",
    desc: "Employees browse the portal to claim gear. Every request includes custom notes for seamless approvals.",
    icon: <HiOutlineDesktopComputer />,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Unified Command",
    desc: "HR managers review, approve, and track the entire hardware lifecycle from a single, audit-ready dashboard.",
    icon: <HiOutlineShieldCheck />,
    color: "from-sky-500 to-sky-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-blue-600 mb-4">
            The Process
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Seamless asset management <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              in three simple steps
            </span>
          </h3>
        </motion.div>

        {/* Steps Grid with Connecting Lines */}
        <div className="relative">
          {/* Decorative Background Line (Visible on Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 hidden lg:block -translate-y-12" />

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group flex flex-col items-center text-center"
              >
                {/* Step Icon / Number Circle */}
                <div className="relative mb-8">
                  <div
                    className={`w-20 h-20 rounded-3xl bg-linear-to-br ${s.color} text-white flex items-center justify-center text-3xl shadow-xl shadow-blue-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    {s.icon}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-xs font-black text-slate-900 shadow-sm">
                    0{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 rounded-4xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-blue-500/5 transition-all duration-300">
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action Trigger */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-1 rounded-2xl bg-slate-100">
            <div className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 italic">
              “The fastest onboarding experience we've ever had.” — HR Tech
              Review
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
