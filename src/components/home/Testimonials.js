import React from 'react';
import { Star, Quote, UserCircle } from 'lucide-react';

const InfiniteTestimonials = () => {
  const stories = [
    {
      name: "Kwame Antwi",
      location: "East Legon",
      text: "The specialist at Nova Surgery Centre made me feel at ease. The minimally invasive procedure meant I was back on my feet faster.",
    },
    {
      name: "Naa Adjeiwaa Botchwey",
      location: "Tema",
      text: "Every visit feels personal — the doctors remember our family history and genuinely care. Highly recommended for families.",
    },
    {
      name: "Musa Yaro",
      location: "Accra",
      text: "Professionalism at its peak. From the pharmacy to the consulting rooms, the synergy at Nova is world-class.",
    },
    {
        name: "Dr. Araba Mensah",
        location: "Kumasi",
        text: "As a fellow professional, I appreciate the state-of-the-art equipment and the surgical precision provided here.",
    }
  ];

  // Double the array to create the seamless loop
  const duplicateStories = [...stories, ...stories];

  return (
    <section className="py-24 bg-white font-nova overflow-hidden relative">
      <div className="text-center mb-16">
         <h3 className="text-nova-blue text-4xl font-bold">
            Hear From Our <span className="text-fertility-main">Patient Stories</span>
         </h3>
      </div>

      {/* The Marquee Container */}
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex gap-8 whitespace-nowrap">
          {duplicateStories.map((story, idx) => (
            <div
              key={idx}
              className="w-[400px] p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-100/50 flex-shrink-0 whitespace-normal transition-transform hover:scale-105"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" className="text-yellow-400" />
                ))}
              </div>
              
              <Quote className="text-slate-100 mb-4" size={40} />
              
              <p className="text-slate-600 italic leading-relaxed mb-8 font-medium">
                "{story.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <UserCircle size={40} className="text-slate-300" />
                <div>
                  <h4 className="text-nova-blue font-bold text-lg leading-none">{story.name}</h4>
                  <p className="text-nova-sky text-xs font-bold uppercase tracking-widest mt-1">{story.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Fades for the edges to make it look high-end */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
};

export default InfiniteTestimonials;