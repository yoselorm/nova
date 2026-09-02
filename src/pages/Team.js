import React from 'react';
import { Users, GraduationCap, Briefcase, Award, UserCircle2 } from 'lucide-react';
import useReveal from '../utils/useReveal';
import FrancisImg from '../assets/images/francis.jpg';
import CharleneImg from '../assets/images/Charlene.jpg';
import IsaacImg from '../assets/images/Isaac.jpg';
import VioletImg from '../assets/images/Violet.jpg';
import AmadeaImg from '../assets/images/Amadea.jpg';
import EmilyImg from '../assets/images/Emily.jpg';

const featuredTeam = [
  {
    name: 'Dr. Francis Dickson',
    credentials: 'MD FACOG',
    title: 'Founder and C.E.O., Advanced Laparoscopic Surgeon',
    image: FrancisImg,
    shortBio: [
      "Dr. Francis De'Graft Dickson is the founder and CEO of Nova Surgery Center in East Legon, Accra, Ghana. A native of Ghana, Dr. Dickson received his formative education at St. Augustine's College in Cape Coast.",
      "He received his MD degree from Howard University Medical School in Washington DC. He went on to complete full training in Obstetrics and Gynecology at Howard University Hospital and received his Specialty Board certification in 1989.",
      "For over 25 years, Dr. Dickson ran an active, private clinical and medical practice in suburban Washington DC. He served as the Chairman of the Obstetrics and Gynecology department of Medstar Southern Maryland Hospital Center and was frequently featured as a physician of excellence.",
      "Dr Dickson's expertise covers advanced surgical management of uterine fibroids and Endometriosis, using minimally invasive approach on laparoscopic or robotic platform. Dr Dickson retired from active practice in the United States in June 2017, to devote his attention to helping improve healthcare delivery in Ghana. He is an avid reader and spends his time off on exotic vacations with his wife, Dr Violet Habwe and their two lovely daughters, Ruth and Melanie."
    ],
    education: [
      'May 1982 – Doctor of Medicine, Howard University College of Medicine, Washington, DC',
      'May 1978 – BSc Chemistry Summa Cum Laude, Hunting College, Indiana'
    ],
    involvement: [
      '2010 – Update in Minimally Invasive Gynecologic Surgery, Howard University Medical Center, Washington DC',
      '2004 – Cosmetic Gynecology, Office Liposuction Workshop',
      '2003 – Pelvic Floor Reconstruction Workshop',
      '1993 – Advanced Endoscopy – LAVH, Advanced Laparoscopy, Diagnostic and Operative Hysteroscopy',
      '1990 – Diagnostic and Operative Hysteroscopy, Gynecological Laser Surgery',
      '1982–1987 – Intern/Resident Obstetrics and Gynecology, Howard University Hospital, Washington DC'
    ],
    societies: [
      'Fellow of the American College of Obstetrics and Gynecology',
      'American Association of Gynecologic Laparoscopists',
      'American Board of Bariatric Physicians',
      'American Academy of Cosmetic Gynecologists',
      'Association of Ghana Physicians and Surgeons'
    ]
  },
  {
    name: 'Dr. Charlene Annor',
    credentials: '',
    title: 'OBGYN, Medical Consultant',
    image: CharleneImg,
    shortBio: [
      'Dr Charlene Annor is a Consultant Obstetrician and Gynaecologist, who has recently moved to Accra, Ghana from South Africa. She was born and raised in South Africa to Ghanaian parents; medical doctors who had relocated to South Africa in the 1980s.',
      'Dr Annor completed her undergraduate medical degree at the University of Pretoria (South Africa) in 2011, and completed her specialisation programme in Obstetrics and Gynaecology at the University of Cape Town (South Africa) in 2019. At the end of the specialisation program, she was awarded the national prize for the most accomplished graduate in Obstetrics and Gynaecology (Daubenton Medal) and also completed a dissertation for a Masters degree in Obstetrics and Gynaecology that year.',
      'She most recently worked in the Department of Obstetrics and Gynaecology at the University of Cape Town, where she was favoured persistently by students as one of the best undergraduate and post graduate lecturers for 2020 and 2021.',
      'Dr Annor has significant interest and experience in the fields of infertility, gynaecological endocrinology (PCOS etc), high risk obstetrics and ultrasound. Surgically, she is well experienced in a wide range of gynaecological and obstetric surgical procedures. Due to her interest in minimally invasive (laparoscopic) surgery, she pursued certification with the European GESEA certification programme – and completed 2 certification levels in 2021, with distinction. She aims to equip all of her patients with knowledge and understanding, so that they can be a part of their journey to improving their health.',
      'Dr Annor is recently married, and spends her spare time travelling or pursuing adventure out-doors.'
    ],
    education: [
      'Gynaecological Endoscopic Surgical Education and Assessment (GESEA) Programme – Level 1 and Level 2 (Passed with Distinction) – 2021',
      'Masters in Medicine (Obstetrics and Gynaecology) – Passed with Distinction – 2019',
      'Fellow of the College of Obstetrics and Gynaecology South Africa – FCOG (SA) – Winner of the Daubenton Medal – 2019',
      'MBChB (Pret) – Cum Laude – 2011'
    ],
    involvement: [
      '2020–2022: Consultant Obstetrician & Gynaecologist, Reproductive Medicine Unit, Groote Schuur Hospital, Cape Town, South Africa',
      'November 2019 – March 2020: Consultant Obstetrician & Gynaecologist, O&G Department, Greater Accra Regional Hospital, Accra, Ghana',
      '2015–2019: Registrar in Obstetrics and Gynaecology, University of Cape Town, South Africa',
      '2013–2014: Medical Officer, Obstetrics & Gynaecology Department, Charlotte Maxeke Academic Hospital, Johannesburg, South Africa',
      '2012–2013: Medical Intern, Johannesburg, South Africa'
    ],
    societies: [
      'Fellow of the College of Obstetricians and Gynaecologists – South Africa',
      'Registered as a Specialist Practitioner – Obstetrics and Gynaecology – Ghana Medical and Dental Council',
      'Registered as an Independent Specialist Practitioner – Obstetrics and Gynaecology – Health Professions Council, South Africa'
    ]
  }
];

