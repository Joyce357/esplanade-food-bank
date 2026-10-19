import React from "react";
import Image from "next/image";
import DonateSection from "@/components/home/DonateSection";
import { SITE_MEDIA } from "@/data/media";

export default function DonatePage() {
  return (
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <section className="bg-primary text-on-primary py-16 lg:py-24 relative overflow-hidden -mt-20 pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-4 py-1.5 rounded-full text-tertiary-fixed font-label-md text-label-md mb-6 border border-surface-container-lowest/15">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed" />
            Community Giving
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Your Kindness Helps Our Neighbours.
          </h1>
          <p className="font-body-xl text-body-lg md:text-body-xl text-on-primary/90 max-w-3xl leading-relaxed">
            Esplanade Community Food Bank is rooted in the belief that everyone can make a difference. Whether you hope to share food, contribute financially, or support a community initiative, your generosity reflects the spirit of neighbours feeding neighbours.
          </p>
        </div>
      </section>

      {/* Visual Food Stock & Provisions Showcase */}
      <section className="py-space-lg bg-surface-container-low border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-extrabold block mb-2">
              Provisions in Action
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
              Wholesome Food That Keeps Neighbours Nourished
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              From essential non-perishable proteins to breakfast cereals and culturally familiar grains, community contributions help stock these everyday essentials for neighbourhood households.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl overflow-hidden bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col card-hover-lift">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={SITE_MEDIA.cannedPeasAndBeans.src}
                  alt={SITE_MEDIA.cannedPeasAndBeans.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-primary mb-1">
                    Canned Vegetables &amp; Proteins
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Navy beans, garden peas, and nutritious non-perishables that provide healthy proteins for household pantries.
                  </p>
                </div>
                <span className="text-xs font-semibold text-secondary mt-3 block">
                  Essential Daily Staples
                </span>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col card-hover-lift">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={SITE_MEDIA.stapleNoodlesRicePasta.src}
                  alt={SITE_MEDIA.stapleNoodlesRicePasta.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-primary mb-1">
                    Grains, Rice &amp; Pasta
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    White rice, Italian pasta, and noodles representing familiar cultural staples for our diverse neighbourhood.
                  </p>
                </div>
                <span className="text-xs font-semibold text-secondary mt-3 block">
                  Culturally Familiar Foods
                </span>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col card-hover-lift">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={SITE_MEDIA.breakfastCerealsAndSnacks.src}
                  alt={SITE_MEDIA.breakfastCerealsAndSnacks.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-primary mb-1">
                    Breakfast &amp; Wholesome Snacks
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Whole grain breakfast cereals, oats, and healthy snack items that support school children and fixed-income seniors.
                  </p>
                </div>
                <span className="text-xs font-semibold text-secondary mt-3 block">
                  Morning Nutrition &amp; Care
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Community Giving Section */}
      <DonateSection />

      {/* Transparency & Community Giving Guidelines Notice */}
      <section className="py-space-lg bg-surface-container-low border-t border-surface-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-on-surface-variant">
            <div className="card-hover-lift p-6 rounded-2xl bg-surface-container-lowest border border-surface-container">
              <span className="material-symbols-outlined text-primary text-3xl mb-2 block">
                handshake
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                Dignity in Giving
              </h3>
              <p className="font-body-md text-body-md text-sm leading-relaxed">
                Giving is about more than what we share. It is about how we make people feel. Every contribution helps foster a neighbourhood where people look after one another.
              </p>
            </div>

            <div className="card-hover-lift p-6 rounded-2xl bg-surface-container-lowest border border-surface-container">
              <span className="material-symbols-outlined text-primary text-3xl mb-2 block">
                inventory_2
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                Needed Supplies &amp; Food
              </h3>
              <p className="font-body-md text-body-md text-sm leading-relaxed">
                Contact our team to learn which food items, wholesome staples, and supplies are currently needed for distribution to neighbourhood families.
              </p>
            </div>

            <div className="card-hover-lift p-6 rounded-2xl bg-surface-container-lowest border border-surface-container">
              <span className="material-symbols-outlined text-primary text-3xl mb-2 block">
                support_agent
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                Connecting with the Team
              </h3>
              <p className="font-body-md text-body-md text-sm leading-relaxed">
                Whether organizing a neighbourhood food drive or inquiring about financial contribution channels, our coordination team is ready to connect with you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
