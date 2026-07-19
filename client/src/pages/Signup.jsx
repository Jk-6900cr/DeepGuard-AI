import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineDevicePhoneMobile, HiCheckCircle } from "react-icons/hi2";
import { AuthLayout, InputField, PasswordField, OTPInput, AuthButton } from "../components/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: "", email: "", mobile: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateDetails = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email address is required.";
    else if (!EMAIL_REGEX.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.mobile.trim()) next.mobile = "Mobile number is required.";
    else if (!PHONE_REGEX.test(form.mobile)) next.mobile = "Enter a valid 10-digit mobile number.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8) next.password = "Password must be at least 8 characters.";
    if (!form.confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Frontend-only stub — swap this for a real API call, e.g.
  // await fetch("/api/auth/send-otp", { method: "POST", body: JSON.stringify({ mobile: form.mobile }) })
  const handleSendOTP = async () => {
    if (!validateDetails()) return;
    setSendingOtp(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSendingOtp(false);
    setOtpSent(true);
  };

  // Frontend-only stub — swap this for a real API call, e.g.
  // await fetch("/api/auth/verify-otp", { method: "POST", body: JSON.stringify({ mobile: form.mobile, otp }) })
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setOtpError("Enter the complete 6-digit OTP.");
      return;
    }
    setOtpError("");
    setVerifyingOtp(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setVerifyingOtp(false);
    setOtpVerified(true);
  };

  // Frontend-only stub — swap this for a real API call, e.g.
  // await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify({ ...form }) })
  const handleSignup = async () => {
    setCreatingAccount(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setCreatingAccount(false);
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="rounded-2xl bg-surface border border-edge p-7 sm:p-8 hover:border-scan/30 transition-colors duration-300">
        <h2 className="font-display text-2xl font-semibold text-fog">Create your account</h2>
        <p className="text-sm text-mist mt-2">
          Already have one?{" "}
          <Link to="/login" className="text-scan hover:underline underline-offset-4">
            Log in
          </Link>
        </p>

        <form
          className="mt-7 flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (otpVerified) handleSignup();
          }}
        >
          <InputField
            id="fullName"
            label="Full Name"
            icon={HiOutlineUser}
            value={form.fullName}
            onChange={handleChange("fullName")}
            placeholder="Jane Doe"
            error={errors.fullName}
            autoComplete="name"
            disabled={otpSent}
            required
          />
          <InputField
            id="email"
            label="Email Address"
            type="email"
            icon={HiOutlineEnvelope}
            value={form.email}
            onChange={handleChange("email")}
            placeholder="jane@company.com"
            error={errors.email}
            autoComplete="email"
            disabled={otpSent}
            required
          />
          <InputField
            id="mobile"
            label="Mobile Number"
            type="tel"
            icon={HiOutlineDevicePhoneMobile}
            prefix="+91"
            value={form.mobile}
            onChange={handleChange("mobile")}
            placeholder="98765 43210"
            error={errors.mobile}
            autoComplete="tel"
            disabled={otpSent}
            required
          />

          {!otpSent && (
            <>
              <PasswordField
                id="password"
                label="Password"
                value={form.password}
                onChange={handleChange("password")}
                placeholder="Create a password"
                error={errors.password}
                autoComplete="new-password"
                required
              />
              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
                autoComplete="new-password"
                required
              />
              <AuthButton onClick={handleSendOTP} loading={sendingOtp}>
                Send OTP
              </AuthButton>
            </>
          )}

          {otpSent && !otpVerified && (
            <div className="flex flex-col gap-4 animate-fadeUp">
              <OTPInput length={6} value={otp} onChange={setOtp} error={otpError} />
              <AuthButton onClick={handleVerifyOTP} loading={verifyingOtp}>
                Verify OTP
              </AuthButton>
            </div>
          )}

          {otpVerified && (
            <div className="flex flex-col gap-5 animate-fadeUp">
              <div className="flex items-center gap-2 text-sm text-scan bg-scan/10 border border-scan/30 rounded-lg px-3.5 py-2.5">
                <HiCheckCircle className="text-base shrink-0" />
                Mobile Verified
              </div>
              <AuthButton type="submit" loading={creatingAccount}>
                Create Account
              </AuthButton>
            </div>
          )}
        </form>
      </div>
    </AuthLayout>
  );
}