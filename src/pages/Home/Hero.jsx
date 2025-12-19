import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="bg-linear-to-br from-sky-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-blue-100 text-xs font-semibold text-blue-700">
            CORPORATE ASSET MANAGEMENT
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
            Track every asset. <br className="hidden md:block" />
            Empower every employee.
          </h1>

          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl">
            AssetVerse helps HR teams control laptops, devices, and office
            equipment in one secure platform—clear visibility, approvals, and
            accountability.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/auth/hr-register" className="btn btn-primary">
              Join as HR Manager
            </Link>
            <Link to="/auth/emp-register" className="btn btn-outline">
              Join as Employee
            </Link>
            <Link to="/auth/login" className="btn btn-ghost">
              Login
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/70 border border-blue-100">
              <p className="text-sm text-slate-500">Adoption</p>
              <p className="text-lg font-bold text-slate-900">100+ companies</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-blue-100">
              <p className="text-sm text-slate-500">Tracking</p>
              <p className="text-lg font-bold text-slate-900">Real-time</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-blue-100">
              <p className="text-sm text-slate-500">Security</p>
              <p className="text-lg font-bold text-slate-900">Role-based</p>
            </div>
          </div>
        </motion.div>

        {/* Right (Mock card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="relative"
        >
          <div className="p-6 md:p-8 rounded-3xl bg-white shadow-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Live asset overview</h3>
              <span className="badge badge-primary badge-outline">
                Q1 Snapshot
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              Assigned, available, and returnable assets at a glance.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl p-4 bg-slate-50 border">
                <p className="text-xs text-slate-500">Active</p>
                <p className="text-xl font-extrabold text-slate-900">320</p>
              </div>
              <div className="rounded-2xl p-4 bg-emerald-50 border border-emerald-100">
                <p className="text-xs text-emerald-700">Assigned</p>
                <p className="text-xl font-extrabold text-slate-900">245</p>
              </div>
              <div className="rounded-2xl p-4 bg-amber-50 border border-amber-100">
                <p className="text-xs text-amber-700">Returnable</p>
                <p className="text-xl font-extrabold text-slate-900">75</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border">
                <p className="text-xs font-semibold text-slate-600">SECURITY</p>
                <p className="text-sm text-slate-600">
                  Role-based access for HR and employees with audit-ready
                  actions.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border">
                <p className="text-xs font-semibold text-slate-600">
                  AUTOMATION
                </p>
                <p className="text-sm text-slate-600">
                  Approvals, limits, and tracking designed for HR workflows.
                </p>
              </div>
            </div>
          </div>

          {/* subtle floating glow */}
          <div className="absolute -z-10 inset-0 blur-3xl opacity-40 bg-gradient-to-br from-blue-200 to-sky-200" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
