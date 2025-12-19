import { motion } from "framer-motion";
import {
  HiOutlineClipboardCheck,
  HiOutlineUserGroup,
  HiOutlineCursorClick,
  HiOutlineShieldCheck,
} from "react-icons/hi";

const items = [
  {
    title: "Lifecycle Tracking",
    desc: "Monitor inventory from procurement to retirement with full history logs.",
    icon: <HiOutlineClipboardCheck className="w-6 h-6" />,
    color: "blue",
  },
  {
    title: "Self-Service Portal",
    desc: "Empower employees to request gear and manage their own profiles.",
    icon: <HiOutlineCursorClick className="w-6 h-6" />,
    color: "indigo",
  },
  {
    title: "HR Control Center",
    desc: "Streamline approvals and enforce asset limits with zero friction.",
    icon: <HiOutlineUserGroup className="w-6 h-6" />,
    color: "sky",
  },
  {
    title: "Enterprise Security",
    desc: "Role-based permissions and audit-ready reports for total compliance.",
    icon: <HiOutlineShieldCheck className="w-6 h-6" />,
    color: "emerald",
  },
];

const About = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-blue-50/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
              The Platform Advantage
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Why leading HR teams <br />
              trust <span className="text-blue-600">AssetVerse</span>
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg text-slate-500 max-w-sm"
          >
            We’ve built the tools to help you eliminate manual spreadsheets and
            keep every device accountable.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-300"
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {it.icon}
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {it.title}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {it.desc}
              </p>

              {/* Subtle Arrow Decor */}
              <div className="mt-6 flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Learn More
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <p className="text-xl font-bold">
              Ready to secure your company assets?
            </p>
            <p className="text-slate-400 text-sm">
              Join over 500+ companies managing equipment with us.
            </p>
          </div>
          <button className="btn bg-white text-slate-900 border-none hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-all">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
