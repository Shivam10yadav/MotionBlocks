import React, { useState, useRef, useLayoutEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// React Icons Imports
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiX,
  FiFilter,
  FiLayers,
} from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineSun } from "react-icons/hi";

// --- INITIAL MOCK DATA ---
const INITIAL_EVENTS = [
  {
    id: "1",
    title: "Design System Review",
    date: "2026-08-25",
    time: "10:00 AM - 11:30 AM",
    category: "Work",
    location: "Room 402 / Zoom",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    dotColor: "bg-amber-500",
  },
  {
    id: "2",
    title: "Client Pitch: RideGo SaaS",
    date: "2026-08-25",
    time: "02:00 PM - 03:30 PM",
    category: "Client",
    location: "Google Meet",
    color: "bg-orange-100 text-orange-800 border-orange-300",
    dotColor: "bg-orange-500",
  },
  {
    id: "3",
    title: "MERN Stack Sprint Demo",
    date: "2026-08-28",
    time: "04:00 PM - 05:00 PM",
    category: "Dev",
    location: "Discord Tech Channel",
    color: "bg-stone-200 text-stone-800 border-stone-300",
    dotColor: "bg-stone-600",
  },
  {
    id: "4",
    title: "Weekend Coffee & Architecture",
    date: "2026-08-29",
    time: "11:00 AM - 01:00 PM",
    category: "Personal",
    location: "Artisan Cafe",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    dotColor: "bg-emerald-500",
  },
];

