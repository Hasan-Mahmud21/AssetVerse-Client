// src/pages/Home/sections/CTA.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-lg"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to bring order to your assets?
        </h2>
        <p className="mt-3 text-white/90 max-w-2xl">
          Create your HR account, invite employees, and start tracking every
          device in minutes.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/auth/hr-register"
            className="btn bg-white text-slate-900 hover:bg-white"
          >
            Get started as HR
          </Link>
          <Link
            to="/auth/emp-register"
            className="btn btn-outline text-white border-white hover:bg-white/10"
          >
            Join as Employee
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
