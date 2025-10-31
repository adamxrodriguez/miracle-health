"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (e.g., Sentry, LogRocket)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h1 className="mb-4 text-2xl font-semibold text-red-900">
          Something went wrong!
        </h1>
        <p className="mb-6 text-red-700">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Try again"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

