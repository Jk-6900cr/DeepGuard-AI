import { useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { useFileUpload } from "../hooks/useFileUpload";
import { VIDEO_UPLOAD_CONFIG } from "../utils/uploadConfig";
import UploadHeader from "../components/upload/UploadHeader";
import DropZone from "../components/upload/DropZone";
import FilePreview from "../components/upload/FilePreview";
import ValidationMessage from "../components/upload/ValidationMessage";
import UploadButton from "../components/upload/UploadButton";
import UploadTips from "../components/upload/UploadTips";
import UploadInfoPanel from "../components/upload/UploadInfoPanel";

const VIDEO_TIPS = [
  "Upload the original quality file — avoid re-compressed exports.",
  "Keep the face clearly visible throughout the clip.",
  "Longer videos give the model more frames to improve confidence.",
];

export default function UploadVideo() {
  const {
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
  } = useFileUpload(VIDEO_UPLOAD_CONFIG);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);

    // TODO:
    // Send video to backend API
    // POST /api/analyze/video
    //
    // const formData = new FormData();
    // formData.append("video", file);
    // const response = await fetch("/api/analyze/video", { method: "POST", body: formData });
    // const result = await response.json();
    // navigate("/result", { state: { result } });

    console.log("Analyze Video clicked — backend not connected yet.", file);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-ink px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <UploadHeader
          title="Upload Video"
          subtitle="Upload a video to detect AI generated or manipulated content."
          icon={HiOutlineVideoCamera}
        />

        <input
          ref={inputRef}
          type="file"
          accept={VIDEO_UPLOAD_CONFIG.inputAccept}
          onChange={handleInputChange}
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <ValidationMessage message={error} onDismiss={() => setError("")} />

            {!file ? (
              <DropZone
                config={VIDEO_UPLOAD_CONFIG}
                dragActive={dragActive}
                isProcessing={isProcessing}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onBrowseClick={openFileDialog}
              />
            ) : (
              <FilePreview
                file={file}
                previewUrl={previewUrl}
                metadata={metadata}
                mediaType="video"
                onRemove={removeFile}
                onReplace={openFileDialog}
              />
            )}

            <UploadButton label="Analyze Video" onClick={handleAnalyze} disabled={!file} loading={isAnalyzing} />
          </div>

          <div className="flex flex-col gap-5">
            <UploadInfoPanel />
            <UploadTips tips={VIDEO_TIPS} />
          </div>
        </div>
      </div>
    </div>
  );
}