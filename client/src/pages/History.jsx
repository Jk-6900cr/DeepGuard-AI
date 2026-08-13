import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const badgeClasses = {
  Real: "text-success bg-success/10 border-success/30",
  Fake: "text-flag bg-flag/10 border-flag/30",
};

export default function History() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

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
          throw new Error(
            data.message || "Failed to load prediction history."
          );
        }

        setPredictions(data.predictions || []);
      } catch (err) {
        console.error("History Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-ink px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold text-fog">
              Scan History
            </h1>

            <p className="text-sm text-mist mt-2">
              View your recent image and video analysis results.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="text-sm text-scan hover:underline underline-offset-4"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl bg-surface border border-edge p-8 text-center">
            <p className="text-sm text-mist">
              Loading your scan history...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl bg-surface border border-edge p-8 text-center">
            <p className="text-sm text-flag">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && predictions.length === 0 && (
          <div className="rounded-2xl bg-surface border border-edge p-10 text-center">
            <h2 className="font-display text-xl font-semibold text-fog">
              No scans yet
            </h2>

            <p className="text-sm text-mist mt-2">
              Upload an image or video to start your analysis history.
            </p>

            <Link
              to="/upload-image"
              className="inline-block mt-5 text-sm text-scan hover:underline"
            >
              Analyze an image →
            </Link>
          </div>
        )}

        {/* History Table */}
        {!loading && !error && predictions.length > 0 && (
          <div className="rounded-2xl bg-surface border border-edge overflow-hidden">

            <div className="px-6 py-5 border-b border-edge">
              <h2 className="font-display font-semibold text-fog">
                Your Recent Scans
              </h2>

              <p className="text-xs text-mist mt-1">
                Showing your latest {predictions.length} predictions.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[750px]">

                <thead>
                  <tr className="text-left text-xs text-mist border-b border-edge">

                    <th className="px-6 py-3 font-medium">
                      File
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Type
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Date
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Result
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Confidence
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Risk
                    </th>

                    <th className="px-6 py-3 font-medium text-right">
                      Report
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {predictions.map((item) => {

                    // Normalize prediction from database
                    const isReal =
                      item.prediction === "REAL" ||
                      item.prediction === "Authentic";

                    const result = isReal ? "Real" : "Fake";

                    const formattedDate = new Date(
                      item.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    return (
                      <tr
                        key={item._id}
                        className="border-b border-edge/60 last:border-0 hover:bg-surface2/60 transition-colors"
                      >

                        {/* File */}
                        <td className="px-6 py-4 text-fog">
                          {item.filename}
                        </td>

                        {/* Type */}
                        <td className="px-6 py-4 text-mist">
                          {item.fileType === "image"
                            ? "Image"
                            : "Video"}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-mist font-mono text-xs">
                          {formattedDate}
                        </td>

                        {/* Result */}
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                              badgeClasses[result]
                            }`}
                          >
                            {result}
                          </span>
                        </td>

                        {/* Confidence */}
                        <td className="px-6 py-4 text-mist font-mono text-xs">
                          {Number(item.confidence).toFixed(2)}%
                        </td>

                        {/* Risk */}
                        <td className="px-6 py-4 text-mist">
                          {item.risk}
                        </td>

                        {/* Report */}
                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/result/${item._id}`}
                            className="text-xs text-scan hover:underline underline-offset-4"
                          >
                            View Report
                          </Link>
                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}