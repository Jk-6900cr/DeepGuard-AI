import { HiOutlineCpuChip } from "react-icons/hi2";
import { MODEL_INFO } from "../../utils/processingConfig";

export default function ModelCard() {
  const rows = [
    { label: "Model", value: MODEL_INFO.model },
    { label: "Status", value: MODEL_INFO.status, highlight: true },
    { label: "Engine", value: MODEL_INFO.engine },
    { label: "Detection", value: MODEL_INFO.detection },
    { label: "Confidence Engine", value: MODEL_INFO.confidenceEngine, highlight: true },
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-surface to-surface2 border border-edge p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface text-scan">
          <HiOutlineCpuChip className="text-base" />
        </span>
        <h3 className="font-display text-sm font-semibold text-fog">AI Model</h3>
      </div>

      <dl className="flex flex-col gap-3.5 text-sm">
        {rows.map(({ label, value, highlight }) => (
          <div key={label} className="flex items-center justify-between">
            <dt className="text-mist text-xs">{label}</dt>
            <dd
              className={`font-mono text-xs flex items-center gap-1.5 ${
                highlight ? "text-success" : "text-fog"
              }`}
            >
              {highlight && <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulseGlow" />}
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}