import React from "react";
import type { Metadata } from "next";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import WelcomeSplit from "@/components/home/WelcomeSplit";
import StoryBanner from "@/components/home/StoryBanner";
import GetFoodPathway from "@/components/home/GetFoodPathway";
import ProgramsGrid from "@/components/home/ProgramsGrid";
import ImpactStats from "@/components/home/ImpactStats";
import DonateSection from "@/components/home/DonateSection";
import VolunteerSpotlight from "@/components/home/VolunteerSpotlight";
import CommunityGallery from "@/components/home/CommunityGallery";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import FaqAccordion from "@/components/home/FaqAccordion";
import NewsletterBanner from "@/components/home/NewsletterBanner";

export const metadata: Metadata = {
  title: "Esplanade Community Food Bank | Neighbours Feeding Neighbours",
  description:
    "Esplanade Community Food Bank is rooted in compassion and community, working to address food insecurity and help neighbours with dignity.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO PHOTOGRAPHIC SLIDESHOW */}
      <HeroSlideshow />

      {/* SECTION 2: WELCOME & MISSION SPLIT */}
      <WelcomeSplit />

      {/* SECTION 3: OUR STORY PREVIEW */}
      <StoryBanner />

      {/* SECTION 4: GET FOOD PATHWAY */}
      <GetFoodPathway />

      {/* SECTION 5: PROGRAMS & COMMUNITY SERVICES */}
      <ProgramsGrid />

      {/* SECTION 6: COMMUNITY IMPACT STATS */}
      <ImpactStats />

      {/* SECTION 7: DONATE SECTION & WISHLIST */}
      <DonateSection />

      {/* SECTION 8: VOLUNTEER COMMUNITY SPOTLIGHT */}
      <VolunteerSpotlight />

      {/* SECTION 9: COMMUNITY PHOTO GALLERY */}
      <CommunityGallery />

      {/* SECTION 10: UPCOMING EVENTS & DISTRIBUTION DATES */}
      <UpcomingEvents />

      {/* SECTION 11: INTERACTIVE FAQ & NEWSLETTER */}
      <section className="w-full py-space-xl bg-surface-container relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* FAQ Accordion */}
          <div className="text-center mb-12">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-extrabold block mb-2">
              Common Questions
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight">
              Everything You Need to Know
            </h2>
          </div>

          <FaqAccordion />

          {/* High-Contrast Newsletter Banner */}
          <NewsletterBanner />
        </div>
      </section>
    </div>
  );
}
