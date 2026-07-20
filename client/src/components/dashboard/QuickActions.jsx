import { Link } from "react-router-dom";
import { HiOutlinePhoto, HiOutlineVideoCamera, HiArrowRight } from "react-icons/hi2";

const ACTIONS = [
  {
    to: "/upload/image",
    icon: HiOutlinePhoto,
    title: "Upload Image",
    desc: "Scan a photo for AI manipulation in seconds.",
  },
  {
    to: "/upload/video",
    icon: HiOutlineVideoCamera,
    title: "Upload Video",
    desc: "Run frame-by-frame deepfake analysis on a video.",
  },
];

export default function QuickActions() {
  return (
    <section className="grid sm:grid-cols-2 gap-5">
      {ACTIONS.map(({ to, icon: Icon, title, desc }) => (
        <Link
          key={title}
          to={to}
          className="group relative p-7 rounded-2xl bg-gradient-to-br from-surface to-surface2 border border-edge hover:border-scan/50 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-scan/10 blur-2xl group-hover:bg-scan/20 transition-colors duration-300" />
          <div className="relative z-10">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface2 text-scan mb-5 group-hover:shadow-[0_0_16px_rgba(0,229,199,0.3)] transition-shadow duration-300">
              <Icon className="text-xl" />
            </span>
            <h3 className="font-display text-lg font-semibold text-fog">{title}</h3>
            <p className="text-sm text-mist mt-2 leading-relaxed max-w-xs">{desc}</p>
            <span className="inline-flex items-center gap-1.5 text-sm text-scan mt-5 group-hover:gap-2.5 transition-all duration-200">
              Get started <HiArrowRight />
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}