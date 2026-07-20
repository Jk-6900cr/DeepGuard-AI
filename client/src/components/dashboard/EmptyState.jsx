import { Link } from "react-router-dom";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";

export default function EmptyState() {
  return (
    <section className="rounded-2xl bg-surface border border-edge border-dashed flex flex-col items-center justify-center text-center px-6 py-16">
      <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface2 text-scan mb-5">
        <HiOutlineDocumentMagnifyingGlass className="text-3xl" />
      </span>
      <h3 className="font-display text-lg font-semibold text-fog">No scans yet</h3>
      <p className="text-sm text-mist mt-2 max-w-xs">
        Upload your first image or video to see detection results here.
      </p>
      <div className="flex gap-3 mt-6">
        <Link
          to="/upload/image"
          className="text-sm font-medium text-ink bg-scan px-4 py-2.5 rounded-lg hover:brightness-110 transition-all duration-200"
        >
          Upload Image
        </Link>
        <Link
          to="/upload/video"
          className="text-sm text-fog border border-edge px-4 py-2.5 rounded-lg hover:border-scan/50 transition-colors duration-200"
        >
          Upload Video
        </Link>
      </div>
    </section>
  );
}