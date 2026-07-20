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
  return (
    <DashboardLayout>
      <WelcomeSection />
      <StatsCards />
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
        <Insights />
      </div>

      <ActivityTimeline />
    </DashboardLayout>
  );
}