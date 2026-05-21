import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import axios from 'axios';

const AppointmentSection = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Full Form Data Registry
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '', // Added back
    service: 'Select Service',
    notes: '' // Added back
  });

  const timeSlots = [
    '08:00 AM', '09:30 AM', '11:00 AM', 
    '01:00 PM', '02:30 PM', '04:00 PM'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmAppointment = async (e) => {
    e.preventDefault();
    if (formData.service === 'Select Service') {
      setError('Please select a valid medical service target.');
      return;
    }
    if (!formData.timeSlot) {
      setError('Please select a preferred time window slot.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVICE_API}/appointments`, {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        timeSlot: formData.timeSlot,
        subsidiary: formData.service || 'general', // Maps cleanly to your controller's naming schemas, with fallback
        notes: formData.notes || 'No custom case notes provided.'
      });

      if (response.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Transmission pipeline collision.');
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id='book' className="relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden font-nova">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img src="/assets/images/appointment-bg.jpg" className="w-full h-full object-cover scale-110 animate-slow-pan" alt="Clinic Background" />
        <div className="absolute inset-0 bg-nova-blue/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-nova-blue via-transparent to-nova-blue/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* LEFT SIDE: Text Content */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white">
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-nova-sky" />
            <span className="text-nova-sky font-black uppercase tracking-[0.4em] text-[10px]">Book Appointment</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tighter">
            Book your <span className="italic font-light">healthcare</span> <br /> visit <span className="text-nova-sky">today.</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div className="space-y-4">
              <h4 className="flex items-center gap-3 text-nova-sky font-bold text-xs uppercase tracking-widest"><Phone size={16} /> Quick Contact</h4>
              <p className="text-xl font-medium">+233 (0) XXX XXX XXX</p>
              <p className="text-white/60 text-sm">info@novahealthcare.com</p>
            </div>
            <div className="space-y-4">
              <h4 className="flex items-center gap-3 text-nova-sky font-bold text-xs uppercase tracking-widest"><Calendar size={16} /> Schedule</h4>
              <p className="text-xl font-medium">Mon - Sat: 8am to 6pm</p>
              <p className="text-white/60 text-sm">Sunday: Emergencies Only</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 pt-12 border-t border-white/10 flex items-start gap-4">
            <MapPin className="text-nova-sky" />
            <p className="text-white/70 leading-relaxed font-medium">123 Nova Close, East Legon,<br /> Accra, Ghana</p>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Form Layout */}
        <motion.div initial={{ opacity: 0, x: 50, rotateY: 10 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: true }} className="perspective-1000">
          <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-nova-sky/20 rounded-full blur-3xl group-hover:bg-nova-sky/40 transition-colors duration-700" />

            {success ? (
              <div className="text-center py-16 space-y-4 relative z-10 text-white">
                <CheckCircle2 size={50} className="text-nova-sky mx-auto animate-bounce" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Booking Received</h3>
                <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">Your healthcare appointment request has been compiled and dropped into the admin matrix streams.</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmAppointment} className="space-y-5 relative z-10">
                {error && (
                  <div className="p-4 bg-rose-500/20 border border-rose-500/30 rounded-2xl text-rose-200 text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="First Name" required value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
                  <Input placeholder="Last Name" required value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Email Address" type="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                  <Input placeholder="Phone Number" type="tel" required value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input type="date" required value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} />
                  <select 
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white/80 focus:outline-none focus:border-nova-sky transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option className="bg-slate-900" disabled>Select Service</option>
                    <option className="bg-slate-900 text-white" value='surgery'>General Surgery</option>
                    <option className="bg-slate-900 text-white" value='fertility'>Fertility Consultation</option>
                  </select>
                </div>

                {/* TIME WINDOW SELECTOR ARRAY */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block px-1">Available Windows</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleInputChange('timeSlot', slot)}
                        className={`h-11 text-[11px] font-black rounded-xl border transition-all ${
                          formData.timeSlot === slot 
                            ? 'border-nova-sky text-nova-sky bg-white/10 shadow-lg shadow-nova-sky/5'
                            : 'border-white/10 text-white/60 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CASE NOTES TEXTAREA CONTROLLER */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block px-1">Consultation Requirements</label>
                  <textarea 
                    rows={3} 
                    placeholder="Brief description of clinical requirements..." 
                    value={formData.notes} 
                    onChange={(e) => handleInputChange('notes', e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-nova-sky focus:bg-white/10 transition-all outline-none resize-none" 
                  />
                </div>

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full bg-nova-sky text-nova-blue py-5 rounded-2xl font-black uppercase tracking-[0.1em] text-xs flex items-center justify-center gap-1 sm:gap-3 shadow-xl hover:shadow-nova-sky/20 transition-all disabled:opacity-50 mt-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-nova-blue/30 border-t-nova-blue rounded-full animate-spin" />
                  ) : (
                    <>Confirm Appointment <Send size={16} /></>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const Input = ({ ...props }) => (
  <input 
    {...props}
    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-nova-sky focus:bg-white/10 transition-all outline-none"
  />
);

export default AppointmentSection;