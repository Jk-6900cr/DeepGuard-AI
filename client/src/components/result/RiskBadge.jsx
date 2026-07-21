const RISK_STYLES = {
  Low: "text-success bg-success/10 border-success/30",
  Medium: "text-warning bg-warning/10 border-warning/30",
  High: "text-flag bg-flag/10 border-flag/30",
};

export default function RiskBadge({ level }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${RISK_STYLES[level]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {level} Risk
    </span>
  );
}