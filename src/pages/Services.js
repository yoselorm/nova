import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck, Microscope, Plus } from 'lucide-react';

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    { title: "Menopause Management", detail: "Comprehensive hormonal assessment, personalized therapy plans, and bone density monitoring for a seamless transition." },
    { title: "Breast & Cervical Screening", detail: "Advanced diagnostic imaging and cytology to ensure early detection and preventive oncology care." },
    { title: "Executive Physical", detail: "Tailored full-body diagnostics designed for busy professionals, including cardiac and metabolic stress testing." },
    { title: "General Gynecology", detail: "Routine wellness exams, reproductive health counseling, and management of acute gynecological conditions." },
    { title: "Diagnostic Radiology", detail: "High-resolution X-ray and ultrasound scanning for precise internal visualization and rapid diagnosis." },
    { title: "Endometriosis Care", detail: "Specialized medical management and laparoscopic mapping for chronic pelvic pain and fertility preservation." },
    { title: "Fertility & Family Planning", detail: "Holistic reproductive support for couples, including ovulation induction and contraceptive counseling." },
    { title: "Fibroid Management", detail: "Minimally invasive treatment options focusing on uterine preservation and rapid symptom relief." },
    { title: "General Medical Care", detail: "Expert management of chronic conditions such as Diabetes, Hypertension, and Kidney Disease." },
    { title: "Pharmacy Services", detail: "On-site prescription fulfillment with dedicated counseling and medication therapy management." },
    { title: "Wellness & Preventive", detail: "Proactive health strategies focusing on nutrition, lifestyle modification, and long-term vitality." },
    { title: "Laboratory Services", detail: "State-of-the-art pathology and blood analysis with rapid digital results integration." },
  ];

  return (
    <section className="relative min-h-screen py-24 bg-[#FAFBFF] overflow-hidden font-nova">
      
      {/* --- ARCHITECTURAL WALL BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(#004AAD 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} />
        {/* Large Decorative SVG Curve */}
        <svg className="absolute -top-24 -right-24 w-1/2 opacity-[0.05] text-nova-blue" viewBox="0 0 200 200">
          <path fill="currentColor" d="M45,-76.3C58.1,-69.5,68.4,-56.3,75.4,-41.8C82.4,-27.3,86.1,-11.5,85.2,4.1C84.3,19.6,78.8,35,69.5,47.8C60.2,60.6,47,70.8,32.3,77.1C17.6,83.4,1.4,85.8,-15.5,83.4C-32.3,81,-49.7,73.8,-63,61.5C-76.3,49.2,-85.4,31.7,-88.4,13.7C-91.4,-4.3,-88.3,-22.8,-79.8,-38.7C-71.3,-54.6,-57.4,-67.9,-42,-73.8C-26.6,-79.7,-9.6,-78.2,4.5,-76.1C18.6,-74,31.9,-83,45,-76.3Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-12 h-[2px] bg-nova-sky" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-nova-blue">Medical Catalog</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-nova-blue tracking-tighter leading-[0.9]"
          >
            Our Specialist <br /> 
            <span className="text-nova-sky italic font-light italic">Clinical Services.</span>
          </motion.h2>
        </div>

        {/* THE SERVICES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-100">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative p-10 lg:p-14 border-r border-b border-slate-100 bg-white group cursor-pointer overflow-hidden transition-colors duration-500 hover:bg-nova-blue"
            >
              {/* Animated Background Index Number */}
              <span className="absolute top-10 right-10 text-4xl font-black text-slate-50 group-hover:text-white/10 transition-colors">
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Icon / Decor */}
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-nova-sky transition-colors">
                <Plus size={20} className="text-nova-blue group-hover:text-white transition-all group-hover:rotate-90" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-nova-blue mb-4 leading-tight group-hover:text-white transition-colors max-w-[80%]">
                {service.title}
              </h3>

              {/* Description (Slide-up Reveal) */}
              <div className="relative overflow-hidden">
                <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-white/70 transition-colors transform translate-y-2 group-hover:translate-y-0 duration-500">
                  {service.detail}
                </p>
              </div>

              {/* CTA Line */}
              <div className="mt-10 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-nova-sky">Inquire Detail</span>
                <ArrowRight size={14} className="text-nova-sky" />
              </div>

              {/* Structural Corner Detail */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-nova-sky scale-0 group-hover:scale-100 transition-transform origin-bottom-right" />
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-12 rounded-[3rem] bg-nova-blue text-white flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h4 className="text-3xl font-black tracking-tight mb-2">Need a Specialized Consultation?</h4>
            <p className="text-white/60 font-medium">Our clinical experts are available for detailed sessions.</p>
          </div>
          <button className="bg-nova-sky text-nova-blue px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs whitespace-nowrap hover:scale-105 transition-transform">
            Book Appointment
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;