"use client";
import { useState } from "react";

export default function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 You're subscribed! Redirecting to our Telegram group...");
        setEmail("");

        // Redirect to your Telegram group
        setTimeout(() => {
          window.location.href = "https://t.me/ClickShiftAlerts";
        }, 3000);
      } else {
        setMessage(`⚠️ ${data.error || "Subscription failed."}`);
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-12 mb-8">
      <h4 className="text-xl font-semibold mb-2 text-white">Stay Updated</h4>
      <p className="text-slate-400 mb-4 text-sm">
        Get weekly intelligence, strategies, and early access to features.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
          disabled={loading}
        />
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className={`bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 rounded-lg font-semibold text-sm transition-all 
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-700"}`}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {message && <p className="mt-3 text-slate-300 text-sm">{message}</p>}
    </div>
  );
}
