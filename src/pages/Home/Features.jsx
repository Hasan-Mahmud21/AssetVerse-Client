import { motion } from "framer-motion";
import {
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineUserGroup,
  HiOutlineCube,
  HiOutlineOfficeBuilding,
  HiOutlineChartBar,
} from "react-icons/hi";

const features = [
  {
    title: "Smart Approval Engine",
    desc: "Process equipment requests instantly with automated validation and one-click HR approval.",
    icon: <HiOutlineShieldCheck />,
  },
  {
    title: "Dynamic Return Tracking",
    desc: "Never lose a device again. Automated reminders and status tracking for all returnable assets.",
    icon: <HiOutlineRefresh />,
  },
  {
    title: "Granular Team Limits",
    desc: "Enforce employee thresholds based on your subscription tier with smart scalability.",
    icon: <HiOutlineUserGroup />,
  },
  {
    title: "Deep Inventory Vault",
    desc: "Store high-res images, warranty data, and full maintenance history for every unit.",
    icon: <HiOutlineCube />,
  },
  {
    title: "Multi-Entity Branding",
    desc: "Personalize the portal with custom logos and themes to match your corporate identity.",
    icon: <HiOutlineOfficeBuilding />,
  },
  {
    title: "Predictive Analytics",
    desc: "Gain insights into asset depreciation and team needs with clean, exportable data.",
    icon: <HiOutlineChartBar />,
  },
];

const Features = () => {
  return (
    <section className="relative py-24 bg-slate-50/50 overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-blue-600 mb-4">
            Powerful Capabilities
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Built for modern <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              operations teams
            </span>
          </h3>
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Move beyond simple tracking. AssetVerse provides a comprehensive
            toolkit to manage your entire physical infrastructure.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
            >
              {/* Icon Holder */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {f.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Decorative Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              System Status: Fully Operational
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
