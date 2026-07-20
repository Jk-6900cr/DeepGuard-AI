import { formatFileSize, formatDuration } from "../../utils/fileHelpers";
import UploadActions from "./UploadActions";

export default function FilePreview({ file, previewUrl, metadata, mediaType, onRemove, onReplace }) {
  const extension = file.name.split(".").pop()?.toUpperCase();

  return (
    <div className="rounded-2xl bg-surface border border-edge overflow-hidden animate-fadeUp">
      <div className="relative bg-ink flex items-center justify-center max-h-[420px] overflow-hidden">
        {mediaType === "image" ? (
          <img src={previewUrl} alt={file.name} className="max-h-[420px] w-full object-contain" />
        ) : (
          <video src={previewUrl} controls className="max-h-[420px] w-full" />
        )}
        <span className="absolute top-3 left-3 text-[10px] font-mono text-scan bg-ink/70 backdrop-blur-sm border border-scan/30 rounded-md px-2 py-1">
          {extension}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-sm text-fog font-medium break-all">{file.name}</p>

        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <dt className="text-[11px] text-mist uppercase tracking-wide">File Size</dt>
            <dd className="text-sm text-fog font-mono mt-1">{formatFileSize(file.size)}</dd>
          </div>
          {metadata?.width && (
            <div>
              <dt className="text-[11px] text-mist uppercase tracking-wide">Resolution</dt>
              <dd className="text-sm text-fog font-mono mt-1">
                {metadata.width} × {metadata.height}
              </dd>
            </div>
          )}
          {mediaType === "video" && metadata?.duration != null && (
            <div>
              <dt className="text-[11px] text-mist uppercase tracking-wide">Duration</dt>
              <dd className="text-sm text-fog font-mono mt-1">{formatDuration(metadata.duration)}</dd>
            </div>
          )}
        </dl>

        <div className="mt-6">
          <UploadActions onRemove={onRemove} onReplace={onReplace} />
        </div>
      </div>
    </div>
  );
}