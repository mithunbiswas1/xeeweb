"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      {/* Dual-color Spinner */}
      <div className="animate-spin h-16 w-16 rounded-full border-4 border-t-primary border-b-primary"></div>

      {/* Loading Text */}
      <p className="text-primary text-lg font-medium mt-4">Loading...</p>
    </div>
  );
}
