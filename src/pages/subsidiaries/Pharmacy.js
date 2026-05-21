import React from 'react';
import { motion } from 'framer-motion';
import { Pill, ShieldCheck, Clock, FileText, ArrowRight, Activity, Layers } from 'lucide-react';
import PharmacyHeroImg from '../../assets/images/facility.jpg';

const Pharmacy = () => {
  const masterEase = [0.16, 1, 0.3, 1];

  const features = [
    { label: "Sourcing Integrity", value: "100%", desc: "Direct manufacturer sourcing logs" },
    { label: "Fulfillment Pace", value: "<10m", desc: "Average wait time parameters" },
    { label: "Clinical Staff", value: "24/7", desc: "Licensed pharmacists on call" },
  ];

  const services = [
    { title: "Prescription Dispensing", code: "PHAR-01", tag: "Acute & Chronic" },
    { title: "Medication Therapy Management", code: "PHAR-02", tag: "Consultation" },
    { title: "Specialist Fertility Drugs", code: "PHAR-03", tag: "Cold-Chain Logged" },
    { title: "Compounding Services", code: "PHAR-04", tag: "Custom Dosage" },
    { title: "Preventive & Wellness Care", code: "PHAR-05", tag: "OTC Formulary" },
    { title: "Institutional Supply", code: "PHAR-06", tag: "Corporate Logistics" },
  ];

  return (
    <div className="bg-[#FAFBFF] text-slate-900 font-nova min-h-screen overflow-x-hidden">
      
      {/* 1. CINEMATIC DARK OVERLAY HERO (Page body is white/light, but Hero stays deep & rich) */}
      <section className="relative h-[85vh] w-full flex items-center px-6 bg-[#090514] border-b border-purple-950/40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={PharmacyHeroImg} 
            alt="Nova Dispensary Grid" 
            className="w-full h-full object-cover opacity-25 contrast-125 scale-105 animate-slow-pan"
          />
          {/* Deep dark multi-layered gradient masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090514] via-[#0d091f]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090514] via-transparent to-black/40" />
          
          {/* Neon Purple Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.06]" 
               style={{ backgroundImage: 'radial-gradient(#9965DF 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-7 space-y-6">
            {/* BRAND PILL: Velvet Lavender Tag */}
            <div className="inline-flex items-center gap-3 bg-[#5B2897]/30 border border-[#9965DF]/30 px-4 py-2 rounded-full backdrop-blur-xl">
              <span className="w-2 h-2 bg-[#9965DF] rounded-full animate-pulse" />
              <span className="text-[#c4a1ff] text-[9px] font-black uppercase tracking-[0.3em]">
                Fully Licensed Institutional Formulary
              </span>
            </div>

            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: masterEase }}
                className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.9]"
              >
                Nova <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b46e5] via-[#a873f0] to-[#e4d5ff] italic font-light lowercase">pharmacy.</span>
              </motion.h1>
            </div>

            <p className="text-slate-300 text-sm md:text-base max-w-lg font-medium leading-relaxed border-l-2 border-[#5B2897] pl-6">
              A meticulously engineered dispensing pavilion. Supplying certified, high-potency pharmaceuticals and cold-chain clinical components directly integrated with the main hospital wings.
            </p>
          </div>

          {/* Right Metrics Column */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4 border-t lg:border-t-0 lg:border-l border-purple-950/40 pt-8 lg:pt-0 lg:pl-12">
            {features.map((feat, i) => (
              <div key={i} className="relative bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-md">
                <p className="text-[#a873f0] text-[10px] font-black tracking-widest uppercase mb-1">// {feat.label}</p>
                <div className="flex items-baseline gap-4">
                  <p className="text-3xl md:text-5xl font-black tracking-tight text-white">{feat.value}</p>
                  <p className="text-slate-400 text-xs font-medium leading-tight">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STRUCTURAL CORE INTEGRITY LAYOUT (Clean White Background) */}
      <section className="py-28 max-w-7xl mx-auto px-6 bg-transparent grid lg:grid-cols-12 gap-16 items-center">
        {/* Left Side Content Parameters */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5B2897] block">Safety Architecture</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter leading-tight">
            Cold-Chain Preservation & <br />Counterfeit Elimination.
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
            Every batch within the Nova Pharmacy ecosystem undergoes strict serial logs upon arrival. Special focus is directed toward our cold-chain infrastructure, ensuring critical fertility medications and delicate surgical compounds retain perfect clinical efficacy.
          </p>
          
          <div className="w-fit p-6 bg-[#5B2897]/5 border border-[#5B2897]/10 rounded-2xl flex items-center gap-4">
             <Activity className="text-[#7D36DD] animate-pulse" size={24} />
             <div className="text-left">
                <p className="text-xs font-black text-[#5B2897] uppercase tracking-widest">Continuous Climate Logs</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Constant telemetry on preservation compartments.</p>
             </div>
          </div>
        </div>

        {/* Right Side Image Block Frame */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-[#5B2897]/5 rounded-[3.5rem] border border-slate-100 translate-x-4 translate-y-4 -z-10" />
          
          <div className="relative group overflow-hidden rounded-[3.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
            {/* Primary embedded structural image container */}
            <div className="h-[420px] w-full bg-slate-100">
              <img 
                src={PharmacyHeroImg} 
                alt="Nova Cold-Chain Depot" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Floating info dashboard panel overlay */}
            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-white via-white/95 to-white/40 border-t border-slate-100 backdrop-blur-sm space-y-3">
              <div className="w-10 h-10 bg-[#5B2897]/5 border border-[#5B2897]/10 text-[#5B2897] rounded-xl flex items-center justify-center">
                <Pill size={18} />
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">Patient-First Dispensing</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-xs">
                Our clinical workflow eliminates long lines. We balance rapid delivery pipelines with detailed, one-on-one pharmaceutical consultations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700"><ShieldCheck size={14} className="text-[#7D36DD]" /> Multi-Tier Audits</div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700"><Clock size={14} className="text-[#7D36DD]" /> Express Refill Intercepts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CENTER GRAPHIC INTERMISSION MATRIX (Full Width Picture Break with Overlay) */}
      <section className="w-full h-[40vh] relative border-y border-slate-100 bg-slate-950 overflow-hidden">
        <img 
          src={PharmacyHeroImg} 
          alt="Clinical Operations Break" 
          className="w-full h-full object-cover opacity-35 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="absolute inset-0 bg-slate-950/40" /> {/* Dark shading layer just for readability */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2 px-6">
            <Layers className="text-white mx-auto mb-4 animate-pulse" size={32} />
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white drop-shadow-md">Direct Integration</h3>
            <p className="text-white/80 text-xs max-w-md mx-auto font-medium drop-shadow-sm">Formulary routing pipes sync immediately with Emergency, Surgery, and Fertility wards for lag-free deployment.</p>
          </div>
        </div>
      </section>

      {/* 4. THE PHARMACEUTICAL DIRECTORY (Clean Light Style Layout) */}
      <section className="py-28 bg-white text-slate-950 rounded-t-[5rem] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#5B2897]" />
                <span className="text-[10px] font-black text-[#5B2897] uppercase tracking-[0.3em]">Directory Log</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                Clinical Catalog.
              </h2>
            </div>
            <p className="text-slate-400 text-xs font-medium max-w-xs leading-relaxed">
              Standardized outpatient and day-care configurations matching global protocol criteria.
            </p>
          </div>

          {/* Clean List Board Array */}
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((item, index) => (
              <div 
                key={index}
                className="group border border-slate-100 p-8 rounded-[2rem] bg-slate-50 flex items-center justify-between hover:bg-slate-900 hover:border-slate-900 transition-all duration-500 cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-black text-slate-300 group-hover:text-[#9965DF] transition-colors tracking-tight">{item.code}</span>
                    <span className="text-[9px] font-black bg-purple-50 text-[#5B2897] group-hover:bg-[#5B2897] group-hover:text-white px-2 py-0.5 rounded uppercase tracking-wider transition-colors">{item.tag}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-white transition-colors tracking-tight">
                    {item.title}
                  </h4>
                </div>
                
                {/* Brand Hover Circle Indicator */}
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#5B2897] group-hover:border-[#5B2897] group-hover:text-white transition-all transform group-hover:rotate-45">
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Bottom Box - Dark Slate block with high contrast purple elements */}
          <div className="mt-16 p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl shadow-slate-950/20">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#5B2897] flex items-center justify-center text-white font-black shadow-lg shadow-purple-900/30">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-black tracking-tight text-lg uppercase tracking-wider">Corporate & Insurance Logs</h4>
                <p className="text-white/40 text-xs font-medium mt-0.5">Streamlined direct-billing workflows with corporate healthcare providers.</p>
              </div>
            </div>
            
            <button className="bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-xl shadow-md hover:bg-[#7D36DD] hover:text-white transition-colors whitespace-nowrap">
              Submit Prescription Log
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Pharmacy;