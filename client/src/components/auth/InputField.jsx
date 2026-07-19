export default function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  prefix,
  autoComplete,
  disabled = false,
  required = false,
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-mist mb-2"
      >
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
        {Icon && <Icon className="text-mist text-base shrink-0" />}
        {prefix && (
          <span className="text-sm text-fog font-mono shrink-0 border-r border-edge pr-2">
            {prefix}
          </span>
        )}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full bg-transparent py-3 text-sm text-fog placeholder:text-mist/50 outline-none disabled:opacity-50"
        />
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-flag mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}