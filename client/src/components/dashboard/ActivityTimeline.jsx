import { HiOutlineArrowUpTray, HiOutlineCpuChip, HiOutlineDocumentText, HiOutlineArrowDownTray } from "react-icons/hi2";

const ACTIVITY = [
  { icon: HiOutlineArrowUpTray, title: "Uploaded interview_clip.mp4", time: "2 hours ago" },
  { icon: HiOutlineCpuChip, title: "Analysis completed for portrait_final.jpg", time: "5 hours ago" },
  { icon: HiOutlineDocumentText, title: "Report generated for ad_promo.mp4", time: "1 day ago" },
  { icon: HiOutlineArrowDownTray, title: "Downloaded report — profile_photo.png", time: "2 days ago" },
];

export default function ActivityTimeline() {
  return (
    <section className="rounded-2xl bg-surface border border-edge p-6">
      <h2 className="font-display text-base font-semibold text-fog mb-6">Activity Timeline</h2>
      <div className="flex flex-col">
        {ACTIVITY.map(({ icon: Icon, title, time }, i) => (
          <div key={title} className="relative flex gap-4 pb-6 last:pb-0">
            {i !== ACTIVITY.length - 1 && (
              <span className="absolute left-[15px] top-8 bottom-0 w-px bg-edge" />
            )}
            <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-surface2 border border-edge text-scan shrink-0">
              <Icon className="text-sm" />
            </span>
            <div>
              <p className="text-sm text-fog">{title}</p>
              <p className="text-xs text-mist mt-0.5 font-mono">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}