import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_MEDIA } from "@/data/media";

export default function VolunteerSpotlight() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Mosaic Left */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-md relative border-2 border-surface-container-lowest">
              <Image
                src={SITE_MEDIA.volunteersAtDryGoodsTable.src}
                alt={SITE_MEDIA.volunteersAtDryGoodsTable.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover"
                style={{ objectPosition: SITE_MEDIA.volunteersAtDryGoodsTable.objectPosition || "center 25%" }}
              />
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-square shadow-md relative border-2 border-surface-container-lowest">
                <Image
                  src={SITE_MEDIA.volunteerHallSetup.src}
                  alt={SITE_MEDIA.volunteerHallSetup.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  style={{ objectPosition: SITE_MEDIA.volunteerHallSetup.objectPosition || "center 30%" }}
                />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-square shadow-md relative border-2 border-surface-container-lowest">
                <Image
                  src={SITE_MEDIA.snackPacksAndCrackers.src}
                  alt={SITE_MEDIA.snackPacksAndCrackers.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  style={{ objectPosition: "center center" }}
                />
              </div>
            </div>
          </div>

          {/* Action Card Right */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-extrabold mb-2">
              Get Involved
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight mb-4 leading-tight">
              There Is Room for Kindness Here.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
              The Esplanade story was built through people showing up for one another. If you would like to give your time, we&apos;d love to hear from you.
            </p>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm mb-8 space-y-4 border border-surface-container">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">
                  volunteer_activism
                </span>
                <div>
                  <span className="font-label-md text-label-md text-primary font-bold block">
                    Every Contribution Matters
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
                    Whether you have occasional time or hope to become more involved, reaching out is the first step.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">
                  handshake
                </span>
                <div>
                  <span className="font-label-md text-label-md text-primary font-bold block">
                    Community-Rooted Care
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
                    Our team can share any current opportunities, expectations, and ways to get involved.
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-3 bg-primary text-on-primary font-label-lg text-label-lg px-8 py-4 rounded-full font-bold shadow-md hover:bg-primary-container transition-all group active:scale-95 btn-interactive"
              >
                <span>Volunteer With Us</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
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
