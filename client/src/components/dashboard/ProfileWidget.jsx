import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineCog6Tooth, HiOutlineArrowRightOnRectangle, HiChevronDown } from "react-icons/hi2";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ProfileWidget() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-surface2 transition-colors duration-200"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-scan/30 to-surface2 border border-edge text-scan text-xs font-display font-semibold">
          J
        </span>
        <span className="hidden sm:block text-sm text-fog">Jashan</span>
        <HiChevronDown className={`text-mist text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface border border-edge shadow-xl overflow-hidden animate-fadeUp">
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-mist hover:text-fog hover:bg-surface2 transition-colors"
          >
            <HiOutlineUser className="text-base" /> Profile
          </Link>
          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-mist hover:text-fog hover:bg-surface2 transition-colors"
          >
            <HiOutlineCog6Tooth className="text-base" /> Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-flag hover:bg-flag/10 transition-colors border-t border-edge"
          >
            <HiOutlineArrowRightOnRectangle className="text-base" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}