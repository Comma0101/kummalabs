export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <h2 className="text-4xl font-black text-korami-black mb-4">404 - Page Not Found</h2>
      <p className="text-xl text-korami-black/70 mb-8">
        The page you are looking for does not exist.
      </p>
      <a href="/" className="px-8 py-4 bg-korami-black text-korami-white font-bold rounded-lg hover:bg-korami-gray transition-all">
        Return Home
      </a>
    </div>
  );
}