import { Link } from "react-router-dom";
import { HiOutlineShieldCheck, HiOutlineCpuChip, HiOutlineBolt, HiOutlineCloudArrowUp, HiOutlineCheckBadge } from "react-icons/hi2";

const FEATURES = [
  { icon: HiOutlineCpuChip, label: "AI Detection" },
  { icon: HiOutlineBolt, label: "Real-time Analysis" },
  { icon: HiOutlineCloudArrowUp, label: "Secure Cloud Reports" },
  { icon: HiOutlineCheckBadge, label: "Trusted Results" },
];

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-ink flex flex-col lg:flex-row overflow-x-hidden">
      {/* Branding panel */}
      <div className="relative w-full lg:w-[45%] lg:min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-edge/60">
        {/* ambient grid */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(#223140 1px, transparent 1px), linear-gradient(90deg, #223140 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at 30% 30%, black 40%, transparent 75%)",
          }}
        />
        {/* floating glow orbs */}
        <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-scan/10 blur-3xl animate-pulseGlow" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-scan/5 blur-3xl" />

        <div className="relative z-10 animate-fadeUp max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10 w-fit">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-scan/40 bg-surface">
              <HiOutlineShieldCheck className="text-scan text-lg" />
            </span>
            <span className="font-display font-semibold text-base text-fog">
              DeepGuard <span className="text-scan">AI</span>
            </span>
          </Link>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-fog leading-tight tracking-tight">
            Protect truth
            <br />
            with AI.
          </h1>
          <p className="text-mist text-sm mt-4 leading-relaxed">
            Join thousands of creators, journalists, and platforms using
            DeepGuard AI to verify media authenticity in real time.
          </p>

          {/* illustration placeholder */}
          <div className="relative mt-10 mb-10 w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-surface to-surface2 border border-edge overflow-hidden hidden sm:block">
            {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
              (pos, i) => (
                <span key={i} className={`absolute w-5 h-5 border-scan/60 ${pos}`} />
              )
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-32 h-32 opacity-70">
                <circle cx="100" cy="100" r="70" fill="none" stroke="#223140" strokeWidth="1" />
                <circle cx="100" cy="100" r="45" fill="none" stroke="#00E5C7" strokeOpacity="0.3" strokeWidth="1" />
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i / 10) * Math.PI * 2;
                  const x = 100 + Math.cos(angle) * 70;
                  const y = 100 + Math.sin(angle) * 70;
                  return <circle key={i} cx={x} cy={y} r="2" fill="#00E5C7" fillOpacity="0.5" />;
                })}
              </svg>
            </div>
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-scan to-transparent animate-scanline" />
          </div>

          <ul className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-xs text-mist bg-surface border border-edge/60 rounded-lg px-3 py-2.5"
              >
                <Icon className="text-scan text-sm shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-12 lg:py-0">
        <div className="w-full max-w-md animate-fadeUp [animation-delay:100ms]">{children}</div>
      </div>
    </div>
  );
}