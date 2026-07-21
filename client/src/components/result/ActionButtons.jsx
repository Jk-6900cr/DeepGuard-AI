import { useNavigate } from "react-router-dom";
import { HiOutlineArrowUpTray, HiOutlineSquares2X2, HiOutlineArrowDownTray, HiOutlineLockClosed } from "react-icons/hi2";

export default function ActionButtons({ type }) {
  const navigate = useNavigate();

  const handleAnalyzeAnother = () => {
    navigate(type === "video" ? "/upload/video" : "/upload/image");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleAnalyzeAnother}
        className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-ink bg-scan px-5 py-3 rounded-lg hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,229,199,0.35)] transition-all duration-200"
      >
        <HiOutlineArrowUpTray className="text-base" /> Analyze Another File
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        className="flex-1 inline-flex items-center justify-center gap-2 text-sm text-fog bg-surface2 border border-edge px-5 py-3 rounded-lg hover:border-scan/50 transition-colors duration-200"
      >
        <HiOutlineSquares2X2 className="text-base" /> Back to Dashboard
      </button>

      <button
        disabled
        title="Coming soon"
        className="flex-1 inline-flex items-center justify-center gap-2 text-sm text-mist bg-surface border border-edge px-5 py-3 rounded-lg opacity-50 cursor-not-allowed"
      >
        <HiOutlineArrowDownTray className="text-base" /> Download Report
        <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-surface2 border border-edge rounded-full px-2 py-0.5">
          <HiOutlineLockClosed className="text-[10px]" /> Soon
        </span>
      </button>
    </div>
  );
}