import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CentresOfExcellence = () => {
  const centres = [
    {
      title: "Surgery Centre",
      description: "Advanced laparoscopic and minimally invasive surgical precision.",
      cta: "View Services",
      path: "/surgery-center",
      // Light Burgundy / Wine Pastel
      bgClass: "bg-[#fdf2f2]", 
      accentColor: "text-surgery-main",
      image: "/assets/images/surgery-doc.png", // Use a PNG with transparent background if possible
      pattern: "radial-gradient(circle, rgba(128,0,32,0.05) 0%, transparent 70%)"
    },
    {
      title: "Fertility Centre",
      description: "Personalized reproductive care and advanced fertility solutions.",
      cta: "View Packages",
      path: "/fertility-center",
      // Light Teal / Sky Pastel
      bgClass: "bg-[#f0f9f9]", 
      accentColor: "text-fertility-main",
      image: "/assets/images/fertility-doc.png",
      pattern: "radial-gradient(circle, rgba(0,128,128,0.05) 0%, transparent 70%)"
    },
    {
      title: "Nova Pharmacy",
      description: "Expert pharmaceutical care and specialist medical supplies.",
      cta: "View All",
      path: "/pharmacy",
      // Light Medical Blue Pastel
      bgClass: "bg-[#f0f4ff]", 
      accentColor: "text-nova-blue",
      image: "/assets/images/pharmacy-doc.png",
      pattern: "radial-gradient(circle, rgba(0,74,173,0.05) 0%, transparent 70%)"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white font-nova">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {centres.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-[2.5rem] p-10 h-[320px] flex flex-col justify-center ${item.bgClass} group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500`}
            >
              {/* Background Sunburst Pattern */}
              <div 
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{ backgroundImage: item.pattern }}
              />

              {/* Content Side */}
              <div className="relative z-10 w-2/3">
                <h3 className="text-nova-blue text-2xl font-bold mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                  {item.description}
                </p>
                
                <Link 
                  to={item.path}
                  className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-xs font-bold text-slate-800 shadow-sm hover:shadow-md transition-all group-hover:gap-4"
                >
                  {item.cta} <ArrowRight size={14} className={item.accentColor} />
                </Link>
              </div>

              {/* Image Side - Positioned like the screenshot */}
              <div className="absolute bottom-0 right-0 w-1/2 h-[90%] pointer-events-none">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CentresOfExcellence;