export default function ProgressBar({ progress }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-mist font-mono">PROGRESS</span>
        <span className="text-sm text-scan font-mono font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-surface2 border border-edge overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-scan/70 to-scan transition-[width] duration-150 ease-linear shadow-[0_0_12px_rgba(0,229,199,0.5)]"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}