import { HiOutlineCpuChip, HiOutlineLockClosed, HiOutlineBolt, HiOutlineChartBar } from "react-icons/hi2";

const items = [
  { icon: HiOutlineCpuChip, label: "AI Powered", desc: "Deep learning models trained on millions of samples" },
  { icon: HiOutlineLockClosed, label: "Secure Detection", desc: "End-to-end encrypted uploads and storage" },
  { icon: HiOutlineBolt, label: "Fast Analysis", desc: "Results delivered in under 5 seconds" },
  { icon: HiOutlineChartBar, label: "High Accuracy", desc: "98%+ detection accuracy across benchmarks" },
];

export default function TrustSection() {
  return (
    <section className="px-6 lg:px-10 py-16 border-y border-edge/60 bg-surface/40">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex items-start gap-4 p-5 rounded-xl border border-edge/60 bg-surface hover:border-scan/40 transition-colors duration-300"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface2 text-scan shrink-0">
              <Icon className="text-xl" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-fog">{label}</p>
              <p className="text-xs text-mist mt-1 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}