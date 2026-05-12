import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, MapPin, Send } from 'lucide-react';

const AppointmentSection = () => {
  // Animation Variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden font-nova">
      
      {/* BACKGROUND: Cinematic Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/appointment-bg.jpg" 
          className="w-full h-full object-cover scale-110 animate-slow-pan" 
          alt="Clinic Background" 
        />
        <div className="absolute inset-0 bg-nova-blue/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-nova-blue via-transparent to-nova-blue/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* LEFT SIDE: Animated Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-white"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-nova-sky" />
            <span className="text-nova-sky font-black uppercase tracking-[0.4em] text-[10px]">
              Book Appointment
            </span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tighter">
            Book your <span className="italic font-light">healthcare</span> <br /> 
            visit <span className="text-nova-sky">today.</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div className="space-y-4">
              <h4 className="flex items-center gap-3 text-nova-sky font-bold text-xs uppercase tracking-widest">
                <Phone size={16} /> Quick Contact
              </h4>
              <p className="text-xl font-medium">+233 (0) XXX XXX XXX</p>
              <p className="text-white/60 text-sm">info@novahealthcare.com</p>
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center gap-3 text-nova-sky font-bold text-xs uppercase tracking-widest">
                <Calendar size={16} /> Schedule
              </h4>
              <p className="text-xl font-medium">Mon - Sat: 8am to 6pm</p>
              <p className="text-white/60 text-sm">Sunday: Emergencies Only</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 pt-12 border-t border-white/10 flex items-start gap-4">
            <MapPin className="text-nova-sky" />
            <p className="text-white/70 leading-relaxed font-medium">
              123 Nova Close, East Legon,<br /> Accra, Ghana
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: The "Sweet" Glassmorphism Form */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: 10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="perspective-1000"
        >
          <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden group">
            
            {/* Animated background flare for the box */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-nova-sky/20 rounded-full blur-3xl group-hover:bg-nova-sky/40 transition-colors duration-700" />

            <form className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" type="tel" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <Input type="date" />
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white/80 focus:outline-none focus:border-nova-sky transition-all appearance-none cursor-pointer">
                  <option className="bg-nova-blue">Select Service</option>
                  <option className="bg-nova-blue">General Surgery</option>
                  <option className="bg-nova-blue">Fertility Consultation</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-nova-sky text-nova-blue py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl hover:shadow-nova-sky/20 transition-all"
              >
                Confirm Appointment
                <Send size={16} />
              </motion.button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// Reusable Sweet Input Component
const Input = ({ ...props }) => (
  <input 
    {...props}
    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-nova-sky focus:bg-white/10 transition-all outline-none"
  />
);

export default AppointmentSection;