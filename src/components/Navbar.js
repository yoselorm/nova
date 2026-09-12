import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import mainlogo from '../assets/images/novalogo.png';
import surgerylogo from '../assets/images/Surgerylogo.png';
import fertilitylogo from '../assets/images/Fertilitylogo.png';
import pharmacylogo from '../assets/images/Pharmacylogo.png';

const Navbar = ({ variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileSubsOpen, setMobileSubsOpen] = useState(false);

  const location = useLocation(); // Snag the active path string

  const themes = {
    default: {
      logo: mainlogo, activeText: "text-nova-blue", btnBg: "bg-nova-blue", hoverText: "hover:text-nova-sky"
    },
    surgery: {
      logo: surgerylogo, activeText: "text-surgery-main", btnBg: "bg-surgery-main", hoverText: "hover:text-surgery-gold"
    },
    fertility: {
      logo: fertilitylogo, activeText: "text-fertility-main", btnBg: "bg-fertility-main", hoverText: "hover:text-nova-blue"
    },
    pharmacy: {
      logo: pharmacylogo, activeText: "text-pharmacy-main", btnBg: "bg-pharmacy-main", hoverText: "hover:text-nova-blue"
    }
  };

  // Determine dynamic variant key based on the current path name
  const getDynamicVariant = () => {
    if (location.pathname.includes('surgery-center')) return 'surgery';
    if (location.pathname.includes('fertility-center')) return 'fertility';
    if (location.pathname.includes('pharmacy')) return 'pharmacy';
    return variant; // Graceful fallback back to variant prop
  };

  const activeTheme = themes[getDynamicVariant()];

  const subsidiaries = [
    { name: 'Surgery Centre', slug: 'surgery-center', color: 'text-surgery-main' },
    { name: 'Fertility Centre', slug: 'fertility-center', color: 'text-fertility-main' },
  ];

  const mainLinks = ['Home', 'About', 'Team', 'Services', 'Contact', 'Blog', 'Careers'];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-slate-100 font-nova">
      <div className="max-w-[1440px] mx-auto px-6 h-24 flex items-center justify-between">

        {/* LOGO SECTION - ONLY THE LOGO IMAGE NOW */}
        <Link to="/" className="flex items-center h-14">
          <img
            src={activeTheme.logo}
            alt="Nova Healthcare Group Logo"
            className="w-[150px] object-contain transition-all duration-500"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-8">
          {mainLinks.map(link => (
            <NavLink key={link} label={link} theme={activeTheme} />
          ))}

          {/* SUBSIDIARIES DROPDOWN (DESKTOP) */}
          <div
            className="relative h-24 flex items-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wide ${activeTheme.activeText}`}>
              Subsidiaries <ChevronDown size={14} />
            </div>

            <div
              className={`absolute top-20 left-0 w-64 bg-white shadow-2xl rounded-2xl border border-slate-50 p-4 transition-all duration-300 ease-out ${
                isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              {subsidiaries.map((item) => (
                <Link
                  key={item.name}
                  to={`/${item.slug}`}
                  className={`block p-4 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm ${item.color}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {/* Book Appointment Button */}
          <Link to="/#book">
            <button
              className={`${activeTheme.btnBg} text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Book Appointment
            </button>
            </Link>

            {/* Donate Button */}
            <Link to="/donate">
              <button
                className="border-cyan-600 px-8 hover:bg-cyan-50 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-2"
              >
                Donate
              </button>
            </Link>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="lg:hidden text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div
        className={`fixed inset-0 top-24 bg-white z-40 lg:hidden overflow-y-auto px-6 py-8 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          {mainLinks.map((link) => (
            <Link
              key={link}
              to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={`text-xs font-bold uppercase tracking-tight ${activeTheme.activeText}`}
            >
              {link}
            </Link>
          ))}

          {/* MOBILE SUBSIDIARIES ACCORDION */}
          <div>
            <button
              onClick={() => setMobileSubsOpen(!mobileSubsOpen)}
              className={`flex items-center justify-between w-full text-sm font-bold uppercase tracking-tight ${activeTheme.activeText}`}
            >
              Subsidiaries <ChevronDown className={`transition-transform duration-300 ${mobileSubsOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${mobileSubsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="pl-4 mt-4 space-y-4">
                  {subsidiaries.map((sub) => (
                    <Link
                      key={sub.name}
                      to={`/${sub.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`block text-lg font-bold ${sub.color}`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {/* Book Appointment Button */}
            <Link to="/#book">
              <button
                className={`flex-1 ${activeTheme.btnBg} text-white px-6 py-3 rounded-lg text-sm font-bold transition-shadow hover:shadow-lg duration-300`}
              >
                Book Appointment
              </button>
            </Link>

            {/* Donate Button */}
            <Link to="/donate">
              <button
                onClick={() => setIsOpen(false)}
                className="border-cyan-800 flex-1 px-6 py-3 rounded-lg text-sm font-bold border-2 transition-shadow hover:shadow-lg duration-300"
              >
                Donate
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ label, theme }) => (
  <Link
    to={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
    className={`text-xs font-bold uppercase tracking-wide text-slate-600 ${theme.hoverText} transition-colors`}
  >
    {label}
  </Link>
);

export default Navbar;
