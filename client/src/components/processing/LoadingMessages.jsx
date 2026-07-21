export default function LoadingMessages({ message }) {
  return (
    <p
      key={message}
      className="text-center text-sm text-mist italic animate-fade-in"
    >
      {message}
    </p>
  );
}