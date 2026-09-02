import React from 'react';
import { ShieldCheck, Zap, Monitor, Home } from 'lucide-react';
import ChooseImage from '../../assets/images/ChooseImage.jpg';
import ChooseImage02 from '../../assets/images/ChooseImage02.png';
import useReveal from '../../utils/useReveal';

const ClinicalExcellence = () => {
    const [imgRef, imgVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

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
                <div ref={imgRef} className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">

                    {/* Background Decorative Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm aspect-square border-2 border-dashed border-nova-sky/20 rounded-full animate-[spin_20s_linear_infinite] -z-10" />

                    {/* Image 1: Smaller/Back */}
                    <div
                        className={`absolute left-0 lg:left-4 top-10 w-48 md:w-60 lg:w-64 h-[350px] lg:h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white z-10 transition-all duration-700 ease-out ${
                          imgVisible ? 'opacity-100 translate-x-0 -rotate-[8deg]' : 'opacity-0 -translate-x-12 -rotate-[3deg]'
                        }`}
                    >
                        <img src={ChooseImage02} alt="Lab" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>

                    {/* Image 2: Main/Front */}
                    <div
                        style={{ transitionDelay: imgVisible ? '200ms' : '0ms' }}
                        className={`relative w-56 md:w-72 lg:w-80 h-[450px] lg:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white z-20 transition-all duration-700 ease-out ${
                          imgVisible ? 'opacity-100 translate-x-0 rotate-[4deg]' : 'opacity-0 translate-x-12 rotate-[2deg]'
                        }`}
                    >
                        <img src={ChooseImage} alt="Excellence" className="w-full h-full object-cover" />

                        {/* Blueprint overlay on image */}
                        <div className="absolute inset-0 bg-nova-blue/5 pointer-events-none" />
                    </div>

                    {/* Small UI Badge Floating */}
                    <div
                        style={{ transitionDelay: imgVisible ? '450ms' : '0ms' }}
                        className={`absolute bottom-10 right-4 lg:right-10 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:block transition-all duration-500 ${
                          imgVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                        }`}
                    >
                        <p className="text-[10px] font-black text-nova-blue uppercase tracking-widest">Est. 2015</p>
                    </div>
                </div>

                {/* RIGHT SIDE: CONTENT & SNAPPY GRID */}
                <div ref={contentRef} className="flex flex-col">
                    <div
                        className={`inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm mb-8 w-fit transition-all duration-500 ${
                          contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                        }`}
                    >
                        <span className="w-2 h-2 bg-nova-sky rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-nova-blue">Clinical Excellence</span>
                    </div>

                    <h2
                        className={`text-nova-blue text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-8 tracking-tight transition-all duration-700 ease-out ${
                          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        Healthcare Built <br className="hidden md:block" /> On <span className="text-nova-sky italic font-light">Precision.</span>
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                        {features.map((item, idx) => (
                            <div
                                key={idx}
                                style={{ transitionDelay: contentVisible ? `${idx * 100}ms` : '0ms' }}
                                className={`p-7 rounded-[2rem] border border-slate-100 bg-white group hover:border-nova-sky hover:shadow-2xl hover:shadow-nova-sky/5 transition-all duration-500 ${
                                  contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                }`}
                            >
                                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-nova-blue text-md mb-2 tracking-tight uppercase tracking-widest text-xs">{item.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ClinicalExcellence;
