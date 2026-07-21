import { motion } from "framer-motion";
import { HiOutlinePhoto, HiOutlineVideoCamera } from "react-icons/hi2";
import { formatFileSize } from "../../utils/fileHelpers";

export default function FileDetailsCard({ file, type, metadata, uploadTime }) {
  const Icon = type === "video" ? HiOutlineVideoCamera : HiOutlinePhoto;

  const fileName = file?.name ?? "sample_media.jpg";
  const fileSize = file ? formatFileSize(file.size) : "4.2 MB";
  const mediaType = type === "video" ? "Video" : "Image";
  const resolution = metadata?.width ? `${metadata.width} × ${metadata.height}` : "1920 × 1080";

  const rows = [
    { label: "File Name", value: fileName, mono: true, truncate: true },
    { label: "Media Type", value: mediaType },
    { label: "File Size", value: fileSize, mono: true },
    { label: "Resolution", value: resolution, mono: true },
    { label: "Upload Time", value: uploadTime, mono: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-surface border border-edge p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface2 text-scan">
          <Icon className="text-base" />
        </span>
        <h3 className="font-display text-sm font-semibold text-fog">File Details</h3>
      </div>

      <dl className="flex flex-col gap-3.5 text-sm">
        {rows.map(({ label, value, mono, truncate }) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <dt className="text-mist text-xs shrink-0">{label}</dt>
            <dd className={`text-fog text-xs ${mono ? "font-mono" : ""} ${truncate ? "truncate max-w-[150px]" : ""}`}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}