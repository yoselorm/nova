import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image, Trash2, Edit3, AlertCircle, FileText, X, Check, Eye } from 'lucide-react';
import axios from 'axios';

const ManageBlogs = () => {
  const masterEase = [0.16, 1, 0.3, 1];

  // App States
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Composer Form Parameters State
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    author: 'Nova Medical Editorial Board',
    readTime: '3 min read',
    content: '',
    coverImage: '' // This will safely lock our raw converted Base64 string string payload
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // 1. Manually capture the current session token signature
      const token = sessionStorage.getItem('admin_token');

      // 2. Pass the token cleanly inside the request's Authorization header
      const response = await axios.get(`${process.env.REACT_APP_SERVICE_API}/api/blogs`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });

      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error pulling administrative blog arrays.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // THE CORE ENGINE: Convert File Object to Base64 String 
  const handleImageConversion = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Fast file-size guard block (MongoDB documents are capped at 16MB)
    if (file.size > 4 * 1024 * 1024) {
      alert('Asset payload exceeds maximum optimization size threshold (4MB). Optimize image before seeding.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, coverImage: reader.result })); // This result is your raw "data:image/png;base64,..." string
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Submit Article Payload Array to Matrix
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      // 1. Manually extract the token from session storage
      const token = sessionStorage.getItem('admin_token');

      const response = await axios.post(
        `${process.env.REACT_APP_SERVICE_API}/api/blogs`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            // 2. Inject the Authorization string along with Content-Type
            'Authorization': token ? `Bearer ${token}` : ''
          }
        }
      );

      if (response.data.success) {
        // Append the new object back to local arrays instantly and clean frames
        setBlogs(prev => [response.data.data, ...prev]);
        setIsModalOpen(false);
        setFormData({ title: '', category: 'general', author: 'Nova Medical Editorial Board', readTime: '3 min read', content: '', coverImage: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed transmission of literary asset pipeline.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Purge Document Entry Out of MongoDB Matrix
  // Purge Document Entry Out of MongoDB Matrix
  const handleDelete = async (id) => {
    if (!window.confirm('Are you absolutely certain you want to purge this clinical literature asset log?')) return;

    try {
      // 1. Capture the token sequence manually
      const token = sessionStorage.getItem('admin_token');

      // 2. Map the token onto the config configuration block headers object
      const response = await axios.delete(`${process.env.REACT_APP_SERVICE_API}/api/blogs/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });

      if (response.data.success) {
        setBlogs(prev => prev.filter(b => b._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed execution of asset purge sequence.');
    }
  };

  const getCategoryColor = (cat) => {
    if (cat === 'surgery') return 'text-surgery-main bg-red-50';
    if (cat === 'fertility') return 'text-[#009774] bg-emerald-50';
    if (cat === 'pharmacy') return 'text-[#5B2897] bg-purple-50';
    return 'text-nova-blue bg-blue-50';
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] p-8 md:p-12 font-nova relative">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Module Header Bar */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-nova-sky uppercase tracking-[0.4em] block mb-2">// Corporate Literature Engine</span>
            <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">Manage Medical Blogs</h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-6 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-nova-blue flex items-center gap-2 transition-colors duration-300"
          >
            <Plus size={16} /> Write Article
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold uppercase tracking-wide flex items-center gap-3">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        {/* COMPACT REGISTRY ARTICLE GRID */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <span className="w-8 h-8 border-4 border-slate-950 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-bold text-xs uppercase tracking-wider">
            No published medical records found. Launch writer array above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div>
                  {/* Image viewport displaying the direct Base64 source */}
                  <div className="h-48 bg-slate-100 w-full relative overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getCategoryColor(blog.category)} shadow-sm`}>
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                      By {blog.author} • {blog.readTime}
                    </div>
                    <h3 className="text-base font-black text-slate-950 leading-snug line-clamp-2 uppercase tracking-tight">
                      {blog.title}
                    </h3>
                  </div>
                </div>

                {/* Card Operations Footer Panel */}
                <div className="p-6 pt-0 flex justify-between items-center border-t border-slate-50 mt-4">
                  <span className="text-[10px] font-mono font-black uppercase text-slate-300">NVB-LOG</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="w-9 h-9 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors"
                      title="Purge Article"
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

      {/* COMPOSER SLIDE OVERLAY WRITER MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop Mask */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950"
            />

            {/* Modal Body wrapper box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ ease: masterEase }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative z-10 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nova-blue text-white rounded-lg flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">Compose Clinical Article</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Inputs: Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Article Core Title</label>
                  <input required type="text" placeholder="e.g., Technological Breakthroughs In Advanced IVF Procedures" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category Target Select */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Channel Target</label>
                    <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-800 focus:outline-none">
                      <option value="general">General Healthcare</option>
                      <option value="surgery">Surgery Centre</option>
                      <option value="fertility">Fertility Centre</option>
                      <option value="pharmacy">Nova Pharmacy</option>
                    </select>
                  </div>

                  {/* Author Line */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Author Registry Signature</label>
                    <input type="text" value={formData.author} onChange={(e) => handleInputChange('author', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none" />
                  </div>

                  {/* Read timeline info */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Estimated Metric Read Matrix</label>
                    <input type="text" value={formData.readTime} onChange={(e) => handleInputChange('readTime', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none" />
                  </div>
                </div>

                {/* THE IMAGING FIELD: Live File Picker to Base64 Hook */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Cover Image Graphic Asset</label>
                  <div className="flex flex-col sm:flex-row gap-4 items-center p-4 border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl">
                    <div className="h-28 w-44 bg-white border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center shrink-0 relative group">
                      {formData.coverImage ? (
                        <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Image size={24} className="text-slate-300" />
                      )}
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                      <input
                        required
                        type="file"
                        accept="image/*"
                        onChange={handleImageConversion}
                        className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-wider file:bg-slate-950 file:text-white file:cursor-pointer hover:file:bg-nova-blue file:transition-all"
                      />
                      <p className="text-[10px] text-slate-400 font-medium">PNG, JPEG up to 4MB. Converted to secure string array locally inside storage cache matrices.</p>
                    </div>
                  </div>
                </div>

                {/* Content Payload Field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Core Literature Text Payload</label>
                  <textarea required rows={6} placeholder="Write your clinical research findings or public update message metrics here..." value={formData.content} onChange={(e) => handleInputChange('content', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300 resize-none" />
                </div>

                {/* Submit Panel */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="h-12 px-6 border border-slate-100 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition-colors">
                    Abort
                  </button>
                  <button type="submit" disabled={submitLoading} className="h-12 px-8 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-nova-blue transition-colors disabled:opacity-40 flex items-center justify-center min-w-[140px]">
                    {submitLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Dispatch Log'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageBlogs;