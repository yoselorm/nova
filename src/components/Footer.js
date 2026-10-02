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

const WhatsAppIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.876.52 3.63 1.42 5.13L2.05 22l4.99-1.31A9.94 9.94 0 0012.001 22C17.523 22 22 17.522 22 12S17.523 2 12.001 2zm0 18.06c-1.66 0-3.2-.49-4.494-1.33l-.322-.19-2.965.778.79-2.888-.21-.297A8.06 8.06 0 013.94 12c0-4.446 3.616-8.06 8.061-8.06 4.446 0 8.06 3.614 8.06 8.06 0 4.446-3.614 8.06-8.06 8.06z" />
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
                { Icon: Mail, href: 'mailto:info@novasurgerycenter.com' },
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
              <a href="https://wa.me/233544030436" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 w-fit text-slate-400 ${activeTheme.hoverText} transition-colors`}>
                <WhatsAppIcon size={20} className={`${activeTheme.iconColor} transition-colors duration-500`} />
                <span className="text-sm font-bold">+233 (0) 544 030 436 (WhatsApp)</span>
              </a>
              <div className="flex items-center gap-4">
                <Mail className={`${activeTheme.iconColor} transition-colors duration-500`} size={20} />
                <span className="text-slate-400 text-sm font-bold">info@novasurgerycenter.com</span>
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