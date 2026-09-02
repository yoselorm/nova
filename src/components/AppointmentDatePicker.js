import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

// Clinic only accepts appointments on Monday (1), Wednesday (3), and Friday (5)
const ALLOWED_DAYS = [1, 3, 5];

const pad = (n) => String(n).padStart(2, '0');
const toDateString = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const isSelectable = (date) => {
  const today = startOfToday();
  return date >= today && ALLOWED_DAYS.includes(date.getDay());
};

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// A trigger button + popover calendar where only Mon/Wed/Fri dates can be clicked at all —
// unlike a native <input type="date">, invalid days simply aren't selectable in the UI.
const AppointmentDatePicker = ({ value, onChange, triggerClassName, placeholder = 'Select a date' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const base = value ? new Date(`${value}T00:00:00`) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;
  const today = startOfToday();
  const isCurrentMonthView = viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() === today.getMonth();

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const leadingBlanks = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
  const cells = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  const handlePick = (day) => {
    const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    if (!isSelectable(date)) return;
    onChange(toDateString(date));
    setIsOpen(false);
  };

  const displayLabel = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : placeholder;

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={triggerClassName}
      >
        <span className={selectedDate ? '' : 'opacity-50'}>{displayLabel}</span>
        <Calendar size={16} className="shrink-0 opacity-60" />
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 animate-scale-in">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
              disabled={isCurrentMonthView}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-20 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
              {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              type="button"
              onClick={() => setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAY_LABELS.map((d, i) => (
              <div key={i} className="text-center text-[9px] font-black text-slate-300 uppercase py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (day === null) return <div key={idx} />;
              const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
              const selectable = isSelectable(date);
              const isSelected = selectedDate && toDateString(date) === toDateString(selectedDate);
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handlePick(day)}
                  disabled={!selectable}
                  className={`h-8 rounded-lg text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-nova-blue text-white'
                      : selectable
                        ? 'text-slate-700 hover:bg-blue-50 hover:text-nova-blue cursor-pointer'
                        : 'text-slate-200 cursor-not-allowed'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-center mt-3 pt-3 border-t border-slate-50">
            Mon, Wed & Fri only
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentDatePicker;
