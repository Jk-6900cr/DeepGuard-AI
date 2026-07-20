import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-5 lg:px-8 py-8 flex flex-col gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}