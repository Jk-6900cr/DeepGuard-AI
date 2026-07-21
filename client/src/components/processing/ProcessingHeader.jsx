import { HiOutlineShieldCheck } from "react-icons/hi2";

export default function ProcessingHeader() {
  return (
    <div className="text-center animate-fadeUp">
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-scan/40 bg-surface">
          <HiOutlineShieldCheck className="text-scan text-lg" />
        </span>
        <span className="font-display font-semibold text-sm text-fog">
          DeepGuard <span className="text-scan">AI</span>
        </span>
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-fog">
        Analyzing your media
      </h1>
      <p className="text-sm text-mist mt-2">
        Analyzing your media with advanced AI models…
      </p>
    </div>
  );
}