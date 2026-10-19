import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PROGRAMS, UPCOMING_EVENTS } from "@/data/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Our purpose is to help relieve food insecurity while strengthening the connections that make a neighbourhood feel like home.",
};

export default function ProgramsPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Header */}
      <section className="bg-primary text-on-primary py-16 lg:py-24 relative overflow-hidden -mt-20 pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-4 py-1.5 rounded-full text-primary-fixed font-label-md text-label-md mb-6 border border-surface-container-lowest/15">
            <span className="w-2 h-2 rounded-full bg-primary-fixed" />
            Our Work
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Nourishment, Compassion, and Community.
          </h1>
          <p className="font-body-xl text-body-lg md:text-body-xl text-on-primary/90 max-w-3xl leading-relaxed">
            Our purpose is to help relieve food insecurity while strengthening the connections that make a neighbourhood feel like home.
          </p>
        </div>
      </section>

      {/* Areas of Focus Cards */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-extrabold block mb-2">
              Key Priorities
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight">
              Our Areas of Focus
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Grounded in the founder&apos;s lived experiences and our ongoing commitment to neighbours across The Esplanade.
            </p>
          </div>

          <div className="space-y-12">
            {PROGRAMS.map((program, index) => (
              <div
                key={program.id}
                id={program.id}
                className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-surface-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 lg:p-8 card-hover-lift"
              >
                <div
                  className={`lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden border border-surface-container ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={program.imageUrl}
                    alt={program.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: program.objectPosition || "center center" }}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`${program.badgeBg} ${program.badgeText} font-label-md text-label-md px-3.5 py-1 rounded-full font-bold shadow-md`}
                    >
                      {program.category}
                    </span>
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-3">
                    {program.title}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container mb-6">
                    <div className="flex items-center gap-3 text-primary font-label-md text-label-md font-bold mb-1">
                      <span className="material-symbols-outlined text-secondary">
                        {program.icon}
                      </span>
                      <span>Commitment</span>
                    </div>
                    <p className="text-on-surface-variant text-sm pl-8">
                      {program.schedule}
                    </p>
                  </div>

                  <div>
                    <Link
                      href="/get-food"
                      className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-full font-bold hover:bg-primary-container transition-colors btn-interactive"
                    >
                      <span>Get Food Support</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community News & Updates */}
      <section className="py-space-xl bg-surface-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-extrabold block mb-2">
              Stay Connected
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight">
              Community News &amp; Updates.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Stay connected with Esplanade Community Food Bank for information about upcoming activities and ways to get involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between card-hover-lift"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`${event.badgeBg} ${event.badgeText} font-label-md text-label-md px-3.5 py-1 rounded-full font-bold`}
                    >
                      {event.badge}
                    </span>
                    <span className="material-symbols-outlined text-secondary">
                      {event.icon}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                    {event.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-surface-container flex flex-col gap-1 text-xs text-on-surface-variant">
                  <span className="font-semibold text-primary">{event.time}</span>
                  <span className="text-secondary font-medium">{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
