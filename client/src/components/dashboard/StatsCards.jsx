import {
  HiOutlineDocumentMagnifyingGlass,
  HiOutlinePhoto,
  HiOutlineVideoCamera,
  HiOutlineChartBar,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
} from "react-icons/hi2";

export default function StatsCards({ stats, loading, error }) {
  const STATS = [
    {
      label: "Total Scans",
      value: stats?.totalScans ?? 0,
      trend: null,
      up: true,
      icon: HiOutlineDocumentMagnifyingGlass,
    },
    {
      label: "Images Scanned",
      value: stats?.imageScans ?? 0,
      trend: null,
      up: true,
      icon: HiOutlinePhoto,
    },
    {
      label: "Videos Scanned",
      value: stats?.videoScans ?? 0,
      trend: null,
      up: true,
      icon: HiOutlineVideoCamera,
    },
    {
      label: "Detection Accuracy",
      value: stats
        ? `${stats.averageConfidence}%`
        : "0%",
      trend: null,
      up: true,
      icon: HiOutlineChartBar,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-surface border border-edge p-5 animate-pulse"
          >
            <div className="h-4 w-24 bg-surface2 rounded mb-4" />
            <div className="h-8 w-20 bg-surface2 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-surface border border-edge p-5 text-sm text-flag">
        Unable to load dashboard statistics.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map(({ label, value, trend, up, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl bg-surface border border-edge p-5 hover:border-scan/30 transition-colors duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-surface2 flex items-center justify-center">
              <Icon className="text-xl text-scan" />
            </div>

            {trend && (
              <span
                className={`flex items-center gap-1 text-xs font-mono ${
                  up ? "text-success" : "text-flag"
                }`}
              >
                {up ? (
                  <HiArrowTrendingUp />
                ) : (
                  <HiArrowTrendingDown />
                )}
                {trend}
              </span>
            )}
          </div>

          <div className="mt-5">
            <p className="text-3xl font-display font-semibold text-fog">
              {value}
            </p>

            <p className="text-sm text-mist mt-1">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}