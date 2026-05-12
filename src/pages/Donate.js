import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, Star, Zap } from 'lucide-react';

const DonatePage = () => {
  const [amount, setAmount] = useState('500');
  const [customAmount, setCustomAmount] = useState('');

  // Snappy "Hard" Animation Physics
  const snappyTransition = { type: "spring", stiffness: 500, damping: 30 };

  const impactTiers = [
    { label: "Seed", ghs: "100", desc: "Initiate local change.", icon: <Star size={20} /> },
    { label: "Growth", ghs: "500", desc: "Expand our reach.", icon: <Zap size={20} /> },
    { label: "Legacy", ghs: "2000", desc: "Build for the future.", icon: <Globe size={20} /> },
  ];

  return (
    <main className="relative min-h-screen w-full font-nova overflow-hidden flex items-center justify-center py-20">
      
      {/* 1. THE "HEAVY" WALL BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/heavy-concrete-wall.jpg" // Use a heavy textured architectural wall image
          className="w-full h-full object-cover grayscale contrast-125"
          alt="Wall Design"
        />
        {/* Dark Architectural Tint */}
        <div className="absolute inset-0 bg-slate-950/85 mix-blend-multiply" />
        
        {/* 2. NOTICEABLE BLUEPRINT OVERLAY (The "Wall Design") */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Large Abstract Geometric Shapes */}
          <circle cx="90%" cy="10%" r="300" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="5%" y="40%" width="400" height="400" fill="none" stroke="white" strokeWidth="0.5" transform="rotate(45 200 400)" />
        </svg>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: TEXT (Hard Entrance) */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={snappyTransition}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[3px] bg-nova-sky" />
            <span className="text-nova-sky font-black uppercase tracking-[0.5em] text-[10px]">Support the vision</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8">
            Build The <br /> <span className="text-nova-sky italic font-light">Vision.</span>
          </h1>
          <p className="text-white/40 text-lg font-medium max-w-md leading-relaxed">
            Support Nova Healthcare's expansion and help us provide elite medical care across the region.
          </p>
          
          {/* Snappy Impact Tiers */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {impactTiers.map((tier, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, borderColor: "#00E5FF" }}
                onClick={() => {setAmount(tier.ghs); setCustomAmount('');}}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${amount === tier.ghs ? 'border-nova-sky bg-nova-sky/5' : 'border-white/10 bg-white/5'}`}
              >
                <div className="text-nova-sky mb-2">{tier.icon}</div>
                <p className="text-[10px] font-black uppercase text-white/40 mb-1">{tier.label}</p>
                <p className="text-lg font-black text-white">₵{tier.ghs}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: THE FORM (Hard Popup) */}
        <motion.div 
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={snappyTransition}
          className="bg-white p-10 md:p-14 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative"
        >
          <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-8">Make your contribution</h3>
          
          <div className="space-y-6">
            {/* Optional Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                placeholder="Name (Optional)" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm outline-none focus:border-nova-blue transition-all"
              />
              <input 
                placeholder="Email (Optional)" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm outline-none focus:border-nova-blue transition-all"
              />
            </div>

            {/* Cedi Input */}
            <div className="relative group">
              <span className="absolute left-8 top-1/2 -translate-y-1/2 text-nova-blue font-black text-2xl">₵</span>
              <input 
                type="number"
                placeholder="0.00"
                value={customAmount || amount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(e.target.value); }}
                className="w-full bg-slate-950 text-white border-none rounded-[2.5rem] pl-16 pr-8 py-8 text-4xl font-black focus:ring-4 ring-nova-sky/20 transition-all outline-none"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex gap-3">
              {['200', '500', '1000', '5000'].map((val) => (
                <button
                  key={val}
                  onClick={() => { setAmount(val); setCustomAmount(''); }}
                  className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    amount === val && !customAmount ? 'bg-nova-blue text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  ₵{val}
                </button>
              ))}
            </div>

            {/* Hard Animated Button */}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#00E5FF" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-nova-blue text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-colors shadow-xl shadow-blue-900/20"
            >
              Confirm Donation <ArrowRight size={18} />
            </motion.button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest pt-4">
              <ShieldCheck size={14} className="text-nova-sky" /> Secured by Nova Merchant
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
};

export default DonatePage;