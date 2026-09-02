import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, ArrowRight, Users, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOpenJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVICE_API}/api/jobs`);
        if (response.data.success) {
          setJobs(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'The careers listing array is currently unreachable.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpenJobs();
  }, []);

  const formatType = (type) => type.replace('-', ' ');

  return (
    <div className="min-h-screen bg-[#FAF9FF] font-nova py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Cinematic Landing Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-nova-blue text-[10px] font-black uppercase tracking-widest">
            <Users size={12} /> Join The Nova Team
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none">
            Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-blue via-nova-sky to-slate-400 font-light lowercase italic">career here.</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">
            Explore open roles across our surgery, fertility, and pharmacy subsidiaries and help us deliver exceptional patient care.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold uppercase tracking-wide flex items-center gap-3 max-w-md mx-auto">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <span className="w-8 h-8 border-4 border-slate-950 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-bold text-xs uppercase tracking-wider max-w-xl mx-auto shadow-sm">
            No open positions at the moment. Check back soon.
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link
                key={job._id}
                to={`/careers/${job.slug}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:border-slate-200/60 transition-all duration-300 group"
              >
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-nova-blue bg-blue-50">
                    {job.department}
                  </span>
                  <h3 className="text-lg font-black text-slate-950 tracking-tight uppercase group-hover:text-nova-blue transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    <div className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</div>
                    <div className="flex items-center gap-1.5"><Briefcase size={13} /> {formatType(job.employmentType)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-950 group-hover:text-nova-blue transition-colors shrink-0">
                  View Role
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Careers;
