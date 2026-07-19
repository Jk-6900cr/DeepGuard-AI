import { useState } from "react";
import { HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder = "Enter your password",
  error,
  autoComplete = "current-password",
  required = false,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-xs font-medium text-mist mb-2">
        {label}
        {required && <span className="text-flag ml-0.5">*</span>}
      </label>

      <div
        className={`flex items-center gap-2 rounded-lg bg-surface2 border transition-colors duration-200 px-3.5 ${
          error
            ? "border-flag/60"
            : "border-edge focus-within:border-scan focus-within:shadow-[0_0_0_3px_rgba(0,229,199,0.12)]"
        }`}
      >
        <HiLockClosed className="text-mist text-base shrink-0" />
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full bg-transparent py-3 text-sm text-fog placeholder:text-mist/50 outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="text-mist hover:text-fog transition-colors shrink-0"
        >
          {visible ? <HiEyeSlash className="text-base" /> : <HiEye className="text-base" />}
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-flag mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}