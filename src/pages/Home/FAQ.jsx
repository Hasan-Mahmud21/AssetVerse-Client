import { motion } from "framer-motion";
import { HiOutlineChatAlt2, HiOutlineQuestionMarkCircle } from "react-icons/hi";

const faqs = [
  {
    q: "Can an employee be linked to multiple companies?",
    a: "Our architecture supports multi-tenant affiliation. While employees are primarily managed by one HR entity, they can be part of different asset pools based on organizational rules.",
  },
  {
    q: "How are employee limits enforced?",
    a: "Limits are tied to your chosen subscription tier. If you reach your capacity, the system will notify you to upgrade, ensuring uninterrupted onboarding for your new hires.",
  },
  {
    q: "Does AssetVerse support automated return tracking?",
    a: "Absolutely. Any asset designated as 'Returnable' triggers a tracking lifecycle. Once approved, the system monitors the return status and provides one-click actions for HR to close the loop.",
  },
  {
    q: "Is data security guaranteed?",
    a: "We use enterprise-level encryption and role-based access control (RBAC) to ensure that only authorized HR personnel can view sensitive company asset logs.",
  },
];

const FAQ = () => {
  return (
    <section className="relative bg-slate-50/50 py-24 overflow-hidden border-t border-slate-100">
      {/* Abstract Background Element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-200 text-[11px] font-bold tracking-widest text-blue-700 uppercase mb-6">
              Support Center
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Got questions? <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                We have answers.
              </span>
            </h2>
            <p className="mt-6 text-slate-500 max-w-md leading-relaxed">
              Everything you need to know about managing your company assets on
              AssetVerse. Can't find what you're looking for?
            </p>

            <div className="mt-8 flex items-center gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm w-fit">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                <HiOutlineChatAlt2 />
              </div>
              <div>
                <p className="font-bold text-slate-900">Need more help?</p>
                <button className="text-sm text-blue-600 font-bold hover:underline">
                  Contact our support team
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Accordions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {faqs.map((f, idx) => (
              <div
                key={f.q}
                className="collapse collapse-arrow bg-white border border-slate-200 rounded-[2rem] transition-all duration-300 hover:border-blue-300 shadow-sm px-2"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={idx === 0}
                />
                <div className="collapse-title flex items-center gap-4 text-base md:text-lg font-bold text-slate-800 py-6">
                  <span className="text-blue-600 text-xl">
                    <HiOutlineQuestionMarkCircle />
                  </span>
                  {f.q}
                </div>
                <div className="collapse-content px-10">
                  <p className="text-slate-500 leading-relaxed pb-4">{f.a}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
