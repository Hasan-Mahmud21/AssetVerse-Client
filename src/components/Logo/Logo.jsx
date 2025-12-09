import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center gap-2 select-none animate__animated animate__fadeIn">
      <div className="w-9 h-9 rounded-lg bg-primary text-primary-content flex items-center justify-center font-bold text-lg shadow">
        AV
      </div>
      <span className="text-2xl font-extrabold tracking-wide">
        Asset<span className="text-primary">Verse</span>
      </span>
    </div>
    );
};

export default Logo;