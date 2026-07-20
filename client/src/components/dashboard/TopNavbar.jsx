import { HiOutlineBars3, HiOutlineMagnifyingGlass, HiOutlineBell } from "react-icons/hi2";
import ProfileWidget from "./ProfileWidget";

export default function TopNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-5 lg:px-8 bg-ink/80 backdrop-blur-lg border-b border-edge">
      <button onClick={onMenuClick} className="lg:hidden text-mist hover:text-fog">
        <HiOutlineBars3 className="text-2xl" />
      </button>

      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-sm bg-surface border border-edge rounded-lg px-3.5 py-2 focus-within:border-scan/50 transition-colors">
        <HiOutlineMagnifyingGlass className="text-mist text-base shrink-0" />
        <input
          type="text"
          placeholder="Search scans, reports…"
          className="w-full bg-transparent text-sm text-fog placeholder:text-mist/50 outline-none"
        />
      </div>

      <div className="flex-1 sm:hidden" />

      <div className="ml-auto flex items-center gap-3 pr-2 sm:pr-4">
        <button
          aria-label="Notifications"
          className="relative text-mist hover:text-fog transition-colors shrink-0"
        >
          <HiOutlineBell className="text-xl" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-scan" />
        </button>

        <ProfileWidget />
      </div>
    </header>
  );
}