import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function CTASection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    navigate(isAuthenticated ? "/dashboard" : "/signup");
  };

  return (
    <section id="contact" className="px-6 lg:px-10 py-28">
      <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden border border-edge bg-gradient-to-br from-surface to-surface2 px-8 sm:px-16 py-16 text-center">
        <div
          className="absolute inset-0 -z-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 20%, #00E5C7, transparent 55%)",
          }}
        />
        <div className="relative z-10">
          <span className="font-mono text-xs text-scan">GET STARTED</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-fog mt-4 tracking-tight">
            Start detecting deepfakes today
          </h2>
          <p className="text-mist mt-4 max-w-md mx-auto">
            Free to try. No credit card required. Verify your first file in
            under a minute.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="text-sm font-medium text-ink bg-scan px-6 py-3 rounded-lg hover:brightness-110 hover:shadow-[0_0_24px_rgba(0,229,199,0.4)] transition-all duration-200"
            >
              Get Started
            </button>
            <a
              href="#features"
              className="text-sm text-fog border border-edge px-6 py-3 rounded-lg hover:border-scan/50 transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}