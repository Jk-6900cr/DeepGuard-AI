import { HiOutlineTrash, HiOutlineArrowPath } from "react-icons/hi2";

export default function UploadActions({ onRemove, onReplace }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onReplace}
        className="inline-flex items-center gap-2 text-sm text-fog bg-surface2 border border-edge px-4 py-2.5 rounded-lg hover:border-scan/50 transition-colors duration-200"
      >
        <HiOutlineArrowPath className="text-base" /> Replace File
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="inline-flex items-center gap-2 text-sm text-flag bg-flag/10 border border-flag/30 px-4 py-2.5 rounded-lg hover:bg-flag/20 transition-colors duration-200"
      >
        <HiOutlineTrash className="text-base" /> Remove
      </button>
    </div>
  );
}