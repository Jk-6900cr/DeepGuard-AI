import { HiOutlineDocumentMagnifyingGlass, HiOutlinePhoto, HiOutlineVideoCamera, HiOutlineChartBar, HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";

const STATS = [
  { label: "Total Scans", value: "1,284", trend: "+12.4%", up: true, icon: HiOutlineDocumentMagnifyingGlass },
  { label: "Images Scanned", value: "842", trend: "+8.1%", up: true, icon: HiOutlinePhoto },
  { label: "Videos Scanned", value: "442", trend: "+4.7%", up: true, icon: HiOutlineVideoCamera },
  { label: "Detection Accuracy", value: "98.6%", trend: "-0.3%", up: false, icon: HiOutlineChartBar },
];

export default function StatsCards() {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {STATS.map(({ label, value, trend, up, icon: Icon }) => (
        <div
          key={label}
          className="p-5 rounded-2xl bg-surface border border-edge hover:border-scan/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface2 text-scan">
              <Icon className="text-lg" />
            </span>
            <span
              className={`flex items-center gap-1 text-xs font-mono ${
                up ? "text-success" : "text-flag"
              }`}
            >
              {up ? <HiArrowTrendingUp /> : <HiArrowTrendingDown />}
              {trend}
            </span>
          </div>
          <p className="font-display text-2xl font-semibold text-fog mt-4">{value}</p>
          <p className="text-xs text-mist mt-1">{label}</p>
        </div>
      ))}
    </section>
  );
}