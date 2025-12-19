import { motion } from "framer-motion";
import { Link } from "react-router"; // Using your confirmed router import

const CTA = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-400 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl border border-slate-800"
      >
        <div className="grid lg:grid-cols-5 items-stretch">
          {/* Left Content (Text) */}
          <div className="lg:col-span-3 p-8 md:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
                Ready to Scale?
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Take full control of your <br />
              <span className="text-blue-500 italic">Inventory Assets.</span>
            </h2>

            <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-md">
              The fastest way for HR teams to distribute and recover company
              equipment without the paperwork.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/auth/hr-register"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Launch HR Portal
              </Link>

              <Link
                to="/auth/emp-register"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold border border-slate-700 transition-all active:scale-95"
              >
                Join as Employee
              </Link>
            </div>
          </div>

          {/* Right Visual (The "Hook") */}
          <div className="lg:col-span-2 bg-blue-600 p-8 md:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100%">
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="text-5xl font-black text-white mb-2">5 min</div>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">
                Setup Time
              </p>

              <div className="h-px w-12 bg-blue-400 my-8 mx-auto" />

              <div className="text-5xl font-black text-white mb-2">0%</div>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">
                Lost Equipment
              </p>

              <div className="mt-10">
                <Link
                  to="/auth/login"
                  className="text-white font-bold underline underline-offset-8 hover:text-blue-100 transition-colors"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
