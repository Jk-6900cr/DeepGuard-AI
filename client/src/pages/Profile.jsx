import { useContext } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const displayName =
    user?.fullName ||
    user?.name ||
    user?.username ||
    "DeepGuard User";

  const email = user?.email || "No email available";

  return (
    <DashboardLayout>
      {/* Header */}
      <div>
        <p className="text-sm text-slate-400 mb-1">
          Account
        </p>

        <h1 className="text-3xl font-semibold text-white">
          My Profile
        </h1>

        <p className="text-slate-400 mt-2">
          Manage and view your DeepGuard AI account information.
        </p>
      </div>

      {/* Profile Section */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="lg:col-span-1 bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col items-center text-center">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <span className="text-3xl font-semibold text-white">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold text-white mt-5">
              {displayName}
            </h2>

            {/* Email */}
            <p className="text-sm text-slate-400 mt-1">
              {email}
            </p>

            {/* Account Badge */}
            <div className="mt-5 px-4 py-2 rounded-full bg-slate-800 border border-slate-700">
              <span className="text-xs text-slate-300">
                DeepGuard User
              </span>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-lg font-semibold text-white">
            Account Information
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Your registered account details.
          </p>

          <div className="mt-6 space-y-5">

            {/* Full Name */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-500">
                Full Name
              </label>

              <div className="mt-2 bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3">
                <p className="text-sm text-slate-200">
                  {displayName}
                </p>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-500">
                Email Address
              </label>

              <div className="mt-2 bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3">
                <p className="text-sm text-slate-200">
                  {email}
                </p>
              </div>
            </div>

            {/* Account Type */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-500">
                Account Type
              </label>

              <div className="mt-2 bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3">
                <p className="text-sm text-slate-200">
                  Standard User
                </p>
              </div>
            </div>

            {/* Authentication */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-500">
                Authentication
              </label>

              <div className="mt-2 bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between">
                <p className="text-sm text-slate-200">
                  JWT Authentication
                </p>

                <span className="text-xs text-emerald-400">
                  Active
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* About DeepGuard */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-lg font-semibold text-white">
          About DeepGuard AI
        </h2>

        <p className="text-sm text-slate-400 mt-3 leading-6">
          DeepGuard AI is an AI-powered media detection platform designed
          to analyze images and videos and identify patterns associated
          with AI-generated or manipulated content.
        </p>

      </div>
    </DashboardLayout>
  );
}