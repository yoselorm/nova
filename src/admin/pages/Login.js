import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for your data pipeline flights
import toast from '../../components/Toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const masterEase = [0.16, 1, 0.3, 1];
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // New State: Capture backend pipeline error arrays cleanly
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(false);
    setError('');
    setLoading(true);
    
    try {
      // Execute the verification flight to your backend server running on port 4000
      const response = await axios.post(
        `${process.env.REACT_APP_SERVICE_API}/api/auth/login`, 
        { email, password },
        { 
          withCredentials: true, // CRITICAL: This allows HTTP-Only cookies to be injected into the browser storage
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data.success) {
        setLoading(false);
        // Clear inputs and route the system directly to your secure dashboard layout workspace
        navigate('/admin/dashboard');
        toast.success('Authentication successful. Redirecting to dashboard...'); // Friendly toast for UX feedback
      }
    } catch (err) {
      setLoading(false);
      toast.error('Authentication failed. Please check your credentials and try again.'); // Friendly toast for UX feedback
      // Grab error parameter messages sent straight out of your authController catch blocks
      const errorMessage = err.response?.data?.message || 'Connection failure to the auth engine.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9FF] flex font-nova overflow-hidden">
      
      {/* LEFT SIDE: ULTRA-CLEAN SEAMLESS AUTH FORM */}
      <div className="w-full lg:w-[45%] bg-white flex flex-col justify-between p-8 md:p-16 relative z-10 border-r border-slate-100">
        
        {/* Top Header Log */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-nova-blue rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-900/20">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight text-slate-900">NOVA</span>
            <span className="text-[9px] text-slate-400 font-bold tracking-[0.2em]">ADMIN PORTAL</span>
          </div>
        </div>

        {/* Central Auth Card Form */}
        <div className="max-w-md w-full mx-auto my-auto py-12">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">
              <ShieldAlert size={12} className="text-amber-600" />
              <span className="text-amber-800 text-[9px] font-black uppercase tracking-wider">Restricted Access Terminal</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tighter uppercase leading-none">
              Authenticate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-blue via-nova-sky to-slate-400 font-light lowercase italic">credentials.</span>
            </h2>
            <p className="text-slate-400 text-xs font-medium mt-3 leading-relaxed">
              Provide authorized management parameters to access internal medical appointment pipelines and publishing arrays.
            </p>
          </div>

          {/* DYNAMIC ERROR POPUP ELEMENT */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-800 text-xs font-bold uppercase tracking-wide animate-shake">
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input: Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Operational Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                  <Mail size={18} />
                </span>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@novahealthcare.com" 
                  className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-nova-blue focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Input: Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Security Passcode</label>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider select-none">System Bound</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                  <Lock size={18} />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-12 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-nova-blue focus:bg-white transition-all duration-300"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Action Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-slate-950 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-slate-950/10 hover:bg-nova-blue flex items-center justify-center gap-3 transition-colors duration-300 disabled:opacity-50 group mt-8"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Establish Connection 
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Lower Regulatory Log */}
        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          © {new Date().getFullYear()} Nova Group Security Protocol Logs.
        </div>
      </div>

      {/* RIGHT SIDE: CINEMATIC MEDICAL GRID DESIGN */}
      <div className="hidden lg:flex lg:w-[55%] bg-slate-950 relative items-center px-16 justify-start overflow-hidden">
        {/* Fine Architectural Grid Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Soft Ambient Core Light Blob */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-nova-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-nova-sky/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Blueprint Linear Graphic Accent */}
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-white/[0.03]" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/[0.03]" />

        <div className="relative z-10 max-w-lg">
          <span className="text-[10px] font-black text-nova-sky uppercase tracking-[0.4em] block mb-6">// Global Core Operations Control</span>
          
          <div className="overflow-hidden mb-6">
            <motion.h3 
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: masterEase }}
              className="text-white text-4xl md:text-5xl font-black tracking-tighter leading-[1.05] uppercase"
            >
              Centralized Healthcare <br />
              Management Array.
            </motion.h3>
          </div>

          <p className="text-slate-400 font-medium leading-relaxed text-sm border-l-2 border-nova-blue pl-6">
            Access secure telemetry data profiles, configure clinical operational hours for your subsidiaries, and safely publish validated medical literature across the public domains.
          </p>

          {/* Miniature Metrics Frame Accent */}
          <div className="mt-12 grid grid-cols-2 gap-6 border border-white/[0.05] bg-white/[0.02] p-6 rounded-2xl backdrop-blur-md max-w-sm">
            <div>
              <p className="text-white/30 text-[9px] font-black uppercase tracking-wider mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase text-white tracking-wide">Operational</span>
              </div>
            </div>
            <div>
              <p className="text-white/30 text-[9px] font-black uppercase tracking-wider mb-1">Network Encryption</p>
              <p className="text-xs font-black text-nova-sky uppercase tracking-wide">AES-256 GCM</p>
            </div>
          </div>
        </div>

        {/* Giant branding letter behind everything */}
        <span className="absolute bottom-[-15%] right-[-5%] text-[32rem] font-black text-white/[0.01] select-none tracking-tighter pointer-events-none">
          N
        </span>
      </div>

    </div>
  );
};

export default AdminLogin;