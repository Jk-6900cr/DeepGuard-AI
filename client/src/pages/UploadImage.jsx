import { useState } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import { useFileUpload } from "../hooks/useFileUpload";
import { IMAGE_UPLOAD_CONFIG } from "../utils/uploadConfig";
import UploadHeader from "../components/upload/UploadHeader";
import DropZone from "../components/upload/DropZone";
import FilePreview from "../components/upload/FilePreview";
import ValidationMessage from "../components/upload/ValidationMessage";
import UploadButton from "../components/upload/UploadButton";
import UploadTips from "../components/upload/UploadTips";
import UploadInfoPanel from "../components/upload/UploadInfoPanel";
import { useNavigate } from "react-router-dom";

const IMAGE_TIPS = [
  "Upload a clear, well-lit face for the most accurate result.",
  "Higher resolution images give better detection accuracy.",
  "JPG, PNG, and WEBP formats are all supported.",
];

export default function UploadImage() {
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
  } = useFileUpload(IMAGE_UPLOAD_CONFIG);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
  if (!file) return;

  setIsAnalyzing(true);

  try {
    const response = await fetch("http://localhost:5000/api/analyze/image");

    const result = await response.json();

    console.log(result);

    navigate("/processing", {
      state: {
        file,
        type: "image",
        result,
      },
    });
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    setIsAnalyzing(false);
  }
};

  return (
    <div className="min-h-screen bg-ink px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <UploadHeader
          title="Upload Image"
          subtitle="Upload an image to check whether it is AI generated or authentic."
          icon={HiOutlinePhoto}
        />

        <input
          ref={inputRef}
          type="file"
          accept={IMAGE_UPLOAD_CONFIG.inputAccept}
          onChange={handleInputChange}
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <ValidationMessage message={error} onDismiss={() => setError("")} />

            {!file ? (
              <DropZone
                config={IMAGE_UPLOAD_CONFIG}
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
                mediaType="image"
                onRemove={removeFile}
                onReplace={openFileDialog}
              />
            )}

            <UploadButton label="Analyze Image" onClick={handleAnalyze} disabled={!file} loading={isAnalyzing} />
          </div>

          <div className="flex flex-col gap-5">
            <UploadInfoPanel />
            <UploadTips tips={IMAGE_TIPS} />
          </div>
        </div>
      </div>
    </div>
  );
}