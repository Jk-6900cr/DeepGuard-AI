import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineShieldCheck } from "react-icons/hi2";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/70 backdrop-blur-lg border-b border-edge/80 shadow-[0_1px_0_0_rgba(0,229,199,0.08)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex items-center justify-center w-8 h-8 rounded-lg border border-scan/40 bg-surface group-hover:border-scan transition-colors">
            <HiOutlineShieldCheck className="text-scan text-lg" />
          </span>
          <span className="font-display font-semibold text-[15px] tracking-tight text-fog">
            DeepGuard <span className="text-scan">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className="relative text-sm text-mist hover:text-fog transition-colors duration-200 py-1 group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-scan transition-all duration-300 group-hover:w-full" />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-mist hover:text-fog transition-colors px-3 py-2"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium text-ink bg-scan px-4 py-2 rounded-lg hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,229,199,0.35)] transition-all duration-200"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden text-fog text-2xl p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 border-t border-edge" : "max-h-0"
        } bg-ink/95 backdrop-blur-lg`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-mist hover:text-fog transition-colors"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-edge">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-mist hover:text-fog transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-ink bg-scan px-4 py-2 rounded-lg text-center"
            >
              Sign up
            </Link>
          </div>
        </ul>
      </div>
    </header>
  );
}