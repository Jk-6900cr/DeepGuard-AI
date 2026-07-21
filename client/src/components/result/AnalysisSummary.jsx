import { motion } from "framer-motion";
import { HiOutlineDocumentText } from "react-icons/hi2";

export default function AnalysisSummary({ points }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-surface border border-edge p-6 sm:p-7"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface2 text-scan">
          <HiOutlineDocumentText className="text-base" />
        </span>
        <h3 className="font-display text-sm font-semibold text-fog">AI Analysis Summary</h3>
      </div>

      <ul className="flex flex-col gap-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-mist leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-scan mt-2 shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}