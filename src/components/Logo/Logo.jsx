import React from "react";

// Added variant prop to handle different backgrounds
const Logo = ({ variant = "default" }) => {
  const isDarkBg = variant === "light";

  return (
    <div className="flex items-center gap-2 select-none group cursor-pointer">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-all duration-300">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22V12M12 12L21 7M12 12L3 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="2"
              fill="white"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Change text-slate-900 to text-white if variant is light */}
        <span
          className={`text-xl font-black leading-tight tracking-tighter ${
            isDarkBg ? "text-white" : "text-slate-900"
          }`}
        >
          Asset<span className="text-blue-500">Verse</span>
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
            isDarkBg ? "text-slate-400" : "text-slate-400"
          }`}
        >
          Inventory Cloud
        </span>
      </div>
    </div>
  );
};

export default Logo;
