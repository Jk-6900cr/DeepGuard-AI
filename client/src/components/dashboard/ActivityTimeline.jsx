import { useEffect, useState } from "react";
import {
  HiOutlineArrowUpTray,
  HiOutlineCpuChip,
} from "react-icons/hi2";

export default function ActivityTimeline() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
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
          throw new Error(
            data.message || "Failed to load activity"
          );
        }

        const formattedActivities = data.predictions
          .slice(0, 5)
          .map((item) => ({
            id: item._id,
            icon:
              item.fileType === "image"
                ? HiOutlineArrowUpTray
                : HiOutlineCpuChip,
            title: `Analysis completed for ${item.filename}`,
            time: getRelativeTime(item.createdAt),
          }));

        setActivities(formattedActivities);
      } catch (error) {
        console.error("Activity Timeline Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const getRelativeTime = (date) => {
    const now = new Date();
    const created = new Date(date);

    const difference = Math.floor(
      (now - created) / 1000
    );

    const minutes = Math.floor(difference / 60);
    const hours = Math.floor(difference / 3600);
    const days = Math.floor(difference / 86400);

    if (difference < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      } ago`;
    }

    if (hours < 24) {
      return `${hours} ${
        hours === 1 ? "hour" : "hours"
      } ago`;
    }

    if (days < 7) {
      return `${days} ${
        days === 1 ? "day" : "days"
      } ago`;
    }

    return created.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="rounded-2xl bg-surface border border-edge p-6">
        <h2 className="font-display text-base font-semibold text-fog mb-6">
          Activity Timeline
        </h2>

        <p className="text-sm text-mist">
          Loading activity...
        </p>
      </section>
    );
  }

  if (activities.length === 0) {
    return (
      <section className="rounded-2xl bg-surface border border-edge p-6">
        <h2 className="font-display text-base font-semibold text-fog mb-6">
          Activity Timeline
        </h2>

        <p className="text-sm text-mist">
          No activity yet. Upload an image or video to get started.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-surface border border-edge p-6">
      <h2 className="font-display text-base font-semibold text-fog mb-6">
        Activity Timeline
      </h2>

      <div className="flex flex-col">
        {activities.map(
          ({ icon: Icon, title, time }, i) => (
            <div
              key={title + i}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {i !== activities.length - 1 && (
                <span className="absolute left-[15px] top-8 bottom-0 w-px bg-edge" />
              )}

              <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-surface2 border border-edge text-scan shrink-0">
                <Icon className="text-sm" />
              </span>

              <div>
                <p className="text-sm text-fog">
                  {title}
                </p>

                <p className="text-xs text-mist mt-0.5 font-mono">
                  {time}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}