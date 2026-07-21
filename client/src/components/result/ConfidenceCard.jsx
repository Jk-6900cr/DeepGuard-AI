import CircularRing from "./CircularRing";

const TONE_COLORS = {
  success: "#34D399",
  flag: "#FF4D6D",
};

export default function ConfidenceCard({ value, tone = "success" }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <CircularRing value={value} color={TONE_COLORS[tone]} label="Confidence" />
      <span className="text-xs text-mist">AI Confidence Score</span>
    </div>
  );
}