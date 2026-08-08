import {
  HiOutlinePhoto,
  HiOutlineVideoCamera,
} from "react-icons/hi2";

import { formatFileSize } from "../../utils/fileHelpers";

export default function MediaCard({ file, type, uploadTime }) {
  const Icon =
    type === "video"
      ? HiOutlineVideoCamera
      : HiOutlinePhoto;

  const fileName = file?.name || "Unknown file";
  const fileSize = file?.size
    ? formatFileSize(file.size)
    : "Unknown";

  const mediaType =
    type === "video" ? "Video" : "Image";

  return (
    <div className="rounded-2xl bg-surface border border-edge p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface2 border border-edge text-scan">
          <Icon className="text-lg" />
        </div>

        <div>
          <h2 className="font-display text-base font-semibold text-fog">
            Media Summary
          </h2>

          <p className="text-xs text-mist mt-0.5">
            Uploaded media details
          </p>
        </div>
      </div>

      <dl className="flex flex-col gap-3.5 text-sm">

        <div className="flex items-center justify-between gap-4">
          <dt className="text-mist text-xs">
            File Name
          </dt>

          <dd
            className="text-fog font-mono text-xs truncate max-w-[180px]"
            title={fileName}
          >
            {fileName}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-mist text-xs">
            File Size
          </dt>

          <dd className="text-fog font-mono text-xs">
            {fileSize}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-mist text-xs">
            Media Type
          </dt>

          <dd className="text-fog font-mono text-xs">
            {mediaType}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-mist text-xs">
            Upload Time
          </dt>

          <dd className="text-fog font-mono text-xs">
            {uploadTime || "Unknown"}
          </dd>
        </div>

      </dl>
    </div>
  );
}