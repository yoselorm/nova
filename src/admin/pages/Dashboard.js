import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Calendar, Clock, AlertCircle, Users, CheckCircle, TrendingUp } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({ total: 0, pending: 0, confirmed: 0, surgery: 0, fertility: 0, pharmacy: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchDashboardTelemetry = async () => {
    try {
      // 1. Capture the token parameter manually
      const token = sessionStorage.getItem('admin_token');

      // 2. Inject the Authorization string directly into the config mapping configuration
      const response = await axios.get(`${process.env.REACT_APP_SERVICE_API}/api/appointments`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      
      if (response.data.success) {
        const data = response.data.data;
        
        // Compute systemic metrics out of data vector array
        const stats = data.reduce((acc, curr) => {
          acc.total++;
          if (curr.status === 'pending') acc.pending++;
          if (curr.status === 'confirmed') acc.confirmed++;
          if (curr.subsidiary === 'surgery') acc.surgery++;
          if (curr.subsidiary === 'fertility') acc.fertility++;
          if (curr.subsidiary === 'pharmacy') acc.pharmacy++;
          return acc;
        }, { total: 0, pending: 0, confirmed: 0, surgery: 0, fertility: 0, pharmacy: 0 });

        setMetrics(stats);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to aggregate portal system telemetry.');
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardTelemetry();
}, []);

  if (loading) return (
    <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center font-nova">
      <span className="w-8 h-8 border-4 border-nova-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9FF] p-8 md:p-12 font-nova">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Block */}
        <div>
          <span className="text-[10px] font-black text-nova-sky uppercase tracking-[0.4em] block mb-2">// System Command Architecture</span>
          <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">Operational Overview</h1>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold uppercase tracking-wide flex items-center gap-3">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        {/* METRICS GRID ARRAY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Registry', val: metrics.total, icon: <Users size={20} />, color: 'text-nova-blue bg-blue-50' },
            { label: 'Pending Action', val: metrics.pending, icon: <Clock size={20} />, color: 'text-amber-600 bg-amber-50' },
            { label: 'Confirmed Sessions', val: metrics.confirmed, icon: <CheckCircle size={20} />, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Growth Vector', val: 'Operational', icon: <TrendingUp size={20} />, color: 'text-purple-600 bg-purple-50' }
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{card.label}</span>
                <span className="text-2xl font-black text-slate-900">{card.val}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* SUBSIDIARY CHANNEL SPLIT MATRIX */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6">Load Balance Across Centers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Surgery Centre', count: metrics.surgery, pct: metrics.total ? (metrics.surgery / metrics.total) * 100 : 0, bar: 'bg-surgery-main' },
              { name: 'Fertility Centre', count: metrics.fertility, pct: metrics.total ? (metrics.fertility / metrics.total) * 100 : 0, bar: 'bg-[#009774]' },
              { name: 'Nova Pharmacy', count: metrics.pharmacy, pct: metrics.total ? (metrics.pharmacy / metrics.total) * 100 : 0, bar: 'bg-[#5B2897]' }
            ].map((sub, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wide">{sub.name}</span>
                  <span className="text-xs font-mono font-bold text-slate-400">{sub.count} logs ({Math.round(sub.pct)}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${sub.pct}%` }} 
                    transition={{ duration: 1, ease: 'easeOut' }} 
                    className={`h-full ${sub.bar}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;