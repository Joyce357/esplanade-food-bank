import React from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/content";

export default function CommunityGallery() {
  return (
    <section className="w-full py-space-xl bg-surface-container">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-extrabold block mb-2">
            Moments of Connection
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight mb-3">
            Our Community, In Action.
          </h2>
          <p className="font-body-xl text-body-xl text-on-surface-variant leading-relaxed">
            A place for authentic photographs of the people and moments that bring this work to life.
          </p>
        </div>

        {/* Curated Photo Feed Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group border border-surface-container-high/60 card-hover-lift cursor-pointer"
            >
              <Image
                src={item.imageUrl}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                <span className="font-label-md text-xs sm:text-label-md text-on-primary font-bold">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
