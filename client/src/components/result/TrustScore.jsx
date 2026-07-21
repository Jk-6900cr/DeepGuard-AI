import { motion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi2";
import CircularRing from "./CircularRing";

export default function TrustScore({ score }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-surface border border-edge p-6 flex flex-col items-center text-center"
    >
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineSparkles className="text-scan text-base" />
        <h3 className="font-display text-sm font-semibold text-fog">AI Trust Score</h3>
      </div>
      <CircularRing value={score} size={140} strokeWidth={9} color="#00E5C7" />
      <p className="text-xs text-mist mt-4 max-w-[220px]">
        Combines confidence, metadata integrity, and forensic consistency.
      </p>
    </motion.div>
  );
}