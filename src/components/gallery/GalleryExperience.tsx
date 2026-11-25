"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  FULL_GALLERY_PHOTOS,
  GalleryFilterGroup,
  GalleryLayoutVariant,
} from "@/data/media";

const FILTER_OPTIONS: { id: GalleryFilterGroup; label: string }[] = [
  { id: "all", label: "All Moments" },
  { id: "community", label: "Community" },
  { id: "volunteers", label: "Volunteers" },
  { id: "provisions", label: "Pantry & Produce" },
];

function getTileClasses(layout: GalleryLayoutVariant): string {
  switch (layout) {
    case "featured":
      return "sm:col-span-2 lg:col-span-6 lg:row-span-2";
    case "wide":
      return "sm:col-span-2 lg:col-span-6 lg:row-span-1";
    case "tall":
      return "sm:col-span-1 lg:col-span-3 lg:row-span-2";
    default:
      return "sm:col-span-1 lg:col-span-3 lg:row-span-1";
  }
}

function getTileSizes(layout: GalleryLayoutVariant): string {
  switch (layout) {
    case "featured":
    case "wide":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw";
    default:
      return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";
  }
}

export default function GalleryExperience() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterGroup>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const visiblePhotos =
    activeFilter === "all"
      ? FULL_GALLERY_PHOTOS
      : FULL_GALLERY_PHOTOS.filter((item) => item.filterGroup === activeFilter);

  const isLightboxOpen = lightboxIndex !== null && visiblePhotos[lightboxIndex] !== undefined;
  const activePhoto = isLightboxOpen ? visiblePhotos[lightboxIndex] : null;

  const openLightbox = (index: number, buttonEl: HTMLButtonElement) => {
    triggerRef.current = buttonEl;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % visiblePhotos.length
    );
  }, [visiblePhotos.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
    );
  }, [visiblePhotos.length]);

  // Move focus into dialog on open & lock body scroll
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen]);

  // Keyboard navigation & focus trap inside lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox, showNext, showPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartXRef.current;
    const deltaY = endY - touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Trigger swipe only when horizontal movement is deliberate and dominant
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        showNext();
      } else {
        showPrev();
      }
    }
  };

  const getCountForFilter = (filterId: GalleryFilterGroup) =>
    filterId === "all"
      ? FULL_GALLERY_PHOTOS.length
      : FULL_GALLERY_PHOTOS.filter((p) => p.filterGroup === filterId).length;

  return (
    <section className="py-space-xl bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter gallery photographs"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeFilter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setActiveFilter(option.id);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 rounded-full font-label-md text-xs sm:text-label-md font-bold transition-all cursor-pointer btn-interactive flex items-center gap-2 ${
                    isSelected
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-lowest text-on-surface-variant border border-surface-container hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <span>{option.label}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-surface-container-lowest/20 text-primary-fixed"
                        : "bg-surface-container text-secondary"
                    }`}
                  >
                    {getCountForFilter(option.id)}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
            Select any photograph to view full size
          </p>
        </div>

        {/* Editorial Bento Photography Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-[240px] sm:auto-rows-[260px] lg:auto-rows-[220px] grid-flow-dense">
          {visiblePhotos.map((item, index) => (
            <button
              key={item.asset.id}
              type="button"
              onClick={(e) => openLightbox(index, e.currentTarget)}
              aria-label={`View photograph: ${item.asset.title}`}
              className={`${getTileClasses(
                item.layout
              )} group relative rounded-3xl overflow-hidden bg-surface-container border border-surface-container-high/80 shadow-sm card-hover-lift text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low`}
            >
              <Image
                src={item.asset.src}
                alt={item.asset.alt}
                fill
                sizes={getTileSizes(item.layout)}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                style={{
                  objectPosition: item.asset.objectPosition || "center center",
                }}
              />

              {/* Subtle Editorial Hover Gradient & Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-on-background/15 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex justify-end">
                  <span className="w-9 h-9 rounded-full bg-surface-container-lowest/20 backdrop-blur-md border border-surface-container-lowest/25 text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">
                      zoom_in
                    </span>
                  </span>
                </div>
                <div>
                  <span className="font-headline-sm text-sm sm:text-base font-bold text-on-primary block leading-snug">
                    {item.asset.title}
                  </span>
                  {item.asset.caption && (
                    <span className="text-xs text-on-primary/85 line-clamp-2 mt-0.5 block">
                      {item.asset.caption}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Full-Size Lightbox Dialog */}
      {isLightboxOpen && activePhoto && lightboxIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo lightbox: ${activePhoto.asset.title}`}
          className="fixed inset-0 z-50 bg-on-background/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 lg:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 text-on-primary max-w-6xl w-full mx-auto">
            <div className="inline-flex items-center gap-2 bg-surface-container-lowest/10 border border-surface-container-lowest/15 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              <span className="text-tertiary-fixed font-bold">
                {String(lightboxIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-on-primary/60">/</span>
              <span>{String(visiblePhotos.length).padStart(2, "0")}</span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close photo lightbox"
              className="w-11 h-11 rounded-full bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 border border-surface-container-lowest/20 text-on-primary flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Center Image Stage with Prev / Next */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto min-h-0"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeLightbox();
              }
            }}
          >
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photograph"
              className="hidden sm:flex absolute left-0 z-10 w-12 h-12 rounded-full bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 border border-surface-container-lowest/20 text-on-primary items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
            >
              <span className="material-symbols-outlined text-2xl">
                arrow_back
              </span>
            </button>

            <div className="relative w-full h-full sm:mx-16 max-h-[72vh] rounded-2xl overflow-hidden">
              <Image
                key={activePhoto.asset.id}
                src={activePhoto.asset.src}
                alt={activePhoto.asset.alt}
                fill
                priority
                sizes="(max-width: 768px) 96vw, 85vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photograph"
              className="hidden sm:flex absolute right-0 z-10 w-12 h-12 rounded-full bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 border border-surface-container-lowest/20 text-on-primary items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
            >
              <span className="material-symbols-outlined text-2xl">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Bottom Caption & Mobile Controls */}
          <div className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest/10 border border-surface-container-lowest/15 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-on-primary">
            <div className="min-w-0">
              <h2 className="font-headline-sm text-sm sm:text-base font-bold text-primary-fixed">
                {activePhoto.asset.title}
              </h2>
              <p className="text-xs sm:text-sm text-on-primary/85 mt-0.5 leading-relaxed">
                {activePhoto.asset.caption || activePhoto.asset.alt}
              </p>
            </div>

            <div className="flex sm:hidden items-center justify-between gap-3 pt-2 border-t border-surface-container-lowest/15">
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photograph"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-surface-container-lowest/15 text-on-primary text-xs font-bold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
              >
                <span className="material-symbols-outlined text-base">
                  arrow_back
                </span>
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photograph"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-surface-container-lowest/15 text-on-primary text-xs font-bold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
              >
                <span>Next</span>
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
