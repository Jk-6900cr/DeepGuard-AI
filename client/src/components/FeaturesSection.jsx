import {
  HiOutlineFingerPrint,
  HiOutlineFilm,
  HiOutlineChartPie,
  HiOutlineClock,
  HiOutlineDocumentArrowDown,
  HiOutlineServerStack,
} from "react-icons/hi2";

const features = [
  { icon: HiOutlineFingerPrint, title: "Deepfake Detection", desc: "Pixel-level analysis flags manipulated regions with precision." },
  { icon: HiOutlineFilm, title: "Video Analysis", desc: "Frame-by-frame scanning catches manipulation that stills miss." },
  { icon: HiOutlineChartPie, title: "Confidence Score", desc: "A clear, explainable score for every scan — no black box." },
  { icon: HiOutlineClock, title: "Scan History", desc: "Every analysis is logged and searchable from your dashboard." },
  { icon: HiOutlineDocumentArrowDown, title: "Download Report", desc: "Export a shareable, evidence-ready PDF report in one click." },
  { icon: HiOutlineServerStack, title: "Secure Storage", desc: "Encrypted storage with automatic retention controls." },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-6 lg:px-10 py-28">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <span className="font-mono text-xs text-scan">CAPABILITIES</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-fog mt-3 tracking-tight">
            Everything you need to verify media
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative p-6 rounded-2xl bg-surface border border-edge hover:border-scan/50 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-scan/0 group-hover:border-scan/70 transition-colors duration-300" />
              <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-scan/0 group-hover:border-scan/70 transition-colors duration-300" />

              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-surface2 text-scan mb-5 group-hover:shadow-[0_0_16px_rgba(0,229,199,0.3)] transition-shadow duration-300">
                <Icon className="text-xl" />
              </div>
              <h3 className="font-display text-base font-semibold text-fog">{title}</h3>
              <p className="text-sm text-mist mt-2 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}