// Team members whose full biography write-up is still pending
const pendingProfiles = [
  { name: 'Dr. Isaac Baidoo', title: 'MD', image: IsaacImg },
  { name: 'Dr. Violet Habwe', title: 'MD', image: VioletImg },
  { name: 'Dr. Amadea Tetteh', title: 'MD', image: AmadeaImg },
  { name: 'Emily M. Nwankwo', title: 'Business Development and Capacity Building', image: EmilyImg },
  { name: 'Dr. Barbara Fenyi', title: 'Medical Doctor', image: null },
  { name: 'Evelyn Kwofie', title: 'Head Nurse', image: null }
];

const BioSection = ({ icon, title, children }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2.5">
      <span className="text-nova-sky">{icon}</span>
      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">{title}</h3>
    </div>
    {children}
  </div>
);

const FeaturedProfile = ({ doc, shaded }) => {
  const [ref, isVisible] = useReveal();

  return (
    <section className={`py-20 px-6 ${shaded ? 'bg-[#FAF9FF]' : 'bg-white'}`}>
      <div ref={ref} className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <div
          className={`lg:w-[38%] w-full shrink-0 lg:sticky lg:top-28 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl border-[10px] border-white aspect-[4/5]">
            <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div
          style={{ transitionDelay: isVisible ? '120ms' : '0ms' }}
          className={`lg:w-[62%] w-full space-y-10 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight uppercase">
              {doc.name} {doc.credentials && <span className="text-nova-blue">{doc.credentials}</span>}
            </h2>
            <p className="text-nova-sky font-black text-xs uppercase tracking-widest mt-2">{doc.title}</p>
          </div>

          <BioSection icon={<UserCircle2 size={16} />} title="Short Bio">
            <div className="space-y-4">
              {doc.shortBio.map((para, i) => (
                <p key={i} className="text-slate-600 text-sm font-medium leading-relaxed">{para}</p>
              ))}
            </div>
          </BioSection>

          <BioSection icon={<GraduationCap size={16} />} title="Education">
            <ul className="space-y-2">
              {doc.education.map((item, i) => (
                <li key={i} className="text-slate-600 text-sm font-medium leading-relaxed pl-4 border-l-2 border-slate-100">{item}</li>
              ))}
            </ul>
          </BioSection>

          <BioSection icon={<Briefcase size={16} />} title="Professional Involvement (Past & Present)">
            <ul className="space-y-2">
              {doc.involvement.map((item, i) => (
                <li key={i} className="text-slate-600 text-sm font-medium leading-relaxed pl-4 border-l-2 border-slate-100">{item}</li>
              ))}
            </ul>
          </BioSection>

          <BioSection icon={<Award size={16} />} title="Professional Societies and Affiliations">
            <ul className="space-y-2">
              {doc.societies.map((item, i) => (
                <li key={i} className="text-slate-600 text-sm font-medium leading-relaxed pl-4 border-l-2 border-slate-100">{item}</li>
              ))}
            </ul>
          </BioSection>
        </div>
      </div>
    </section>
  );
};

const PendingProfilesGrid = ({ people }) => {
  const [ref, isVisible] = useReveal();

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {people.map((person, idx) => (
        <div
          key={person.name}
          style={{ transitionDelay: isVisible ? `${idx * 80}ms` : '0ms' }}
          className={`flex items-center gap-5 bg-[#FAF9FF] rounded-3xl border border-slate-100 p-5 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
            {person.image ? (
              <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
            ) : (
              <UserCircle2 size={36} className="text-slate-300" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight">{person.name}</h4>
            <p className="text-nova-sky text-[10px] font-black uppercase tracking-widest mt-1">{person.title}</p>
            <p className="text-slate-400 text-[11px] font-medium italic mt-2">Full biography coming soon.</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Team = () => {
  return (
    <div className="min-h-screen bg-white font-nova">

      {/* HERO HEADER */}
      <section className="pt-32 pb-16 px-6 border-b border-slate-50">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-nova-blue text-[10px] font-black uppercase tracking-widest">
            <Users size={12} /> Meet Our Team
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none">
            The People Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-blue via-nova-sky to-slate-400 font-light lowercase italic">Nova Healthcare.</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
            A multidisciplinary team of surgeons, consultants, and support staff dedicated to delivering ambulatory medical and surgical excellence.
          </p>
        </div>
      </section>

      {/* FEATURED PROFILES — IMAGE LEFT, BIO RIGHT */}
      {featuredTeam.map((doc, idx) => (
        <FeaturedProfile key={doc.name} doc={doc} shaded={idx % 2 === 1} />
      ))}

      {/* REST OF THE TEAM — COMPACT PROFILES, BIOS PENDING */}
      <section className="py-24 px-6 bg-white border-t border-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
            <span className="text-nova-blue font-black uppercase tracking-[0.4em] text-[10px]">Growing Every Day</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tighter uppercase">Rest of the Team</h2>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">Full biographies for the team members below are on the way.</p>
          </div>

          <PendingProfilesGrid people={pendingProfiles} />
        </div>
      </section>
    </div>
  );
};

export default Team;
