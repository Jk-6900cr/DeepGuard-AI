import { Link } from "react-router-dom";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const links = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "Login", to: "/login" },
  { label: "Sign up", to: "/signup" },
];

export default function Footer() {
  return (
    <footer className="px-6 lg:px-10 py-12 border-t border-edge/60">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-scan/40 bg-surface">
            <HiOutlineShieldCheck className="text-scan text-sm" />
          </span>
          <span className="font-display font-semibold text-sm text-fog">
            DeepGuard <span className="text-scan">AI</span>
          </span>
        </Link>

        <ul className="flex flex-wrap items-center gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="text-xs text-mist hover:text-fog transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-mist">
          <a href="#" aria-label="GitHub" className="hover:text-scan transition-colors"><FaGithub /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-scan transition-colors"><FaLinkedin /></a>
          <a href="#" aria-label="Twitter" className="hover:text-scan transition-colors"><FaTwitter /></a>
        </div>
      </div>
      <p className="text-center text-[11px] text-mist/70 mt-8 font-mono">
        © {new Date().getFullYear()} DeepGuard AI. All rights reserved.
      </p>
    </footer>
  );
}