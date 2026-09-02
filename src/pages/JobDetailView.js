import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, ChevronLeft, ShieldAlert, X, UploadCloud, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import toast from '../components/Toast';

const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB

const JobDetailView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: '',
    resumeName: '',
    resumeType: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVICE_API}/api/jobs/${slug}`);
        if (response.data.success) {
          setJob(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "We couldn't find this job posting.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_RESUME_SIZE) {
      toast.error('Resume file exceeds the maximum allowed size of 5MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        resume: reader.result,
        resumeName: file.name,
        resumeType: file.type
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      toast.error('Please attach your resume before submitting.');
      return;
    }

    setSubmitLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVICE_API}/api/jobs/${job._id}/apply`,
        formData
      );

      if (response.data.success) {
        setSubmitted(true);
        toast.success('Application submitted successfully.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit your application. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const closeApplyModal = () => {
    setIsApplyOpen(false);
    setSubmitted(false);
    setFormData({ fullName: '', email: '', phone: '', coverLetter: '', resume: '', resumeName: '', resumeType: '' });
  };

  if (loading) return (
    <div className="min-h-[60vh] w-full flex items-center justify-center bg-[#FAF9FF]">
      <span className="w-8 h-8 border-4 border-slate-950 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !job) return (
    <div className="min-h-[60vh] max-w-xl mx-auto flex flex-col items-center justify-center text-center p-6 font-nova">
      <ShieldAlert size={40} className="text-rose-500 mb-4" />
      <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight">Something Went Wrong</h3>
      <p className="text-xs text-slate-400 font-bold uppercase mt-2">{error}</p>
      <button
        onClick={() => navigate('/careers')}
        className="mt-6 h-10 px-6 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl"
      >
        Return to Careers
      </button>
    </div>
  );

  const formatType = (type) => type.replace('-', ' ');

  return (
    <article className="min-h-screen bg-[#FAF9FF] font-nova pb-24">

      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/careers')}
          className="h-10 px-4 bg-white border border-slate-100 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ChevronLeft size={16} /> All Open Positions
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 space-y-10">

        <div className="space-y-6">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-nova-blue bg-blue-50">
            {job.department}
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-[1.05]">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-y border-slate-200/50 py-4">
            <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-300" /> {job.location}</div>
            <div className="flex items-center gap-2"><Briefcase size={14} className="text-slate-300" /> {formatType(job.employmentType)}</div>
            {job.deadline && (
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-300" />
                Apply by {new Date(job.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            )}
          </div>

          {!job.isOpen ? (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-xs font-bold uppercase tracking-wide">
              This position is closed and no longer accepting applications.
            </div>
          ) : (
            <button
              onClick={() => setIsApplyOpen(true)}
              className="h-12 px-8 bg-nova-blue text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-blue-900 transition-colors"
            >
              Apply Now
            </button>
          )}
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Overview</h3>
            <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {job.responsibilities && (
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Responsibilities</h3>
              <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
            </div>
          )}

          {job.requirements && (
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Requirements</h3>
              <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">{job.requirements}</p>
            </div>
          )}
        </div>
      </div>

      {/* APPLICATION MODAL */}
      {isApplyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={closeApplyModal}
              className="absolute inset-0 bg-slate-950/40 animate-fade-in"
            />

            <div
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative z-10 shadow-2xl border border-slate-100 animate-scale-in"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">Apply For This Role</h3>
                <button onClick={closeApplyModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 size={26} />
                  </div>
                  <h4 className="text-base font-black text-slate-950 uppercase tracking-tight">Application Received</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
                    Thank you for applying. Our team will review your submission and reach out if there's a match.
                  </p>
                  <button
                    onClick={closeApplyModal}
                    className="mt-4 h-11 px-6 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Full Name</label>
                    <input required type="text" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Email</label>
                      <input required type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Phone</label>
                      <input required type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Resume / CV</label>
                    <div className="flex flex-col gap-3 p-4 border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl">
                      <input
                        required
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-wider file:bg-slate-950 file:text-white file:cursor-pointer hover:file:bg-slate-800 file:transition-all"
                      />
                      {formData.resumeName ? (
                        <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1.5">
                          <UploadCloud size={12} /> {formData.resumeName}
                        </p>
                      ) : (
                        <p className="text-[10px] text-slate-400 font-medium">PDF or Word document up to 5MB.</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Cover Letter (Optional)</label>
                    <textarea rows={4} placeholder="Tell us why you're a great fit..." value={formData.coverLetter} onChange={(e) => handleInputChange('coverLetter', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300 resize-none" />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                    <button type="button" onClick={closeApplyModal} className="h-12 px-6 border border-slate-100 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={submitLoading} className="h-12 px-8 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-40 flex items-center justify-center min-w-[160px]">
                      {submitLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
        </div>
      )}
    </article>
  );
};

export default JobDetailView;
