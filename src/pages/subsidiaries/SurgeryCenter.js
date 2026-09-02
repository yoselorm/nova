import React from 'react';
import { ShieldAlert, Clock, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import SurgeryHeroImg from '../../assets/images/facility.jpg';

const SurgeryCenter = () => {
  const specs = [
    { label: "Operating Theaters", value: "02", desc: "Ultra-modern cleanrooms" },
    { label: "Since", value: "2015", desc: "First free-standing center" },
    { label: "Recovery Suite", value: "24/7", desc: "Post-operative monitoring" },
  ];

  const procedures = [
    { title: "Laparoscopic GYN Procedures", code: "SURG-01", time: "Minimally Invasive" },
    { title: "General Surgery Procedures", code: "SURG-02", time: "Day-Care Basis" },
    { title: "Fibroid Excision & Management", code: "SURG-03", time: "Uterine Preservation" },
    { title: "Endometriosis Laparoscopic Mapping", code: "SURG-04", time: "Advanced Care" },
    { title: "Chronic Pelvic Pain Management", code: "SURG-05", time: "Specialized Therapy" },
    { title: "Uterine Prolapse Correction", code: "SURG-06", time: "Reconstructive" },
  ];

  return (
    <div className="bg-[#FAFBFF] text-slate-900 font-nova min-h-screen overflow-x-hidden">
      
      {/* 1. CINEMATIC DARK OVERLAY HERO (Consistent with other sub-pages) */}
      <section className="relative h-[85vh] w-full flex items-center px-6 bg-[#0d0404] border-b border-red-950/40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={SurgeryHeroImg} 
            alt="Nova Operating Theater" 
            className="w-full h-full object-cover opacity-25 contrast-125 scale-105 animate-slow-pan"
          />
          {/* Deep dark multi-layered crimson gradient masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0404] via-[#170908]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0404] via-transparent to-black/40" />
          
          {/* Neon Crimson Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.06]" 
               style={{ backgroundImage: 'radial-gradient(#7A1613 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-7 space-y-6">
            {/* BRAND PILL: Velvet Crimson Tag */}
            <div className="inline-flex items-center gap-3 bg-[#7A1613]/30 border border-[#9D413E]/30 px-4 py-2 rounded-full backdrop-blur-xl">
              <span className="w-2 h-2 bg-[#9D413E] rounded-full animate-pulse" />
              <span className="text-[#ffb1ae] text-[9px] font-black uppercase tracking-[0.3em]">
                Advanced Surgical Pavilion
              </span>
            </div>

            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.9] animate-fade-in-up">
                Nova Surgery <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A1613] via-[#9D653E] to-[#ffdcdb] italic font-light lowercase">center.</span>
              </h1>
            </div>

            <p className="text-slate-300 text-sm md:text-base max-w-lg font-medium leading-relaxed border-l-2 border-[#9D653E] pl-6">
              West Africa’s premier free-standing day surgery facility. Engineered for rapid recovery, clinical precision, and absolute patient privacy since 2015.
            </p>
          </div>

          {/* Right Metrics Column */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4 border-t lg:border-t-0 lg:border-l border-red-950/40 pt-8 lg:pt-0 lg:pl-12">
            {specs.map((spec, i) => (
              <div key={i} className="relative bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-md">
                <p className="text-[#9D653E] text-[10px] font-black tracking-widest uppercase mb-1">// {spec.label}</p>
                <div className="flex items-baseline gap-4">
                  <p className="text-3xl md:text-5xl font-black tracking-tight text-white">{spec.value}</p>
                  <p className="text-slate-400 text-xs font-medium leading-tight">{spec.desc}</p>
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
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#7A1613] block">Core Advantage</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter leading-tight">
            Why Specialists Choose <br />Our Free-Standing Suites.
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
            Nova operates independently of standard tertiary wards. This structural segregation eliminates cross-infection hazards common in crowded environments, guaranteeing a pristine sterile setting dedicated strictly to elective surgical tasks.
          </p>
          
          <div className="w-fit p-6 bg-[#7A1613]/5 border border-[#7A1613]/10 rounded-2xl flex items-center gap-4">
             <Activity className="text-[#9D653E] animate-pulse" size={24} />
             <div className="text-left">
                <p className="text-xs font-black text-[#7A1613] uppercase tracking-widest">Zero-Hops Sterile Supply</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Direct routing to localized anesthesia logs.</p>
             </div>
          </div>
        </div>

        {/* Right Side Image Block Frame */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-[#7A1613]/5 rounded-[3.5rem] border border-slate-100 translate-x-4 translate-y-4 -z-10" />
          
          <div className="relative group overflow-hidden rounded-[3.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
            {/* Primary embedded structural image container */}
            <div className="h-[420px] w-full bg-slate-100">
              <img 
                src={SurgeryHeroImg} 
                alt="Nova Operating Room Setup" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Floating info dashboard panel overlay */}
            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-white via-white/95 to-white/40 border-t border-slate-100 backdrop-blur-sm space-y-3">
              <div className="w-10 h-10 bg-[#7A1613]/5 border border-[#7A1613]/10 text-[#7A1613] rounded-xl flex items-center justify-center">
                <ShieldAlert size={18} />
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">Minimally Invasive Philosophy</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-xs">
                By deploying elite laparoscopic infrastructure, our specialists minimize tissue trauma and drastically shorten recovery windows.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700"><ShieldCheck size={14} className="text-[#9D413E]" /> Gas Insufflation</div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700"><Clock size={14} className="text-[#9D413E]" /> Reduced Stay Paths</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SURGICAL PROCEDURE DIRECTORY (Clean Light Style Layout) */}
      <section className="py-28 bg-white text-slate-950 rounded-t-[5rem] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#7A1613]" />
                <span className="text-[10px] font-black text-[#7A1613] uppercase tracking-[0.3em]">Directory Log</span>
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
            {procedures.map((proc, index) => (
              <div 
                key={index}
                className="group border border-slate-100 p-8 rounded-[2rem] bg-slate-50 flex items-center justify-between hover:bg-slate-900 hover:border-slate-900 transition-all duration-500 cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-black text-slate-300 group-hover:text-[#9D573E] transition-colors tracking-tight">{proc.code}</span>
                    <span className="text-[9px] font-black bg-red-50 text-[#7A1613] group-hover:bg-[#7A1613] group-hover:text-white px-2 py-0.5 rounded uppercase tracking-wider transition-colors">{proc.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-white transition-colors tracking-tight">
                    {proc.title}
                  </h4>
                </div>
                
                {/* Brand Hover Circle Indicator */}
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#7A1613] group-hover:border-[#7A1613] group-hover:text-white transition-all transform group-hover:rotate-45">
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Bottom Box - Dark Slate block with high contrast crimson elements */}
          <div className="mt-16 p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl shadow-slate-950/20">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#7A1613] flex items-center justify-center text-white font-black shadow-lg shadow-red-900/30">
                !
              </div>
              <div>
                <h4 className="font-black tracking-tight text-lg uppercase tracking-wider">Referring Practitioner Access</h4>
                <p className="text-white/40 text-xs font-medium mt-0.5">Secure clinical document logs for diagnostics and theater booking.</p>
              </div>
            </div>
            
            <button className="bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-xl shadow-md hover:bg-[#9D653E] hover:text-white transition-colors whitespace-nowrap">
              Inquire Theatre Space
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default SurgeryCenter;