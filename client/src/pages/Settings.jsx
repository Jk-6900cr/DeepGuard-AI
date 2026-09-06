import { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [scanNotifications, setScanNotifications] = useState(true);

  return (
    <DashboardLayout>
      {/* Header */}
      <div>
        <p className="text-sm text-slate-400 mb-1">
          Preferences
        </p>

        <h1 className="text-3xl font-semibold text-white">
          Settings
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your DeepGuard AI preferences and application settings.
        </p>
      </div>

      {/* Settings Cards */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Notifications */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">
            Notifications
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Choose which notifications you want to receive.
          </p>

          <div className="mt-6 space-y-5">

            {/* Email Notifications */}
            <SettingRow
              title="Email Notifications"
              description="Receive important account and system updates."
              enabled={emailNotifications}
              onChange={() =>
                setEmailNotifications(!emailNotifications)
              }
            />

            {/* Scan Notifications */}
            <SettingRow
              title="Scan Notifications"
              description="Receive notifications about your detection results."
              enabled={scanNotifications}
              onChange={() =>
                setScanNotifications(!scanNotifications)
              }
            />

          </div>
        </div>

        {/* Detection Settings */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">
            Detection Settings
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Information about DeepGuard AI detection.
          </p>

          <div className="mt-6 space-y-4">

            <InfoRow
              label="Image Detection"
              value="Enabled"
            />

            <InfoRow
              label="Video Detection"
              value="Enabled"
            />

            <InfoRow
              label="AI Model"
              value="DeepGuard AI"
            />

            <InfoRow
              label="Processing"
              value="Server-side AI"
            />

          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">
            Security
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Your account security information.
          </p>

          <div className="mt-6">

            <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-4">
              <div>
                <p className="text-sm font-medium text-slate-200">
                  JWT Authentication
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Your account is protected using JWT authentication.
                </p>
              </div>

              <span className="text-xs text-emerald-400">
                Active
              </span>
            </div>

          </div>
        </div>

        {/* Application */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">
            Application
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            DeepGuard AI application information.
          </p>

          <div className="mt-6 space-y-4">

            <InfoRow
              label="Application"
              value="DeepGuard AI"
            />

            <InfoRow
              label="Version"
              value="1.0.0"
            />

            <InfoRow
              label="Platform"
              value="Web Application"
            />

          </div>
        </div>

      </div>

      {/* Information */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">
          About Your Settings
        </h2>

        <p className="text-sm text-slate-400 mt-3 leading-6">
          These settings control your DeepGuard AI experience. Detection
          settings are managed by the application and ensure that uploaded
          images and videos are processed through the DeepGuard AI detection
          pipeline.
        </p>
      </div>
    </DashboardLayout>
  );
}

/* ---------------- Setting Row ---------------- */

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-200">
          {title}
        </p>

        <p className="text-xs text-slate-500 mt-1">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          enabled ? "bg-slate-500" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

/* ---------------- Info Row ---------------- */

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3">
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="text-sm text-slate-200">
        {value}
      </span>
    </div>
  );
}