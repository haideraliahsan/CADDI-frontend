import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to the <span className="text-blue-600">CADDi Demo</span>
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        Upload and annotate images to simulate communication between engineers and factory teams.
      </p>

      <Link
        href="/annotate"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-blue-700 transition-all"
      >
        Go to Annotation Page →
      </Link>
    </main>
  );
}
