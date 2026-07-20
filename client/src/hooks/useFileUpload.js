import { useState, useCallback, useRef, useEffect } from "react";
import { validateFile } from "../utils/uploadConfig";
import { getImageDimensions, getVideoMetadata } from "../utils/fileHelpers";

export function useFileUpload(config) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef(null);

  // Revoke the object URL on unmount to avoid memory leaks.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const processFile = useCallback(
    async (selected) => {
      setError("");
      const validationError = validateFile(selected, config);
      if (validationError) {
        setError(validationError);
        return;
      }

      setIsProcessing(true);
      try {
        const url = URL.createObjectURL(selected);
        const meta =
          config.mediaType === "image"
            ? await getImageDimensions(selected)
            : await getVideoMetadata(selected);

        setFile(selected);
        setPreviewUrl(url);
        setMetadata(meta);
      } catch {
        setError("This file could not be read. Please try a different one.");
      } finally {
        setIsProcessing(false);
      }
    },
    [config]
  );

  const handleInputChange = useCallback(
    (e) => {
      const selected = e.target.files?.[0];
      if (selected) processFile(selected);
      e.target.value = ""; // allows re-selecting the same file later
    },
    [processFile]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) processFile(dropped);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const removeFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setMetadata(null);
    setError("");
  }, [previewUrl]);

  return {
    file,
    previewUrl,
    metadata,
    error,
    dragActive,
    isProcessing,
    inputRef,
    handleInputChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    openFileDialog,
    removeFile,
    setError,
  };
}