export default function AuthButton({
  children,
  type = "button",
  onClick,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  icon: Icon,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium px-5 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "text-ink bg-scan hover:brightness-110 hover:shadow-[0_0_24px_rgba(0,229,199,0.4)]",
    secondary:
      "text-fog bg-surface2 border border-edge hover:border-scan/50 hover:bg-surface",
    ghost: "text-mist hover:text-fog",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
          Please wait…
        </>
      ) : (
        <>
          {Icon && <Icon className="text-base" />}
          {children}
        </>
      )}
    </button>
  );
}