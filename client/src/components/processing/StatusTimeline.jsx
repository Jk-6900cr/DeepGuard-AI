import { HiCheckCircle } from "react-icons/hi2";
import { STATUS_STEPS } from "../../utils/processingConfig";

export default function StatusTimeline({ currentStepIndex }) {
  return (
    <div className="rounded-2xl bg-surface border border-edge p-6">
      <h3 className="font-display text-sm font-semibold text-fog mb-5">Analysis Steps</h3>
      <ul className="flex flex-col gap-3.5">
        {STATUS_STEPS.map((step, index) => {
          const isComplete = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <li key={step} className="flex items-center gap-3">
              {isComplete ? (
                <HiCheckCircle className="text-success text-lg shrink-0" />
              ) : isCurrent ? (
                <span className="relative flex items-center justify-center w-[18px] h-[18px] shrink-0">
                  <span className="absolute inset-0 rounded-full bg-scan/30 animate-pulse-ring" />
                  <span className="w-2 h-2 rounded-full bg-scan" />
                </span>
              ) : (
                <span className="w-[18px] h-[18px] rounded-full border border-edge shrink-0" />
              )}

              <span
                className={`text-sm transition-colors duration-300 ${
                  isComplete
                    ? "text-mist line-through decoration-edge"
                    : isCurrent
                    ? "text-fog font-medium"
                    : "text-mist/50"
                }`}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}