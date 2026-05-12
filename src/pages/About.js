import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, ArrowUpRight, Users, Zap, ShieldCheck } from 'lucide-react';
import CinematicHero from '../components/About/AboutHero';
import NovaHistoryImg from '../assets/images/Novahistory02.jpg';
import facilityImg from '../assets/images/facility.jpg';
import FrancisImg from '../assets/images/francis.jpg';
import CharleneImg from '../assets/images/Charlene.jpg';
import IsaacImg from '../assets/images/Isaac.jpg';
import VioletImg from '../assets/images/Violet.jpg';
import AmadeaImg from '../assets/images/Amadea.jpg';
import EmilyImg from '../assets/images/Emily.jpg';

const About = () => {
  const specialists = [
    { name: "Francis D Dickson", role: "MD FACOG", img: FrancisImg },
    { name: "Charlene Annor", role: "MD", img: CharleneImg },
    { name: "Isaac Baidoo", role: "MD", img: IsaacImg },
    { name: "Violet Habwe", role: "MD", img: VioletImg },
    { name: "Amadea Tetteh", role: "MD", img: AmadeaImg },
    { name: "Emily M Nwankwo", role: "Business Development and Capacity Building", img: EmilyImg },
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className="bg-white font-nova overflow-hidden">
        
      <CinematicHero/>
      {/* --- SECTION 1: THE TEAM HERO (Short & Impactful) --- */}
      <section className="relative pt-32 pb-20 px-6 border-b border-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <span className="p-2 bg-nova-blue/10 rounded-lg text-nova-blue"><Users size={18} /></span>
              <span className="text-nova-blue font-black uppercase tracking-[0.4em] text-[10px]">World Class Staff</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900">
              Compassionate <br /> <span className="text-nova-sky italic font-light">Expertise.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
              Our doctors possess a wealth of experience from decades of practice, bringing extraordinary knowledge gained abroad to Nova Surgery Center.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }}
            className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {specialists.map((doc, i) => (
              <motion.div 
                key={i} variants={fadeInUp} whileHover={{ y: -10 }}
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-lg"
              >
                <img src={doc.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" alt={doc.name} />
                <div className="absolute inset-0 bg-nova-blue/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl">
                    <p className="text-[9px] font-black uppercase tracking-widest text-nova-sky">{doc.role}</p>
                    <p className="text-xs font-black text-slate-900">{doc.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: HISTORY & VISION (The "Wall Design" Layout) --- */}
      <section className="py-24 px-6 bg-slate-50 relative">
        {/* Floating Background Texture */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#004AAD 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="rounded-[4rem] overflow-hidden border-[15px] border-white shadow-xl relative h-[600px]"
          >
            <img src={NovaHistoryImg} className="w-full h-full object-cover" alt="Nova History" />
            <div className="absolute inset-0 bg-gradient-to-t from-nova-blue/40 to-transparent" />
          </motion.div>

          <div className="space-y-10">
            <motion.div initial="hidden" whileInView="visible" variants={stagger}>
              <motion.span variants={fadeInUp} className="text-nova-blue font-black uppercase tracking-[0.4em] text-[10px]">Founded September 2015</motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tighter mt-4">West Africa's First Free-Standing Surgery Center.</motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-500 font-medium leading-relaxed mt-6">
                Nova Surgery Center was founded on the principle that “The satisfaction of the patient is our number one priority.” Since 2015, we have evolved into a household name for laparoscopic surgery in the Greater Accra Region.
              </motion.p>
            </motion.div>

            {/* DUAL MISSION/VISION CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
                <Eye className="text-nova-sky mb-4" size={28} />
                <h4 className="font-black text-[10px] uppercase tracking-widest mb-2">Our Vision</h4>
                <p className="text-sm font-bold text-slate-700 leading-snug">To be the leading center of excellence in Africa for ambulatory medical care.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-nova-blue p-8 rounded-[3rem] shadow-xl text-white">
                <Target className="text-nova-sky mb-4" size={28} />
                <h4 className="font-black text-[10px] uppercase tracking-widest mb-2 text-white/60">Our Mission</h4>
                <p className="text-sm font-bold leading-snug">Excellence in women’s health through technologically advanced treatment modalities.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: CENTER OF EXCELLENCE (Wide Cinematic Banner) --- */}
      <section className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto h-[450px] rounded-[4rem] overflow-hidden relative shadow-2xl group"
        >
          <img src={facilityImg} className="w-full h-full object-cover" alt="Facility" />
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/20 transition-all duration-700" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
            <ShieldCheck className="text-nova-sky mb-6" size={48} />
            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter mb-4">Ultra-Modern Center of Excellence</h2>
            <p className="text-white/80 max-w-xl font-medium">Located at #7 Mensah Danfah Avenue, Adjiringanor, East Legon.</p>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION 4: THE GOAL --- */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.div initial="hidden" whileInView="visible" variants={stagger}>
             <motion.div variants={fadeInUp} className="w-12 h-12 bg-nova-sky/10 rounded-full flex items-center justify-center text-nova-sky mx-auto mb-8">
                <Zap size={24} />
             </motion.div>
             <motion.h3 variants={fadeInUp} className="text-3xl font-black tracking-tight mb-6">Our Goal is Simple.</motion.h3>
             <motion.p variants={fadeInUp} className="text-xl text-slate-500 leading-relaxed font-light italic">
               "We strive to share knowledge with you about all treatment options, so that you can make decisions that are right for you."
             </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;