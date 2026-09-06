import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

export default function Reports() {
  const [stats, setStats] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [statsResponse, historyResponse] = await Promise.all([
          fetch("http://localhost:5000/api/predictions/dashboard", {
            headers,
          }),
          fetch("http://localhost:5000/api/predictions/history", {
            headers,
          }),
        ]);

        const statsData = await statsResponse.json();
        const historyData = await historyResponse.json();

        if (!statsResponse.ok) {
          throw new Error(
            statsData.message || "Failed to load report statistics"
          );
        }

        if (!historyResponse.ok) {
          throw new Error(
            historyData.message || "Failed to load detection reports"
          );
        }

        setStats(statsData.stats);

        setPredictions(
          historyData.predictions ||
            historyData.history ||
            []
        );
      } catch (err) {
        console.error("Reports Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-slate-400">Loading reports...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <p className="text-red-400">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  const authentic =
    stats?.authenticCount ??
    stats?.authentic ??
    0;

  const aiGenerated =
    stats?.aiGeneratedCount ??
    stats?.aiGenerated ??
    0;

  const totalScans = stats?.totalScans ?? 0;
  const imageScans = stats?.imageScans ?? 0;
  const videoScans = stats?.videoScans ?? 0;

  const averageConfidence = Number(
    stats?.averageConfidence ?? 0
  ).toFixed(1);

  return (
    <DashboardLayout>
      {/* Header */}
      <div>
        <p className="text-sm text-slate-400 mb-1">
          DeepGuard AI
        </p>

        <h1 className="text-3xl font-semibold text-white">
          Detection Reports
        </h1>

        <p className="text-slate-400 mt-2">
          Overview of your image and video detection activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <ReportCard
          title="Total Scans"
          value={totalScans}
          description="All analyzed files"
        />

        <ReportCard
          title="Image Scans"
          value={imageScans}
          description="Images analyzed"
        />

        <ReportCard
          title="Video Scans"
          value={videoScans}
          description="Videos analyzed"
        />

        <ReportCard
          title="Avg. Confidence"
          value={`${averageConfidence}%`}
          description="Model confidence"
        />
      </div>

      {/* Detection Summary */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">
            Detection Summary
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Classification results from your scans.
          </p>

          <div className="mt-6 space-y-5">
            <SummaryRow
              label="Authentic"
              value={authentic}
              total={totalScans}
            />

            <SummaryRow
              label="AI Generated"
              value={aiGenerated}
              total={totalScans}
            />
          </div>
        </div>

        {/* Media Distribution */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">
            Media Distribution
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Breakdown of analyzed media types.
          </p>

          <div className="mt-6 space-y-5">
            <DistributionRow
              label="Images"
              value={imageScans}
              total={totalScans}
            />

            <DistributionRow
              label="Videos"
              value={videoScans}
              total={totalScans}
            />
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">
            Recent Detection Reports
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Your latest AI detection results.
          </p>
        </div>

        {predictions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-500">
              No detection reports available yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800">
                  <th className="px-6 py-4">File</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Prediction</th>
                  <th className="px-6 py-4">Confidence</th>
                  <th className="px-6 py-4">Risk</th>
                </tr>
              </thead>

              <tbody>
                {predictions.slice(0, 10).map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-b border-slate-800/70 hover:bg-slate-800/30 transition"
                  >
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {item.fileName || item.filename || "Unknown file"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400 capitalize">
                      {item.fileType || "Unknown"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-medium ${
                          item.prediction === "Authentic"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {item.prediction || "Unknown"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-300">
                      {item.confidence != null
                        ? `${Number(item.confidence).toFixed(1)}%`
                        : "—"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">
                        {item.risk || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Components ---------- */

function ReportCard({ title, value, description }) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
      <p className="text-sm text-slate-400">{title}</p>

      <p className="text-3xl font-semibold text-white mt-2">
        {value}
      </p>

      <p className="text-xs text-slate-500 mt-2">
        {description}
      </p>
    </div>
  );
}

function SummaryRow({ label, value, total }) {
  const percentage =
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-slate-300">
          {label}
        </span>

        <span className="text-sm text-slate-400">
          {value} ({percentage}%)
        </span>
      </div>

      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-slate-400 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function DistributionRow({ label, value, total }) {
  const percentage =
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-slate-300">
          {label}
        </span>

        <span className="text-sm text-slate-400">
          {value} ({percentage}%)
        </span>
      </div>

      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-slate-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}