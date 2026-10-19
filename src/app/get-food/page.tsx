"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GET_FOOD_STEPS } from "@/data/content";
import TurnstileWidget from "@/components/ui/TurnstileWidget";
import { HOUSEHOLD_SIZES, DIETARY_PREFERENCES } from "@/lib/validation/get-food.schema";

export default function GetFoodPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    householdSize: HOUSEHOLD_SIZES[0] as string,
    dietaryPreferences: [] as string[],
    contactInfo: "",
    consentPrivacy: true,
    website_url_hp: "",
    turnstileToken: "",
  });

  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [responseMeta, setResponseMeta] = useState<{
    referenceId?: string;
    previewMode?: boolean;
    previewNotice?: string;
  }>({});

  const handleDietaryToggle = (pref: string) => {
    setFormData((prev) => {
      const exists = prev.dietaryPreferences.includes(pref);
      return {
        ...prev,
        dietaryPreferences: exists
          ? prev.dietaryPreferences.filter((p) => p !== pref)
          : [...prev.dietaryPreferences, pref],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/get-food", {
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
            "Unable to submit assistance inquiry. For urgent emergency food help, call 211 Toronto."
        );
        return;
      }

      setFormSubmitted(true);
      setResponseMeta({
        referenceId: data.referenceId,
        previewMode: data.previewMode,
        previewNotice: data.previewNotice,
      });
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMsg(
        "Network connection error. For immediate food assistance, please call 211 Toronto (free, 24/7 community dispatch)."
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
            Food Support
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Food Support, with Dignity.
          </h1>
          <p className="font-body-xl text-body-lg md:text-body-xl text-on-primary/90 max-w-3xl leading-relaxed">
            If you or your family are experiencing food insecurity, Esplanade Community Food Bank is committed to helping neighbours find compassionate support. Reach out to ask about current food assistance arrangements.
          </p>
        </div>
      </section>

      {/* Emergency Urgent Bar */}
      <section className="bg-error-container text-on-error-container py-5 border-y border-error/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl">emergency</span>
            <span className="font-label-lg text-label-lg font-bold">
              In urgent need of emergency food support right now?
            </span>
          </div>
          <div className="font-label-md text-label-md flex flex-wrap items-center gap-2">
            <span>Call 211 Toronto (free, 24/7 community dispatch) or submit an inquiry below</span>
            <a
              href="#assistance-inquiry"
              className="underline font-bold hover:text-primary transition-colors ml-1"
            >
              Get Assistance
            </a>
          </div>
        </div>
      </section>

      {/* Step by Step Breakdown */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-extrabold block mb-2">
              Taking the First Step
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight mb-3">
              How Food Assistance Inquiries Work
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              We understand that asking for help can be difficult. Your circumstances deserve care and respect. Please contact the team for information about availability, how to access support, and any registration requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {GET_FOOD_STEPS.map((step, index) => (
              <div
                key={step.number}
                className={`bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-surface-container flex flex-col card-hover-lift ${
                  index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={step.imageUrl}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: step.objectPosition || "center center" }}
                  />
                  <div className="absolute top-4 left-4 bg-primary text-on-primary w-10 h-10 rounded-full font-label-lg text-label-lg flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {step.description}
                    </p>
                    {step.buttonText && (
                      <div className="mt-5">
                        <a
                          href="#assistance-inquiry"
                          className="inline-flex items-center justify-center font-label-md text-label-md bg-primary text-on-primary font-bold px-6 py-2.5 rounded-full hover:bg-primary-container transition-all shadow-xs w-full sm:w-auto text-center btn-interactive"
                        >
                          {step.buttonText}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 pt-4 border-t border-surface-container flex items-center gap-2 text-secondary font-label-md text-label-md font-bold">
                    <span className="material-symbols-outlined text-base">
                      {step.icon}
                    </span>
                    <span>{step.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Assistance Inquiry Section */}
      <section className="py-space-xl bg-surface-container" id="assistance-inquiry">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-surface-container-lowest p-5 sm:p-8 lg:p-12 rounded-3xl shadow-sm border border-surface-container">
            <div className="text-center mb-8">
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider block mb-2">
                Food Assistance Inquiry
              </span>
              <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-3">
                Ask About Food Assistance
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                Share only the information needed for the team to respond. Do not submit emergency medical information through this form.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-surface-container text-center border border-primary/20 animate-in fade-in">
                {responseMeta.previewMode ? (
                  <>
                    <div className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider mb-3">
                      <span className="material-symbols-outlined text-sm">science</span>
                      <span>Test-Only Preview Mode</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                      [TEST PREVIEW] Intake Inquiry Validated
                    </h3>
                    {responseMeta.referenceId && (
                      <div className="inline-block bg-primary-fixed/20 text-primary font-label-md text-xs px-3 py-1 rounded-full font-bold mb-3">
                        Test Intake Reference: {responseMeta.referenceId}
                      </div>
                    )}
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mb-4">
                      This inquiry was processed in local development test mode. To safeguard confidentiality, no personal information has been recorded in live systems.
                    </p>
                    {responseMeta.previewNotice && (
                      <div className="bg-tertiary-fixed/20 border border-tertiary-fixed-dim/40 rounded-xl p-3 text-xs text-on-surface-variant max-w-lg mx-auto text-left">
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
                      Assistance Inquiry Received
                    </h3>
                    {responseMeta.referenceId && (
                      <div className="inline-block bg-primary-fixed/20 text-primary font-label-md text-xs px-3 py-1 rounded-full font-bold mb-3">
                        Intake Reference ID: {responseMeta.referenceId}
                      </div>
                    )}
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mb-4">
                      Thank you for reaching out. An intake coordinator will connect with you via your contact channel to arrange grocery support with care and dignity.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="food_website_hp">Leave this field blank</label>
                  <input
                    id="food_website_hp"
                    type="text"
                    name="website_url_hp"
                    value={formData.website_url_hp}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website_url_hp: e.target.value }))}
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
                      <span className="font-bold block">Inquiry Error</span>
                      <span>{errorMsg}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="gf_fullName"
                      className="block font-label-md text-label-md text-primary font-bold mb-2"
                    >
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      id="gf_fullName"
                      name="fullName"
                      type="text"
                      required
                      disabled={loading}
                      value={formData.fullName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({ ...prev, fullName: val }));
                        if (fieldErrors.fullName) {
                          setFieldErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.fullName;
                            return copy;
                          });
                        }
                      }}
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={fieldErrors.fullName ? "gf_fullName-error" : undefined}
                      placeholder="e.g. Maria Santos"
                      className={`w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        fieldErrors.fullName ? "border-error" : "border-surface-container"
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p id="gf_fullName-error" className="text-xs text-error mt-1.5 font-medium">
                        {fieldErrors.fullName[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="gf_householdSize"
                      className="block font-label-md text-label-md text-primary font-bold mb-2"
                    >
                      Household Size <span className="text-error">*</span>
                    </label>
                    <select
                      id="gf_householdSize"
                      name="householdSize"
                      disabled={loading}
                      value={formData.householdSize}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, householdSize: e.target.value }))
                      }
                      className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {HOUSEHOLD_SIZES.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="mb-2">
                    <label className="block font-label-md text-label-md text-primary font-bold">
                      Dietary Requirements &amp; Household Needs
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                    {DIETARY_PREFERENCES.map((pref) => {
                      const isChecked = formData.dietaryPreferences.includes(pref);
                      return (
                        <label
                          key={pref}
                          className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-semibold cursor-pointer transition-colors ${
                            isChecked
                              ? "bg-primary-container text-on-primary border-primary"
                              : "bg-surface-container-low border-surface-container text-on-surface"
                          }`}
                        >
                          <input
                            type="checkbox"
                            disabled={loading}
                            checked={isChecked}
                            onChange={() => handleDietaryToggle(pref)}
                            className="w-4 h-4 accent-primary rounded"
                          />
                          <span>{pref}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gf_contactInfo"
                    className="block font-label-md text-label-md text-primary font-bold mb-2"
                  >
                    Contact Phone or Email <span className="text-error">*</span>
                  </label>
                  <input
                    id="gf_contactInfo"
                    name="contactInfo"
                    type="text"
                    required
                    disabled={loading}
                    value={formData.contactInfo}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({ ...prev, contactInfo: val }));
                      if (fieldErrors.contactInfo) {
                        setFieldErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.contactInfo;
                          return copy;
                        });
                      }
                    }}
                    aria-invalid={Boolean(fieldErrors.contactInfo)}
                    aria-describedby={fieldErrors.contactInfo ? "gf_contactInfo-error" : undefined}
                    placeholder="Phone number or email address"
                    className={`w-full px-5 py-3.5 rounded-2xl bg-surface-container-low border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      fieldErrors.contactInfo ? "border-error" : "border-surface-container"
                    }`}
                  />
                  {fieldErrors.contactInfo && (
                    <p id="gf_contactInfo-error" className="text-xs text-error mt-1.5 font-medium">
                      {fieldErrors.contactInfo[0]}
                    </p>
                  )}
                  <span className="text-xs text-on-surface-variant/70 mt-1 block">
                    Intake appointments and grocery distribution arrangements will be confirmed directly with you.
                  </span>
                </div>

                {/* Privacy & Confidentiality Consent */}
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container text-xs text-on-surface-variant">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentPrivacy}
                      disabled={loading}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, consentPrivacy: e.target.checked }))
                      }
                      className="w-4 h-4 accent-primary rounded mt-0.5"
                    />
                    <span>
                      I understand that all household and dietary information is held in strict confidence by the Esplanade Community Food Bank intake team and used solely to arrange food assistance.
                    </span>
                  </label>
                </div>

                {/* Turnstile Security Check */}
                <TurnstileWidget
                  onVerify={(token) => setFormData((prev) => ({ ...prev, turnstileToken: token }))}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-on-primary font-label-lg text-sm sm:text-label-lg py-3.5 sm:py-4 px-4 rounded-full font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer text-center btn-interactive disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Submit Food Assistance Inquiry</span>
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
