import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import mainlogo from '../assets/images/novalogo.png';
import surgerylogo from '../assets/images/Surgerylogo.png';
import fertilitylogo from '../assets/images/Fertilitylogo.png';
import pharmacylogo from '../assets/images/Pharmacylogo.png';
import footerlogo from '../assets/images/footer.png';

// lucide-react ships no brand/social glyphs, so the Instagram mark is a raw inline SVG
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Footer = ({ variant = 'default' }) => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Completely dynamic themes updating overall container backgrounds, logos, and accents
  const themes = {
    default: {
      logo: mainlogo, name: "NOVA", subtext: "HEALTHCARE",
      footerBg: "bg-slate-950", // Original dark style
      logoBg: "bg-nova-blue",
      hoverText: "hover:text-nova-sky", iconColor: "text-nova-sky"
    },
    surgery: {
      logo: surgerylogo, name: "NOVA", subtext: "SURGERY CENTRE",
      footerBg: "bg-surgery-main", 
      logoBg: "bg-surgery-main",
      hoverText: "hover:text-surgery-gold", iconColor: "text-surgery-gold"
    },
    fertility: {
      logo: fertilitylogo, name: "NOVA", subtext: "FERTILITY CENTRE",
      footerBg: "bg-emerald-950", // Whole footer switches to deep luxury brand teal
      logoBg: "bg-[#009774]",
      hoverText: "hover:text-[#8BEE07]", iconColor: "text-[#8BEE07]"
    },
    pharmacy: {
      logo: pharmacylogo, name: "NOVA", subtext: "PHARMACY",
      footerBg: "bg-purple-950", // Whole footer switches to deep luxury brand purple
      logoBg: "bg-[#5B2897]",
      hoverText: "hover:text-[#9965DF]", iconColor: "text-[#7D36DD]"
    }
  };

  // Inspect route parameters to grab the active workspace style
  const getDynamicVariant = () => {
    if (location.pathname.includes('surgery-center')) return 'surgery';
    if (location.pathname.includes('fertility-center')) return 'fertility';
    if (location.pathname.includes('pharmacy')) return 'pharmacy';
    return variant;
  };

  const activeTheme = themes[getDynamicVariant()];

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Blogs', path: '/blog' },
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
    /* DYNAMIC BACKGROUND SET HERE */
    <footer className={`relative ${activeTheme.footerBg} text-white pt-24 pb-12 overflow-hidden font-nova transition-colors duration-500`}>
      
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
            {/* LOGO SECTION - ONLY THE LOGO IMAGE NOW */}
            <Link to="/" className="flex items-center h-20 mb-8">
              <img 
                src={footerlogo} 
                alt="Nova Healthcare Group Logo" 
                className="h-full w-auto object-contain transition-all duration-500"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              West Africa’s premier surgical and fertility destination. Dedicated to providing world-class, patient-centric medical excellence since 2015.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Mail, href: 'mailto:info@novahealthcare.com' },
                { Icon: InstagramIcon, href: 'https://www.instagram.com/novahealthcareghana?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==' }
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:${activeTheme.logoBg} hover:text-white transition-all duration-300`}
                >
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
                  <Link to={link.path} className={`text-slate-400 ${activeTheme.hoverText} text-sm font-bold transition-colors flex items-center group`}>
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
                  <Link to={link.path} className={`text-slate-400 ${activeTheme.hoverText} text-sm font-bold transition-colors`}>
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
                <MapPin className={`${activeTheme.iconColor} mt-1 transition-colors duration-500`} size={20} />
                <span className="text-slate-400 text-sm leading-relaxed font-medium">
                  #7 Mensah Danfah Ave. East Legon (Adjiriganor)<br />
                  Accra, Ghana
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className={`${activeTheme.iconColor} transition-colors duration-500`} size={20} />
                <span className="text-slate-400 text-sm font-bold">+233 (0) 302 751 290</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className={`${activeTheme.iconColor} transition-colors duration-500`} size={20} />
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
            © {currentYear} {activeTheme.name} {activeTheme.subtext === "HEALTHCARE" ? "HEALTHCARE GROUP" : activeTheme.subtext}. Designed with Excellence.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;