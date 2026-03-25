"use client";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FiAlertTriangle } from "react-icons/fi";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-6">
      {/* Icon */}
      <div className="text-6xl md:text-8xl mb-6 text-yellow-400 animate-pulse">
        <FiAlertTriangle />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        xeeweb.com
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-2xl text-center max-w-xl mb-6">
        🚧 We are currently working hard to build something amazing!
        <br />
        Stay tuned for updates.
      </p>

      {/* Coming Soon / Email Subscription */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input
          type="email"
          placeholder="Enter your email for updates"
          className="w-full sm:w-lg text-gray-900"
          onChange={() => {}}
        />

        <Button
          variant="primary"
          size="lg"
          rounded="md"
          className="text-gray-100 hover:bg-yellow-500"
        >
          Notify Me
        </Button>
      </div>
    </main>
  );
}
