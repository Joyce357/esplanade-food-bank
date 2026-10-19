import React from "react";
import Link from "next/link";
import { UPCOMING_EVENTS } from "@/data/content";

export default function UpcomingEvents() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider block mb-2">
              Stay Connected
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight mb-2">
              Community News &amp; Updates.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Stay connected with Esplanade Community Food Bank for information about upcoming activities and ways to get involved.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary font-bold hover:text-secondary transition-colors group btn-interactive shrink-0"
          >
            <span>Reach Out to the Team</span>
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Schedule Cards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event, index) => (
            <div
              key={event.id}
              className={`bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between border border-surface-container card-hover-lift ${
                index === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
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
              <div className="pt-4 border-t border-surface-container flex flex-wrap items-center justify-between gap-2 font-label-md text-xs sm:text-label-md text-on-surface-variant">
                <span className="font-semibold text-primary">{event.time}</span>
                <span className="text-secondary font-medium">{event.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
