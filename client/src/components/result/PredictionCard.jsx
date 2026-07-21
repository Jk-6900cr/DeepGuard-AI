import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineExclamationTriangle } from "react-icons/hi2";
import RiskBadge from "./RiskBadge";
import ConfidenceCard from "./ConfidenceCard";

export default function PredictionCard({ prediction, confidence, riskLevel }) {
  const isAuthentic = prediction.isAuthentic;
  const Icon = isAuthentic ? HiOutlineShieldCheck : HiOutlineExclamationTriangle;
  const tone = isAuthentic ? "success" : "flag";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`relative rounded-3xl bg-gradient-to-br from-surface to-surface2 border overflow-hidden p-8 sm:p-10 ${
        isAuthentic ? "border-success/30" : "border-flag/30"
      }`}
    >
      <div
        className="absolute inset-0 -z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, ${
            isAuthentic ? "#34D399" : "#FF4D6D"
          }, transparent 55%)`,
        }}
      />

      <div className="relative z-10 grid sm:grid-cols-2 gap-8 items-center">
        <div>
          <span
            className={`inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border ${
              isAuthentic ? "text-success bg-success/10 border-success/30" : "text-flag bg-flag/10 border-flag/30"
            }`}
          >
            <Icon className="text-sm" />
            PREDICTION
          </span>

          <h2
            className={`font-display text-4xl sm:text-5xl font-bold tracking-tight mt-4 ${
              isAuthentic ? "text-success" : "text-flag"
            }`}
          >
            {prediction.label}
          </h2>

          <p className="text-sm text-mist mt-3 max-w-sm">
            DeepGuard AI has completed its forensic analysis of this media file.
          </p>

          <div className="mt-6">
            <RiskBadge level={riskLevel} />
          </div>
        </div>

        <div className="flex justify-center sm:justify-end">
          <ConfidenceCard value={confidence} tone={tone} />
        </div>
      </div>
    </motion.div>
  );
}