import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import GalleryExperience from "@/components/gallery/GalleryExperience";

export const metadata: Metadata = {
  title: "Community Gallery",
  description:
    "Authentic photographs of neighbours, volunteers, and community care at Esplanade Community Food Bank.",
};

export default function GalleryPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <section className="bg-primary text-on-primary py-16 lg:py-24 relative overflow-hidden -mt-20 pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-4 py-1.5 rounded-full text-primary-fixed font-label-md text-label-md mb-6 border border-surface-container-lowest/15">
            <span className="w-2 h-2 rounded-full bg-primary-fixed" />
            Community Photography
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Our Community, In Action.
          </h1>
          <p className="font-headline-sm text-lg sm:text-xl text-tertiary-fixed font-bold mb-4">
            Fighting Food Insecurity, Together.
          </p>
          <p className="font-body-xl text-body-lg md:text-body-xl text-on-primary/90 max-w-3xl leading-relaxed">
            Real moments of neighbours, volunteers, fresh produce, and everyday pantry essentials shared with warmth and dignity at Esplanade Community Food Bank.
          </p>
        </div>
      </section>

      {/* Interactive Masonry / Bento Gallery & Lightbox */}
      <GalleryExperience />

      {/* Community Involvement Strip */}
      <section className="py-space-lg bg-surface-container border-t border-surface-container-high/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-2">
              Be Part of Our Neighbourhood Circle
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Every photograph reflects neighbours showing up for one another. Reach out to volunteer, support our work, or ask about food assistance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md text-label-md px-6 py-3.5 rounded-full font-bold shadow-sm hover:bg-primary-container transition-colors btn-interactive"
            >
              <span>Volunteer With Us</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md px-6 py-3.5 rounded-full font-bold shadow-sm hover:bg-tertiary-fixed-dim transition-colors btn-interactive"
            >
              <span>Support Our Work</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
