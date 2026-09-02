import React, { useEffect, useState } from 'react';
import { Plus, Image, Trash2, Edit3, AlertCircle, FileText, X } from 'lucide-react';
import axios from 'axios';
import toast from '../../components/Toast';

const ManageBlogs = () => {
  // App States
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  // Update Tracking Architecture States
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeBlogId, setActiveBlogId] = useState(null);

  // Custom Structural Confirmation Modal States
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, targetId: null });

  // Composer Form Parameters State Vector
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    author: 'Nova Medical Editorial Board',
    readTime: '3 min read',
    content: '',
    coverImage: '' // Secure base64 data string payload
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await axios.get(`${process.env.REACT_APP_SERVICE_API}/api/blogs`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' }
      });
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blog posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Convert File Object to Base64 String Matrix
  const handleImageConversion = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert('Image is too large. Please choose a file under 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, coverImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Open clean composer layout frame
  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setActiveBlogId(null);
    setFormData({
      title: '',
      category: 'general',
      author: 'Nova Medical Editorial Board',
      readTime: '3 min read',
      content: '',
      coverImage: ''
    });
    setIsModalOpen(true);
  };

  // Prepopulate form configuration fields to edit mode
  const handleOpenEditModal = (blog) => {
    setIsEditMode(true);
    setActiveBlogId(blog._id);
    setFormData({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      content: blog.content,
      coverImage: blog.coverImage
    });
    setIsModalOpen(true);
  };

  // Universal Submission Router logic branch
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    const token = sessionStorage.getItem('admin_token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };

    try {
      if (isEditMode) {
        // EXECUTE PUT UPDATE LOGIC
        const response = await axios.put(
          `${process.env.REACT_APP_SERVICE_API}/api/blogs/${activeBlogId}`,
          formData,
          { headers }
        );
        if (response.data.success) {
          setBlogs(prev => prev.map(b => b._id === activeBlogId ? response.data.data : b));
          setIsModalOpen(false);
          toast.success('Post updated successfully.');
        }
      } else {
        // EXECUTE POST CREATION LOGIC
        const response = await axios.post(
          `${process.env.REACT_APP_SERVICE_API}/api/blogs`,
          formData,
          { headers }
        );
        if (response.data.success) {
          setBlogs(prev => [response.data.data, ...prev]);
          setIsModalOpen(false);
          toast.success('Post published successfully.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save the post.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Fire execution of asset delete purge sequence
  const executePurge = async () => {
    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVICE_API}/api/blogs/${deleteModal.targetId}`, 
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );

      if (response.data.success) {
        setBlogs(prev => prev.filter(b => b._id !== deleteModal.targetId));
        setDeleteModal({ isOpen: false, targetId: null });
        toast.success('Post deleted successfully.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete the post.');
      setDeleteModal({ isOpen: false, targetId: null });
    }
  };

  const getCategoryColor = (cat) => {
    if (cat === 'surgery') return 'text-red-600 bg-red-50';
    if (cat === 'fertility') return 'text-emerald-600 bg-emerald-50';
    if (cat === 'pharmacy') return 'text-purple-600 bg-purple-50';
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] p-8 md:p-12 font-nova relative">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Module Header Bar */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-2">Blog</span>
            <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">Manage Blog Posts</h1>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="h-12 px-6 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-slate-800 flex items-center gap-2 transition-colors duration-300"
          >
            <Plus size={16} /> Write Article
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold uppercase tracking-wide flex items-center gap-3">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        {/* REGISTRY ARTICLE GRID */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <span className="w-8 h-8 border-4 border-slate-950 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-bold text-xs uppercase tracking-wider">
            No blog posts yet. Click "Write Article" to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div>
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
                <div className="p-6 pt-0 flex justify-end items-center border-t border-slate-50 mt-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEditModal(blog)}
                      className="w-9 h-9 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-950 hover:text-white transition-colors"
                      title="Edit post"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, targetId: blog._id })}
                      className="w-9 h-9 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete post"
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

      {/* COMPOSER SLIDE OVERLAY COMPONENT */}
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
                    <FileText size={16} />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                    {isEditMode ? 'Edit Blog Post' : 'New Blog Post'}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Title</label>
                  <input required type="text" placeholder="e.g., Technological Breakthroughs In Advanced IVF" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Category</label>
                    <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-800 focus:outline-none">
                      <option value="general">General Healthcare</option>
                      <option value="surgery">Surgery Centre</option>
                      <option value="fertility">Fertility Centre</option>
                      <option value="pharmacy">Nova Pharmacy</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Author</label>
                    <input type="text" value={formData.author} onChange={(e) => handleInputChange('author', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Read Time</label>
                    <input type="text" value={formData.readTime} onChange={(e) => handleInputChange('readTime', e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-900 focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Cover Image</label>
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
                        required={!isEditMode} // Optional on updates
                        type="file"
                        accept="image/*"
                        onChange={handleImageConversion}
                        className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-wider file:bg-slate-950 file:text-white file:cursor-pointer hover:file:bg-slate-800 file:transition-all"
                      />
                      <p className="text-[10px] text-slate-400 font-medium">PNG, JPEG up to 4MB.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Content</label>
                  <textarea required rows={6} placeholder="Write the article here..." value={formData.content} onChange={(e) => handleInputChange('content', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-300 resize-none" />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="h-12 px-6 border border-slate-100 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitLoading} className="h-12 px-8 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-40 flex items-center justify-center min-w-[140px]">
                    {submitLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : isEditMode ? 'Save Changes' : 'Publish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      {/* ANNOTATED CUSTOM DESIGN CONFIRMATION PURGE DIALOG */}
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
                <h4 className="text-base font-black text-slate-950 uppercase tracking-tight">Delete this post?</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">This will permanently delete the post. This can't be undone.</p>
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
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ManageBlogs;