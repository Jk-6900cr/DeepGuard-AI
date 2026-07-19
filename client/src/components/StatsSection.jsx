const stats = [
  { value: "100K+", label: "Images Scanned" },
  { value: "98%", label: "Detection Accuracy" },
  { value: "<5s", label: "Analysis Time" },
  { value: "50K+", label: "Users" },
];

export default function StatsSection() {
  return (
    <section className="px-6 lg:px-10 py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left border-l-2 border-scan/40 pl-4">
            <p className="font-display font-mono text-3xl sm:text-4xl font-semibold text-fog">{s.value}</p>
            <p className="text-xs text-mist mt-2 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}