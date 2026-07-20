import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

export default function UploadHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="animate-fadeUp">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-mist hover:text-fog transition-colors mb-6"
      >
        <HiArrowLeft className="text-sm" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3">
        {Icon && (
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-surface border border-edge text-scan shrink-0">
            <Icon className="text-xl" />
          </span>
        )}
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-fog">{title}</h1>
          <p className="text-sm text-mist mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}