import { useLocation } from "react-router-dom";

export default function Result() {
  const { file, type } = useLocation().state ?? {};

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-fog">Scan Result</h1>
        <p className="text-sm text-mist mt-2">
          {file ? `Analysis complete for ${file.name}` : "Protected page — placeholder."}
        </p>
      </div>
    </div>
  );
}