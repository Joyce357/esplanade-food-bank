"use client";

import React, { useState } from "react";
import Image from "next/image";
import TurnstileWidget from "@/components/ui/TurnstileWidget";
import { VOLUNTEER_ROLES } from "@/lib/validation/volunteer.schema";
import { SITE_MEDIA } from "@/data/media";

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredRole: VOLUNTEER_ROLES[0] as string,
    notes: "",
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
      const res = await fetch("/api/volunteer", {
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
            "Unable to submit application. Please check the fields or try again later."
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
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-4 py-1.5 rounded-full text-secondary-fixed font-label-md text-label-md mb-6 border border-surface-container-lowest/15">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed" />
            Get Involved
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Kindness Grows When We Show Up Together.
          </h1>
          <p className="font-body-xl text-body-lg md:text-body-xl text-on-primary/90 max-w-3xl leading-relaxed">
            From the founder&apos;s earliest days helping at a soup kitchen to neighbours looking out for each other during difficult times, volunteering is part of Esplanade Community Food Bank&apos;s story. If you&apos;d like to help, share your interest with us.
          </p>
        </div>
      </section>

      {/* Authentic Volunteer Photos Spotlight */}
      <section className="py-space-md bg-surface-container border-b border-surface-container-high/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md border-2 border-surface-container-lowest card-hover-lift">
              <Image
                src={SITE_MEDIA.volunteersAtDryGoodsTable.src}
                alt={SITE_MEDIA.volunteersAtDryGoodsTable.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: SITE_MEDIA.volunteersAtDryGoodsTable.objectPosition || "center 25%" }}
              />
              <div className="absolute bottom-3 left-3 right-3 bg-on-background/85 backdrop-blur-md text-on-primary text-xs p-3 rounded-2xl border border-surface-container-lowest/15 flex items-center justify-between">
                <span>Welcoming neighbours at our dry goods distribution table</span>
                <span className="text-secondary font-bold uppercase tracking-wider text-[11px] hidden sm:inline-block">In Community</span>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md border-2 border-surface-container-lowest card-hover-lift">
              <Image
                src={SITE_MEDIA.volunteerHallSetup.src}
                alt={SITE_MEDIA.volunteerHallSetup.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: SITE_MEDIA.volunteerHallSetup.objectPosition || "center 30%" }}
              />
              <div className="absolute bottom-3 left-3 right-3 bg-on-background/85 backdrop-blur-md text-on-primary text-xs p-3 rounded-2xl border border-surface-container-lowest/15 flex items-center justify-between">
                <span>Behind-the-scenes distribution preparation in the hall</span>
                <span className="text-secondary font-bold uppercase tracking-wider text-[11px] hidden sm:inline-block">Preparation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Every Contribution Matters Section */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-extrabold block mb-2">
              Community Involvement
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight mb-4">
              Every Contribution Matters.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Whether you have occasional time or hope to become more involved, reaching out is the first step. The team can share any current opportunities and expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between card-hover-lift">
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-3 block">
                  handshake
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Showing Up with Dignity
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
                  Rooted in treating every person with respect, kindness, and compassion in all aspects of community support.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary">
                Welcoming Community Care
              </span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between card-hover-lift">
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-3 block">
                  volunteer_activism
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Sharing Time &amp; Energy
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
                  Whether lending a hand with grocery parcels, welcoming neighbours, or assisting with community logistics.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary">
                Flexible Opportunities
              </span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between card-hover-lift">
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-3 block">
                  diversity_1
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Strengthening Neighbourhoods
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
                  Inspired by generations of neighbours helping neighbours, we believe caring for one another makes a lasting difference.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary">
                Neighbours Feeding Neighbours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section className="py-space-xl bg-surface-container" id="volunteer-form">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="bg-surface-container-lowest p-8 lg:p-12 rounded-3xl shadow-sm border border-surface-container">
            <div className="text-center mb-8">
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider block mb-2">
                Join the Team
              </span>
              <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-3">
                Express Your Interest in Volunteering
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Whether you have occasional time or hope to become more involved, reaching out is the first step. Our team will follow up to share any current opportunities and expectations.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-surface-container text-center border border-primary/20 animate-in fade-in">
                {responseMeta.previewMode ? (
                  <>
                    <div className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider mb-3">
                      <span className="material-symbols-outlined text-sm">science</span>
                      <span>Test-Only Preview Mode</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                      [TEST PREVIEW] Application Validated
                    </h3>
                    {responseMeta.referenceId && (
                      <div className="inline-block bg-primary-fixed/20 text-primary font-label-md text-xs px-3 py-1 rounded-full font-bold mb-3">
                        Test Application ID: {responseMeta.referenceId}
                      </div>
                    )}
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-4">
                      This application was processed in local development test mode. No live email notification was dispatched and no permanent database record was saved.
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
                      Volunteer Expression Received
                    </h3>
                    {responseMeta.referenceId && (
                      <div className="inline-block bg-primary-fixed/20 text-primary font-label-md text-xs px-3 py-1 rounded-full font-bold mb-3">
                        Application ID: {responseMeta.referenceId}
                      </div>
                    )}
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-4">
                      Thank you for stepping forward! Our team will review your expression of interest and follow up with current opportunities.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="volunteer_website_hp">Leave this field blank</label>
                  <input
                    id="volunteer_website_hp"
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
                      <span className="font-bold block">Application Error</span>
                      <span>{errorMsg}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="vol_fullName"
                      className="block font-label-md text-label-md text-primary font-bold mb-2"
                    >
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      id="vol_fullName"
                      name="fullName"
                      type="text"
                      required
                      disabled={loading}
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={fieldErrors.fullName ? "vol_fullName-error" : undefined}
                      placeholder="e.g. Samuel Green"
                      className={`w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        fieldErrors.fullName ? "border-error" : "border-surface-container"
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p id="vol_fullName-error" className="text-xs text-error mt-1.5 font-medium">
                        {fieldErrors.fullName[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="vol_email"
                      className="block font-label-md text-label-md text-primary font-bold mb-2"
                    >
                      Email Address <span className="text-error">*</span>
                    </label>
                    <input
                      id="vol_email"
                      name="email"
                      type="email"
                      required
                      disabled={loading}
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "vol_email-error" : undefined}
                      placeholder="samuel@example.com"
                      className={`w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        fieldErrors.email ? "border-error" : "border-surface-container"
                      }`}
                    />
                    {fieldErrors.email && (
                      <p id="vol_email-error" className="text-xs text-error mt-1.5 font-medium">
                        {fieldErrors.email[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="vol_phone"
                      className="block font-label-md text-label-md text-primary font-bold mb-2"
                    >
                      Phone Number <span className="text-xs text-on-surface-variant font-normal">(Optional)</span>
                    </label>
                    <input
                      id="vol_phone"
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
                        htmlFor="vol_preferredRole"
                        className="block font-label-md text-label-md text-primary font-bold"
                      >
                        Preferred Area of Interest <span className="text-error">*</span>
                      </label>
                    </div>
                    <select
                      id="vol_preferredRole"
                      name="preferredRole"
                      disabled={loading}
                      value={formData.preferredRole}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {VOLUNTEER_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="vol_notes"
                    className="block font-label-md text-label-md text-primary font-bold mb-2"
                  >
                    Availability &amp; Experience Notes <span className="text-xs text-on-surface-variant font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="vol_notes"
                    name="notes"
                    rows={3}
                    disabled={loading}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us what days and times work best for your schedule"
                    className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

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
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <span>Submit Volunteer Expression of Interest</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
