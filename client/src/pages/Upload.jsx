import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setError("");
    setSelectedFile(file);

    // Create preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("image", selectedFile);

      const response = await fetch(
        "http://localhost:5000/api/predictions/analyze",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      console.log("Prediction response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Image analysis failed"
        );
      }

      // Send actual backend result to Result page
      navigate(`/result/${data.prediction._id}`);

    } catch (error) {
      console.error("Analysis error:", error);

      setError(
        error.message ||
        "Something went wrong while analyzing the image."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink px-6 py-20 text-fog">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="text-center">

          <h1 className="font-display text-4xl font-semibold">
            Analyze Image
          </h1>

          <p className="mt-3 text-mist">
            Upload an image and let DeepGuard analyze it.
          </p>

        </div>


        {/* Upload Box */}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">

          <label
            htmlFor="image-upload"
            className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 p-8 text-center transition hover:border-white/40"
          >

            {!preview ? (
              <>
                <div className="text-5xl">
                  📁
                </div>

                <h2 className="mt-5 text-xl font-semibold">
                  Choose an image
                </h2>

                <p className="mt-2 text-mist">
                  JPG, JPEG or PNG
                </p>
              </>
            ) : (
              <img
                src={preview}
                alt="Selected"
                className="max-h-64 max-w-full rounded-xl object-contain"
              />
            )}

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>


          {/* File name */}

          {selectedFile && (
            <div className="mt-5 rounded-lg bg-white/5 p-4">

              <p className="text-sm text-mist">
                Selected file
              </p>

              <p className="mt-1 font-medium">
                {selectedFile.name}
              </p>

            </div>
          )}


          {/* Error */}

          {error && (
            <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {error}
            </div>
          )}


          {/* Analyze Button */}

          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || loading}
            className="mt-6 w-full rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Analyzing Image..."
              : "Analyze Image"}
          </button>

        </div>

      </div>

    </div>
  );
}