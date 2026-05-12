import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FlaskConical, Stethoscope, Activity, Pill, Home } from 'lucide-react';

const ListAccess = () => {
  // Ultra-smooth spring for the hover interaction
  const hoverSpring = { type: "spring", stiffness: 400, damping: 17 };
  
  // Staggered entrance for the "Architectural" build look
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 2 } // Starts after Hero title reveals
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const items = [
    { name: 'Appointments', icon: <Calendar />, count: '01' },
    { name: 'Diagnostics', icon: <FlaskConical />, count: '02' },
    { name: 'Specialists', icon: <Stethoscope />, count: '03' },
    { name: 'Wellness', icon: <Activity />, count: '04' },
    { name: 'Pharmacy', icon: <Pill />, count: '05' },
    { name: 'Home Care', icon: <Home />, count: '06' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 -mt-16 lg:-mt-24 relative z-40">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-0"
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.name}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            transition={hoverSpring}
            className={`
              relative group cursor-pointer overflow-hidden
              bg-white/80 backdrop-blur-2xl p-8 lg:p-10
              flex flex-col items-start justify-between
              border-r border-b border-slate-100 last:border-r-0
              ${idx === 0 ? 'rounded-tl-[3rem] rounded-bl-[3rem] lg:rounded-bl-none lg:rounded-l-[3rem]' : ''}
              ${idx === items.length - 1 ? 'rounded-tr-[3rem] rounded-br-[3rem] lg:rounded-br-none lg:rounded-r-[3rem]' : ''}
              ${idx === 2 ? 'rounded-br-[3rem] lg:rounded-none' : ''}
              ${idx === 3 ? 'rounded-tl-[3rem] lg:rounded-none' : ''}
              shadow-[0_20px_40px_rgba(0,0,0,0.03)]
              hover:bg-nova-blue transition-colors duration-500
            `}
          >
            {/* 1. BACKGROUND GRID (Only visible on hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '15px 15px' }} />

            {/* 2. THE TOP BAR (Index Number) */}
            <div className="w-full flex justify-between items-start mb-12">
              <span className="text-[10px] font-black text-slate-300 group-hover:text-white/40 transition-colors tracking-tighter">
                {item.count}
              </span>
              <div className="text-nova-sky group-hover:text-white transition-colors">
                {React.cloneElement(item.icon, { size: 22, strokeWidth: 2.5 })}
              </div>
            </div>

            {/* 3. THE TEXT */}
            <div>
              <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-nova-blue group-hover:text-white transition-colors">
                {item.name}
              </span>
              <div className="h-[2px] w-0 group-hover:w-full bg-nova-sky mt-2 transition-all duration-500" />
            </div>

            {/* 4. DECORATIVE CORNER ACCENT */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-pulse" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ListAccess;