const CATEGORIES = ["All", "Work", "Client", "Dev", "Personal"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AnimatedCalendar() {
  // Current view date state (Default set to August 2026)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 7, 25));
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [viewMode, setViewMode] = useState("month"); // 'month' | 'week' | 'day'
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [direction, setDirection] = useState(0); // For slide transitions (-1 or 1)

  // New event form state
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventCategory, setNewEventCategory] = useState("Work");
  const [newEventTime, setNewEventTime] = useState("10:00 AM");
  const [newEventLocation, setNewEventLocation] = useState("Remote");

  // GSAP Ref for Header animation
  const headerRef = useRef(null);
  const badgeRef = useRef(null);

  // Trigger GSAP entrance animation on view or date change
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, delay: 0.1, ease: "back.out(1.7)" }
      );
    });
    return () => ctx.revert();
  }, [currentDate, viewMode]);

  // Navigate Months
  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setDirection(0);
    const today = new Date(2026, 7, 25);
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  // Generate calendar grid dates for Month View
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding days
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

    // Next month padding days to complete 42 grid cells
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  // Format YYYY-MM-DD
  const formatDateKey = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesCategory = selectedCategory === "All" || e.category === selectedCategory;
      return matchesCategory;
    });
  }, [events, selectedCategory]);

  const selectedDateKey = formatDateKey(selectedDate);
  const selectedDayEvents = filteredEvents.filter((e) => e.date === selectedDateKey);

  // Add new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const categoryStyles = {
      Work: { color: "bg-amber-100 text-amber-800 border-amber-300", dotColor: "bg-amber-500" },
      Client: { color: "bg-orange-100 text-orange-800 border-orange-300", dotColor: "bg-orange-500" },
      Dev: { color: "bg-stone-200 text-stone-800 border-stone-300", dotColor: "bg-stone-600" },
      Personal: { color: "bg-emerald-100 text-emerald-800 border-emerald-300", dotColor: "bg-emerald-500" },
    };

    const style = categoryStyles[newEventCategory] || categoryStyles.Work;

    const createdEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      date: selectedDateKey,
      time: newEventTime,
      category: newEventCategory,
      location: newEventLocation || "Not specified",
      color: style.color,
      dotColor: style.dotColor,
    };

    setEvents((prev) => [...prev, createdEvent]);
    setNewEventTitle("");
    setIsEventModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white border border-stone-200/80 rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden flex flex-col lg:flex-row">
        
        {/* ================= LEFT MAIN CALENDAR PANEL ================= */}
        <div className="flex-1 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-stone-200/80 flex flex-col justify-between">
          
          {/* HEADER SECTION */}
          <div>
            <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span ref={badgeRef} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-900 border border-amber-200/60">
                    <HiOutlineSun className="w-3.5 h-3.5 text-amber-600" />
                    Light Minimal Workspace
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 flex items-center gap-3">
                  {MONTH_NAMES[currentDate.getMonth()]}
                  <span className="text-stone-400 font-normal">{currentDate.getFullYear()}</span>
                </h1>
              </div>

              {/* View Switcher & Today Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToday}
                  className="px-3.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Today
                </button>

                <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200/80">
                  {["month", "week", "day"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`relative px-3 py-1 text-xs font-bold capitalize rounded-lg transition-all ${
                        viewMode === mode ? "text-stone-900" : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      {viewMode === mode && (
                        <motion.div
                          layoutId="viewHighlight"
                          className="absolute inset-0 bg-white rounded-lg shadow-sm border border-stone-200/60"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{mode}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CONTROLS & CATEGORY FILTER */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                <FiFilter className="w-3.5 h-3.5 text-stone-400 mr-1 shrink-0" />
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                      selectedCategory === cat
                        ? "bg-stone-900 text-white shadow-sm"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200/60"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Month Navigation Arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 border border-stone-200/60 transition-transform active:scale-90"
                  aria-label="Previous Month"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 border border-stone-200/60 transition-transform active:scale-90"
                  aria-label="Next Month"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* DAYS OF WEEK HEADER */}
            <div className="grid grid-cols-7 mb-2 text-center">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="text-xs font-bold text-stone-400 uppercase tracking-wider py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* CALENDAR GRID ANIMATED WITH FRAMER MOTION */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentDate.toISOString() + viewMode}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="grid grid-cols-7 gap-1 sm:gap-2"
              >
                {calendarDays.map((cell, idx) => {
                  const dayKey = formatDateKey(cell.date);
                  const isSelected = selectedDateKey === dayKey;
                  const isToday = dayKey === "2026-08-25"; // Mock Today reference
                  const dayEvents = filteredEvents.filter((e) => e.date === dayKey);

                  return (
                    <motion.button
                      key={dayKey + idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedDate(cell.date)}
                      className={`relative aspect-square sm:aspect-auto sm:h-24 p-1.5 sm:p-2 rounded-2xl border text-left transition-all flex flex-col justify-between overflow-hidden ${
                        !cell.isCurrentMonth ? "opacity-35 bg-stone-50/50 border-transparent" : "bg-white"
                      } ${
                        isSelected
                          ? "border-amber-500 ring-2 ring-amber-500/20 shadow-md shadow-amber-500/10 z-10"
                          : "border-stone-200/70 hover:border-stone-300"
                      }`}
                    >
                      {/* Date Number Header */}
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-xs sm:text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                            isToday
                              ? "bg-amber-500 text-white font-bold"
                              : isSelected
                              ? "bg-stone-900 text-white"
                              : "text-stone-700"
                          }`}
                        >
                          {cell.date.getDate()}
                        </span>

                        {/* Event indicator badge count for small screens */}
                        {dayEvents.length > 0 && (
                          <span className="sm:hidden w-2 h-2 rounded-full bg-amber-500" />
                        )}
                      </div>

                      {/* Event Chips (Visible on desktop) */}
                      <div className="hidden sm:flex flex-col gap-1 mt-1 overflow-hidden w-full">
                        {dayEvents.slice(0, 2).map((event) => (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={event.id}
                            className={`px-1.5 py-0.5 rounded-md text-[10px] font-medium truncate border ${event.color}`}
                          >
                            {event.title}
                          </motion.div>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-[9px] font-semibold text-stone-400 pl-1">
                            +{dayEvents.length - 2} more
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* FOOTER HELPER */}
          <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1">
              <HiOutlineSparkles className="w-3.5 h-3.5 text-amber-500" />
              Click any date cell to view or add events.
            </span>
            <span>2026 Edition</span>
          </div>
        </div>

        {/* ================= RIGHT AGENDA / DAY DETAIL PANEL ================= */}
        <div className="w-full lg:w-96 bg-stone-50/70 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* AGENDA HEADER */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200/80">
              <div>
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  Day Overview
                </p>
                <h2 className="text-xl font-black text-stone-900">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </h2>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEventModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-stone-800 transition-all"
              >
                <FiPlus className="w-4 h-4" />
                Add Event
              </motion.button>
            </div>

            {/* AGENDA EVENT LIST */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                      className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                    >
                      <div className={`absolute top-0 left-0 w-1.5 h-full ${event.dotColor}`} />
                      
                      <div className="pl-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                            {event.category}
                          </span>
                          <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                            <FiClock className="w-3 h-3 text-stone-400" />
                            {event.time}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-stone-800 mb-1 group-hover:text-amber-600 transition-colors">
                          {event.title}
                        </h3>

                        <p className="text-xs text-stone-500 flex items-center gap-1">
                          <FiMapPin className="w-3 h-3 text-stone-400" />
                          {event.location}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center bg-white/60 rounded-2xl border border-dashed border-stone-300"
                  >
                    <FiCalendar className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-sm font-medium text-stone-600">No events scheduled</p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Tap "+ Add Event" to populate this date.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* USER PROFILE MINI BAR */}
          <div className="mt-8 pt-4 border-t border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs shadow-md">
                SY
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800">Shivam Yadav</p>
                <p className="text-[10px] font-medium text-stone-400">Software Developer</p>
              </div>
            </div>
            <FiLayers className="w-4 h-4 text-stone-400" />
          </div>
        </div>
      </div>

      {/* ================= NEW EVENT MODAL ================= */}
      <AnimatePresence>
        {isEventModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-stone-900">Create New Event</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Adding to{" "}
                  <span className="font-bold text-amber-600">
                    {selectedDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>

              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Code Review & Architecture"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-stone-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <select
                      value={newEventCategory}
                      onChange={(e) => setNewEventCategory(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-stone-800"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Time
                    </label>
                    <input
                      type="text"
                      value={newEventTime}
                      onChange={(e) => setNewEventTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Google Meet / Office"
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-stone-800"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEventModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-amber-500 text-white rounded-xl hover:bg-amber-600 shadow-md transition-all active:scale-95"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}