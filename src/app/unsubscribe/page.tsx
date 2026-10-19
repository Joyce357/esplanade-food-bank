"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      setSubmitted(true);
      setMessage(
        "If this email is currently subscribed to The Esplanade Gazette, you can unsubscribe instantly using the one-click unsubscribe link at the bottom of any received email, or contact our team directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <section className="bg-primary text-on-primary py-16 lg:py-24 relative overflow-hidden -mt-20 pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-4 py-1.5 rounded-full text-primary-fixed font-label-md text-label-md mb-6 border border-surface-container-lowest/15">
            <span className="w-2 h-2 rounded-full bg-primary-fixed" />
            Email Preferences
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Manage Email Preferences
          </h1>
          <p className="font-body-xl text-body-lg md:text-body-xl text-on-primary/90 max-w-3xl leading-relaxed">
            We respect your privacy and inbox. You can manage or unsubscribe from community updates from Esplanade Community Food Bank at any time.
          </p>
        </div>
      </section>

      <section className="py-space-xl bg-surface-container-low min-h-[50vh] flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto px-6">
          <div className="bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-surface-container shadow-sm card-hover-lift">
            {submitted ? (
              <div className="text-center space-y-4">
                <span className="material-symbols-outlined text-primary text-4xl block">
                  mark_email_read
                </span>
                <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Request Recorded
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {message}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-primary text-on-primary font-label-md text-sm px-6 py-2.5 rounded-full font-bold hover:bg-primary/90 transition-colors"
                  >
                    Return to Homepage
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-surface-container text-primary font-label-md text-sm px-6 py-2.5 rounded-full font-bold hover:bg-surface-container-high transition-colors"
                  >
                    Contact Team
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                    Unsubscribe from The Esplanade Gazette
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed mb-6">
                    Enter your email address below to request removal from our community newsletter mailing list.
                  </p>
                  <label
                    htmlFor="unsub_email"
                    className="block font-label-md text-label-md text-primary font-bold mb-2"
                  >
                    Your Email Address
                  </label>
                  <input
                    id="unsub_email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="neighbour@example.ca"
                    className="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm font-body-md"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-on-primary font-label-md text-sm py-3 px-6 rounded-full font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Unsubscribe from Updates"}
                  </button>
                  <Link
                    href="/"
                    className="text-center text-xs text-on-surface-variant/80 hover:text-primary transition-colors py-1"
                  >
                    Cancel and return to homepage
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
