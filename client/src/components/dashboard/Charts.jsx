function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-surface border border-edge p-6">
      <h3 className="font-display text-sm font-semibold text-fog mb-5">{title}</h3>
      <div className="h-48 rounded-xl bg-surface2 border border-edge/60 border-dashed flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export function WeeklyScanActivityChart() {
  return (
    <ChartCard title="Weekly Scan Activity">
      <p className="text-xs text-mist font-mono">Chart placeholder — ready for chart library</p>
    </ChartCard>
  );
}

export function DetectionAccuracyChart() {
  return (
    <ChartCard title="Detection Accuracy">
      <p className="text-xs text-mist font-mono">Chart placeholder — ready for chart library</p>
    </ChartCard>
  );
}

export function MediaDistributionChart() {
  return (
    <ChartCard title="Media Distribution">
      <p className="text-xs text-mist font-mono">Chart placeholder — ready for chart library</p>
    </ChartCard>
  );
}