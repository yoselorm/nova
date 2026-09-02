import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, Eye, Trash2, AlertCircle, Mail, Phone } from 'lucide-react';
import axios from 'axios';
import toast from '../../components/Toast';

const JobApplicants = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, targetId: null });

  const authHeaders = () => {
    const token = sessionStorage.getItem('admin_token');
    return { Authorization: token ? `Bearer ${token}` : '' };
  };

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVICE_API}/api/jobs/${id}/applications`,
        { headers: authHeaders() }
      );
      if (response.data.success) {
        setJob(response.data.job);
        setApplications(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load applicants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateStatus = async (appId, status) => {
    setActionLoadingId(appId);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVICE_API}/api/applications/${appId}/status`,
        { status },
        { headers: authHeaders() }
      );
      if (response.data.success) {
        setApplications(prev => prev.map(a => a._id === appId ? response.data.data : a));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const executeDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVICE_API}/api/applications/${deleteModal.targetId}`,
        { headers: authHeaders() }
      );
      if (response.data.success) {
        setApplications(prev => prev.filter(a => a._id !== deleteModal.targetId));
        setDeleteModal({ isOpen: false, targetId: null });
        toast.success('Applicant deleted.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete applicant.');
      setDeleteModal({ isOpen: false, targetId: null });
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'shortlisted') return 'text-emerald-700 bg-emerald-50';
    if (status === 'rejected') return 'text-rose-700 bg-rose-50';
    if (status === 'reviewed') return 'text-nova-blue bg-blue-50';
    return 'text-amber-700 bg-amber-50';
  };

  // Browsers can render PDFs and images inline; Word docs have no native in-browser viewer
  const isViewableResume = (type) => type === 'application/pdf' || (type || '').startsWith('image/');

  if (loading) return (
    <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center font-nova">
      <span className="w-8 h-8 border-4 border-nova-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9FF] p-8 md:p-12 font-nova">
      <div className="max-w-6xl mx-auto space-y-8">

        <button
          onClick={() => navigate('/admin/jobs')}
          className="h-10 px-4 bg-white border border-slate-100 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ChevronLeft size={16} /> Back to Job Postings
        </button>

        <div>
          <span className="text-[10px] font-black text-nova-sky uppercase tracking-[0.4em] block mb-2">Applicants</span>
          <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">{job?.title || 'Applicants'}</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-2">{applications.length} application{applications.length !== 1 ? 's' : ''} received</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold uppercase tracking-wide flex items-center gap-3">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-bold text-xs uppercase tracking-wider">
            No applications received for this posting yet.
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="p-6">Applicant</th>
                    <th className="p-6">Contact</th>
                    <th className="p-6">Resume</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                    {applications.map((app) => (
                      <tr
                        key={app._id}
                        className="hover:bg-slate-50/40 transition-colors align-top animate-fade-in"
                      >
                        <td className="p-6">
                          <div className="font-bold text-slate-900">{app.fullName}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1">
                            {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          {app.coverLetter && (
                            <p className="text-[11px] font-medium text-slate-400 italic max-w-xs line-clamp-3 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                              "{app.coverLetter}"
                            </p>
                          )}
                        </td>

                        <td className="p-6">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700"><Mail size={12} className="text-slate-400" /> {app.email}</div>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 mt-1"><Phone size={12} className="text-slate-400" /> {app.phone}</div>
                        </td>

                        <td className="p-6">
                          <div className="flex gap-2">
                            {isViewableResume(app.resumeType) && (
                              <a
                                href={app.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-9 px-3 bg-slate-50 border border-slate-100 text-slate-700 rounded-lg flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider hover:bg-slate-950 hover:text-white transition-colors"
                                title="View resume"
                              >
                                <Eye size={12} /> View
                              </a>
                            )}
                            <a
                              href={app.resume}
                              download={app.resumeName || `${app.fullName}-resume`}
                              className="h-9 px-3 bg-slate-50 border border-slate-100 text-slate-700 rounded-lg flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider hover:bg-slate-950 hover:text-white transition-colors"
                              title="Download resume"
                            >
                              <Download size={12} /> Download
                            </a>
                          </div>
                        </td>

                        <td className="p-6">
                          <select
                            value={app.status}
                            disabled={actionLoadingId === app._id}
                            onChange={(e) => updateStatus(app._id, e.target.value)}
                            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border-0 focus:outline-none cursor-pointer ${getStatusBadge(app.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>

                        <td className="p-6 text-right">
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, targetId: app._id })}
                            className="w-9 h-9 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl inline-flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors"
                            title="Delete applicant"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

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
                <h4 className="text-base font-black text-slate-950 uppercase tracking-tight">Delete this applicant?</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">This will permanently delete this application. This can't be undone.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setDeleteModal({ isOpen: false, targetId: null })}
                  className="h-11 border border-slate-100 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
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

export default JobApplicants;
