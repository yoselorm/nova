import React from 'react';
import { Target, Eye, ShieldCheck, Zap } from 'lucide-react';
import CinematicHero from '../components/About/AboutHero';
import NovaHistoryImg from '../assets/images/Novahistory02.jpg';
import facilityImg from '../assets/images/facility.jpg';
import useReveal from '../utils/useReveal';

const About = () => {
  const [imgRef, imgVisible] = useReveal();
  const [textRef, textVisible] = useReveal();
  const [bannerRef, bannerVisible] = useReveal();
  const [goalRef, goalVisible] = useReveal();

  return (
    <main className="bg-white font-nova overflow-hidden">

      <CinematicHero/>

      {/* --- SECTION 2: HISTORY & VISION (The "Wall Design" Layout) --- */}
      <section className="py-24 px-6 bg-slate-50 relative">
        {/* Floating Background Texture */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(#004AAD 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div
            ref={imgRef}
            className={`rounded-[4rem] overflow-hidden border-[15px] border-white shadow-xl relative h-[600px] transition-all duration-[1200ms] ease-out ${
              imgVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ clipPath: imgVisible ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)' }}
          >
            <img src={NovaHistoryImg} className="w-full h-full object-cover" alt="Nova History" />
            <div className="absolute inset-0 bg-gradient-to-t from-nova-blue/40 to-transparent" />
          </div>

          <div ref={textRef} className="space-y-10">
            <div className={`transition-all duration-700 ease-out ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-nova-blue font-black uppercase tracking-[0.4em] text-[10px]">Founded September 2015</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-4">West Africa's First Free-Standing Surgery Center.</h2>
              <p className="text-slate-500 font-medium leading-relaxed mt-6">
                Nova Surgery Center was founded on the principle that "The satisfaction of the patient is our number one priority." Since 2015, we have evolved into a household name for laparoscopic surgery in the Greater Accra Region.
              </p>
            </div>

            {/* DUAL MISSION/VISION CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 transition-transform duration-300 hover:scale-[1.02]">
                <Eye className="text-nova-sky mb-4" size={28} />
                <h4 className="font-black text-[10px] uppercase tracking-widest mb-2">Our Vision</h4>
                <p className="text-sm font-bold text-slate-700 leading-snug">To be the leading center of excellence in Africa dedicated to ambulatory medical and surgical patient care.</p>
              </div>
              <div className="bg-nova-blue p-8 rounded-[3rem] shadow-xl text-white transition-transform duration-300 hover:scale-[1.02]">
                <Target className="text-nova-sky mb-4" size={28} />
                <h4 className="font-black text-[10px] uppercase tracking-widest mb-2 text-white/60">Our Mission</h4>
                <p className="text-sm font-bold leading-snug">Our mission is one of dedication to the specialty of Minimally Invasive Gynecology to the Practice of Excellence in healthcare. We believe that our patients have earned the right to access the safest, most effective and most technologically advanced treatment modalities in medicine.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: CENTER OF EXCELLENCE (Wide Cinematic Banner) --- */}
      <section className="py-20 px-6">
        <div
          ref={bannerRef}
          className={`max-w-7xl mx-auto h-[450px] rounded-[4rem] overflow-hidden relative shadow-2xl group transition-all duration-1000 ${
            bannerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img src={facilityImg} className="w-full h-full object-cover" alt="Facility" />
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/20 transition-all duration-700" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
            <ShieldCheck className="text-nova-sky mb-6" size={48} />
            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter mb-4">Ultra-Modern Center of Excellence</h2>
            <p className="text-white/80 max-w-xl font-medium">Located at #7 Mensah Danfah Avenue, Adjiringanor, East Legon.</p>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: THE GOAL --- */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-3xl mx-auto text-center px-6">
          <div ref={goalRef} className={`transition-all duration-700 ease-out ${goalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
             <div className="w-12 h-12 bg-nova-sky/10 rounded-full flex items-center justify-center text-nova-sky mx-auto mb-8">
                <Zap size={24} />
             </div>
             <h3 className="text-3xl font-black tracking-tight mb-6">Our Goal is Simple.</h3>
             <p className="text-xl text-slate-500 leading-relaxed font-light italic">
               "We strive to share knowledge with you about all treatment options, so that you can make decisions that are right for you."
             </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
