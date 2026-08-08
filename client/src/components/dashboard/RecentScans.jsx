import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";

const badgeClasses = {
  Real: "text-success bg-success/10 border-success/30",
  Fake: "text-flag bg-flag/10 border-flag/30",
};

export default function RecentScans() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentScans = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/predictions/history",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load scan history");
        }

        const formattedScans = data.predictions.map((item) => ({
          id: item._id,
          name: item.filename,
          type: item.fileType === "image" ? "Image" : "Video",
          date: new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          result:
            item.prediction === "Authentic" ? "Real" : "Fake",
          confidence: `${item.confidence}%`,
        }));

        setScans(formattedScans);
      } catch (error) {
        console.error("Recent Scans Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentScans();
  }, []);

  if (loading) {
    return (
      <section className="rounded-2xl bg-surface border border-edge overflow-hidden">
        <div className="px-6 py-5 border-b border-edge">
          <h2 className="font-display font-semibold text-fog">
            Recent Scan History
          </h2>
        </div>

        <div className="p-6 text-sm text-mist">
          Loading recent scans...
        </div>
      </section>
    );
  }

  if (scans.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="rounded-2xl bg-surface border border-edge overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-edge">
        <h2 className="font-display font-semibold text-fog">
          Recent Scan History
        </h2>

        <Link
          to="/history"
          className="text-xs text-scan hover:underline underline-offset-4"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-left text-xs text-mist border-b border-edge">
              <th className="px-6 py-3 font-medium">File</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Result</th>
              <th className="px-6 py-3 font-medium">Confidence</th>
              <th className="px-6 py-3 font-medium text-right">
                Report
              </th>
            </tr>
          </thead>

          <tbody>
            {scans.map((scan) => (
              <tr
                key={scan.id}
                className="border-b border-edge/60 last:border-0 hover:bg-surface2/60 transition-colors"
              >
                <td className="px-6 py-3.5 text-fog">
                  {scan.name}
                </td>

                <td className="px-6 py-3.5 text-mist">
                  {scan.type}
                </td>

                <td className="px-6 py-3.5 text-mist font-mono text-xs">
                  {scan.date}
                </td>

                <td className="px-6 py-3.5">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      badgeClasses[scan.result]
                    }`}
                  >
                    {scan.result}
                  </span>
                </td>

                <td className="px-6 py-3.5 text-mist font-mono text-xs">
                  {scan.confidence}
                </td>

                <td className="px-6 py-3.5 text-right">
                  <Link
                    to="/result"
                    className="text-xs text-scan hover:underline underline-offset-4"
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}