// src/pages/Home/sections/FAQ.jsx
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Can one employee work with multiple companies?",
    a: "Employees can request from available pools. Team affiliation can be controlled by HR rules.",
  },
  {
    q: "What happens when package employee limit is reached?",
    a: "HR must upgrade package to increase employee limit.",
  },
  {
    q: "Is return tracking supported?",
    a: "Yes. Returnable asset types can show Return actions after approval.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-base-100 border-y border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="grid lg:grid-cols-2 gap-10 items-start"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-slate-600">
              Clear answers for your project presentation.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-2xl"
              >
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-semibold text-slate-900">
                  {f.q}
                </div>
                <div className="collapse-content text-sm text-slate-600">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
