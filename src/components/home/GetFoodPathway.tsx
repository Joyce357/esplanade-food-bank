import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GET_FOOD_STEPS } from "@/data/content";

export default function GetFoodPathway() {
  return (
    <section className="w-full pt-space-xl pb-12 sm:pb-space-xl bg-surface-container relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header: Food Access Teaser & Who We Care About */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider block mb-2">
            Seeking Food Support?
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight mb-3">
            Asking for Help Should Start with Respect.
          </h2>
          <p className="font-body-xl text-body-xl text-on-surface-variant leading-relaxed">
            If food costs are making life difficult, connect with Esplanade Community Food Bank to learn about current food support and any registration arrangements.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {GET_FOOD_STEPS.map((step) => (
            <div
              key={step.number}
              className={`${
                step.number === "03" ? "md:col-span-2 lg:col-span-1" : ""
              } card-hover-lift bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm flex flex-col border border-surface-container-high/60`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={step.imageUrl}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  style={{ objectPosition: step.objectPosition || "center center" }}
                />
                <div className="absolute top-4 left-4 bg-primary text-on-primary w-10 h-10 rounded-full font-label-lg text-label-lg flex items-center justify-center font-bold shadow-md">
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
                      <Link
                        href={step.buttonHref || "/get-food"}
                        className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md bg-primary text-on-primary font-bold px-6 py-2.5 rounded-full btn-interactive shadow-xs text-center"
                      >
                        {step.buttonText}
                      </Link>
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

        {/* Who We Care About & Visitor Pathways Callout */}
        <div className="card-hover-lift bg-surface-container-lowest rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-surface-container-high/60">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl sm:text-3xl text-primary-fixed">diversity_1</span>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-secondary font-label-md text-xs sm:text-label-md font-bold uppercase tracking-wider mb-1">
                Everyone Matters
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Here for Neighbours Facing Food Insecurity
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
                We welcome people experiencing food insecurity, with particular concern for seniors, single-parent families, people experiencing homelessness, and those living with mental health challenges. Every person deserves compassion and respect.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <Link
              href="/get-food"
              className="btn-interactive inline-flex items-center justify-center bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-full font-bold shadow-sm text-center"
            >
              Get Food Information
            </Link>
            <Link
              href="/contact"
              className="btn-interactive inline-flex items-center justify-center bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md px-6 py-3 rounded-full font-bold border border-surface-container text-center"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
