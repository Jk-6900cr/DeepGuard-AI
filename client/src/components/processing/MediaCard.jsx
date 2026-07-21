import { HiOutlinePhoto, HiOutlineVideoCamera } from "react-icons/hi2";
import { formatFileSize } from "../../utils/fileHelpers";

export default function MediaCard({ file, type, uploadTime }) {
  const Icon = type === "video" ? HiOutlineVideoCamera : HiOutlinePhoto;

  // Falls back to placeholder data if this page is reached without
  // router state (e.g. a direct refresh) — see App.jsx notes.
  const fileName = file?.name ?? "sample_media.jpg";
  const fileSize = file ? formatFileSize(file.size) : "4.2 MB";
  const mediaType = type === "video" ? "Video" : "Image";

  return (
    <div className="rounded-2xl bg-surface border border-edge p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface2 text-scan">
          <Icon className="text-base" />
        </span>
        <h3 className="font-display text-sm font-semibold text-fog">Media Summary</h3>
      </div>

      <dl className="flex flex-col gap-3.5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-mist text-xs">File Name</dt>
          <dd className="text-fog font-mono text-xs truncate max-w-[140px]">{fileName}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-mist text-xs">File Size</dt>
          <dd className="text-fog font-mono text-xs">{fileSize}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-mist text-xs">Media Type</dt>
          <dd className="text-fog font-mono text-xs">{mediaType}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-mist text-xs">Upload Time</dt>
          <dd className="text-fog font-mono text-xs">{uploadTime}</dd>
        </div>
      </dl>
    </div>
  );
}