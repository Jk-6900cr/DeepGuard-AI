import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiCheckCircle } from "react-icons/hi2";

export default function ResultHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-scan/40 bg-surface">
          <HiOutlineShieldCheck className="text-scan text-lg" />
        </span>
        <span className="font-display font-semibold text-sm text-fog">
          DeepGuard <span className="text-scan">AI</span>
        </span>
      </div>

      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-fog">
        AI Media Authenticity Report
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="inline-flex items-center gap-2 mt-4 text-sm text-success bg-success/10 border border-success/30 rounded-full px-4 py-1.5"
      >
        <HiCheckCircle className="text-base" />
        Analysis Completed Successfully
      </motion.div>
    </motion.div>
  );
}