import { useLocation, useNavigate } from "react-router-dom";
import { useProcessingSimulation } from "../hooks/useProcessingSimulation";
import ProcessingHeader from "../components/processing/ProcessingHeader";
import AIAnimation from "../components/processing/AIAnimation";
import ProgressBar from "../components/processing/ProgressBar";
import EstimatedTime from "../components/processing/EstimatedTime";
import LoadingMessages from "../components/processing/LoadingMessages";
import StatusTimeline from "../components/processing/StatusTimeline";
import MediaCard from "../components/processing/MediaCard";
import ModelCard from "../components/processing/ModelCard";

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();

  // Populated by UploadImage.jsx / UploadVideo.jsx via:
  //   navigate("/processing", { state: { file, type } })
  const { file, type } = location.state ?? {};
  const uploadTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const { progress, currentStepIndex, estimatedSecondsRemaining, currentMessage } =
    useProcessingSimulation(() => {
      // TODO backend:
      // Pass the real analysis result through instead of just file/type,
      // e.g. state: { result } from the POST /api/analyze/* response.
      navigate("/result", { state: { file, type } });
    });

  return (
    <div className="relative min-h-screen bg-ink px-6 py-14 overflow-hidden">
      {/* animated grid backdrop */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#223140 1px, transparent 1px), linear-gradient(90deg, #223140 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* floating particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-scan/50 animate-particle"
          style={{
            top: `${(i * 37) % 90}%`,
            left: `${(i * 53) % 95}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-10">
        <ProcessingHeader />

        <AIAnimation />

        <div className="max-w-md mx-auto w-full flex flex-col gap-4">
          <ProgressBar progress={progress} />
          <EstimatedTime seconds={estimatedSecondsRemaining} />
          <LoadingMessages message={currentMessage} />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <StatusTimeline currentStepIndex={currentStepIndex} />
          <MediaCard file={file} type={type} uploadTime={uploadTime} />
          <ModelCard />
        </div>
      </div>
    </div>
  );
}