import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";

const SCANS = [
  { id: 1, name: "portrait_final.jpg", type: "Image", date: "Jul 18, 2026", result: "Real", confidence: "97.2%" },
  { id: 2, name: "interview_clip.mp4", type: "Video", date: "Jul 17, 2026", result: "Fake", confidence: "94.8%" },
  { id: 3, name: "profile_photo.png", type: "Image", date: "Jul 16, 2026", result: "Real", confidence: "99.1%" },
  { id: 4, name: "ad_promo.mp4", type: "Video", date: "Jul 14, 2026", result: "Fake", confidence: "91.5%" },
];

const badgeClasses = {
  Real: "text-success bg-success/10 border-success/30",
  Fake: "text-flag bg-flag/10 border-flag/30",
};

export default function RecentScans() {
  if (SCANS.length === 0) return <EmptyState />;

  return (
    <section className="rounded-2xl bg-surface border border-edge overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-edge">
        <h2 className="font-display text-base font-semibold text-fog">Recent Scan History</h2>
        <Link to="/history" className="text-xs text-scan hover:underline underline-offset-4">
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
              <th className="px-6 py-3 font-medium text-right">Report</th>
            </tr>
          </thead>
          <tbody>
            {SCANS.map((scan) => (
              <tr key={scan.id} className="border-b border-edge/60 last:border-0 hover:bg-surface2/60 transition-colors">
                <td className="px-6 py-3.5 text-fog">{scan.name}</td>
                <td className="px-6 py-3.5 text-mist">{scan.type}</td>
                <td className="px-6 py-3.5 text-mist font-mono text-xs">{scan.date}</td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badgeClasses[scan.result]}`}>
                    {scan.result}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-mist font-mono text-xs">{scan.confidence}</td>
                <td className="px-6 py-3.5 text-right">
                  <Link to="/result" className="text-xs text-scan hover:underline underline-offset-4">
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