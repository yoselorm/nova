import React, { useState } from 'react';
import { Phone, Calendar, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import useReveal from '../utils/useReveal';
import AppointmentDatePicker from './AppointmentDatePicker';

// lucide-react ships no brand glyphs, so the WhatsApp mark is a raw inline SVG
const WhatsAppIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.876.52 3.63 1.42 5.13L2.05 22l4.99-1.31A9.94 9.94 0 0012.001 22C17.523 22 22 17.522 22 12S17.523 2 12.001 2zm0 18.06c-1.66 0-3.2-.49-4.494-1.33l-.322-.19-2.965.778.79-2.888-.21-.297A8.06 8.06 0 013.94 12c0-4.446 3.616-8.06 8.061-8.06 4.446 0 8.06 3.614 8.06 8.06 0 4.446-3.614 8.06-8.06 8.06z" />
  </svg>
);

const AppointmentSection = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [textRef, textVisible] = useReveal();
  const [formRef, formVisible] = useReveal();

  // Full Form Data Registry
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    service: 'Select Service',
    notes: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmAppointment = async (e) => {
    e.preventDefault();
    if (formData.service === 'Select Service') {
      setError('Please choose a service.');
      return;
    }
    if (!formData.date) {
      setError('Please select an appointment date.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVICE_API}/api/appointments`, {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        subsidiary: formData.service || 'general', // Maps cleanly to your controller's naming schemas, with fallback
        notes: formData.notes || 'No notes provided.'
      });

      if (response.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <div ref={textRef} className={`text-white transition-all duration-700 ease-out ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-nova-sky" />
            <span className="text-nova-sky font-black uppercase tracking-[0.4em] text-[10px]">Book Appointment</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tighter">
            Book your <span className="italic font-light">healthcare</span> <br /> visit <span className="text-nova-sky">today.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div className="space-y-4">
              <h4 className="flex items-center gap-3 text-nova-sky font-bold text-xs uppercase tracking-widest"><Phone size={16} /> Quick Contact</h4>
              <p className="text-xl font-medium">+233 (0) 302 751 290</p>
              <p className="text-white/60 text-sm">info@novasurgerycenter.com</p>
              <a href="https://wa.me/233544030436" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#25D366] text-sm font-bold hover:text-white transition-colors">
                <WhatsAppIcon size={16} /> +233 (0) 544 030 436
              </a>
            </div>
            <div className="space-y-4">
              <h4 className="flex items-center gap-3 text-nova-sky font-bold text-xs uppercase tracking-widest"><Calendar size={16} /> Schedule</h4>
              <p className="text-xl font-medium">Mon – Fri</p>
              <p className="text-white/60 text-sm">By Appointment</p>
              <p className="text-white/60 text-sm">Walk-ins Welcome Daily, 8AM – 5PM<br />(Appointments still advised)</p>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/10 flex items-start gap-4">
            <MapPin className="text-nova-sky" />
            <p className="text-white/70 leading-relaxed font-medium">#7 Mensah Danfah Ave. East Legon (Adjiriganor)<br /> Accra, Ghana</p>
          </div>
        </div>

        {/* RIGHT SIDE: Form Layout */}
        <div ref={formRef} className={`transition-all duration-700 ease-out ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
          <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-nova-sky/20 rounded-full blur-3xl group-hover:bg-nova-sky/40 transition-colors duration-700" />

            {success ? (
              <div className="text-center py-16 space-y-4 relative z-10 text-white">
                <CheckCircle2 size={50} className="text-nova-sky mx-auto animate-bounce" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Request Received</h3>
                <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">Thanks! We've received your appointment request and will be in touch soon.</p>
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
                  <AppointmentDatePicker
                    value={formData.date}
                    onChange={(value) => handleInputChange('date', value)}
                    triggerClassName="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-nova-sky transition-all flex items-center justify-between"
                  />
                  <select
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white/80 focus:outline-none focus:border-nova-sky transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option className="bg-slate-900" disabled>Select Service</option>
                    <option className="bg-slate-900 text-white" value='wellness'>Wellness Check</option>
                    <option className="bg-slate-900 text-white" value='gynecology'>Gynecology Consultation</option>
                    <option className="bg-slate-900 text-white" value='fertility'>Fertility Consultation</option>
                  </select>
                </div>

                {/* CASE NOTES TEXTAREA CONTROLLER */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block px-1">Notes (Optional)</label>
                  <textarea 
                    rows={3} 
                    placeholder="Brief description of clinical requirements..." 
                    value={formData.notes} 
                    onChange={(e) => handleInputChange('notes', e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-nova-sky focus:bg-white/10 transition-all outline-none resize-none" 
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-nova-sky text-nova-blue py-5 rounded-2xl font-black uppercase tracking-[0.1em] text-xs flex items-center justify-center gap-1 sm:gap-3 shadow-xl hover:shadow-nova-sky/20 transition-all duration-300 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] mt-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-nova-blue/30 border-t-nova-blue rounded-full animate-spin" />
                  ) : (
                    <>Confirm Appointment <Send size={16} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

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