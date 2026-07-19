import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { AuthLayout, InputField, PasswordField, AuthButton } from "../components/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    const id = form.identifier.trim();

    if (!id) next.identifier = "Email or mobile number is required.";
    else if (!EMAIL_REGEX.test(id) && !PHONE_REGEX.test(id)) {
      next.identifier = "Enter a valid email address or 10-digit mobile number.";
    }

    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 6) next.password = "Password must be at least 6 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Frontend-only stub — swap this for a real API call, e.g.
  // await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ ...form, rememberMe }) })
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    navigate("/");
  };

  // Frontend-only stub — swap this for real OAuth, e.g. Firebase/Google Identity Services
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setGoogleLoading(false);
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="rounded-2xl bg-surface border border-edge p-7 sm:p-8 hover:border-scan/30 transition-colors duration-300">
        <h2 className="font-display text-2xl font-semibold text-fog">Welcome back</h2>
        <p className="text-sm text-mist mt-2">
          New to DeepGuard AI?{" "}
          <Link to="/signup" className="text-scan hover:underline underline-offset-4">
            Create an account
          </Link>
        </p>

        <form className="mt-7 flex flex-col gap-5" onSubmit={handleLogin} noValidate>
          <InputField
            id="identifier"
            label="Email or Mobile Number"
            icon={HiOutlineUser}
            value={form.identifier}
            onChange={handleChange("identifier")}
            placeholder="jane@company.com"
            error={errors.identifier}
            autoComplete="username"
            required
          />
          <div>
            <PasswordField
              id="password"
              label="Password"
              value={form.password}
              onChange={handleChange("password")}
              error={errors.password}
              autoComplete="current-password"
              required
            />
            <div className="flex items-center justify-between mt-3">
              <label htmlFor="rememberMe" className="flex items-center gap-2 text-xs text-mist cursor-pointer select-none">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-edge bg-surface2 accent-scan cursor-pointer"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-xs text-scan hover:underline underline-offset-4">
                Forgot password?
              </Link>
            </div>
          </div>

          <AuthButton type="submit" loading={loading}>
            Log in
          </AuthButton>
        </form>

        <div className="flex items-center gap-3 my-6">
          <span className="h-px flex-1 bg-edge" />
          <span className="text-xs text-mist font-mono">OR</span>
          <span className="h-px flex-1 bg-edge" />
        </div>

        <AuthButton
          onClick={handleGoogleLogin}
          loading={googleLoading}
          variant="secondary"
          icon={FcGoogle}
        >
          Continue with Google
        </AuthButton>

        <p className="text-center text-sm text-mist mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-scan hover:underline underline-offset-4">
            Create new account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}