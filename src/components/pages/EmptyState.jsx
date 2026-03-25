// src/components/pages/EmptyState.jsx

import Link from "next/link";

const EmptyState = ({ message = "We're working on updating this page." }) => {
  return (
    <div className="py-16 text-center px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-8xl mb-4">📄</div>
        <h2 className="text-2xl font-semibold mb-2">Content coming soon!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-yellow-500 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
