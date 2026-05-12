import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Monitor, Home } from 'lucide-react';
import ChooseImage from '../../assets/images/ChooseImage.jpg';
import ChooseImage02 from '../../assets/images/ChooseImage02.png';

const ClinicalExcellence = () => {
    // Hard snappy transition physics
    const hardSpring = { type: "spring", stiffness: 300, damping: 30 };

    const features = [
        { title: "Pioneering Care", desc: "West Africa's first free-standing surgery center since 2015.", icon: <ShieldCheck size={22} />, color: "text-nova-blue", bg: "bg-blue-50" },
        { title: "Minimally Invasive", desc: "Revolutionary laparoscopic techniques for faster recovery.", icon: <Zap size={22} />, color: "text-surgery-main", bg: "bg-red-50" },
        { title: "Global Expertise", desc: "Doctors with decades of experience and international training.", icon: <Monitor size={22} />, color: "text-fertility-main", bg: "bg-emerald-50" },
        { title: "Patient Focused", desc: "Unique approach drawing patients from across West Africa.", icon: <Home size={22} />, color: "text-nova-sky", bg: "bg-sky-50" }
    ];

    return (
        <section className="relative py-20 lg:py-32 px-6 bg-[#FAFBFF] font-nova overflow-hidden">
            
            {/* --- BACKGROUND ARCHITECTURE --- */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#004AAD 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

                {/* LEFT SIDE: RESPONSIVE IMAGE STACK */}
                <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
                    
                    {/* Background Decorative Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm aspect-square border-2 border-dashed border-nova-sky/20 rounded-full animate-[spin_20s_linear_infinite] -z-10" />

                    {/* Image 1: Smaller/Back */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotate: -5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -8 }}
                        viewport={{ once: true }}
                        transition={hardSpring}
                        className="absolute left-0 lg:left-4 top-10 w-48 md:w-60 lg:w-64 h-[350px] lg:h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white z-10"
                    >
                        <img src={ChooseImage02} alt="Lab" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </motion.div>

                    {/* Image 2: Main/Front */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 4 }}
                        viewport={{ once: true }}
                        transition={{ ...hardSpring, delay: 0.2 }}
                        className="relative w-56 md:w-72 lg:w-80 h-[450px] lg:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white z-20"
                    >
                        <img src={ChooseImage} alt="Excellence" className="w-full h-full object-cover" />
                        
                        {/* Blueprint overlay on image */}
                        <div className="absolute inset-0 bg-nova-blue/5 pointer-events-none" />
                    </motion.div>

                    {/* Small UI Badge Floating */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-10 right-4 lg:right-10 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:block"
                    >
                        <p className="text-[10px] font-black text-nova-blue uppercase tracking-widest">Est. 2015</p>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: CONTENT & SNAPPY GRID */}
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm mb-8 w-fit"
                    >
                        <span className="w-2 h-2 bg-nova-sky rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-nova-blue">Clinical Excellence</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={hardSpring}
                        className="text-nova-blue text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-8 tracking-tight"
                    >
                        Healthcare Built <br className="hidden md:block" /> On <span className="text-nova-sky italic font-light">Precision.</span>
                    </motion.h2>

                    <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                        {features.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, ...hardSpring }}
                                className="p-7 rounded-[2rem] border border-slate-100 bg-white group hover:border-nova-sky hover:shadow-2xl hover:shadow-nova-sky/5 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-nova-blue text-md mb-2 tracking-tight uppercase tracking-widest text-xs">{item.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ClinicalExcellence;