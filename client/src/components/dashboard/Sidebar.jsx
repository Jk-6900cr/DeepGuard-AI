import { NavLink } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlinePhoto,
  HiOutlineVideoCamera,
  HiOutlineClock,
  HiOutlineDocumentChartBar,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineShieldCheck,
  HiXMark,
} from "react-icons/hi2";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", icon: HiOutlineSquares2X2 },
  { label: "Upload Image", to: "/upload/image", icon: HiOutlinePhoto },
  { label: "Upload Video", to: "/upload/video", icon: HiOutlineVideoCamera },
  { label: "Scan History", to: "/history", icon: HiOutlineClock },
  { label: "Reports", to: "/result", icon: HiOutlineDocumentChartBar },
  { label: "Profile", to: "/profile", icon: HiOutlineUser },
  { label: "Settings", to: "/settings", icon: HiOutlineCog6Tooth },
];

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate("/");
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-200 ${
      isActive
        ? "bg-scan/10 text-scan border border-scan/30"
        : "text-mist hover:text-fog hover:bg-surface2 border border-transparent"
    }`;

  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-surface border-r border-edge flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-edge">
          <button
            type="button"
            onClick={() => window.location.assign("/")}
            className="flex items-center gap-2 text-left"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-scan/40 bg-surface2">
              <HiOutlineShieldCheck className="text-scan text-lg" />
            </span>
            <span className="font-display font-semibold text-sm text-fog">
              DeepGuard <span className="text-scan">AI</span>
            </span>
          </button>
          <button onClick={onClose} className="lg:hidden text-mist hover:text-fog">
            <HiXMark className="text-xl" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5 flex flex-col gap-1.5">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink key={label} to={to} className={linkClasses} onClick={onClose}>
              <Icon className="text-lg shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-edge">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-mist hover:text-flag hover:bg-flag/10 transition-colors duration-200"
          >
            <HiOutlineArrowRightOnRectangle className="text-lg shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}