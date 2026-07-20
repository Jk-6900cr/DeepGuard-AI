import { HiOutlineCloudArrowUp } from "react-icons/hi2";

export default function DropZone({
  config,
  dragActive,
  isProcessing,
  onDrop,
  onDragOver,
  onDragLeave,
  onBrowseClick,
}) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      role="button"
      tabIndex={0}
      onClick={onBrowseClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onBrowseClick()}
      aria-label={`Upload ${config.label.toLowerCase()} — drag and drop or browse files`}
      className={`relative flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed px-6 py-16 sm:py-20 cursor-pointer transition-all duration-300 ${
        dragActive
          ? "border-scan bg-scan/5 shadow-[0_0_24px_rgba(0,229,199,0.15)]"
          : "border-edge bg-surface hover:border-scan/40 hover:bg-surface2/40"
      }`}
    >
      {isProcessing ? (
        <div className="flex flex-col items-center gap-4 animate-fadeUp">
          <span className="w-10 h-10 border-2 border-edge border-t-scan rounded-full animate-spin" />
          <p className="text-sm text-mist">Reading file details…</p>
        </div>
      ) : (
        <>
          <span
            className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-surface2 border border-edge text-scan mb-5 transition-transform duration-300 ${
              dragActive ? "scale-110" : ""
            }`}
          >
            <HiOutlineCloudArrowUp className="text-3xl" />
          </span>

          <p className="text-sm text-fog font-medium">
            Drag & drop your {config.label.toLowerCase()} here
          </p>
          <p className="text-xs text-mist mt-1">or</p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBrowseClick();
            }}
            className="mt-4 text-sm font-medium text-ink bg-scan px-5 py-2.5 rounded-lg hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,229,199,0.35)] transition-all duration-200"
          >
            Browse Files
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {config.acceptedExtensions.map((ext) => (
              <span
                key={ext}
                className="text-[10px] font-mono text-mist bg-surface2 border border-edge rounded-md px-2 py-1"
              >
                {ext}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-mist/70 mt-3 font-mono">
            Maximum file size: {config.maxSizeMB} MB
          </p>
        </>
      )}
    </div>
  );
}