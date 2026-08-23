import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiClock, FiPlus } from "react-icons/fi";

// Mock event dates (Format: YYYY-MM-DD)
const EVENTS = {
  "2026-08-25": [{ title: "Sprint Demo", time: "10:00 AM", type: "work" }],
  "2026-08-28": [{ title: "RideGo Launch", time: "02:00 PM", type: "urgent" }],
  "2026-08-29": [{ title: "Architecture Review", time: "04:30 PM", type: "personal" }],
};

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 7, 25));
  const [direction, setDirection] = useState(0);

  // Generate 35/42 days grid for mini view
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill grid
    const remainingDays = 35 - days.length > 0 ? 35 - days.length : 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  const formatDateKey = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedKey = formatDateKey(selectedDate);
  const selectedEvents = EVENTS[selectedKey] || [];

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="w-[320px] bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl text-zinc-100 font-sans">
      {/* HEADER: Month + Nav */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold tracking-tight text-white">
            {MONTH_NAMES[currentDate.getMonth()]}{" "}
            <span className="text-zinc-500 font-normal">{currentDate.getFullYear()}</span>
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            <FiChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            <FiChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* DAYS OF WEEK */}
      <div className="grid grid-cols-7 mb-1 text-center">
        {DAYS_OF_WEEK.map((day) => (
          <span key={day} className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            {day}
          </span>
        ))}
      </div>

      {/* GRID */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentDate.toISOString()}
          custom={direction}
          initial={{ opacity: 0, x: direction * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -20 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-7 gap-1"
        >
          {calendarDays.map((cell, idx) => {
            const dayKey = formatDateKey(cell.date);
            const isSelected = selectedKey === dayKey;
            const isToday = dayKey === "2026-08-25";
            const hasEvent = !!EVENTS[dayKey];

            return (
              <button
                key={dayKey + idx}
                onClick={() => setSelectedDate(cell.date)}
                className={`relative h-9 w-full rounded-xl text-xs font-medium flex flex-col items-center justify-center transition-all ${
                  !cell.isCurrentMonth ? "text-zinc-600 opacity-40" : "text-zinc-300 hover:bg-zinc-800/60"
                } ${
                  isSelected
                    ? "!bg-emerald-500 !text-zinc-950 font-bold shadow-lg shadow-emerald-500/20"
                    : ""
                } ${isToday && !isSelected ? "ring-1 ring-amber-400 text-amber-400 font-bold" : ""}`}
              >
                <span>{cell.date.getDate()}</span>

                {/* Event Indicator Dot */}
                {hasEvent && (
                  <span
                    className={`absolute bottom-1 w-1 h-1 rounded-full ${
                      isSelected ? "bg-zinc-950" : "bg-emerald-400"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* MINI AGENDA PREVIEW */}
      <div className="mt-4 pt-3 border-t border-zinc-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-zinc-400">
            {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
          <button className="text-[10px] font-semibold text-emerald-400 hover:underline flex items-center gap-0.5">
            <FiPlus className="w-3 h-3" /> Event
          </button>
        </div>

        {selectedEvents.length > 0 ? (
          selectedEvents.map((ev, i) => (
            <div
              key={i}
              className="p-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-zinc-200">{ev.title}</span>
              </div>
              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                <FiClock className="w-2.5 h-2.5" /> {ev.time}
              </span>
            </div>
          ))
        ) : (
          <p className="text-[11px] text-zinc-500 italic py-1 text-center">No events scheduled</p>
        )}
      </div>
    </div>
  );
}