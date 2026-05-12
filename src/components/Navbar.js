import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Using Link for smoother transitions

const Navbar = ({ variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileSubsOpen, setMobileSubsOpen] = useState(false);

  const themes = {
    default: {
      logo: "N", name: "NOVA", subtext: "HEALTHCARE",
      activeText: "text-nova-blue", btnBg: "bg-nova-blue", hoverText: "hover:text-nova-sky"
    },
    surgery: {
      logo: "S", name: "NOVA", subtext: "SURGERY CENTRE",
      activeText: "text-surgery-main", btnBg: "bg-surgery-main", hoverText: "hover:text-surgery-gold"
    },
    fertility: {
      logo: "F", name: "NOVA", subtext: "FERTILITY CENTRE",
      activeText: "text-fertility-main", btnBg: "bg-fertility-main", hoverText: "hover:text-nova-blue"
    },
    pharmacy: {
      logo: "P", name: "NOVA", subtext: "PHARMACY",
      activeText: "text-pharmacy-main", btnBg: "bg-pharmacy-main", hoverText: "hover:text-nova-blue"
    }
  };

  const activeTheme = themes[variant];

  const subsidiaries = [
    { name: 'Surgery Centre', slug: 'surgery-center', color: 'text-surgery-main' },
    { name: 'Fertility Centre', slug: 'fertility-center', color: 'text-fertility-main' },
    { name: 'Pharmacy', slug: 'pharmacy', color: 'text-pharmacy-main' },
  ];

  const mainLinks = ['Home', 'About', 'Team', 'Services', 'Contact', 'Blog', 'Donate'];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-slate-100 font-nova">
      <div className="max-w-[1440px] mx-auto px-6 h-24 flex items-center justify-between">

        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-3">
          <div className={`w-11 h-11 ${activeTheme.btnBg} rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors duration-500`}>
            {activeTheme.logo}
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold leading-none tracking-tight ${activeTheme.activeText}`}>{activeTheme.name}</span>
            <span className="text-[10px] text-slate-400 font-bold tracking-[0.15em] uppercase">{activeTheme.subtext}</span>
          </div>
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
            <div className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide ${activeTheme.activeText}`}>
              Subsidiaries <ChevronDown size={14} />
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-20 left-0 w-64 bg-white shadow-2xl rounded-2xl border border-slate-50 p-4"
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <button className={`${activeTheme.btnBg} text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg transition-colors`}>
            Book Appointment
          </button> */}

          <div className="flex gap-3">
            {/* Book Appointment Button */}
            <button
              className={`${activeTheme.btnBg} text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              Book Appointment
            </button>

            {/* Donate Button */}
            <button
              className="border-cyan-600 px-8 hover:bg-cyan-50 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 border-2"

            >
              Donate
            </button>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 top-24 bg-white z-40 lg:hidden overflow-y-auto px-6 py-8"
          >
            <div className="flex flex-col gap-6">
              {mainLinks.map((link) => (
                <Link
                  key={link}
                  to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-nova-blue uppercase tracking-tight"
                >
                  {link}
                </Link>
              ))}

              {/* MOBILE SUBSIDIARIES ACCORDION */}
              <div>
                <button
                  onClick={() => setMobileSubsOpen(!mobileSubsOpen)}
                  className="flex items-center justify-between w-full text-sm font-bold text-nova-blue uppercase tracking-tight"
                >
                  Subsidiaries <ChevronDown className={mobileSubsOpen ? 'rotate-180 transition-transform' : ''} />
                </button>

                <AnimatePresence>
                  {mobileSubsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 mt-4 space-y-4"
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-3 pt-4">
                {/* Book Appointment Button */}
                <button
                  className={`flex-1 ${activeTheme.btnBg} text-white px-6 py-3 rounded-lg text-sm font-bold transition-shadow hover:shadow-lg duration-300`}
                >
                  Book Appointment
                </button>

                {/* Donate Button */}
                <button
                  className="border-cyan-800 flex-1 px-6 py-3 rounded-lg text-sm font-bold border-2 transition-shadow hover:shadow-lg duration-300"

                >
                  Donate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ label, theme }) => (
  <Link
    to={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
    className={`text-sm font-bold uppercase tracking-wide text-slate-600 ${theme.hoverText} transition-colors`}
  >
    {label}
  </Link>
);

export default Navbar;