"use client";

import React, { useState } from "react";
import { CONTACT_INFO } from "@/data/navigation";

import TurnstileWidget from "@/components/ui/TurnstileWidget";
import { CONTACT_TOPICS } from "@/lib/validation/contact.schema";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    topic: CONTACT_TOPICS[0] as string,
    message: "",
    website_url_hp: "",
    turnstileToken: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [responseMeta, setResponseMeta] = useState<{
    referenceId?: string;
    previewMode?: boolean;
    previewNotice?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setErrorMsg(
          data.message ||
            "Unable to submit message. Please check the fields or try again later."
        );
        return;
      }

      setSubmitted(true);
      setResponseMeta({
        referenceId: data.referenceId,
        previewMode: data.previewMode,
        previewNotice: data.previewNotice,
      });
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMsg(
        "Network connection error. Please verify your connection or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <section className="bg-primary text-on-primary py-16 lg:py-24 relative overflow-hidden -mt-20 pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-4 py-1.5 rounded-full text-primary-fixed font-label-md text-label-md mb-6 border border-surface-container-lowest/15">
            <span className="w-2 h-2 rounded-full bg-primary-fixed" />
            Connect With Us
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Let&apos;s Stay Connected.
          </h1>
          <p className="font-body-xl text-body-lg md:text-body-xl text-on-primary/90 max-w-3xl leading-relaxed">
            Have a question about food support, volunteering, donations, or community involvement? Send a message to Esplanade Community Food Bank, and the team can follow up when submissions are configured and staffed.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container space-y-6 card-hover-lift">
                <div>
                  <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-bold block mb-1">
                    Pantry Location
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                    {CONTACT_INFO.address}
                  </h2>
                  <span className="text-xs text-on-surface-variant/80 block mt-1">
                    {CONTACT_INFO.addressStatus} (St. Lawrence Ward) • Facility access coordinated upon inquiry
                  </span>
                </div>

                <div className="border-t border-surface-container pt-4">
                  <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-bold block mb-1">
                    Helpline &amp; Inquiries
                  </span>
                  <p className="font-headline-sm text-headline-sm text-primary font-bold">
                    {CONTACT_INFO.helplineDisplay}
                  </p>
                  <span className="text-xs text-on-surface-variant/80 block mt-1">
                    {process.env.NEXT_PUBLIC_HELPLINE_PHONE
                      ? "Direct telephone assistance"
                      : "For food assistance and volunteer inquiries, please message the team below"}
                  </span>
                </div>

                <div className="border-t border-surface-container pt-4">
                  <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-bold block mb-1">
                    Email Inquiries
                  </span>
                  <p className="font-body-lg text-body-lg text-primary font-semibold">
                    {CONTACT_INFO.email}
                  </p>
                  <span className="text-xs text-on-surface-variant/80 block mt-1">
                    {CONTACT_INFO.emailStatus}
                  </span>
                </div>

                <div className="border-t border-surface-container pt-4">
                  <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-bold block mb-1">
                    Organization Status
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                    {CONTACT_INFO.charityNumber}
                  </p>
                  <span className="text-xs text-on-surface-variant/80 block mt-1">
                    {CONTACT_INFO.charityStatus}
                  </span>
                </div>
              </div>

              {/* Accessibility & Accommodations Card */}
              <div className="bg-surface-container p-6 rounded-3xl border border-surface-container-highest card-hover-lift">
                <div className="flex items-center gap-3 text-primary font-headline-sm text-headline-sm font-bold mb-2">
                  <span className="material-symbols-outlined text-2xl text-secondary">
                    info
                  </span>
                  <h3>Transit &amp; Accommodations</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-on-surface-variant font-body-md text-body-md">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-base text-secondary mt-0.5">
                      directions_bus
                    </span>
                    <span>Accessible via TTC bus route 121 along The Esplanade.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-base text-secondary mt-0.5">
                      support_agent
                    </span>
                    <span>For specific mobility accommodations or dietary questions, please reach out via message.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-base text-secondary mt-0.5">
                      schedule
                    </span>
                    <span className="text-xs text-on-surface-variant/80">Designated quiet hours and formal facility accessibility review currently in progress.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-8 lg:p-12 rounded-3xl shadow-sm border border-surface-container">
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-2">
                Send an Inquiry
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                Have a question about food support, volunteering, donations, or community involvement? Send a message to Esplanade Community Food Bank.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-surface-container text-center border border-primary/20 animate-in fade-in">
                  {responseMeta.previewMode ? (
                    <>
                      <div className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider mb-3">
                        <span className="material-symbols-outlined text-sm">science</span>
                        <span>Test-Only Preview Mode</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                        [TEST PREVIEW] Submission Validated
                      </h3>
                      {responseMeta.referenceId && (
                        <div className="inline-block bg-primary-fixed/20 text-primary font-label-md text-xs px-3 py-1 rounded-full font-bold mb-3">
                          Test Reference ID: {responseMeta.referenceId}
                        </div>
                      )}
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-4">
                        This submission was processed in local development test mode. No live email was dispatched to recipients and no permanent database record was saved.
                      </p>
                      {responseMeta.previewNotice && (
                        <div className="bg-tertiary-fixed/20 border border-tertiary-fixed-dim/40 rounded-xl p-3 text-xs text-on-surface-variant max-w-md mx-auto text-left">
                          <span className="font-bold block text-primary mb-1">Development Notice:</span>
                          {responseMeta.previewNotice}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-primary text-4xl mb-2 block">
                        check_circle
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                        Inquiry Received
                      </h3>
                      {responseMeta.referenceId && (
                        <div className="inline-block bg-primary-fixed/20 text-primary font-label-md text-xs px-3 py-1 rounded-full font-bold mb-3">
                          Reference ID: {responseMeta.referenceId}
                        </div>
                      )}
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-4">
                        Thank you for reaching out. Our community coordination team reviews inquiries in the order received.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot field - invisible to human users */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact_website_hp">Leave this field blank</label>
                    <input
                      id="contact_website_hp"
                      type="text"
                      name="website_url_hp"
                      value={formData.website_url_hp}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-4 rounded-2xl bg-error-container text-on-error-container text-sm flex items-start gap-3 animate-in fade-in"
                    >
                      <span className="material-symbols-outlined text-xl shrink-0 mt-0.5">
                        error
                      </span>
                      <div>
                        <span className="font-bold block">Submission Error</span>
                        <span>{errorMsg}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block font-label-md text-label-md text-primary font-bold mb-2"
                      >
                        Your Name <span className="text-error">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        disabled={loading}
                        value={formData.fullName}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.fullName)}
                        aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                        placeholder="e.g. Maria Santos"
                        className={`w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary ${
                          fieldErrors.fullName ? "border-error" : "border-surface-container"
                        }`}
                      />
                      {fieldErrors.fullName && (
                        <p id="fullName-error" className="text-xs text-error mt-1.5 font-medium">
                          {fieldErrors.fullName[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-label-md text-label-md text-primary font-bold mb-2"
                      >
                        Email Address <span className="text-error">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={loading}
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        placeholder="maria@example.com"
                        className={`w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary ${
                          fieldErrors.email ? "border-error" : "border-surface-container"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="text-xs text-error mt-1.5 font-medium">
                          {fieldErrors.email[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block font-label-md text-label-md text-primary font-bold mb-2"
                      >
                        Phone Number <span className="text-xs text-on-surface-variant font-normal">(Optional)</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        disabled={loading}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(416) 000-0000"
                        className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <div className="mb-2">
                        <label
                          htmlFor="topic"
                          className="block font-label-md text-label-md text-primary font-bold"
                        >
                          Inquiry Topic <span className="text-error">*</span>
                        </label>
                      </div>
                      <select
                        id="topic"
                        name="topic"
                        disabled={loading}
                        value={formData.topic}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {CONTACT_TOPICS.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-label-md text-label-md text-primary font-bold mb-2"
                    >
                      Your Message <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      disabled={loading}
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      placeholder="How can our community pantry support you?"
                      className={`w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        fieldErrors.message ? "border-error" : "border-surface-container"
                      }`}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="text-xs text-error mt-1.5 font-medium">
                        {fieldErrors.message[0]}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                    We collect the information you share to respond to your inquiry. Please avoid sending highly sensitive details through the general contact form.
                  </p>

                  {/* Turnstile Security Check */}
                  <TurnstileWidget
                    onVerify={(token) => setFormData((prev) => ({ ...prev, turnstileToken: token }))}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-on-primary font-label-lg text-label-lg py-4 rounded-full font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer btn-interactive text-center disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <span>Submit Inquiry</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
