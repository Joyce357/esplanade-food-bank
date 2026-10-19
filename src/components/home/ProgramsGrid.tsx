import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PROGRAMS } from "@/data/content";

export default function ProgramsGrid() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider block mb-2">
              Our Work
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight mb-2">
              Nourishment, Compassion, and Community.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Our purpose is to help relieve food insecurity while strengthening the connections that make a neighbourhood feel like home.
            </p>
          </div>
          <Link
            href="/programs-and-events"
            className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary font-bold hover:text-secondary transition-colors group btn-interactive shrink-0"
          >
            <span>Learn About Our Work</span>
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Asymmetric Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {PROGRAMS.map((program) => (
            <div
              key={program.id}
              className={`${
                program.columns === 7 ? "lg:col-span-7" : "lg:col-span-5"
              } bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm group card-hover-lift relative flex flex-col justify-end min-h-[340px] sm:min-h-[380px] border border-surface-container`}
            >
              <div className="absolute inset-0">
                <Image
                  src={program.imageUrl}
                  alt={program.alt}
                  fill
                  sizes={
                    program.columns === 7
                      ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 58vw"
                      : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: program.objectPosition || "center center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/95 via-on-background/50 to-transparent" />
              </div>
              <div className="relative p-6 sm:p-8 z-10 text-on-primary">
                <span
                  className={`inline-block ${program.badgeBg} ${program.badgeText} font-label-md text-label-md px-3.5 py-1 rounded-full font-bold mb-3`}
                >
                  {program.category}
                </span>
                <h3 className="font-headline-lg text-headline-lg font-bold mb-2">
                  {program.title}
                </h3>
                <p className="font-body-md text-body-md text-on-primary/90 max-w-xl mb-4 leading-relaxed">
                  {program.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 font-label-md text-label-md text-tertiary-fixed font-bold">
                  <span>{program.schedule}</span>
                  <span className="material-symbols-outlined text-sm">{program.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
