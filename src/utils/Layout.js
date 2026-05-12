import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const RootLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle the "Sticky" effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-nova-sky selection:text-nova-blue">
      
      {/* 1. THE STICKY NAVBAR */}
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled 
          ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-100' 
          : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Navbar isScrolled={isScrolled} />
        </div>
      </header>

      {/* 2. MAIN CONTENT (THE CHILDREN) */}
      {/* We add a pt (padding-top) so the sticky navbar doesn't cover the top of your pages */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname} // Triggers animation on route change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. THE GLOBAL FOOTER */}
      <footer className="bg-slate-950 text-white relative z-10">
        <Footer />
      </footer>

      {/* Optional: Global Floating Blueprint Accent */}
      <div className="fixed bottom-10 left-10 z-[50] pointer-events-none opacity-20 hidden lg:block">
        <div className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 origin-left text-slate-400">
          Nova Excellence // 2026
        </div>
      </div>
    </div>
  );
};

export default RootLayout;