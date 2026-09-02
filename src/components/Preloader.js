import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white font-nova">
      <div className="w-20 h-20 bg-nova-blue rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 animate-pulse">
        N
      </div>

      <div className="flex flex-col items-center">
        <span className="text-nova-blue font-bold tracking-[0.2em] text-sm uppercase">
          Nova Healthcare
        </span>
        <div className="w-48 h-[2px] bg-slate-100 mt-4 overflow-hidden relative">
          <div className="absolute top-0 w-1/2 h-full bg-nova-sky animate-loading-bar" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
