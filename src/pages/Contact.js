import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bgimage from '../assets/images/herobg.jpg';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <main className="relative min-h-screen w-full font-nova overflow-hidden flex flex-col">
      
      {/* 1. CINEMATIC BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          src={bgimage}
          className="w-full h-full object-cover"
          alt="Nova Facility"
        />
        {/* Layered Overlays for that "Sweet" contrast */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" /> 
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="relative z-10 flex-grow pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial="hidden" animate="visible" variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            {/* LEFT SIDE: Floating Info */}
            <div className="space-y-10">
              <motion.div variants={fadeInUp}>
                <span className="text-nova-sky font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Connect with us</span>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                  Experience <br /> <span className="text-nova-sky italic font-light">Excellence.</span>
                </h1>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Contact Cards with Glassmorphism */}
                <ContactCard 
                  icon={<Phone size={20} />} 
                  title="Talk to Us" 
                  lines={["(+233)-302-751-290", "(+233)-303-931-960"]} 
                  variants={fadeInUp}
                />
                <ContactCard 
                  icon={<Mail size={20} />} 
                  title="Email" 
                  lines={["Info@novasurgerycenter.com"]} 
                  variants={fadeInUp}
                />
                <ContactCard 
                  icon={<MessageSquare icon={<Phone size={18}/>} />} // Reusing icon logic
                  title="WhatsApp" 
                  lines={["(+233)-544-030-436"]} 
                  variants={fadeInUp}
                />
                <ContactCard 
                  icon={<Clock size={20} />} 
                  title="Opening Hours" 
                  lines={["Mon-Fri: 8:30am – 5:00pm", "Sat: Appointment Only"]} 
                  variants={fadeInUp}
                />
              </div>
            </div>

            {/* RIGHT SIDE: The High-End Form */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-3xl p-8 md:p-12 rounded-[4rem] border border-white/20 shadow-2xl shadow-black/50"
            >
              <h3 className="text-2xl font-black tracking-tight text-white mb-8">Direct Inquiry</h3>
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <GlassInput placeholder="Full Name" />
                  <GlassInput placeholder="Subject" />
                </div>
                <GlassInput placeholder="Email Address" type="email" />
                <textarea 
                  placeholder="Your Message..." 
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-white placeholder:text-white/30 focus:outline-none focus:border-nova-sky transition-all min-h-[120px]"
                />

                {/* --- ROBOT CHECK --- */}
                <div 
                  onClick={() => setIsRobotChecked(!isRobotChecked)}
                  className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                    isRobotChecked ? 'bg-nova-sky/20 border-nova-sky' : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      isRobotChecked ? 'bg-nova-sky border-nova-sky' : 'bg-transparent border-white/30'
                    }`}>
                      {isRobotChecked && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 size={16} className="text-nova-blue" /></motion.div>}
                    </div>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">I am not a robot</span>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/RecaptchaLogo.svg" className="w-6 h-6 opacity-40 invert" alt="reCAPTCHA" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!isRobotChecked}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all ${
                    isRobotChecked ? 'bg-nova-sky text-nova-blue shadow-xl shadow-nova-sky/20' : 'bg-white/5 text-white/20 cursor-not-allowed'
                  }`}
                >
                  Confirm & Send <Send size={14} />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 3. FULL-WIDTH MAP SECTION */}
 <section className="relative w-full h-[600px] bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10" />
        
        <iframe 
          title="Nova Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.470557342894!2d-0.14693162417743586!3d5.644837533165181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf848a4789547d%3A0xc340a6e3867c29e!2sNova%20Surgery%20Center!5e0!3m2!1sen!2sgh!4v1715530000000!5m2!1sen!2sgh" 
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy"
        />

        {/* MAP OVERLAY CARD */}
        <motion.div 
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 bg-white p-10 rounded-[3.5rem] shadow-2xl border border-slate-100 flex items-center gap-8 max-w-2xl w-[92%]"
        >
          <div className="w-16 h-16 bg-nova-blue rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
            <MapPin size={32} />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-nova-sky mb-2">Location Detail</h4>
            <p className="text-xl font-black text-slate-900 tracking-tighter leading-tight">
              #7 Mensah Danfah Ave. East Legon, Adjiriganor, Accra
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

// Sub-Components for Clean Code
const ContactCard = ({ icon, title, lines, variants }) => (
  <motion.div variants={variants} className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all">
    <div className="text-nova-sky mb-4 group-hover:scale-110 transition-transform origin-left">{icon}</div>
    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{title}</h4>
    {lines.map((line, i) => (
      <p key={i} className="text-white text-sm font-bold leading-tight">{line}</p>
    ))}
  </motion.div>
);

const GlassInput = ({ ...props }) => (
  <input 
    {...props}
    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-nova-sky transition-all"
  />
);

const MessageSquare = ({icon}) => icon; // Helper for Lucide consistency

export default Contact