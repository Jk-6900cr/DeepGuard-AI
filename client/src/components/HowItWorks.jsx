import { HiOutlineArrowUpTray, HiOutlineCpuChip, HiOutlineMagnifyingGlassCircle, HiOutlineDocumentText } from "react-icons/hi2";

const steps = [
  { icon: HiOutlineArrowUpTray, title: "Upload", desc: "Drop in an image or video file" },
  { icon: HiOutlineCpuChip, title: "AI Analysis", desc: "Our models scan for manipulation artifacts" },
  { icon: HiOutlineMagnifyingGlassCircle, title: "Detection", desc: "Flagged regions and anomalies are isolated" },
  { icon: HiOutlineDocumentText, title: "Report", desc: "Get a confidence score and full breakdown" },
];

export default function HowItWorks() {
  return (
    <section className="px-6 lg:px-10 py-28 bg-surface/40 border-y border-edge/60">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <span className="font-mono text-xs text-scan">PROCESS</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-fog mt-3 tracking-tight">
            How the scan pipeline works
          </h2>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-edge" />
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative flex flex-col items-start">
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-ink border border-scan/50 text-scan mb-5">
                <Icon className="text-xl" />
              </div>
              <span className="font-mono text-xs text-mist">STEP {i + 1}</span>
              <h3 className="font-display text-base font-semibold text-fog mt-1">{title}</h3>
              <p className="text-sm text-mist mt-2 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}