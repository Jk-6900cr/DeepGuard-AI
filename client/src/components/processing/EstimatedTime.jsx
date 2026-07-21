import { HiOutlineClock } from "react-icons/hi2";

export default function EstimatedTime({ seconds }) {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-mist font-mono">
      <HiOutlineClock className="text-sm text-scan" />
      Estimated time remaining: <span className="text-fog">{seconds}s</span>
    </div>
  );
}