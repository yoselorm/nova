import React from 'react';
import { Calendar, FlaskConical, Stethoscope, Activity, Pill, Home } from 'lucide-react';

const ListAccess = () => {
  const items = [
    { name: 'Book Appointment', icon: <Calendar />, color: 'bg-blue-50 text-blue-600' },
    { name: 'Lab Services', icon: <FlaskConical />, color: 'bg-green-50 text-green-600' },
    { name: 'Specialist Consult', icon: <Stethoscope />, color: 'bg-pink-50 text-pink-600' },
    { name: 'Health Checkups', icon: <Activity />, color: 'bg-cyan-50 text-cyan-600' },
    { name: 'Pharmacy', icon: <Pill />, color: 'bg-blue-50 text-blue-500' },
    { name: 'Home Care', icon: <Home />, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-30">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <div key={item.name} className={`${item.color} p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-white/50`}>
            <div className="mb-3">{React.cloneElement(item.icon, { size: 28 })}</div>
            <span className="text-xs font-bold uppercase tracking-tight text-slate-800">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAccess;