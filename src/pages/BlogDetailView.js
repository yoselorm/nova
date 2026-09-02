import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Trash2, ShieldAlert, ChevronLeft } from 'lucide-react';
import axios from 'axios';

const BlogDetailView = ({ isAdmin = false }) => {
  const { slug } = useParams(); // Grabs the auto-generated URL slug string
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true);
      try {
        // Public reads rely on standard routes, admin can bypass check states if needed
        const endpoint = `${process.env.REACT_APP_SERVICE_API}/api/blogs/${slug}`;
        const response = await axios.get(endpoint, { withCredentials: true });
        
        if (response.data.success) {
          setBlog(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "We couldn't find this article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [slug]);

  const handleDeleteFromView = async () => {
    if (!window.confirm('Delete this article? This can\'t be undone.')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_SERVICE_API}/api/blogs/${blog._id}`, { withCredentials: true });
      navigate('/admin/blogs');
    } catch (err) {
      alert('Failed to delete the article.');
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] w-full flex items-center justify-center bg-[#FAF9FF]">
      <span className="w-8 h-8 border-4 border-slate-950 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-[60vh] max-w-xl mx-auto flex flex-col items-center justify-center text-center p-6 font-nova">
      <ShieldAlert size={40} className="text-rose-500 mb-4" />
      <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight">Something Went Wrong</h3>
      <p className="text-xs text-slate-400 font-bold uppercase mt-2">{error}</p>
      <button 
        onClick={() => navigate(isAdmin ? '/admin/blogs' : '/blog')}
        className="mt-6 h-10 px-6 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl"
      >
        Return to Safety
      </button>
    </div>
  );

  const getCategoryTheme = (cat) => {
    if (cat === 'surgery') return 'text-surgery-main bg-red-50';
    if (cat === 'fertility') return 'text-[#009774] bg-emerald-50';
    if (cat === 'pharmacy') return 'text-[#5B2897] bg-purple-50';
    return 'text-nova-blue bg-blue-50';
  };

  return (
    <article className="min-h-screen bg-[#FAF9FF] font-nova pb-24">
      
      {/* ACTION UTILITY FLOATING HEADER BAR */}
      <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
        <button
          onClick={() => navigate(isAdmin ? '/admin/blogs' : '/blogs')}
          className="h-10 px-4 bg-white border border-slate-100 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ChevronLeft size={16} /> 
          {isAdmin ? 'Back to Blog Posts' : 'All Articles'}
        </button>

        {/* DYNAMIC ADMINISTRATIVE DESTRUCTION OVERLAY SWITCH */}
        {isAdmin && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-xl">
            <span className="text-amber-800 text-[10px] font-black uppercase tracking-wider hidden sm:inline">Admin View</span>
            <button
              onClick={handleDeleteFromView}
              className="h-8 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider transition-colors shadow-sm shadow-rose-900/10"
            >
              <Trash2 size={12} /> Delete Post
            </button>
          </div>
        )}
      </div>

      {/* ARTICLE WRAPPER MATRIX */}
      <div className="max-w-3xl mx-auto px-6 space-y-10">
        
        {/* Top Header Metadata Block */}
        <div className="space-y-6 text-center sm:text-left">
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getCategoryTheme(blog.category)}`}>
            {blog.category} Centre
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-[1.05]">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-3 gap-x-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-y border-slate-200/50 py-4">
            <div className="flex items-center gap-2">
              <User size={14} className="text-slate-300" />
              <span className="text-slate-700">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-slate-300" />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-slate-300" />
              <span className="text-nova-sky">{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Massive Cinematic Base64 Image Window */}
        <div className="w-full h-[240px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl shadow-slate-950/5 border border-slate-100">
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* CORE EDITORIAL RUNTIME TEXT CONTENT BODY */}
        <div className="prose prose-slate max-w-none">
          {/* We format linebreaks smoothly so it reads cleanly out of simple textareas */}
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p 
              key={index} 
              className="text-slate-700 text-sm md:text-base font-medium leading-relaxed mb-6 whitespace-pre-line"
            >
              {paragraph}
            </p>
          ))}
        </div>

      </div>
    </article>
  );
};

export default BlogDetailView;