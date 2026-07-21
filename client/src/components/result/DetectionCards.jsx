import { motion } from "framer-motion";
import {
  HiOutlineDocumentCheck,
  HiOutlineFaceSmile,
  HiOutlineSun,
  HiOutlineSquares2X2,
  HiOutlineArchiveBox,
  HiOutlineCpuChip,
} from "react-icons/hi2";

const ICONS = [
  HiOutlineDocumentCheck,
  HiOutlineFaceSmile,
  HiOutlineSun,
  HiOutlineSquares2X2,
  HiOutlineArchiveBox,
  HiOutlineCpuChip,
];

const TONE_CLASSES = {
  success: "text-success bg-success/10 border-success/30",
  warning: "text-warning bg-warning/10 border-warning/30",
  flag: "text-flag bg-flag/10 border-flag/30",
};

export default function DetectionCards({ details }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold text-fog mb-4">Detection Details</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {details.map(({ title, status, description, tone }, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-surface border border-edge hover:border-scan/40 transition-colors duration-300 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface2 text-scan">
                  <Icon className="text-base" />
                </span>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${TONE_CLASSES[tone]}`}>
                  {status}
                </span>
              </div>
              <p className="font-display text-sm font-semibold text-fog">{title}</p>
              <p className="text-xs text-mist mt-1.5 leading-relaxed">{description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}