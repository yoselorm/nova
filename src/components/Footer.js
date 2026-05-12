import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Blogs', path: '/blogs' },
      { name: 'Contact', path: '/contact' },
    ],
    subsidiaries: [
      { name: 'Surgery Centre', path: '/surgery-center' },
      { name: 'Fertility Centre', path: '/fertility-center' },
      { name: 'Nova Pharmacy', path: '/pharmacy' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Patient Rights', path: '/patient-rights' },
    ]
  };

  return (
    <footer className="relative bg-slate-950 text-white pt-24 pb-12 overflow-hidden font-nova">
      
      {/* --- ARCHITECTURAL BACKGROUND ELEMENTS --- */}
      {/* 1. Subtle Structural Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* 2. Abstract Circular Detail (Bottom Right) */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* COLUMN 1: BRAND IDENTITY (4 Cols) */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-4 mb-8 group">
              <div className="w-12 h-12 bg-nova-blue rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-900/40">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black leading-none tracking-tighter">NOVA</span>
                <span className="text-[10px] text-white/40 font-black tracking-[0.3em] uppercase mt-1">HEALTHCARE</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              West Africa’s premier surgical and fertility destination. Dedicated to providing world-class, patient-centric medical excellence since 2015.
            </p>
            <div className="flex gap-4">
              {[Mail].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-nova-blue hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">Corporate</h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-nova-sky text-sm font-bold transition-colors flex items-center group">
                    {link.name} 
                    <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SUBSIDIARIES (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">Centres of Excellence</h4>
            <ul className="space-y-4">
              {footerLinks.subsidiaries.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-nova-sky text-sm font-bold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">Get In Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-nova-sky mt-1" size={20} />
                <span className="text-slate-400 text-sm leading-relaxed font-medium">
                  East Legon, <br />
                  Accra, Ghana
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-nova-sky" size={20} />
                <span className="text-slate-400 text-sm font-bold">+233 (0) XXX XXX XXX</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-nova-sky" size={20} />
                <span className="text-slate-400 text-sm font-bold">info@novahealthcare.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- LOWER FOOTER BAR --- */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8">
            {footerLinks.legal.map(link => (
              <Link key={link.name} to={link.path} className="text-[10px] font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
            © {currentYear} Nova Healthcare Group. Designed with Excellence.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;