import { HiOutlineSparkles } from "react-icons/hi2";

export default function UploadButton({ label, onClick, disabled, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full inline-flex items-center justify-center gap-2 text-base font-medium text-ink bg-scan px-6 py-4 rounded-xl hover:brightness-110 hover:shadow-[0_0_28px_rgba(0,229,199,0.4)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
      ) : (
        <HiOutlineSparkles className="text-lg" />
      )}
      {label}
    </button>
  );
}