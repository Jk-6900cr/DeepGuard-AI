import { useRef } from "react";

export default function OTPInput({ length = 6, value, onChange, error }) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const next = value.split("");
    next[index] = digit || "";
    onChange(next.join(""));

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    onChange(pasted.padEnd(value.length, ""));
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div>
      <label className="block text-xs font-medium text-mist mb-2">
        Enter OTP
      </label>
      <div className="flex gap-2.5" onPaste={handlePaste}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ""}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            aria-label={`OTP digit ${i + 1}`}
            className={`w-full aspect-square text-center text-lg font-mono text-fog bg-surface2 border rounded-lg outline-none transition-colors duration-200 ${
              error
                ? "border-flag/60"
                : "border-edge focus:border-scan focus:shadow-[0_0_0_3px_rgba(0,229,199,0.12)]"
            }`}
          />
        ))}
      </div>
      {error && (
        <p role="alert" className="text-xs text-flag mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}