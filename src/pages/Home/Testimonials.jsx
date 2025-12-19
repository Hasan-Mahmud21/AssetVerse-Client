import { motion } from "framer-motion";
import { HiOutlineStar } from "react-icons/hi";

const testimonials = [
  {
    company: "Brainfreeze Solutions",
    quote:
      "AssetVerse transformed our onboarding. We reduced equipment loss by 40% in just three months.",
    person: "Sarah Chen",
    role: "Head of People",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    company: "AmberIT Labs",
    quote:
      "The visibility we now have across remote teams is incredible. Returns are finally automated.",
    person: "Marcus Thorne",
    role: "Director of Ops",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    company: "PhotoLab Group",
    quote:
      "Audit-ready logs saved us during our last compliance check. The UI is exceptionally intuitive.",
    person: "Elena Rodriguez",
    role: "IT Administrator",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
];

const Testimonials = () => {
  return (
    <section className="relative bg-white border-y border-slate-100 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-50 rounded-full blur-[100px] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          {/* Left Side: Stats & Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
              Proven Impact
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Loved by <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Modern Teams
              </span>
            </h3>
            <p className="mt-6 text-slate-500 leading-relaxed">
              Don’t just take our word for it. Join the growing list of
              companies optimizing their hardware lifecycle with AssetVerse.
            </p>

            <div className="mt-10 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6 group hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                  500+
                </div>
                <div>
                  <p className="text-slate-900 font-bold">Global Companies</p>
                  <p className="text-xs text-slate-500 font-medium">
                    Active daily users
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6 group hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
                  25k
                </div>
                <div>
                  <p className="text-slate-900 font-bold">Assets Secured</p>
                  <p className="text-xs text-slate-500 font-medium">
                    Tracked in real-time
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Testimonials Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-1 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all flex flex-col md:flex-row gap-8 items-start md:items-center"
              >
                {/* Quote Icon & Avatar */}
                <div className="flex shrink-0 gap-4 md:flex-col md:items-center">
                  <div className="h-16 w-16 rounded-2xl overflow-hidden border-4 border-white shadow-md ring-1 ring-slate-100">
                    <img
                      src={t.avatar}
                      alt={t.person}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex md:justify-center text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <HiOutlineStar key={i} className="fill-current w-4 h-4" />
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-lg text-slate-700 italic font-medium leading-relaxed">
                    “{t.quote}”
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-black text-slate-900">{t.person}</p>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                        {t.role} @ {t.company}
                      </p>
                    </div>
                    <div className="hidden sm:block h-8 w-[1px] bg-slate-200"></div>
                    <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Verified Case Study
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
