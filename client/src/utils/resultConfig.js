// Centralized dummy result data. Replace this whole file's exports
// with values derived from the POST /api/analyze/* response later —
// every component below just renders whatever shape it's given.

export const PREDICTION = {
  label: "AUTHENTIC", // or "AI GENERATED"
  isAuthentic: true,
};

export const CONFIDENCE_SCORE = 96.4;

export const RISK_LEVEL = "Low"; // "Low" | "Medium" | "High"

export const TRUST_SCORE = 96;

export const ANALYSIS_SUMMARY = [
  "DeepGuard AI analyzed this media using multiple computer vision and forensic detection models.",
  "No major manipulation artifacts were detected during analysis.",
  "Facial consistency appears normal across the sampled regions.",
  "Metadata is consistent with the claimed capture device and timestamp.",
  "Compression patterns appear authentic and show no signs of re-encoding artifacts.",
  "Overall confidence indicates the uploaded media is likely authentic.",
];

export const DETECTION_DETAILS = [
  { title: "Metadata Analysis", status: "Authentic", description: "EXIF and container metadata match expected patterns.", tone: "success" },
  { title: "Face Consistency", status: "98%", description: "Facial landmarks remain consistent across the media.", tone: "success" },
  { title: "Lighting Analysis", status: "Normal", description: "Light direction and shadows are physically consistent.", tone: "success" },
  { title: "Texture Analysis", status: "No Artifacts", description: "No unnatural texture blending detected.", tone: "success" },
  { title: "Compression Pattern", status: "Clean", description: "Compression signature matches a single-pass encode.", tone: "success" },
  { title: "GAN Detection", status: "Not Detected", description: "No generative-model fingerprints found.", tone: "success" },
];

export const PIPELINE_STEPS = [
  "Upload Complete",
  "Metadata Extraction",
  "Face Detection",
  "DeepFake Detection",
  "Confidence Calculation",
  "Security Report Generated",
];

export const MODEL_INFO = {
  model: "DeepGuard Vision AI v1.0",
  engine: "Computer Vision",
  framework: "PyTorch",
  inferenceTime: "3.4 sec",
  status: "Completed",
};