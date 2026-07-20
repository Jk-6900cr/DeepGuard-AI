const INSIGHTS = [
  { label: "Images Analyzed", value: 842, max: 1000, color: "bg-scan" },
  { label: "Videos Analyzed", value: 442, max: 1000, color: "bg-scan" },
  { label: "Fake Media Detected", value: 118, max: 1284, color: "bg-flag" },
  { label: "Real Media Detected", value: 1166, max: 1284, color: "bg-success" },
];

export default function Insights() {
  return (
    <section className="rounded-2xl bg-surface border border-edge p-6">
      <h2 className="font-display text-base font-semibold text-fog mb-6">AI Detection Insights</h2>
      <div className="flex flex-col gap-5">
        {INSIGHTS.map(({ label, value, max, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-mist">{label}</span>
              <span className="text-fog font-mono text-xs">{value.toLocaleString()}</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface2 overflow-hidden">
              <div
                className={`h-full rounded-full ${color} transition-all duration-500`}
                style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}