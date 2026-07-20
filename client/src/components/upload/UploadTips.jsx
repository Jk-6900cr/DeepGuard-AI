import { HiOutlineLightBulb } from "react-icons/hi2";

export default function UploadTips({ tips }) {
  return (
    <div className="rounded-2xl bg-surface border border-edge p-6">
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineLightBulb className="text-scan text-lg" />
        <h3 className="font-display text-sm font-semibold text-fog">Tips for Best Results</h3>
      </div>
      <ul className="flex flex-col gap-3">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2.5 text-xs text-mist leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-scan mt-1.5 shrink-0" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}