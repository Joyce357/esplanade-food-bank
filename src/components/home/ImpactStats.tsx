import React from "react";
import { IMPACT_STATS, IMPACT_ATTRIBUTION } from "@/data/content";
import CountUp from "@/components/ui/CountUp";

export default function ImpactStats() {
  return (
    <section className="w-full bg-primary text-on-primary py-space-xl relative overflow-hidden">
      {/* Subtle Ambient Graphic SVG Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
        <svg
          className="w-full h-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1000 400"
          aria-hidden="true"
        >
          <path
            d="M0,200 C200,100 400,300 600,150 C800,0 900,200 1000,100 L1000,400 L0,400 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="text-tertiary-fixed font-label-md text-label-md uppercase tracking-wider font-extrabold block">
              The Need Across Toronto
            </span>
            <span className="text-[11px] text-primary-fixed bg-surface-container-lowest/15 px-3 py-0.5 rounded-full font-semibold">
              External Research Data
            </span>
          </div>
          <h2 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl font-extrabold text-on-primary mb-3">
            The Need Is Growing. So Must Our Compassion.
          </h2>
          <p className="text-on-primary/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Rising food bank use shows how many of our neighbours are struggling to cover essentials. These Toronto-wide figures help explain why compassionate, community-based support matters.
          </p>
        </div>

        {/* 3 Bold Stat Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 max-w-5xl mx-auto">
          {IMPACT_STATS.map((stat, i) => (
            <div
              key={i}
              className="card-hover-lift bg-surface-container-lowest/10 backdrop-blur-md p-6 lg:p-8 rounded-3xl text-center flex flex-col items-center border border-surface-container-lowest/15 cursor-default"
            >
              <span className={`material-symbols-outlined text-3xl sm:text-4xl mb-3 ${stat.colorClass}`}>
                {stat.icon}
              </span>
              <span
                className={`text-3xl sm:text-4xl lg:text-display-hero font-extrabold block mb-2 tracking-tight ${stat.colorClass}`}
              >
                {stat.isFraction ? (
                  <span>{stat.value}</span>
                ) : (
                  <CountUp value={stat.value} duration={2000} />
                )}
              </span>
              <p className="font-body-md text-xs sm:text-body-md text-on-primary/90 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Prominent Attribution Notice with External Link */}
        <div className="bg-primary-container p-5 rounded-2xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border border-surface-container-lowest/15 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary-fixed text-2xl shrink-0">
              menu_book
            </span>
            <p className="font-label-md text-xs sm:text-label-md text-on-primary leading-relaxed">
              {IMPACT_ATTRIBUTION.sourceText}
            </p>
          </div>
          <a
            href={IMPACT_ATTRIBUTION.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-tertiary-fixed font-bold hover:underline shrink-0"
          >
            <span>Read Report</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
