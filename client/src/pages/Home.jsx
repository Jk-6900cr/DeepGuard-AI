import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import TrustSection from "../components/TrustSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-ink text-fog">
      <Navbar />

      <main>
        {/* Hero */}
        <Hero />

        {/* Stats */}
        <StatsSection />

        {/* Features */}
        <section id="features">
          <FeaturesSection />
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Trust */}
        <TrustSection />

        {/* About */}
        <section
          id="about"
          className="px-6 lg:px-12 py-20 border-t border-edge"
        >
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm text-scan font-mono uppercase tracking-wider">
              About DeepGuard AI
            </p>

            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-fog mt-3">
              Protecting Digital Media with AI
            </h2>

            <p className="text-mist leading-7 max-w-3xl mx-auto mt-6">
              DeepGuard AI is an AI-powered media detection platform designed
              to analyze images and videos for patterns associated with
              AI-generated or manipulated content.
            </p>

            <p className="text-mist leading-7 max-w-3xl mx-auto mt-4">
              The platform combines a modern web interface with a backend
              detection pipeline and machine-learning model to provide users
              with prediction results, confidence scores, and risk
              assessments.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="px-6 lg:px-12 py-20 border-t border-edge"
        >
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm text-scan font-mono uppercase tracking-wider">
              Contact
            </p>

            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-fog mt-3">
              Get in Touch
            </h2>

            <p className="text-mist leading-7 max-w-2xl mx-auto mt-6">
              Have a question about DeepGuard AI or want to learn more about
              the detection platform? We'd be happy to hear from you.
            </p>

            <a
              href="mailto:contact@deepguard.ai"
              className="inline-flex mt-8 px-6 py-3 rounded-xl bg-scan text-ink font-semibold hover:opacity-90 transition"
            >
              Contact DeepGuard AI
            </a>
          </div>
        </section>

        {/* Get Started */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}