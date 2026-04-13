"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  FiAlertTriangle,
  FiMail,
  FiSend,
  FiBell,
  FiTag,
  FiDollarSign,
  FiShield,
  FiGlobe,
} from "react-icons/fi";

export default function HomePage() {
  const [contactForm, setContactForm] = useState({
    email: "",
    message: "",
  });
  const [notifyEmail, setNotifyEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [notifyFeedback, setNotifyFeedback] = useState({
    message: "",
    type: "",
  });

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    if (!contactForm.email || !contactForm.message) {
      setFeedback({
        message: "Please fill in both email and message.",
        type: "error",
      });
      setTimeout(() => setFeedback({ message: "", type: "" }), 5000);
      return;
    }

    if (!contactForm.email.includes("@")) {
      setFeedback({
        message: "Please provide a valid email address.",
        type: "error",
      });
      setTimeout(() => setFeedback({ message: "", type: "" }), 5000);
      return;
    }

    setLoading(true);
    setFeedback({ message: "Sending message...", type: "info" });

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({
          message: "✅ Message sent successfully! I'll reply soon.",
          type: "success",
        });
        setContactForm({ email: "", message: "" });
      } else {
        setFeedback({
          message: data.error || "Failed to send message. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setFeedback({
        message: "Network error. Please try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback({ message: "", type: "" }), 5000);
    }
  };

  const handleNotify = async () => {
    if (!notifyEmail) {
      setNotifyFeedback({
        message: "Please enter your email address.",
        type: "error",
      });
      setTimeout(() => setNotifyFeedback({ message: "", type: "" }), 5000);
      return;
    }

    if (!notifyEmail.includes("@")) {
      setNotifyFeedback({
        message: "Please provide a valid email address.",
        type: "error",
      });
      setTimeout(() => setNotifyFeedback({ message: "", type: "" }), 5000);
      return;
    }

    setNotifyLoading(true);
    setNotifyFeedback({ message: "Subscribing...", type: "info" });

    try {
      const response = await fetch("/api/subscribe-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: notifyEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotifyFeedback({
          message: "🎉 You're on the list! We'll notify you at launch.",
          type: "success",
        });
        setNotifyEmail("");
      } else {
        setNotifyFeedback({
          message: data.error || "Subscription failed. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setNotifyFeedback({
        message: "Network error. Please try again later.",
        type: "error",
      });
    } finally {
      setNotifyLoading(false);
      setTimeout(() => setNotifyFeedback({ message: "", type: "" }), 5000);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-4 py-10 sm:px-6 relative">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 204, 21, 0.3) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Domain for sale banner */}
      <div className="absolute top-4 left-0 right-0 flex justify-center z-10 px-4">
        <div className="backdrop-blur-md bg-black/40 border border-yellow-400/50 rounded-full py-2 px-5 sm:px-7 shadow-lg shadow-yellow-500/20 flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1 text-yellow-300 text-sm sm:text-base">
            <FiTag className="text-xs sm:text-sm" />
            <span className="font-bold">xeeweb.com</span>
          </span>
          <span className="text-white/80 text-xs sm:text-sm">•</span>
          <span className="text-white font-medium text-sm sm:text-base">
            🔥 Premium Domain For Sale
          </span>
          <span className="text-white/80 text-xs sm:text-sm">•</span>
          <a
            href="#contact"
            className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold transition underline decoration-yellow-400/30 underline-offset-2"
          >
            Inquire now →
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-6xl mx-auto mt-12 sm:mt-16 flex flex-col items-center justify-center">
        {/* Icon + Title Section */}
        <div className="text-center">
          <div className="inline-flex justify-center mb-4 text-yellow-400 text-7xl sm:text-8xl md:text-9xl animate-pulse drop-shadow-2xl">
            <FiAlertTriangle />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">
            xeeweb.com
          </h1>
          <div className="h-1 w-24 bg-yellow-500/60 mx-auto my-4 rounded-full"></div>
          <p className="text-gray-200 text-lg sm:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            🚧 Building something extraordinary — next-gen digital experience.
            <br className="hidden sm:block" />
            <span className="text-yellow-300 font-medium">
              Secure this domain
            </span>{" "}
            or get early access.
          </p>
        </div>

        {/* Double Card Layout */}
        <div className="mt-12 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Contact Form Card */}
          <div
            id="contact"
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-7 transition-all hover:shadow-yellow-500/10"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <FiMail className="text-yellow-400 text-xl" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Message me directly
              </h2>
            </div>
            <p className="text-gray-300 text-sm mb-5 border-l-2 border-yellow-500 pl-3">
              Interested in the domain or want to get updates? Write your
              message & email. I'll reply within 24h.
            </p>

            <form onSubmit={handleSubmitMessage} className="space-y-5">
              <div>
                <label
                  htmlFor="senderEmail"
                  className="block text-sm font-medium text-gray-200 mb-1.5 flex items-center gap-2"
                >
                  <FiMail className="text-yellow-400 text-xs" /> Your email *
                </label>
                <Input
                  type="email"
                  id="senderEmail"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="hello@example.com"
                  className="w-full bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="messageContent"
                  className="block text-sm font-medium text-gray-200 mb-1.5 flex items-center gap-2"
                >
                  <FiSend className="text-yellow-400 text-xs" /> Message /
                  Inquiry *
                </label>
                <textarea
                  id="messageContent"
                  name="message"
                  rows="4"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  className="w-full bg-gray-800/80 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  placeholder="Tell me about your interest in xeeweb.com, or any question..."
                  required
                />
              </div>

              {feedback.message && (
                <div
                  className={`text-sm font-medium ${
                    feedback.type === "error"
                      ? "text-red-400"
                      : feedback.type === "success"
                        ? "text-green-400"
                        : "text-yellow-400"
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                rounded="md"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>⏳ Sending...</>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-gray-400 mt-4 text-center flex items-center justify-center gap-1">
              <FiShield className="text-[10px]" /> Secure delivery · Direct to
              owner's inbox
            </p>
          </div>

          {/* Subscription Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-7 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <FiBell className="text-yellow-400 text-xl" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Stay updated
              </h2>
            </div>
            <p className="text-gray-300 text-sm mb-5">
              Be the first to know when we launch new tools & exclusive offers.
              No spam, only golden updates.
            </p>

            <div className="space-y-4 flex-1">
              <div>
                <label
                  htmlFor="notifyEmail"
                  className="block text-sm font-medium text-gray-200 mb-1.5"
                >
                  Email for launch alerts
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    id="notifyEmail"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400 focus:ring-yellow-500"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    rounded="md"
                    onClick={handleNotify}
                    disabled={notifyLoading}
                    className="bg-gray-700 hover:bg-yellow-600 text-white font-semibold py-3 px-5 rounded-xl transition-all border border-gray-500 hover:border-yellow-400"
                  >
                    {notifyLoading ? (
                      <>⏳...</>
                    ) : (
                      <>
                        <FiBell /> Notify Me
                      </>
                    )}
                  </Button>
                </div>
                {notifyFeedback.message && (
                  <div
                    className={`text-xs mt-2 ${
                      notifyFeedback.type === "error"
                        ? "text-red-400"
                        : notifyFeedback.type === "success"
                          ? "text-green-400"
                          : "text-yellow-400"
                    }`}
                  >
                    {notifyFeedback.message}
                  </div>
                )}
              </div>
            </div>

            {/* Domain Sale Info */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300 flex items-center gap-1">
                  <FiDollarSign className="text-yellow-400" /> Direct sale
                </span>
                <span className="text-yellow-400 font-mono text-lg font-bold">
                  Make offer
                </span>
              </div>
              <div className="mt-2 flex gap-2 text-xs text-gray-400">
                <FiGlobe className="text-green-400" /> Fast transfer · Escrow
                ready
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-400 text-sm flex flex-wrap justify-center gap-x-6 gap-y-2">
          <span className="inline-flex items-center gap-1">
            <FiGlobe /> Premium .com
          </span>
          <span className="inline-flex items-center gap-1">
            <FiShield /> Secure ownership
          </span>
          <span className="inline-flex items-center gap-1">
            <FiMail /> Immediate reply via email
          </span>
        </div>
      </div>
    </main>
  );
}
