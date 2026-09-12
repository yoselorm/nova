import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import surgerylogo from '../../assets/images/Surgerylogo.png';
import fertilitylogo from '../../assets/images/Fertilitylogo.png';
import useReveal from '../../utils/useReveal';

const CentresOfExcellence = () => {
  const [ref, isVisible] = useReveal();

  const centres = [
    {
      title: "Surgery Centre",
      description: "Advanced laparoscopic and minimally invasive surgical precision.",
      cta: "View Services",
      path: "/surgery-center",
      // Light Burgundy / Wine Pastel
      bgClass: "bg-[#fdf2f2]",
      accentColor: "text-surgery-main",
      image: surgerylogo, // Use a PNG with transparent background if possible
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
      image: fertilitylogo, // Use a PNG with transparent background if possible
      pattern: "radial-gradient(circle, rgba(0,128,128,0.05) 0%, transparent 70%)"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white font-nova">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-8">
          {centres.map((item, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: isVisible ? `${idx * 100}ms` : '0ms' }}
              className={`relative overflow-hidden rounded-[2.5rem] p-10 h-[320px] flex flex-col justify-center ${item.bgClass} group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
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
              <div className="absolute bottom-3 right-3 w-1/2 h-[90%] pointer-events-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CentresOfExcellence;
