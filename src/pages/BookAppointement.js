import React, { useState } from 'react';
import {
  Stethoscope,
  Calendar,
  User,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import axios from 'axios'; // Imported to execute the pipeline flight

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [submitLoading, setSubmitLoading] = useState(false); // Live submission spinner switch
  const [error, setError] = useState(''); // Handles network or collision errors gracefully
  
  // Master Booking State
  const [bookingData, setBookingData] = useState({
    subsidiary: '',
    date: '',
    timeSlot: '',
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const subsidiaries = [
    { id: 'surgery', name: 'Surgery Centre', tag: 'Advanced Operative Care', color: 'bg-surgery-main border-surgery-main text-surgery-main' },
    { id: 'fertility', name: 'Fertility Centre', tag: 'Reproductive Medicine & IVF', color: 'bg-[#009774] border-[#009774] text-[#009774]' },
    { id: 'pharmacy', name: 'Nova Pharmacy', tag: 'Prescriptions & Clinical Wellness', color: 'bg-[#5B2897] border-[#5B2897] text-[#5B2897]' },
  ];

  const timeSlots = [
    '08:00 AM', '09:30 AM', '11:00 AM',
    '01:00 PM', '02:30 PM', '04:00 PM'
  ];

  // Clinic only accepts appointments on Monday, Wednesday, and Friday
  const ALLOWED_APPOINTMENT_DAYS = [1, 3, 5];
  const isAllowedAppointmentDay = (dateString) => {
    if (!dateString) return true;
    return ALLOWED_APPOINTMENT_DAYS.includes(new Date(`${dateString}T00:00:00`).getDay());
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (value) => {
    if (value && !isAllowedAppointmentDay(value)) {
      setError('Appointments are only available on Monday, Wednesday, and Friday. Please select one of those days.');
      return;
    }
    setError('');
    handleInputChange('date', value);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // THE REINFORCED DISPATCH ENGINE: Transmit parameters directly into MongoDB matrix
  const handleFinalizeSubmission = async () => {
    setSubmitLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVICE_API}/api/appointments`, // Points straight to your core backend controller router
        {
          fullName: bookingData.fullName,
          email: bookingData.email,
          phone: bookingData.phone,
          date: bookingData.date,
          timeSlot: bookingData.timeSlot,
          subsidiary: bookingData.subsidiary, // Maps cleanly to your controller's naming schemas
          notes: bookingData.notes
        }
      );

      if (response.data.success) {
        // Safe database landing achieved. Advance directly into the success panel screen!
        setStep(4);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Transmission vector failure. The system scheduler could not register this window.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Determine dynamic accent coloring based on chosen variant selection
  const getAccentColor = () => {
    if (bookingData.subsidiary === 'surgery') return 'bg-surgery-main text-white hover:bg-red-700';
    if (bookingData.subsidiary === 'fertility') return 'bg-[#009774] text-white hover:bg-[#007a5d]';
    if (bookingData.subsidiary === 'pharmacy') return 'bg-[#5B2897] text-white hover:bg-[#482078]';
    return 'bg-nova-blue text-white hover:bg-blue-700'; 
  };

  const getTextColor = () => {
    if (bookingData.subsidiary === 'surgery') return 'text-surgery-main';
    if (bookingData.subsidiary === 'fertility') return 'text-[#009774]';
    if (bookingData.subsidiary === 'pharmacy') return 'text-[#5B2897]';
    return 'text-nova-blue';
  };

  const getBorderColor = () => {
    if (bookingData.subsidiary === 'surgery') return 'border-surgery-main';
    if (bookingData.subsidiary === 'fertility') return 'border-[#009774]';
    if (bookingData.subsidiary === 'pharmacy') return 'border-[#5B2897]';
    return 'border-nova-blue';
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] py-12 px-6 md:px-12 lg:px-24 font-nova flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT INTERACTIVE MODULE FIELD (7 Cols) */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between border-r border-slate-50 min-h-[600px]">
          
          {/* Header Indicators */}
          <div>
            <div className="flex items-center gap-6 mb-8">
              {[
                { s: 1, label: 'Centre', icon: <Stethoscope size={14} /> },
                { s: 2, label: 'Schedule', icon: <Calendar size={14} /> },
                { s: 3, label: 'Details', icon: <User size={14} /> }
              ].map((item) => (
                <div key={item.s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors duration-300 ${
                    step >= item.s ? getAccentColor().split(' ')[0] : 'bg-slate-100 text-slate-400'
                  }`}>
                    {item.icon}
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-wider ${step === item.s ? 'text-slate-900' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Error Message Signpost Banner */}
            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold uppercase tracking-wide flex items-center gap-3 animate-headShake">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* FORM CONTAINER SWITCHES */}
            <>
              {step === 1 && (
                <div
                  key="step1"
                  className="space-y-6 animate-fade-in-up"
                >
                  <div>
                    <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none">Select Medical Branch</h2>
                    <p className="text-xs font-medium text-slate-400 mt-2">Which specialty wing are you routing your consultation booking parameters to?</p>
                  </div>
                  <div className="space-y-3">
                    {subsidiaries.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleInputChange('subsidiary', sub.id)}
                        className={`w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                          bookingData.subsidiary === sub.id 
                            ? `${getBorderColor()} bg-slate-50/50 shadow-md` 
                            : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                      >
                        <div>
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">{sub.name}</h4>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">{sub.tag}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          bookingData.subsidiary === sub.id ? getBorderColor() : 'border-slate-200'
                        }`}>
                          {bookingData.subsidiary === sub.id && <div className={`w-2.5 h-2.5 rounded-full ${getAccentColor().split(' ')[0]}`} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div
                  key="step2"
                  className="space-y-6 animate-fade-in-up"
                >
                  <div>
                    <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none">Configure Timeline</h2>
                    <p className="text-xs font-medium text-slate-400 mt-2">We accept appointments Monday, Wednesday, and Friday only.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Preferred Date</label>
                      <input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-300"
                      />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Mon, Wed & Fri only</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Available Windows</label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => handleInputChange('timeSlot', slot)}
                            className={`h-12 text-xs font-black rounded-xl border transition-all ${
                              bookingData.timeSlot === slot 
                                ? `${getBorderColor()} ${getTextColor()} bg-slate-50 font-black`
                                : 'border-slate-100 text-slate-500 bg-white hover:border-slate-200'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div
                  key="step3"
                  className="space-y-5 animate-fade-in-up"
                >
                  <div>
                    <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none">Patient Information</h2>
                    <p className="text-xs font-medium text-slate-400 mt-2">Provide core telemetry logs so clinicians can sync your historical registry.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Full Legal Name</label>
                        <input type="text" required placeholder="Kwame Mensah" value={bookingData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Contact Phone Matrix</label>
                        <input type="tel" required placeholder="+233 XX XXX XXXX" value={bookingData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Secure Email Address</label>
                      <input type="email" required placeholder="kwame@domain.com" value={bookingData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Consultation Case Notes (Optional)</label>
                      <textarea rows={3} placeholder="Brief description of clinical requirements..." value={bookingData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300 resize-none" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div
                  key="step4"
                  className="text-center py-12 space-y-4 animate-scale-in"
                >
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-slate-50 ${getTextColor()}`}>
                    <CheckCircle2 size={40} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none">Transmission Confirmed</h2>
                    <p className="text-xs font-medium text-slate-400 mt-2 max-w-sm mx-auto">Your medical consultation pipeline has been locked. A secure routing schedule file has been dispatched to your email ledger.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setBookingData({ subsidiary: '', date: '', timeSlot: '', fullName: '', email: '', phone: '', notes: '' });
                    }}
                    className="mt-4 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors underline"
                  >
                    Book Another Appointment
                  </button>
                </div>
              )}
            </>
          </div>

          {/* Action Trigger Navigation Bars */}
          {step < 4 && (
            <div className="flex justify-between items-center pt-8 border-t border-slate-50 mt-8">
              <button
                onClick={prevStep}
                disabled={step === 1 || submitLoading}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-0"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <button
                onClick={step === 3 ? handleFinalizeSubmission : nextStep}
                disabled={
                  submitLoading ||
                  (step === 1 && !bookingData.subsidiary) || 
                  (step === 2 && (!bookingData.date || !bookingData.timeSlot)) ||
                  (step === 3 && (!bookingData.fullName || !bookingData.email || !bookingData.phone))
                }
                className={`h-12 px-8 ${getAccentColor()} rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-300 disabled:opacity-40 shadow-lg min-w-[160px] justify-center`}
              >
                {submitLoading ? (
                  // Spinning buffer state tracker inside button container frame
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : step === 3 ? (
                  <>Finalize Dispatch <ArrowRight size={14} /></>
                ) : (
                  <>Advance Array <ArrowRight size={14} /></>
                )}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: LIVE BLUEPRINT SUMMARY CARD (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-8 md:p-12 relative flex flex-col justify-between overflow-hidden text-white">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full border border-white/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-8">
              <Sparkles size={12} className={getTextColor()} />
              <span className="text-white/60 text-[9px] font-black uppercase tracking-wider">Live Pipeline Telemetry</span>
            </div>

            <h3 className="text-xl font-black uppercase tracking-tight mb-6 border-b border-white/10 pb-4">
              Booking Registry
            </h3>

            {/* Dynamic Summary Blueprint Slots */}
            <div className="space-y-6">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Target Center</span>
                <p className="text-sm font-black uppercase tracking-wide">
                  {bookingData.subsidiary ? subsidiaries.find(s => s.id === bookingData.subsidiary)?.name : 'Unassigned Branch'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Timeline Date</span>
                  <p className="text-xs font-bold text-slate-300">
                    {bookingData.date ? bookingData.date : 'Pending Matrix'}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Target Window</span>
                  <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    {bookingData.timeSlot ? (
                      <>
                        <Clock size={12} className={getTextColor()} />
                        {bookingData.timeSlot}
                      </>
                    ) : 'Unscheduled'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Patient Log</span>
                  <p className="text-xs font-bold text-slate-300 truncate">
                    {bookingData.fullName || 'Anonymous Identity'}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">System Communications</span>
                  <p className="text-xs font-mono text-white/50 truncate">
                    {bookingData.email || 'awaiting_contact_parameters...'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 text-[9px] font-mono text-white/20 uppercase tracking-widest">
            ID // NVH-{Math.floor(100000 + Math.random() * 900000)}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookAppointment;