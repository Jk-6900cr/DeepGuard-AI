export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink px-6 py-20 text-fog">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-mist">The route you requested does not exist.</p>
      </div>
    </div>
  );
}
