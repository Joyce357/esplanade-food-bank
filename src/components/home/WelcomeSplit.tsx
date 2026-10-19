import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_MEDIA } from "@/data/media";

export default function WelcomeSplit() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-widest font-extrabold mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              Why We Are Here
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight mb-6 leading-tight">
              Food Is a Bridge to Connection.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
              Esplanade Community Food Bank works to relieve the effects of poverty and food insecurity by sharing nutritious food, healthy snacks, and compassionate support with individuals and families in need. Our work is grounded in respect, inclusion, and the belief that everyone deserves to feel seen.
            </p>

            {/* Dignity & Belonging Card */}
            <div className="bg-surface-container p-6 rounded-2xl mb-8 border border-surface-container-highest/60 shadow-sm card-hover-lift">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl shrink-0 mt-0.5">
                  handshake
                </span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
                    Dignity &amp; Belonging
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Every person has a name, a story, and a right to be treated with respect. Kindness is measured by how we make people feel.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary font-bold hover:text-secondary transition-colors group btn-interactive"
              >
                <span>Learn About Us</span>
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  north_east
                </span>
              </Link>
            </div>
          </div>

          {/* Right Overlapping Photo Collage */}
          <div className="lg:col-span-7 relative pb-4 sm:pb-6">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
              {/* Base Main Image */}
              <div className="w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-xl relative border-4 border-surface-container-lowest">
                <Image
                  src={SITE_MEDIA.communityHallGathering.src}
                  alt={SITE_MEDIA.communityHallGathering.alt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 45vw"
                  className="object-cover"
                  style={{ objectPosition: SITE_MEDIA.communityHallGathering.objectPosition || "center 35%" }}
                />
              </div>

              {/* Overlapping Offset Secondary Image */}
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl -ml-8 border-4 border-surface-container-lowest">
                <Image
                  src={SITE_MEDIA.breakfastCerealsAndSnacks.src}
                  alt={SITE_MEDIA.breakfastCerealsAndSnacks.alt}
                  fill
                  sizes="(max-width: 1024px) 60vw, 35vw"
                  className="object-cover"
                  style={{ objectPosition: "center center" }}
                />
              </div>

              {/* Rotated Badge Pill */}
              <div className="absolute top-3 right-3 sm:top-6 sm:right-8 bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-xs sm:text-label-md font-bold px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-lg transform rotate-2 sm:rotate-3 flex items-center gap-1.5 sm:gap-2 border border-tertiary-fixed-dim/40 z-10 max-w-[85%] sm:max-w-none">
                <span className="material-symbols-outlined text-sm sm:text-base shrink-0">check_circle</span>
                <span className="truncate sm:overflow-visible">Neighbours Feeding Neighbours</span>
              </div>

              {/* Nutritious Food & Care Callout Tile */}
              <div className="absolute -bottom-2 sm:-bottom-4 left-3 sm:left-6 bg-surface-container-lowest text-on-surface p-3 sm:p-4 rounded-2xl shadow-md flex items-center gap-2.5 sm:gap-3 max-w-[260px] sm:max-w-xs z-10 border border-surface-container card-hover-lift">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base sm:text-[20px]">eco</span>
                </div>
                <div>
                  <p className="font-label-md text-xs sm:text-label-md font-semibold text-primary leading-snug">
                    Nutritious food, healthy snacks, and caring support.
                  </p>
                  <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">
                    Grounded in respect &amp; inclusion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
