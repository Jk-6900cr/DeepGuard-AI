// Single source of truth for the simulated processing sequence.
// Swap TOTAL_DURATION_MS logic for real progress events from the
// backend later — every component here just renders whatever
// progress/step index it's given, so no redesign is needed.

export const TOTAL_DURATION_MS = 7000;

export const STATUS_STEPS = [
  "Upload Complete",
  "Validating File",
  "Extracting Metadata",
  "Preparing Media",
  "Detecting Faces",
  "Running DeepGuard AI Model",
  "Analyzing Visual Artifacts",
  "Calculating Confidence Score",
  "Generating Security Report",
  "Finalizing Results",
];

export const LOADING_MESSAGES = [
  "Analyzing facial consistency…",
  "Checking metadata…",
  "Detecting manipulation…",
  "Inspecting compression artifacts…",
  "Running neural network…",
  "Generating confidence score…",
];

export const MODEL_INFO = {
  model: "DeepGuard Vision AI v1.0",
  status: "Running",
  engine: "Computer Vision",
  detection: "Deepfake Analysis",
  confidenceEngine: "Active",
};