import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BlogShowcase = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicBlogs = async () => {
      setLoading(false);
      setLoading(true);
      try {
        // Build path dynamically if filtering by specific medical wing category parameters
        let url = 'http://localhost:4000/api/blogs';
        if (selectedCategory !== 'all') {
          url += `?category=${selectedCategory}`;
        }
        
        const response = await axios.get(url);
        if (response.data.success) {
          setBlogs(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'The clinical publications array is currently unreachable.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicBlogs();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'general', label: 'General Health' },
    { id: 'surgery', label: 'Surgery Insights' },
    { id: 'fertility', label: 'Fertility Science' },
    { id: 'pharmacy', label: 'Nova Pharmacy' },
  ];

  const getCategoryBadge = (cat) => {
    if (cat === 'surgery') return 'text-surgery-main bg-red-50';
    if (cat === 'fertility') return 'text-[#009774] bg-emerald-50';
    if (cat === 'pharmacy') return 'text-[#5B2897] bg-purple-50';
    return 'text-nova-blue bg-blue-50';
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] font-nova py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Cinematic Landing Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-nova-blue text-[10px] font-black uppercase tracking-widest">
            <BookOpen size={12} /> Nova Medical Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none">
            Validated Clinical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-blue via-nova-sky to-slate-400 font-light lowercase italic">literature.</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">
            Explore peer-reviewed case briefs, patient logs summaries, surgical breakthroughs, and specialized therapeutics updates directly from our operating boards.
          </p>
        </div>

        {/* CATEGORY SWAP NAVIGATION SEGMENT */}
        <div className="flex flex-wrap justify-center items-center gap-2 border-b border-slate-200/50 pb-6 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`h-10 px-5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-950 text-white shadow-md shadow-slate-950/10'
                  : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold uppercase tracking-wide flex items-center gap-3 max-w-md mx-auto">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        {/* CORE SHOWCASE ARTICLES GRID ARRAY */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <span className="w-8 h-8 border-4 border-slate-950 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-bold text-xs uppercase tracking-wider max-w-xl mx-auto shadow-sm">
            No published articles matched this channel telemetry framework yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link 
                key={blog._id} 
                to={`/blogs/${blog.slug}`} // Directly pushes down to our master detail routing structure
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-slate-200/60 transition-all duration-300"
              >
                <div>
                  {/* Image wrapper block rendering the raw Base64 document payload */}
                  <div className="h-56 bg-slate-100 w-full relative overflow-hidden">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-black/5 shadow-sm ${getCategoryBadge(blog.category)}`}>
                      {blog.category}
                    </span>
                  </div>

                  {/* Text Information Elements */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      <div className="flex items-center gap-1"><User size={12} /> {blog.author.split(' ')[0]}</div>
                      <div className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</div>
                    </div>
                    
                    <h3 className="text-lg font-black text-slate-950 tracking-tight leading-snug uppercase line-clamp-2 group-hover:text-nova-blue transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-slate-400 text-xs font-medium leading-relaxed line-clamp-3">
                      {blog.content}
                    </p>
                  </div>
                </div>

                {/* Card Action Link Signature Line */}
                <div className="p-6 pt-0 mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-950 group-hover:text-nova-blue transition-colors">
                  Read Literature 
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

export default BlogShowcase;