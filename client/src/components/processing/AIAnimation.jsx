import { HiOutlineShieldCheck } from "react-icons/hi2";

export default function AIAnimation() {
  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
      {/* expanding pulse rings */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-full border border-scan/40 animate-pulse-ring"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}

      {/* rotating gradient ring — the "scanning" border */}
      <div
        className="absolute inset-3 rounded-full animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #00E5C7 15%, transparent 35%)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
        }}
      />

      {/* static faint ring for structure */}
      <div className="absolute inset-3 rounded-full border border-edge" />

      {/* core */}
      <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-surface to-surface2 border border-edge flex items-center justify-center shadow-[0_0_40px_rgba(0,229,199,0.25)]">
        <HiOutlineShieldCheck className="text-scan text-4xl sm:text-5xl animate-pulseGlow" />
      </div>
    </div>
  );
}