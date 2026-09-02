import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit3, AlertCircle, Briefcase, X, Users, Lock, Unlock } from 'lucide-react';
import axios from 'axios';
import toast from '../../components/Toast';

const emptyForm = {
  title: '',
  department: 'General',
  location: 'Accra, Ghana',
  employmentType: 'full-time',
  description: '',
  responsibilities: '',
  requirements: '',
  deadline: ''
};

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [activeJobId, setActiveJobId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, targetId: null });
  const [toggleLoadingId, setToggleLoadingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const authHeaders = () => {
    const token = sessionStorage.getItem('admin_token');
    return { Authorization: token ? `Bearer ${token}` : '' };
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVICE_API}/api/jobs/admin/all`, {
        headers: authHeaders()
      });
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load job postings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setActiveJobId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job) => {
    setIsEditMode(true);
    setActiveJobId(job._id);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      employmentType: job.employmentType,
      description: job.description,
      responsibilities: job.responsibilities || '',
      requirements: job.requirements || '',
      deadline: job.deadline ? job.deadline.substring(0, 10) : ''
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    const headers = { 'Content-Type': 'application/json', ...authHeaders() };
    const payload = { ...formData, deadline: formData.deadline || null };

    try {
      if (isEditMode) {
        const response = await axios.put(
          `${process.env.REACT_APP_SERVICE_API}/api/jobs/${activeJobId}`,
          payload,
          { headers }
        );
        if (response.data.success) {
          setJobs(prev => prev.map(j => j._id === activeJobId ? response.data.data : j));
          setIsModalOpen(false);
          toast.success('Job posting updated successfully.');
        }
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVICE_API}/api/jobs`,
          payload,
          { headers }
        );
        if (response.data.success) {
          setJobs(prev => [response.data.data, ...prev]);
          setIsModalOpen(false);
          toast.success('Job posting created successfully.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save the job posting.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const executePurge = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVICE_API}/api/jobs/${deleteModal.targetId}`,
        { headers: authHeaders() }
      );
      if (response.data.success) {
        setJobs(prev => prev.filter(j => j._id !== deleteModal.targetId));
        setDeleteModal({ isOpen: false, targetId: null });
        toast.success('Job posting deleted successfully.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete the job posting.');
      setDeleteModal({ isOpen: false, targetId: null });
    }
  };

  const toggleJobStatus = async (job) => {
    setToggleLoadingId(job._id);
    const action = job.isOpen ? 'close' : 'reopen';
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVICE_API}/api/jobs/${job._id}/${action}`,
        {},
        { headers: authHeaders() }
      );
      if (response.data.success) {
        setJobs(prev => prev.map(j => j._id === job._id ? response.data.data : j));
        toast.success(`Job posting ${action === 'close' ? 'closed' : 'reopened'} successfully.`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update job posting status.');
    } finally {
      setToggleLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] p-8 md:p-12 font-nova relative">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-2">Careers</span>
            <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">Manage Careers</h1>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="h-12 px-6 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-slate-800 flex items-center gap-2 transition-colors duration-300"
          >
            <Plus size={16} /> Post Job
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold uppercase tracking-wide flex items-center gap-3">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <span className="w-8 h-8 border-4 border-slate-950 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-bold text-xs uppercase tracking-wider">
            No job postings yet. Click "Post Job" to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-nova-blue bg-blue-50">
                      {job.department}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${job.isOpen ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                      {job.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-950 leading-snug line-clamp-2 uppercase tracking-tight">
                    {job.title}
                  </h3>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    {job.location} • {job.employmentType.replace('-', ' ')}
                  </div>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center border-t border-slate-50 mt-4">
                  <Link
                    to={`/admin/jobs/${job._id}/applicants`}
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-nova-blue transition-colors"
                  >
                    <Users size={13} /> Applicants
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleJobStatus(job)}
                      disabled={toggleLoadingId === job._id}
                      className={`w-9 h-9 border rounded-xl flex items-center justify-center transition-colors ${job.isOpen ? 'bg-amber-50 border-amber-100 text-amber-600 hover:bg-amber-500 hover:text-white' : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
                      title={job.isOpen ? 'Close posting' : 'Reopen posting'}
                    >
                      {job.isOpen ? <Lock size={14} /> : <Unlock size={14} />}
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(job)}
                      className="w-9 h-9 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-950 hover:text-white transition-colors"
                      title="Edit job posting"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, targetId: job._id })}
                      className="w-9 h-9 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete job posting"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COMPOSER MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/40 animate-fade-in"
            />

            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative z-10 shadow-2xl border border-slate-100 animate-scale-in"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-950 text-white rounded-lg flex items-center justify-center">
                    <Briefcase size={16} />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                    {isEditMode ? 'Modify Job Posting' : 'Post New Job'}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Job Title</label>
                  <input required type="text" placeholder="e.g., Registered Theatre Nurse" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Department</label>
                    <input required type="text" value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Location</label>
                    <input required type="text" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Employment Type</label>
                    <select value={formData.employmentType} onChange={(e) => handleInputChange('employmentType', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-800 focus:outline-none">
                      <option value="full-time">Full-Time</option>
                      <option value="part-time">Part-Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Application Deadline (Optional)</label>
                  <input type="date" value={formData.deadline} onChange={(e) => handleInputChange('deadline', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Overview / Description</label>
                  <textarea required rows={4} placeholder="Describe the role..." value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300 resize-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Responsibilities (Optional)</label>
                  <textarea rows={3} placeholder="List key responsibilities..." value={formData.responsibilities} onChange={(e) => handleInputChange('responsibilities', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300 resize-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Requirements (Optional)</label>
                  <textarea rows={3} placeholder="List qualifications and requirements..." value={formData.requirements} onChange={(e) => handleInputChange('requirements', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300 resize-none" />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="h-12 px-6 border border-slate-100 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitLoading} className="h-12 px-8 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-40 flex items-center justify-center min-w-[140px]">
                    {submitLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : isEditMode ? 'Save Changes' : 'Publish Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      {/* DELETE CONFIRMATION MODAL */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setDeleteModal({ isOpen: false, targetId: null })}
              className="absolute inset-0 bg-slate-950/40 animate-fade-in"
            />
            <div
              className="bg-white rounded-3xl max-w-sm w-full p-6 relative z-10 text-center space-y-4 shadow-2xl border border-slate-100 animate-scale-in"
            >
              <div className="w-12 h-12 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl flex items-center justify-center mx-auto">
                <Trash2 size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black text-slate-950 uppercase tracking-tight">Delete Job Posting?</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">This will permanently delete the posting and all its applications. This can't be undone.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setDeleteModal({ isOpen: false, targetId: null })}
                  className="h-11 border border-slate-100 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executePurge}
                  className="h-11 bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/10"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ManageJobs;
