// client/src/pages/Login.jsx
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm p-8 rounded-2xl border border-edge bg-surface text-center">
        <h1 className="font-display text-2xl font-semibold text-fog">Log in</h1>
        <p className="text-sm text-mist mt-2">Login form coming soon.</p>
        <Link to="/" className="inline-block mt-6 text-sm text-scan hover:underline">
          ← Back home
        </Link>
      </div>
    </div>
  );
}