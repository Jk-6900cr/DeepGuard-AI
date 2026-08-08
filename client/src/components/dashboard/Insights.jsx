export default function Insights({ stats }) {
  const totalScans = stats?.totalScans ?? 0;
  const imageScans = stats?.imageScans ?? 0;
  const videoScans = stats?.videoScans ?? 0;
  const authenticCount = stats?.authenticCount ?? 0;
  const aiGeneratedCount = stats?.aiGeneratedCount ?? 0;

  const INSIGHTS = [
    {
      label: "Images Analyzed",
      value: imageScans,
      max: Math.max(totalScans, 1),
      color: "bg-scan",
    },
    {
      label: "Videos Analyzed",
      value: videoScans,
      max: Math.max(totalScans, 1),
      color: "bg-scan",
    },
    {
      label: "Fake Media Detected",
      value: aiGeneratedCount,
      max: Math.max(totalScans, 1),
      color: "bg-flag",
    },
    {
      label: "Real Media Detected",
      value: authenticCount,
      max: Math.max(totalScans, 1),
      color: "bg-success",
    },
  ];

  return (
    <section className="rounded-2xl bg-surface border border-edge p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-semibold text-fog">
            AI Detection Insights
          </h2>

          <p className="text-xs text-mist mt-1">
            Based on your analyzed media
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {INSIGHTS.map(({ label, value, max, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-mist">
                {label}
              </span>

              <span className="text-sm font-mono text-fog">
                {value.toLocaleString()}
              </span>
            </div>

            <div className="h-2 bg-surface2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${color} transition-all duration-500`}
                style={{
                  width: `${Math.min((value / max) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}