import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Monitor, Home, Play } from 'lucide-react';
import ChooseImage from '../../assets/images/ChooseImage.jpg';
import ChooseImage02 from '../../assets/images/ChooseImage02.png';

const ClinicalExcellence = () => {
    const features = [
        {

            title: "Pioneering Care",

            desc: "West Africa's first free-standing surgery center since 2015.",

            icon: <ShieldCheck size={24} />,

            color: "text-nova-blue",

            bg: "bg-blue-50"

        },

        {

            title: "Minimally Invasive",

            desc: "Revolutionary laparoscopic techniques for faster recovery.",

            icon: <Zap size={24} />,

            color: "text-surgery-main",

            bg: "bg-red-50"

        },

        {

            title: "Global Expertise",

            desc: "Doctors with decades of experience and international training.",

            icon: <Monitor size={24} />,

            color: "text-fertility-main",

            bg: "bg-emerald-50"

        },

        {

            title: "Patient Focused",

            desc: "Unique approach drawing patients from across West Africa.",

            icon: <Home size={24} />,

            color: "text-nova-sky",

            bg: "bg-sky-50"

        }
    ];

    return (
        <section className="relative py-32 px-6 bg-[#FAFBFF] font-nova overflow-hidden">

            {/* --- ARCHITECTURAL WALL DESIGNS --- */}
            {/* 1. Large Topographic/Geometric Curve */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] overflow-hidden">
                <svg viewBox="0 0 1000 1000" className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%]">
                    <circle cx="500" cy="500" r="400" fill="none" stroke="#004AAD" strokeWidth="1" />
                    <circle cx="500" cy="500" r="350" fill="none" stroke="#004AAD" strokeWidth="0.5" />
                    <circle cx="500" cy="500" r="300" fill="none" stroke="#004AAD" strokeWidth="0.2" />
                </svg>
            </div>

            {/* 2. Professional Dot Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.2] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#004AAD 1px, transparent 1px)', backgroundSize: '45px 45px' }} />

            {/* 3. Side Structural Accent */}
            <div className="absolute right-0 top-1/4 w-1 bg-gradient-to-b from-transparent via-nova-sky/20 to-transparent h-1/2 hidden lg:block" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">

                {/* LEFT SIDE: Tilted Images Layout with Structural Frames */}
                <div className="relative flex items-center justify-center py-10">

                    {/* Back "Architectural" Frame */}
                    <div className="absolute top-0 left-10 w-4/5 h-full border border-slate-200 rounded-[4rem] -z-10 translate-x-4 -translate-y-4" />

                    {/* Image 1: Tilted Left */}
                    <motion.div
                        initial={{ opacity: 0, rotate: -12, x: -40 }}
                        whileInView={{ opacity: 1, rotate: -8, x: 0 }}
                        viewport={{ once: true }}
                        className="w-64 h-[420px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[12px] border-white z-10"
                    >
                        <img src={ChooseImage02} alt="Lab" className="w-full  object-cover" />
                    </motion.div>

                    {/* Image 2: Tilted Right */}
                    <motion.div
                        initial={{ opacity: 0, rotate: 12, x: 40 }}
                        whileInView={{ opacity: 1, rotate: 6, x: 0 }}
                        viewport={{ once: true }}
                        className="w-72 h-[500px] -ml-20 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-[12px] border-white z-20"
                    >
                        <img src={ChooseImage} alt="Excellence" className="w-full h-[500px] object-cover" />

                        {/* Play Video Overlay Badge */}
                        {/* <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-nova-blue/80 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer group"
                        >
                            <Play size={32} fill="currentColor" className="ml-2" />
                            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                        </motion.div> */}
                    </motion.div>
                </div>

                {/* RIGHT SIDE: Content & Grid */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-4 py-2 bg-nova-sky/10 rounded-lg border border-nova-sky/20 mb-6"
                    >
                        <div className="w-2 h-2 bg-nova-sky rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-nova-blue">About Us</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-nova-blue text-4xl md:text-5xl font-bold leading-[1.1] mb-6 tracking-tight"
                    >
                        We Bring Healthcare Closer <br />to
                        you with <span className="text-blue-600">Professionalism & Care.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-slate-400 mb-12 max-w-xl font-medium leading-relaxed"
                    >
                        We aim to provide faster diagnosis, clearer insights, and more accurate treatment
                        decisions ensuring every patient receives safe, precise, and personalized care.
                    </motion.p>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {features.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-[2.5rem] border border-slate-100 bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-200/20 relative overflow-hidden group hover:bg-white transition-all duration-500"
                            >
                                {/* Internal Card Grid Pattern */}
                                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#004AAD_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>

                                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all`}>
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-nova-blue text-lg mb-3 tracking-tight">{item.title}</h4>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
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