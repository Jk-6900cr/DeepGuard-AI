import { useEffect, useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatsCards from "../components/dashboard/StatsCards";
import QuickActions from "../components/dashboard/QuickActions";
import RecentScans from "../components/dashboard/RecentScans";
import Insights from "../components/dashboard/Insights";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";

import {
  WeeklyScanActivityChart,
  DetectionAccuracyChart,
  MediaDistributionChart,
} from "../components/dashboard/Charts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setStatsError("Authentication token not found.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/predictions/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard stats");
        }

        console.log("Dashboard Stats:", data);

        setStats(data.stats);
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
        setStatsError(error.message);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <DashboardLayout>
      <WelcomeSection />

      <StatsCards
        stats={stats}
        loading={loadingStats}
        error={statsError}
      />

      <QuickActions />

      <div className="grid lg:grid-cols-3 gap-5">
        <WeeklyScanActivityChart />
        <DetectionAccuracyChart />
        <MediaDistributionChart />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentScans />
        </div>

        <Insights stats={stats} />
      </div>

      <ActivityTimeline />
    </DashboardLayout>
  );
}