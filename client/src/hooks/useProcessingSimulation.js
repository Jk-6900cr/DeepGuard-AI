import { useState, useEffect, useRef } from "react";
import { TOTAL_DURATION_MS, STATUS_STEPS, LOADING_MESSAGES } from "../utils/processingConfig";

// Drives the fake progress bar, current status step, estimated time
// remaining, and rotating loading message — all off a single ticking
// interval so they stay perfectly in sync with each other.
//
// TODO backend:
// Replace this whole simulation with real progress driven by the
// POST /api/analyze/image or /api/analyze/video response (or a
// WebSocket/SSE stream if the backend reports incremental progress).
// onComplete() is where result data from that response would be
// passed through to /result instead of the placeholder navigation.
export function useProcessingSimulation(onComplete) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min((elapsed / TOTAL_DURATION_MS) * 100, 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => onCompleteRef.current?.(), 700);
      }
    }, 60);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const currentStepIndex = Math.min(
    Math.floor((progress / 100) * STATUS_STEPS.length),
    STATUS_STEPS.length - 1
  );

  const estimatedSecondsRemaining = Math.max(
    Math.ceil(((100 - progress) / 100) * (TOTAL_DURATION_MS / 1000)),
    0
  );

  return {
    progress,
    currentStepIndex,
    estimatedSecondsRemaining,
    currentMessage: LOADING_MESSAGES[messageIndex],
  };
}