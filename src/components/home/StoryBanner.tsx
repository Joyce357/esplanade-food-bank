import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_MEDIA } from "@/data/media";

export default function StoryBanner() {
  return (
    <section className="w-full bg-primary text-on-primary py-space-xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Giant Atmospheric Candid Inset */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl group border border-surface-container-lowest/15">
            <div className="aspect-[4/3] sm:aspect-[16/10] min-h-[260px] sm:min-h-0 w-full relative">
              <Image
                src={SITE_MEDIA.communityRoomSuperfoods.src}
                alt={SITE_MEDIA.communityRoomSuperfoods.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center center" }}
              />
            </div>

            {/* Inset Quote Block */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 rounded-2xl bg-on-background/90 backdrop-blur-md text-on-primary border border-surface-container-lowest/15 shadow-lg">
              <span className="material-symbols-outlined text-tertiary-fixed text-2xl sm:text-3xl mb-1 block">
                format_quote
              </span>
              <p className="font-headline-sm text-sm sm:text-headline-sm italic font-medium leading-snug text-primary-fixed">
                &ldquo;She didn’t just give him water. She gave him dignity.&rdquo;
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <span className="font-label-md text-xs sm:text-label-md text-on-primary/80">
                  — From the Founder&apos;s Story
                </span>
                <span className="text-[10px] sm:text-[11px] text-tertiary-fixed/90 bg-surface-container-lowest/10 px-2.5 py-0.5 rounded-full font-semibold">
                  Neighbours Feeding Neighbours
                </span>
              </div>
            </div>
          </div>

          {/* Short Impact Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-tertiary-fixed font-label-md text-label-md uppercase tracking-wider font-extrabold">
                Our Story
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-primary font-bold mb-6 leading-tight">
              It Began with One Simple Lesson in Kindness.
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary/90 mb-8 leading-relaxed">
              Long before the food bank took shape, the founder learned about compassion from her mother, who welcomed people to a church soup kitchen and made dignity part of every act of giving. Those lessons grew into years of neighbour-to-neighbour support.
            </p>
            <div>
              <Link
                href="/our-story"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary-container text-on-primary font-label-lg text-label-lg px-8 py-4 rounded-full font-bold shadow-md hover:bg-surface-tint transition-all group border border-surface-container-lowest/20 text-center btn-interactive"
              >
                <span>Read Our Story</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1.5">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
