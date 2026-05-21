import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Microscope, Sparkles, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

// Centralized dynamic image imports matching requested asset allocations
import MenopauseImg from '../../assets/images/fertilityImg.jpg';
import CancerScreeningImg from '../../assets/images/fertilityImg.jpg';
import ExecutivePhysicalImg from '../../assets/images/fertilityImg.jpg';
import GeneralGynImg from '../../assets/images/fertilityImg.jpg';
import FamilyPlanningImg from '../../assets/images/fertilityImg.jpg';
import FibroidsImg from '../../assets/images/fertilityImg.jpg';
import AmbulanceImg from '../../assets/images/fertilityImg.jpg';
import LabServicesImg from '../../assets/images/fertilityImg.jpg';
import PharmacyImg from '../../assets/images/fertilityImg.jpg';
import WellnessImg from '../../assets/images/fertilityImg.jpg';

const FertilityCenter = () => {
  const masterEase = [0.16, 1, 0.3, 1];

  const features = [
    { label: "Lab Grade", value: "Class-10", desc: "Cleanroom containment standard" },
    { label: "Monitoring", value: "24/7", desc: "Continuous incubation telemetry" },
    { label: "Logistics", value: "Direct", desc: "On-site pharmacy & diagnostics" },
  ];

  const sections = [
    { title: "Menopause Management", code: "FERT-A1", tag: "Hormonal Care", img: MenopauseImg, desc: "Specialized diagnostics and systemic therapy logs for transitional health." },
    { title: "Breast & Cervical Cancer Screening", code: "FERT-A2", tag: "Preventive Screening", img: CancerScreeningImg, desc: "High-resolution diagnostic loops and early intervention oncology screenings." },
    { title: "Executive Physical Suites", code: "FERT-A3", tag: "Comprehensive", img: ExecutivePhysicalImg, desc: "Elite diagnostic monitoring and personalized cardiovascular/metabolic stress mapping." },
    { title: "General Women's Health Gynecology", code: "FERT-B1", tag: "Core Clinical", img: GeneralGynImg, desc: "Routine and expert investigative pathways covering all reproductive lifecycles." },
    { title: "Fertility & Family Planning", code: "FERT-B2", tag: "Reproductive Lab", img: FamilyPlanningImg, desc: "Male and female pathfinding protocols featuring ovulation induction and IUI." },
    { title: "Fibroids: Diagnosis & Management", code: "FERT-B3", tag: "Uterine Integrity", img: FibroidsImg, desc: "Advanced imaging and uterine-preservation focused therapy parameters." },
    { title: "Laboratory Services", code: "FERT-C1", tag: "Pathology Log", img: LabServicesImg, desc: "Integrated clinical pathology, semen analysis, and hormonal assay mapping." },
    { title: "Nova Pharmacy Department", code: "FERT-C2", tag: "Cold-Chain", img: PharmacyImg, desc: "Direct dispensing of specialized high-potency and cold-chain fertility compounds." },
    { title: "Wellness & Preventive Medicine", code: "FERT-C3", tag: "Longevity", img: WellnessImg, desc: "Proactive, multi-tier immune and metabolic optimization frameworks." },
    { title: "Private Medical Ambulance Services", code: "FERT-D1", tag: "Emergency Log", img: AmbulanceImg, desc: "24/7 dedicated critical care transport and synchronized triage routing." }
  ];

  return (
    <div className="bg-[#FAFBFF] text-slate-900 font-nova min-h-screen overflow-x-hidden">
      
      {/* 1. CINEMATIC DARK OVERLAY HERO (Page body is light, but Hero remains deep & rich) */}
      <section className="relative h-[85vh] w-full flex items-center px-6 bg-[#030d0a] border-b border-emerald-950/40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={FamilyPlanningImg} 
            alt="Nova Fertility Architecture" 
            className="w-full h-full object-cover opacity-25 contrast-125 scale-105 animate-slow-pan"
          />
          {/* Deep dark multi-layered green gradient masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030d0a] via-[#051410]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030d0a] via-transparent to-black/40" />
          
          {/* Neon Emerald Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.06]" 
               style={{ backgroundImage: 'radial-gradient(#009774 1.5px, transparent 1.5px)', backgroundSize: '45px 45px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-7 space-y-6">
            {/* BRAND PILL: Velvet Emerald Tag */}
            <div className="inline-flex items-center gap-3 bg-[#009774]/20 border border-[#009774]/30 px-4 py-2 rounded-full backdrop-blur-xl">
              <span className="w-2 h-2 bg-[#8BEE07] rounded-full animate-pulse" />
              <span className="text-[#a1ffd6] text-[9px] font-black uppercase tracking-[0.3em]">
                Advanced Embryology & Reproductive Institute
              </span>
            </div>

            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: masterEase }}
                className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.9]"
              >
                Nova <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009774] via-[#6ac305] to-[#c7ffcf] italic font-light lowercase">fertility.</span>
              </motion.h1>
            </div>

            <p className="text-slate-300 text-sm md:text-base max-w-lg font-medium leading-relaxed border-l-2 border-[#009774] pl-6">
              A comprehensive clinical ecosystem engineered for absolute fertility precision. Unifying world-class reproductive medicine, diagnostics, and customized treatment pipelines into a singular, high-performance center.
            </p>
          </div>

          {/* Right Metrics Column */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4 border-t lg:border-t-0 lg:border-l border-emerald-950/40 pt-8 lg:pt-0 lg:pl-12">
            {features.map((feat, i) => (
              <div key={i} className="relative bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-md">
                <p className="text-[#6ac305] text-[10px] font-black tracking-widest uppercase mb-1">// {feat.label}</p>
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
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#009774] block">Science of Hope</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter leading-tight">
            Integrated Reproductive <br />Diagnostics & Architecture.
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
            By embedding laboratory diagnostics, diagnostic radiology, specialized gynecology, and a high-integrity cold-chain pharmacy under one continuous operational roof, we maximize diagnostic communication speed and maintain strict biological safeguards.
          </p>
          
          <div className="w-fit p-6 bg-[#009774]/5 border border-[#009774]/10 rounded-2xl flex items-center gap-4">
             <Activity className="text-[#009774] animate-pulse" size={24} />
             <div className="text-left">
                <p className="text-xs font-black text-[#009774] uppercase tracking-widest">Coordinated Clinical Workflows</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Real-time telemetry links across all clinical quadrants.</p>
             </div>
          </div>
        </div>

        {/* Right Side Image Block Frame */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-[#009774]/5 rounded-[3.5rem] border border-slate-100 translate-x-4 translate-y-4 -z-10" />
          
          <div className="relative group overflow-hidden rounded-[3.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
            {/* Primary embedded structural image container */}
            <div className="h-[420px] w-full bg-slate-100">
              <img 
                src={FamilyPlanningImg} 
                alt="Nova Reproductive Depot" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Floating info dashboard panel overlay */}
            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-white via-white/95 to-white/40 border-t border-slate-100 backdrop-blur-sm space-y-3">
              <div className="w-10 h-10 bg-[#009774]/5 border border-[#009774]/10 text-[#009774] rounded-xl flex items-center justify-center">
                <Microscope size={18} />
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">Patient-Centered Paths</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-xs">
                Our clinical facility is optimized for patient flow and security. Every screening suite, diagnostic laboratory, and pharmacy window functions as an interconnected hub.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700"><ShieldCheck size={14} className="text-[#009774]" /> Integrated Frameworks</div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700"><Sparkles size={14} className="text-[#009774]" /> Ovulation Telemetry</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE VISUAL BLUEPRINT CATALOG (Clean White Background Directory) */}
      <section className="py-28 bg-white text-slate-950 rounded-t-[5rem] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#009774]" />
                <span className="text-[10px] font-black text-[#009774] uppercase tracking-[0.3em]">Facility Directory Log</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                Clinical Departments.
              </h2>
            </div>
            <p className="text-slate-400 text-xs font-medium max-w-xs leading-relaxed">
              An itemized overview of the operational units running inside Nova Fertility Center's centralized ecosystem.
            </p>
          </div>

          {/* Clean Picture-Heavy List Board Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((item, index) => (
              <div 
                key={index}
                className="group border border-slate-100 rounded-[2.5rem] bg-slate-50 overflow-hidden flex flex-col sm:flex-row items-stretch hover:bg-slate-900 hover:border-slate-900 transition-all duration-500 cursor-pointer"
              >
                {/* Fixed Image Quadrant Box */}
                <div className="sm:w-2/5 min-h-[200px] relative overflow-hidden bg-slate-200">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-[#009774]/10 opacity-30 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Content Details */}
                <div className="p-8 sm:w-3/5 flex flex-col justify-between items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] font-black text-slate-300 group-hover:text-[#8BEE07] transition-colors tracking-tight">{item.code}</span>
                      <span className="text-[9px] font-black bg-emerald-50 text-[#009774] group-hover:bg-[#009774] group-hover:text-white px-2 py-0.5 rounded uppercase tracking-wider transition-colors">{item.tag}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-xl group-hover:text-white transition-colors tracking-tight mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed group-hover:text-slate-300/80 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  {/* Action Row */}
                  <div className="flex items-center gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                    <span className="text-[9px] font-black uppercase text-[#8BEE07] tracking-widest">View Operations</span>
                    <ArrowRight size={12} className="text-[#8BEE07]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Integration Box */}
          <div className="mt-20 p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl shadow-slate-950/20">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#009774] flex items-center justify-center text-white font-black shadow-lg shadow-emerald-900/20">
                <Heart size={20} />
              </div>
              <div>
                <h4 className="font-black tracking-tight text-lg uppercase tracking-wider">Referring Practitioner Access</h4>
                <p className="text-white/40 text-xs font-medium mt-0.5">Secure, automated pipeline logs for patient data tracking and diagnostic requests.</p>
              </div>
            </div>
            <button className="bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-xl shadow-md hover:bg-[#8BEE07] hover:text-[#009774] transition-all whitespace-nowrap">
              Inquire Center Capacity
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default FertilityCenter;