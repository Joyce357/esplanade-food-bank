"use client";

import React, { useState } from "react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [previewNotice, setPreviewNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setFieldError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website_url_hp: honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors?.email) {
          setFieldError(data.errors.email[0]);
        }
        setErrorMsg(
          data.message ||
            "Unable to process subscription. Please check your email and try again."
        );
        return;
      }

      setSubmitted(true);
      if (data.previewNotice) {
        setPreviewNotice(data.previewNotice);
      }
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setErrorMsg(
        "Network connection error. Please verify your connection or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary text-on-primary rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl relative overflow-hidden border border-surface-container-lowest/15">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md text-left w-full">
          <span className="text-tertiary-fixed font-label-md text-label-md uppercase tracking-wider font-extrabold block mb-2">
            Community Updates
          </span>
          <h3 className="font-headline-lg text-headline-lg font-bold text-on-primary mb-2">
            Stay Connected with Your Neighbours.
          </h3>
          <p className="font-body-md text-body-md text-on-primary/90 leading-relaxed">
            Sign up to receive news, opportunities to help, and updates from Esplanade Community Food Bank.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 max-w-lg">
          {submitted ? (
            <div className="bg-surface-container-lowest/15 backdrop-blur-md p-5 rounded-2xl border border-primary-fixed/30 text-on-primary flex flex-col gap-2 font-body-md text-sm animate-in fade-in">
              {previewNotice ? (
                <>
                  <div className="flex items-center gap-2 font-label-md font-bold text-tertiary-fixed">
                    <span className="material-symbols-outlined text-lg">science</span>
                    <span>[TEST PREVIEW] Subscription Validated</span>
                  </div>
                  <p className="text-on-primary/90 text-xs leading-relaxed">
                    This subscription was validated in local development test mode. Automated mailing list synchronization and live newsletter dispatch will activate upon official client launch.
                  </p>
                  <div className="bg-primary-dark/40 border border-primary-fixed/20 rounded-xl p-2.5 text-[11px] text-on-primary/80">
                    <span className="font-bold text-tertiary-fixed block mb-0.5">Development Notice:</span>
                    {previewNotice}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 font-label-md font-bold text-primary-fixed">
                    <span className="material-symbols-outlined text-lg">
                      check_circle
                    </span>
                    <span>Subscription Confirmed</span>
                  </div>
                  <p className="text-on-primary/90 text-xs leading-relaxed">
                    Thank you for subscribing to updates from Esplanade Community Food Bank.
                  </p>
                </>
              )}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full"
              noValidate
            >
              {/* Invisible honeypot field for bot suppression */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="newsletter_hp">Leave blank</label>
                <input
                  id="newsletter_hp"
                  type="text"
                  name="website_url_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="bg-error-container text-on-error-container p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in"
                >
                  <span className="material-symbols-outlined text-sm shrink-0">
                    error
                  </span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="flex-1">
                  <input
                    type="email"
                    required
                    disabled={loading}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldError) setFieldError(null);
                    }}
                    placeholder="Enter your email address"
                    className={`w-full sm:min-w-[260px] min-w-0 px-5 py-3.5 rounded-full bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-fixed disabled:opacity-70 ${
                      fieldError ? "border-2 border-error" : ""
                    }`}
                    aria-label="Email address for newsletter"
                    aria-invalid={Boolean(fieldError)}
                    aria-describedby={fieldError ? "newsletter-email-error" : undefined}
                  />
                  {fieldError && (
                    <p
                      id="newsletter-email-error"
                      className="text-xs text-tertiary-fixed mt-1.5 px-3 font-medium"
                    >
                      {fieldError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold px-6 py-3.5 rounded-full hover:bg-tertiary-fixed-dim transition-colors whitespace-nowrap cursor-pointer shadow-md text-center btn-interactive disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-on-tertiary-fixed/30 border-t-on-tertiary-fixed rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Stay Connected</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
