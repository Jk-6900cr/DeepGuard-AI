import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function CircularRing({ value, size = 160, strokeWidth = 10, color = "#00E5C7", label }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  const strokeDashoffset = useTransform(progress, (v) => circumference - (v / 100) * circumference);

  useEffect(() => {
    const controls = animate(progress, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(v),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#223140" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset, filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display font-semibold text-2xl text-fog">{displayValue.toFixed(1)}%</span>
        {label && <span className="text-[11px] text-mist mt-1">{label}</span>}
      </div>
    </div>
  );
}