import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi2";

export default function Timeline({ steps }) {
  return (
    <div className="rounded-2xl bg-surface border border-edge p-6">
      <h3 className="font-display text-sm font-semibold text-fog mb-5">AI Pipeline Timeline</h3>
      <ul className="flex flex-col gap-4">
        {steps.map((step, i) => (
          <motion.li
            key={step}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className="flex items-center gap-3"
          >
            <HiCheckCircle className="text-success text-lg shrink-0" />
            <span className="text-sm text-fog">{step}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}