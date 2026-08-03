import React, { useRef } from 'react';
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring 
} from 'framer-motion';
import { 
  HiOutlineHome, 
  HiOutlineFolder, 
  HiOutlineBriefcase, 
  HiOutlineUser, 
  HiOutlineEnvelope, 
  HiOutlineSparkles 
} from 'react-icons/hi2';

const navItems = [
  { id: 'home', label: 'Home', icon: HiOutlineHome },
  { id: 'projects', label: 'Projects', icon: HiOutlineFolder },
  { id: 'work', label: 'Work', icon: HiOutlineBriefcase },
  { id: 'ai', label: 'Features', icon: HiOutlineSparkles },
  { id: 'about', label: 'About', icon: HiOutlineUser },
  { id: 'contact', label: 'Contact', icon: HiOutlineEnvelope },
];

function DockItem({ mouseX, item, isActive, onClick }) {
  const ref = useRef(null);

  // Measure distance between cursor X and item center X
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Dynamic width transformation on mouse proximity
  const widthSync = useTransform(distance, [-150, 0, 150], [44, 70, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  const iconScaleSync = useTransform(distance, [-150, 0, 150], [1, 1.4, 1]);
  const iconScale = useSpring(iconScaleSync, { mass: 0.1, stiffness: 200, damping: 15 });

  const Icon = item.icon;

  return (
    <div className="relative group">
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
        <span className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-md shadow-lg shadow-slate-200/50 whitespace-nowrap">
          {item.label}
        </span>
      </div>

      <motion.button
        ref={ref}
        onClick={() => onClick(item.id)}
        style={{ width, height: width }}
        className={`relative flex items-center justify-center rounded-2xl border transition-colors duration-200 ${
          isActive
            ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10'
            : 'bg-white/80 text-slate-600 hover:text-slate-900 border-white/60 hover:bg-white shadow-sm'
        }`}
      >
        <motion.div style={{ scale: iconScale }} className="flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </motion.div>

        {/* Active Dot Indicator */}
        {isActive && (
          <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-slate-900" />
        )}
      </motion.button>
    </div>
  );
}

export default function DockItem() {
  const [active, setActive] = React.useState('home');
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-center gap-3 px-4 py-3 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] shadow-slate-200/50"
      >
        {navItems.map((item) => (
          <DockItem
            key={item.id}
            mouseX={mouseX}
            item={item}
            isActive={active === item.id}
            onClick={setActive}
          />
        ))}
      </motion.div>
    </div>
  );
}