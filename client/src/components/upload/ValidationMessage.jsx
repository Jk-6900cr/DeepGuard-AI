import { HiOutlineExclamationTriangle, HiXMark } from "react-icons/hi2";

export default function ValidationMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl bg-flag/10 border border-flag/30 px-4 py-3.5 animate-fadeUp"
    >
      <HiOutlineExclamationTriangle className="text-flag text-lg shrink-0 mt-0.5" />
      <p className="text-sm text-flag flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="text-flag/70 hover:text-flag transition-colors shrink-0"
        >
          <HiXMark className="text-base" />
        </button>
      )}
    </div>
  );
}