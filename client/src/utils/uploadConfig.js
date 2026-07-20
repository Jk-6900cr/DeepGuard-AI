// Single source of truth for accepted formats / limits per media type.
// Passing one of these into useFileUpload() is what makes the image
// and video pages share 100% of their logic with zero duplication.

export const IMAGE_UPLOAD_CONFIG = {
  mediaType: "image",
  label: "Image",
  acceptedExtensions: ["JPG", "JPEG", "PNG", "WEBP"],
  acceptedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  maxSizeMB: 20,
  inputAccept: ".jpg,.jpeg,.png,.webp",
};

export const VIDEO_UPLOAD_CONFIG = {
  mediaType: "video",
  label: "Video",
  acceptedExtensions: ["MP4", "MOV", "AVI", "MKV", "WEBM"],
  acceptedMimeTypes: [
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
    "video/webm",
  ],
  maxSizeMB: 100,
  inputAccept: ".mp4,.mov,.avi,.mkv,.webm",
};

export function validateFile(file, config) {
  if (!file) return "No file selected. Please choose a file to continue.";

  const extension = file.name.split(".").pop()?.toUpperCase() ?? "";
  const isMimeValid = config.acceptedMimeTypes.includes(file.type);
  // Some browsers/OSes report unreliable MIME types for .mkv/.mov —
  // fall back to extension matching so valid files aren't rejected.
  const isExtensionValid = config.acceptedExtensions.includes(extension);

  if (!isMimeValid && !isExtensionValid) {
    return `Unsupported file format. Please upload a ${config.acceptedExtensions.join(", ")} file.`;
  }

  const maxBytes = config.maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return `File is too large. Maximum allowed size is ${config.maxSizeMB} MB.`;
  }

  return null;
}