import React, { useEffect, useState } from 'react';
import { Filter, Check, X, AlertCircle, Calendar, RefreshCw, Clock, Eye } from 'lucide-react';
import axios from 'axios';
import TIME_SLOTS from '../../utils/timeSlots';

const SERVICE_LABELS = {
  wellness: 'Wellness Check',
  gynecology: 'Gynecology Consultation',
  fertility: 'Fertility Consultation',
  surgery: 'Surgery Centre',
  pharmacy: 'Nova Pharmacy'
};

const PATIENT_STATUS_LABELS = {
  new: 'New Patient',
  existing: 'Existing Patient'
};

// Booking dates are stored at UTC midnight, so format in UTC to keep the day the patient picked
const formatDate = (value) => new Date(value).toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'
});

// Full booking card — same fields and order as the booking email the front desk receives
const AppointmentDetails = ({ appointment, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const rows = [
    { label: 'Full Name', value: appointment.fullName },
    { label: 'Contact Number', value: appointment.phone, href: `tel:${appointment.phone}` },
    { label: 'Date Of Birth', value: appointment.dateOfBirth ? formatDate(appointment.dateOfBirth) : '—' },
    { label: 'Appointment', value: `${formatDate(appointment.date)} — ${appointment.timeSlot || 'time not set'}` },
    { label: 'Service', value: SERVICE_LABELS[appointment.subsidiary] || appointment.subsidiary },
    { label: 'Email', value: appointment.email, href: `mailto:${appointment.email}` },
    { label: 'Address', value: appointment.address || '—' },
    { label: 'Reason For Appointment', value: appointment.notes || '—' },
    { label: 'Patient Status', value: PATIENT_STATUS_LABELS[appointment.patientStatus] || '—' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/40 animate-fade-in" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Appointment details for ${appointment.fullName}`}
        className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl relative z-10 shadow-2xl border border-slate-100 animate-scale-in"
      >
        <div className="sticky top-0 bg-white flex items-center justify-between px-8 py-5 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-black text-nova-sky uppercase tracking-[0.3em] block">Appointment</span>
            <span className="font-mono font-black text-xs text-slate-900">{appointment.trackingId}</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-all"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        <dl className="px-8 divide-y divide-slate-200">
          {rows.map(row => (
            <div key={row.label} className="py-5">
              <dt className="text-sm font-bold text-slate-900 mb-2">{row.label}</dt>
              <dd className="text-sm text-slate-600 leading-relaxed whitespace-pre-line break-words">
                {row.href ? <a href={row.href} className="text-blue-700 underline">{row.value}</a> : row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const selectedAppointment = appointments.find(item => item._id === selectedId);

 const fetchAppointments = async () => {
    setLoading(true);
    try {
      // 1. Manually capture the current session token signature
      const token = sessionStorage.getItem('admin_token');

      // 2. Map the token parameters directly onto the config header matrix
      const response = await axios.get(`${process.env.REACT_APP_SERVICE_API}/api/appointments`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      
      if (response.data.success) {
        setAppointments(response.data.data);
        setFilteredData(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Handle local subsidiary system state sorting
  useEffect(() => {
    if (filter === 'all') {
      setFilteredData(appointments);
    } else {
      setFilteredData(appointments.filter(item => item.subsidiary === filter));
    }
  }, [filter, appointments]);

  // Execute transmission update step
  const updateStatus = async (id, targetStatus) => {
    setActionLoadingId(id);
          const token = sessionStorage.getItem('admin_token');

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVICE_API}/api/appointments/${id}`,
        { status: targetStatus },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        }
      );
      if (response.data.success) {
        // Optimistically parse and cycle updated objects inside hook state arrays
        setAppointments(prev => prev.map(item => item._id === id ? { ...item, status: targetStatus } : item));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update the appointment status.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Patients pick a preferred time; the hospital can move it to another slot here
  const updateTimeSlot = async (id, targetTimeSlot) => {
    setActionLoadingId(id);
    const token = sessionStorage.getItem('admin_token');

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVICE_API}/api/appointments/${id}`,
        { timeSlot: targetTimeSlot },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        }
      );
      if (response.data.success) {
        setAppointments(prev => prev.map(item => item._id === id ? { ...item, timeSlot: targetTimeSlot } : item));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update the appointment time.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const getSubsidiaryBadge = (sub) => {
    if (sub === 'fertility') return 'text-[#009774] bg-emerald-50 border-emerald-100';
    if (sub === 'gynecology') return 'text-[#5B2897] bg-purple-50 border-purple-100';
    if (sub === 'wellness') return 'text-nova-blue bg-blue-50 border-blue-100';
    if (sub === 'surgery') return 'text-surgery-main bg-red-50 border-red-100';
    return 'text-slate-500 bg-slate-100 border-slate-200';
  };

  const getStatusBadge = (status) => {
    if (status === 'confirmed') return 'text-emerald-700 bg-emerald-50';
    if (status === 'cancelled') return 'text-rose-700 bg-rose-50';
    return 'text-amber-700 bg-amber-50';
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] p-8 md:p-12 font-nova">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Control Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-black text-nova-sky uppercase tracking-[0.4em] block mb-2">Appointments</span>
            <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">Manage Appointments</h1>
          </div>

          <button
            onClick={fetchAppointments}
            className="self-start md:self-auto h-12 px-5 bg-white border border-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 shadow-sm transition-all"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold uppercase tracking-wide flex items-center gap-3">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        {/* FILTER BAR SLOTS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-black uppercase tracking-widest mr-2">
            <Filter size={12} /> Filter :
          </div>
          {[
            { id: 'all', label: 'All' },
            { id: 'wellness', label: 'Wellness Check' },
            { id: 'gynecology', label: 'Gynecology Consultation' },
            { id: 'fertility', label: 'Fertility Consultation' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`h-9 px-4 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                filter === btn.id 
                  ? 'bg-slate-950 text-white shadow-sm' 
                  : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* DATA REGISTER INTERFACE TABLE CONTAINER */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-4 py-5">Tracking ID</th>
                  <th className="px-4 py-5">Patient</th>
                  <th className="px-4 py-5">Center</th>
                  <th className="px-4 py-5">Date & Time</th>
                  <th className="px-4 py-5">Status</th>
                  <th className="px-4 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-slate-400 font-bold text-xs uppercase tracking-wide">
                        No appointments match this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr
                        key={item._id}
                        onClick={() => setSelectedId(item._id)}
                        className="hover:bg-slate-50/40 transition-colors animate-fade-in cursor-pointer"
                      >
                        {/* ID */}
                        <td className="px-4 py-5 font-mono font-black text-xs text-slate-900">{item.trackingId}</td>
                        
                        {/* Patient Detail */}
                        <td className="px-4 py-5">
                          <div className="font-bold text-slate-900">{item.fullName}</div>
                          <div className="text-xs text-slate-400 font-medium mt-0.5">{item.phone} • {item.email}</div>
                          {item.patientStatus && (
                            <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                              {PATIENT_STATUS_LABELS[item.patientStatus]}
                            </span>
                          )}
                          {item.notes && (
                            <p className="text-[11px] font-medium text-slate-400 italic max-w-[15rem] truncate mt-1 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                              "{item.notes}"
                            </p>
                          )}
                        </td>

                        {/* Subsidiary Wing */}
                        <td className="px-4 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getSubsidiaryBadge(item.subsidiary)}`}>
                            {SERVICE_LABELS[item.subsidiary] || item.subsidiary}
                          </span>
                        </td>

                        {/* Date and Window */}
                        <td className="px-4 py-5 font-medium text-slate-700">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1.5">
                            <Calendar size={12} className="text-slate-400" />
                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="relative w-fit" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={item.timeSlot || ''}
                              disabled={actionLoadingId === item._id}
                              onChange={(e) => updateTimeSlot(item._id, e.target.value)}
                              className={`appearance-none pl-6 pr-2 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide border focus:outline-none cursor-pointer ${
                                item.timeSlot ? 'text-slate-700 bg-white border-slate-200' : 'text-amber-700 bg-amber-50 border-amber-100'
                              }`}
                            >
                              <option value="">Not set</option>
                              {TIME_SLOTS.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                              ))}
                            </select>
                            <Clock size={11} className="absolute left-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                          </div>
                        </td>

                        {/* Status Label */}
                        <td className="px-4 py-5">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </td>

                        {/* Action Operations */}
                        <td className="px-4 py-5 text-right">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setSelectedId(item._id)}
                              className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all border border-slate-100"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                            {item.status === 'pending' && (
                              <>
                                <button
                                  disabled={actionLoadingId === item._id}
                                  onClick={() => updateStatus(item._id, 'confirmed')}
                                  className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all border border-emerald-100"
                                  title="Confirm Appointment"
                                >
                                  <Check size={14} />
                                </button>
                                <button
                                  disabled={actionLoadingId === item._id}
                                  onClick={() => updateStatus(item._id, 'cancelled')}
                                  className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-all border border-rose-100"
                                  title="Cancel Appointment"
                                >
                                  <X size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {selectedAppointment && (
        <AppointmentDetails appointment={selectedAppointment} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
};

export default ManageAppointments; 