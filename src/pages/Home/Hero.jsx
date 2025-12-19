import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-sky-50 via-blue-50 to-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-40">
        <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-blue-200 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[25%] h-[25%] rounded-full bg-sky-200 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-200 text-[11px] font-bold tracking-widest text-blue-700 uppercase mb-8">
            Enterprise-Grade Inventory
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Your Assets. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-sky-500">
              Perfectly Synced.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
            Eliminate the chaos of spreadsheets. AssetVerse provides HR teams
            with a unified dashboard to track, assign, and recover company
            equipment—securely and effortlessly.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            {/* HR Manager Action */}
            <Link
              to="/auth/hr-register"
              className="btn btn-primary btn-lg shadow-xl shadow-blue-200/50 px-8 hover:scale-105 transition-all"
            >
              Register Company
            </Link>

            {/* Employee Action */}
            <Link
              to="/auth/emp-register"
              className="btn btn-outline btn-lg px-8 border-slate-200 hover:bg-blue-50 text-slate-700"
            >
              Claim Your Gear
            </Link>

            {/* Login Button Kept */}
            <Link
              to="/auth/login"
              className="btn btn-ghost btn-lg text-blue-600 hover:bg-blue-50/50"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="user"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Trusted by <span className="text-slate-900 font-bold">500+</span>{" "}
              HR Managers worldwide
            </p>
          </div>
        </motion.div>

        {/* Right Side: Visual Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 p-2 rounded-[3rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-2xl">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-inner">
              {/* Header of Mock UI */}
              <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">
                  Operational Overview
                </span>
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-slate-200" />
                  <div className="h-2 w-2 rounded-full bg-slate-200" />
                  <div className="h-2 w-2 rounded-full bg-slate-200" />
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-200">
                    <p className="text-[10px] uppercase font-bold opacity-80 tracking-widest">
                      In Use
                    </p>
                    <p className="text-3xl font-black mt-1">88%</p>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-5 text-white">
                    <p className="text-[10px] uppercase font-bold opacity-80 tracking-widest">
                      Pending
                    </p>
                    <p className="text-3xl font-black mt-1">12</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "MacBook Pro M3",
                      status: "Assigned",
                      color: "text-emerald-600",
                    },
                    {
                      name: 'Dell UltraSharp 27"',
                      status: "In Review",
                      color: "text-amber-600",
                    },
                    {
                      name: "Magic Keyboard",
                      status: "Returned",
                      color: "text-blue-600",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50"
                    >
                      <span className="text-sm font-semibold text-slate-700">
                        {item.name}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-tighter ${item.color}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 h-24 w-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
