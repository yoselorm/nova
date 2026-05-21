import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  CalendarClock, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import axios from 'axios'; // Import Axios to dispatch the operational tear-down flight
import toast from '../../components/Toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const masterEase = [0.16, 1, 0.3, 1];

  const menuItems = [
    { name: 'Overview Board', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Appointments', path: '/admin/appointments', icon: <CalendarClock size={18} /> },
    { name: 'Manage Blogs', path: '/admin/blogs', icon: <FileText size={18} /> },
  ];

  // THE REAL LOGOUT ENGINE
  const handleLogout = async () => {
    try {
      // Direct hit to your auth logout endpoint to invalidate and flush the HTTP-Only token cookie
      const response = await axios.post(
        'http://localhost:4000/api/auth/logout', 
        {}, 
        { 
          withCredentials: true // MANDATORY: Directs the browser to pass and flush the secure cookie wrapper
        }
      );
      
      if (response.data.success) {
        // Safe disconnection achieved. Terminate UI session state and drop back to login page
        navigate('/admin/login', { replace: true });
        toast.success('Successfully logged out. See you next time!'); // Friendly toast for UX feedback
      }
    } catch (err) {
      console.error('[CRITICAL] Admin layout session detachment failed:', err.message);
      // Fallback: If backend is unreachable, force boot to login so frontend state drops anyway
      navigate('/admin/login', { replace: true });

    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9FF] text-slate-900 font-nova flex overflow-hidden">
      
      {/* 1. PERSISTENT DESKTOP SIDEBAR PANEL */}
      <aside className="hidden lg:flex flex-col justify-between w-72 bg-slate-950 text-white p-6 border-r border-slate-900 relative z-30 shrink-0">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative z-10">
          {/* Sidebar Top Branding Header */}
          <div className="flex items-center gap-3 pb-8 border-b border-white/[0.05] mb-10">
            <div className="w-10 h-10 bg-nova-blue rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/40">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tighter text-white">NOVA CENTRAL</span>
              <span className="text-[9px] text-nova-sky font-black tracking-[0.2em] uppercase">Control Matrix</span>
            </div>
          </div>

          {/* Navigation Links Cluster */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 relative group ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Active Indicator Slide Pill */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeAdminNav"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-nova-blue rounded-xl -z-10 shadow-md shadow-blue-950"
                    />
                  )}
                  <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-nova-sky'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Session Control */}
        <div className="relative z-10 pt-6 border-t border-white/[0.05]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-300 group"
          >
            <LogOut size={18} className="text-slate-500 group-hover:text-rose-400 transition-colors" />
            Disconnect Log
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKING DISPLAY ENVIRONMENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        
        {/* UPPER TELEMETRY UTILITY BAR */}
        <header className="h-20 bg-white border-b border-slate-100 px-6 md:px-12 flex items-center justify-between shrink-0 relative z-20">
          
          {/* Mobile Layout Toggle Trigger */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Menu size={24} />
            </button>
            
            {/* System Status Log Indicator */}
            <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-emerald-600" /> Core Terminal Secure
              </span>
            </div>
          </div>

          {/* Quick Admin Profile Controls */}
          <div className="flex items-center gap-6">
            {/* System Notifications Bell Log */}
            <button className="relative w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-nova-blue rounded-full" />
            </button>

            {/* Profile Signpost */}
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                <UserCheck size={16} className="text-nova-sky" />
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-black text-slate-900 tracking-tight leading-none">Super Admin</span>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider mt-0.5">Root Access</span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. CORE DYNAMIC DISPLAY VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 bg-[#FAF9FF] relative z-10">
          <Outlet />
        </main>
      </div>

      {/* 4. RESPONSIVE MOBILE ACCORDION SIDEBAR DRAWER */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay Mask */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950 z-40 lg:hidden"
            />

            {/* Drawer Content Body */}
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: masterEase }}
              className="fixed inset-y-0 left-0 w-72 bg-slate-950 text-white p-6 z-50 flex flex-col justify-between lg:hidden shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.05] mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-nova-blue rounded-xl flex items-center justify-center text-white font-black text-xl">
                      N
                    </div>
                    <span className="text-base font-black tracking-tighter text-white">NOVA CENTRAL</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          isActive ? 'bg-nova-blue text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                        }`}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/[0.05]">
                <button 
                  onClick={() => { setSidebarOpen(false); handleLogout(); }}
                  className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all"
                >
                  <LogOut size={18} />
                  Disconnect Log
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminLayout;