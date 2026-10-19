"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { HERO_SLIDES, HeroAction } from "@/data/slides";

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect user preference for reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-advance every 8 seconds unless hovered, focused, or reduced-motion enabled
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, nextSlide]);

  const activeSlide = HERO_SLIDES[currentSlide];

  const renderActionBtn = (action: HeroAction, index: number) => {
    if (action.variant === "primary") {
      return (
        <Link
          key={index}
          href={action.href}
          className="btn-interactive w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary-fixed text-on-primary-fixed font-label-lg text-label-lg px-8 py-4 rounded-full font-bold shadow-lg group text-center"
        >
          <span>{action.label}</span>
          {action.icon && (
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
              {action.icon}
            </span>
          )}
        </Link>
      );
    }

    if (action.variant === "tertiary") {
      return (
        <Link
          key={index}
          href={action.href}
          className="btn-interactive w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg px-7 py-4 rounded-full font-bold shadow-md text-center"
        >
          {action.icon && (
            <span className="material-symbols-outlined text-[20px]">
              {action.icon}
            </span>
          )}
          <span>{action.label}</span>
        </Link>
      );
    }

    // Outline variant
    return (
      <Link
        key={index}
        href={action.href}
        className="btn-interactive w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-container-lowest/15 backdrop-blur-md text-on-primary font-label-lg text-label-lg px-7 py-4 rounded-full font-bold border border-surface-container-lowest/20 text-center"
      >
        {action.icon && (
          <span className="material-symbols-outlined text-[20px]">
            {action.icon}
          </span>
        )}
        <span>{action.label}</span>
      </Link>
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-primary -mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Community Hero Slideshow"
    >
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[700px] lg:min-h-[760px] flex items-end">
        {/* Slides Background Layers */}
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                isActive ? "opacity-100 z-0" : "opacity-0 pointer-events-none -z-10"
              }`}
              aria-hidden={!isActive}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.imageUrl}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: slide.objectPosition || "center center" }}
                />
                {/* Dual duotone ambient overlay for clear text contrast and Warm Canopy aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/95 via-primary/75 to-primary/45 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/40 to-primary/60" />
              </div>
            </div>
          );
        })}

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-12 lg:pb-16">
          {/* Top Status Pill & Slide Counter */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-full text-primary-fixed font-label-md text-xs sm:text-label-md border border-surface-container-lowest/15 max-w-full">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse shrink-0" />
              <span className="truncate">{activeSlide.eyebrow}</span>
            </span>
            <span
              className="text-on-primary/80 font-label-md text-xs sm:text-label-md tracking-widest uppercase"
              aria-live="polite"
            >
              Slide{" "}
              <span className="text-tertiary-fixed font-bold">
                0{currentSlide + 1}
              </span>{" "}
              / 0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Typography & Headline */}
          <div className="max-w-4xl">
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-primary tracking-tight font-extrabold mb-4 leading-tight">
              {activeSlide.headline}
            </h1>
            <p className="font-body-xl text-body-lg md:text-body-xl text-on-primary/90 max-w-2xl mb-6 sm:mb-8 leading-relaxed">
              {activeSlide.supportingLine}
            </p>

            {/* Slide Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              {activeSlide.actions.map(renderActionBtn)}
            </div>
          </div>

          {/* Interactive Slide Thumbnails & Arrow Controls */}
          <div className="pt-5 sm:pt-6 border-t border-surface-container-lowest/15 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto" role="tablist">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCurrentSlide(index)}
                    className={`card-hover-lift text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl backdrop-blur-md border cursor-pointer ${
                      isActive
                        ? "bg-surface-container-lowest/25 border-primary-fixed/60 shadow-md"
                        : "bg-surface-container-lowest/10 border-transparent hover:bg-surface-container-lowest/20"
                    }`}
                  >
                    <span
                      className={`block font-label-md text-xs sm:text-label-md font-bold ${
                        isActive ? "text-primary-fixed" : "text-on-primary/90"
                      }`}
                    >
                      {slide.tabTitle}
                    </span>
                    <span className="text-on-primary/70 text-[11px] sm:text-xs">
                      {slide.tabSubtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Arrow Controls */}
            <div className="flex items-center justify-start sm:justify-end gap-3 w-full md:w-auto">
              <button
                type="button"
                aria-label="Previous Slide"
                onClick={prevSlide}
                className="btn-interactive w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-on-primary flex items-center justify-center border border-surface-container-lowest/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl">arrow_back</span>
              </button>
              <button
                type="button"
                aria-label="Next Slide"
                onClick={nextSlide}
                className="btn-interactive w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-on-primary flex items-center justify-center border border-surface-container-lowest/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
