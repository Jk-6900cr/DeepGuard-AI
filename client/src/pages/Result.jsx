import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineFaceFrown } from "react-icons/hi2";

import ResultHeader from "../components/result/ResultHeader";
import PredictionCard from "../components/result/PredictionCard";
import FileDetailsCard from "../components/result/FileDetailsCard";
import AnalysisSummary from "../components/result/AnalysisSummary";
import DetectionCards from "../components/result/DetectionCards";
import Timeline from "../components/result/Timeline";
import ModelCard from "../components/result/ModelCard";
import TrustScore from "../components/result/TrustScore";
import ActionButtons from "../components/result/ActionButtons";

import {
  PREDICTION,
  CONFIDENCE_SCORE,
  RISK_LEVEL,
  TRUST_SCORE,
  ANALYSIS_SUMMARY,
  DETECTION_DETAILS,
  PIPELINE_STEPS,
  MODEL_INFO,
} from "../utils/resultConfig";

function ResultBackground() {
  return (
    <>
      <div
        className="absolute inset-0 -z-10 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(#223140 1px, transparent 1px), linear-gradient(90deg, #223140 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-scan/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-success/5 blur-3xl -z-10" />
    </>
  );
}

// Shown when /result is reached without router state — e.g. a direct
// visit or refresh — instead of crashing on a missing `file`/`type`.
function NoResultState() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6 relative overflow-hidden">
      <ResultBackground />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 text-center max-w-sm"
      >
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-edge text-mist mb-5">
          <HiOutlineFaceFrown className="text-3xl" />
        </span>
        <h1 className="font-display text-xl font-semibold text-fog">No report to show</h1>
        <p className="text-sm text-mist mt-2">
          We couldn't find any analysis data for this page. Upload a file to generate a report.
        </p>
        <Link
          to="/upload/image"
          className="inline-block mt-6 text-sm font-medium text-ink bg-scan px-5 py-2.5 rounded-lg hover:brightness-110 transition-all duration-200"
        >
          Upload a File
        </Link>
      </motion.div>
    </div>
  );
}

export default function Result() {
  const { id } = useParams();

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(
          `http://localhost:5000/api/predictions/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load prediction."
          );
        }

        console.log("Prediction:", data.prediction);

        setPrediction(data.prediction);
      } catch (err) {
        console.error("Result Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-6">
        <p className="text-sm text-mist">
          Loading analysis report...
        </p>
      </div>
    );
  }

  if (error || !prediction) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-2xl font-semibold text-fog">
            Report not found
          </h1>

          <p className="text-sm text-mist mt-2">
            {error || "We couldn't find this analysis report."}
          </p>

          <Link
            to="/history"
            className="inline-block mt-5 text-sm text-scan hover:underline"
          >
            ← Back to History
          </Link>
        </div>
      </div>
    );
  }

  const uploadTime = new Date(
    prediction.createdAt
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const fileType =
    prediction.fileType === "image"
      ? "image"
      : "video";

  const result =
    prediction.prediction === "Authentic"
      ? "Authentic"
      : "AI Generated";

  return (
    <div className="min-h-screen bg-ink px-6 lg:px-10 py-10 relative overflow-hidden">
      <ResultBackground />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8">

        <ResultHeader />

        <PredictionCard
          prediction={result}
          confidence={prediction.confidence}
          riskLevel={prediction.risk}
        />

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 flex flex-col gap-6">

            <AnalysisSummary
              points={
                prediction.summary
                  ? [prediction.summary]
                  : ["No analysis summary was provided by the AI model."]
              }
            />

            <DetectionCards
              details={[]}
            />

          </div>

          <div className="flex flex-col gap-6">

            <TrustScore
              score={prediction.confidence}
            />

            <FileDetailsCard
              file={{
                name: prediction.filename,
                size: prediction.fileSize,
              }}
              type={fileType}
              metadata={prediction.resolution}
              uploadTime={uploadTime}
            />

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <Timeline
            steps={[]}
          />

          <ModelCard
            info={MODEL_INFO}
          />

        </div>

        <ActionButtons
          type={fileType}
        />

      </div>
    </div>
  );
}