import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE_MEDIA } from "@/data/media";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Read the founding story of Esplanade Community Food Bank, from childhood lessons in kindness to the belief that neighbours should care for one another.",
};

const CHAPTERS = [
  { id: "chapter-1", number: "01", title: "A Childhood Rooted in Community" },
  { id: "chapter-2", number: "02", title: "The Gift of Dignity" },
  { id: "chapter-3", number: "03", title: "A Family Tradition of Giving" },
  { id: "chapter-4", number: "04", title: "The Bucket Ministry" },
  { id: "chapter-5", number: "05", title: "Remembering Richard" },
  { id: "chapter-6", number: "06", title: "Neighbours Sharing Food" },
  { id: "chapter-7", number: "07", title: "Understanding the Needs of Seniors" },
  { id: "chapter-8", number: "08", title: "Neighbours Feeding Neighbours Today" },
];

export default function OurStoryPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Editorial Header Banner */}
      <section className="bg-primary text-on-primary py-16 lg:py-24 relative overflow-hidden -mt-20 pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-4 py-1.5 rounded-full text-primary-fixed font-label-md text-label-md mb-6 border border-surface-container-lowest/15">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
            About Esplanade Community Food Bank
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Our Story: Neighbours Feeding Neighbours.
          </h1>
          <p className="font-body-xl text-body-lg md:text-body-xl text-on-primary/90 max-w-3xl leading-relaxed">
            This food bank grew from a lifetime of seeing compassion in action. Its roots run through family traditions, co-operative housing, community care, and the belief that no one should feel invisible.
          </p>
        </div>
      </section>

      {/* Chapter Navigation Bar */}
      <nav
        aria-label="Story Chapters"
        className="sticky top-20 z-30 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container py-3 px-6 shadow-xs overflow-x-auto"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 min-w-max">
          <span className="font-label-md text-xs uppercase tracking-wider text-secondary font-bold mr-2 shrink-0">
            Chapters:
          </span>
          {CHAPTERS.map((ch) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shrink-0"
            >
              <span className="text-secondary font-bold mr-1.5">{ch.number}</span>
              <span>{ch.title}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Main Narrative Container */}
      <main className="py-space-xl bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Opening Prelude */}
          <div className="bg-surface-container-lowest p-8 sm:p-12 rounded-3xl border border-surface-container shadow-sm mb-16 card-hover-lift">
            <p className="font-display-hero text-xl sm:text-2xl text-primary font-bold leading-relaxed mb-6">
              The Esplanade Community Food Bank was not created in a boardroom. It was born from a lifetime of witnessing compassion in action, a deep belief that every person deserves dignity, and a simple conviction that neighbours should care for one another.
            </p>
            <div className="flex items-center gap-3 pt-6 border-t border-surface-container text-xs text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-secondary text-lg">auto_stories</span>
              <span>A personal reflection by the founder of Esplanade Community Food Bank</span>
            </div>
          </div>

          {/* CHAPTER 1 */}
          <article id="chapter-1" className="scroll-mt-36 mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                01
              </span>
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                Chapter One
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-6">
              A Childhood Rooted in Community
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
              <div className="lg:col-span-7 space-y-4 font-body-lg text-body-lg text-on-surface leading-relaxed">
                <p>
                  Growing up in downtown Toronto, community wasn’t just a place where we lived—it was a way of life. Raised in a co-operative housing community, I learned from an early age that when one neighbour struggled, everyone stepped in to help. Looking back, I realize those early experiences shaped everything The Esplanade Community Food Bank would one day become.
                </p>
                <p>
                  As a child, my mother volunteered tirelessly. Every Friday she would take me out of school early so I could help at our church’s soup kitchen and food bank. Together we packed grocery bags, prepared meals, and welcomed everyone who walked through the doors. Those afternoons weren’t just about distributing food—they were lessons in compassion, service, and treating every person with dignity.
                </p>
              </div>

              <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-surface-container">
                <Image
                  src={SITE_MEDIA.communityRoomSuperfoods.src}
                  alt={SITE_MEDIA.communityRoomSuperfoods.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  style={{ objectPosition: "center center" }}
                />
                <div className="absolute bottom-2 left-2 right-2 bg-on-background/80 backdrop-blur-xs text-on-primary text-[11px] p-2 rounded-xl">
                  Roots in downtown Toronto co-operative living and community solidarity.
                </div>
              </div>
            </div>
          </article>

          {/* CHAPTER 2: PULL QUOTE HIGHLIGHT */}
          <article id="chapter-2" className="scroll-mt-36 mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                02
              </span>
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                Chapter Two
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-6">
              The Gift of Dignity
            </h2>

            <div className="space-y-4 font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
              <p className="italic text-primary font-medium">
                One memory has remained with me throughout my life.
              </p>
              <p>
                One summer evening, while my mother was watering the garden, a man experiencing homelessness approached and quietly asked if he could drink from the garden hose. Instead of simply allowing him to drink from the hose, she turned off the water, went inside, and returned with a clean glass filled with cold water. To many, it may have seemed like a small gesture. To me, it was one of the greatest lessons I have ever received.
              </p>
            </div>

            {/* Giant Pull Quote */}
            <blockquote className="my-8 p-8 sm:p-12 rounded-3xl bg-primary text-on-primary shadow-xl border border-surface-container-lowest/15 relative overflow-hidden">
              <span className="material-symbols-outlined text-tertiary-fixed text-4xl mb-3 block">
                format_quote
              </span>
              <p className="font-display-hero text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-primary-fixed mb-4">
                &ldquo;She didn’t just give him water. She gave him dignity.&rdquo;
              </p>
              <footer className="font-body-md text-on-primary/90 text-sm sm:text-base leading-relaxed">
                That moment taught me that kindness isn’t measured by how much we give—it is measured by how we make people feel.
              </footer>
            </blockquote>
          </article>

          {/* CHAPTER 3 */}
          <article id="chapter-3" className="scroll-mt-36 mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                03
              </span>
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                Chapter Three
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-6">
              A Family Tradition of Giving
            </h2>

            <div className="space-y-4 font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
              <p>
                As I became a single mother, those lessons took on an even deeper meaning.
              </p>
              <p>
                Like so many single-parent families, I understood what it felt like to stretch every dollar. When the cost of living rises, food is often the first part of the budget families reduce. Parents skip meals so their children can eat. Seniors living on fixed incomes choose between groceries, medication, and utilities. Many people work full-time and still struggle to put healthy food on the table.
              </p>

              {/* Inset Callout */}
              <div className="p-6 rounded-2xl bg-surface-container border-l-4 border-secondary my-6">
                <p className="font-headline-sm text-base sm:text-lg font-bold text-primary">
                  Food insecurity is not simply about hunger—it is about impossible choices.
                </p>
              </div>

              <p>
                Across Canada, food banks continue to see record numbers of visits as rising housing costs, inflation, and limited incomes place increasing pressure on families, seniors, newcomers, and individuals living with disabilities or mental health challenges. Many people seeking food assistance have never needed it before. Others have quietly struggled for years.
              </p>
              <p>
                Having experienced financial hardship myself, I understood how quickly circumstances can change and how difficult it can be to ask for help.
              </p>
              <p>
                I wanted my children to grow up believing what I had been taught—that we are our brother’s keeper.
              </p>
              <p>
                Together, we began making sandwiches and hot chocolate during the winter months, driving through downtown Toronto to hand them out to people experiencing homelessness. Those simple acts became family traditions, reminding us that caring for others isn’t something we do occasionally—it’s a way of living.
              </p>
            </div>
          </article>

          {/* CHAPTER 4: THE BUCKET MINISTRY */}
          <article id="chapter-4" className="scroll-mt-36 mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                04
              </span>
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                Chapter Four
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-6">
              The Bucket Ministry
            </h2>

            <div className="space-y-4 font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
              <p>
                Then COVID-19 changed everything.
              </p>
              <p>
                Almost overnight, food insecurity became visible everywhere. Families who had never needed assistance before suddenly found themselves struggling. Seniors were isolated. Grocery shelves were empty. Many people were afraid to leave their homes.
              </p>
              <p>
                Rather than waiting for someone else to act, our family started what became known in our neighbourhood as The Bucket Ministry.
              </p>
              <p>
                We attached two weatherproof buckets to a lamp post outside our home, filled them daily with canned goods, non-perishable food, bottled water, utensils, and other essentials. My children decorated the buckets with bright colours and wrote one simple word across the lids:
              </p>

              {/* Visual "FREE" Callout Box */}
              <div className="text-center py-8 my-6 bg-tertiary-fixed/30 rounded-3xl border border-tertiary-fixed-dim/40">
                <span className="font-display-hero text-4xl sm:text-6xl font-black tracking-widest text-primary block">
                  FREE
                </span>
                <span className="font-label-md text-xs sm:text-sm text-on-surface-variant font-semibold mt-2 block">
                  Written across the bucket lids on the lamp post outside our home
                </span>
              </div>

              <p>
                One day, while sitting near the front window of our home, I overheard an elderly couple walking to the grocery store. They stopped when they noticed the buckets. As they realized the food was available for anyone who needed it, I heard the excitement and relief in their voices.
              </p>
              <p>
                They were grateful simply to know there would be a little more food in their cupboards that week.
              </p>
              <p className="font-bold text-primary italic">
                That moment confirmed what I had always believed: People are often closer to hardship than we realize.
              </p>
            </div>
          </article>

          {/* CHAPTER 5: REMEMBERING RICHARD */}
          <article id="chapter-5" className="scroll-mt-36 mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                05
              </span>
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                Chapter Five
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-6">
              Remembering Richard
            </h2>

            <div className="space-y-4 font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
              <p>
                Around the same time, a man named Richard began sleeping in a doorway behind our home. Richard lived with mental health challenges and rarely spoke, but he was gentle and respectful. Each evening he carefully swept the small area where he slept before laying down his blankets and tarp.
              </p>
              <p>
                As neighbours got to know him, something remarkable happened.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">check</span>
                  <span>One person brought toiletries.</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">check</span>
                  <span>Another brought blankets.</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">check</span>
                  <span>Someone else dropped off food.</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">check</span>
                  <span>Others stopped simply to ask how he was doing.</span>
                </div>
              </div>

              <p className="font-bold text-primary">
                Richard became part of our community.
              </p>
              <p>
                For more than nine months, neighbours cared for him together. One evening we heard shouting and rushed outside to find his belongings scattered across the laneway. His identification was left behind, but Richard was gone.
              </p>
              <p className="italic text-on-surface-variant">
                We never saw him again.
              </p>
              <p>
                Although his story ended with unanswered questions, Richard reminded us that every person has a name, a story, and immeasurable worth.
              </p>
              <p className="font-semibold text-primary">
                His presence strengthened our resolve to create a community where no one feels invisible.
              </p>
            </div>
          </article>

          {/* CHAPTER 6: NEIGHBOURS SHARING FOOD */}
          <article id="chapter-6" className="scroll-mt-36 mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                06
              </span>
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                Chapter Six
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-6">
              Neighbours Sharing Food
            </h2>

            <div className="space-y-4 font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
              <p>
                Years later, our church established a food bank, and I began volunteering by driving the truck to collect food donations. Often there were large quantities of fresh produce and perishable food that could not all be distributed before spoiling. Rather than allowing perfectly good food to go to waste, I brought it home, divided it into smaller portions, and shared it throughout our neighbourhood.
              </p>
              <p>
                Without realizing it, the vision for The Esplanade Community Food Bank had already begun.
              </p>
              <div className="p-6 rounded-2xl bg-primary-container text-on-primary my-6">
                <p className="font-display-hero text-xl sm:text-2xl font-bold text-primary-fixed mb-1">
                  Neighbours feeding neighbours.
                </p>
                <p className="text-on-primary/90 text-sm">
                  That simple phrase became the foundation of everything we do.
                </p>
              </div>
            </div>
          </article>

          {/* CHAPTER 7: UNDERSTANDING THE NEEDS OF SENIORS */}
          <article id="chapter-7" className="scroll-mt-36 mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                07
              </span>
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                Chapter Seven
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-6">
              Understanding the Needs of Seniors
            </h2>

            <div className="space-y-4 font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
              <p>
                In 2022, our family experienced another profound loss when my mother passed away. Shortly afterward, my father came to live with us. Caring for him gave me a new perspective on the challenges many seniors face every day.
              </p>
              <p>
                As I prepared meals, attended appointments, and spent time with the people I had known since childhood—now older adults living on fixed incomes—I heard stories of impossible decisions. Rising rent, increasing grocery prices, expensive medications, and the growing cost of living were leaving many seniors vulnerable.
              </p>
              <p>
                The same neighbourhood that had taught me the importance of community now needed that community more than ever.
              </p>
              <p className="font-semibold text-primary">
                That realization inspired me to formalize the work I had already been doing for years.
              </p>
            </div>
          </article>

          {/* CHAPTER 8: NEIGHBOURS FEEDING NEIGHBOURS TODAY */}
          <article id="chapter-8" className="scroll-mt-36 mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                08
              </span>
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                Chapter Eight
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-6">
              Neighbours Feeding Neighbours Today
            </h2>

            <div className="space-y-4 font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
              <p>
                Today, The Esplanade Community Food Bank exists to relieve the effects of poverty and combat food insecurity by providing nutritious food, healthy snacks, and compassionate support to individuals and families in need. While we serve anyone facing food insecurity, we place particular emphasis on supporting seniors, single-parent families, individuals experiencing homelessness, and those living with mental health challenges.
              </p>
              <p className="font-bold text-primary">
                But our vision extends beyond providing groceries.
              </p>

              {/* Three Core Beliefs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-xs">
                  <span className="material-symbols-outlined text-secondary text-3xl mb-2 block">
                    link
                  </span>
                  <p className="font-headline-sm text-base font-bold text-primary mb-1">
                    Food as Connection
                  </p>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    We believe food is a bridge to connection.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-xs">
                  <span className="material-symbols-outlined text-secondary text-3xl mb-2 block">
                    favorite
                  </span>
                  <p className="font-headline-sm text-base font-bold text-primary mb-1">
                    Universal Dignity
                  </p>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    We believe every person deserves to be treated with dignity.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-xs">
                  <span className="material-symbols-outlined text-secondary text-3xl mb-2 block">
                    groups
                  </span>
                  <p className="font-headline-sm text-base font-bold text-primary mb-1">
                    Stronger Together
                  </p>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    We believe communities become stronger when neighbours care for one another.
                  </p>
                </div>
              </div>

              <p>
                Every meal shared, every grocery bag packed, every volunteer who gives their time, and every donor who contributes continues a legacy that began decades ago with one mother teaching her child that kindness is found in the smallest acts.
              </p>

              {/* Authentic Community Portrait */}
              <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-md border border-surface-container my-8">
                <Image
                  src={SITE_MEDIA.communityHallGathering.src}
                  alt={SITE_MEDIA.communityHallGathering.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                  style={{ objectPosition: SITE_MEDIA.communityHallGathering.objectPosition || "center 35%" }}
                />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-on-background/85 backdrop-blur-md text-on-primary text-xs sm:text-sm p-3 rounded-2xl border border-surface-container-lowest/15 flex items-center justify-between gap-3">
                  <span className="font-medium">
                    The Esplanade Community Food Bank team and neighbours gathered in community solidarity.
                  </span>
                  <span className="text-tertiary-fixed font-bold text-xs uppercase tracking-wider hidden sm:inline-block shrink-0">
                    Neighbours Feeding Neighbours
                  </span>
                </div>
              </div>

              <div className="bg-surface-container p-8 rounded-3xl border border-surface-container-highest my-8 text-center">
                <p className="font-display-hero text-xl sm:text-2xl text-primary font-bold mb-2">
                  The Esplanade Community Food Bank is more than a food bank.
                </p>
                <p className="font-headline-sm text-lg text-secondary font-medium mb-3">
                  It is a community built on compassion, dignity, and hope.
                </p>
                <p className="font-display-hero text-2xl sm:text-3xl font-extrabold text-primary">
                  It is, and always will be, Neighbours Feeding Neighbours.
                </p>
              </div>
            </div>
          </article>

          {/* Bottom Action Section */}
          <div className="pt-12 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
                Join Us in Caring for Our Neighbours
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Whether you need food assistance or wish to contribute your time or resources, welcome.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/get-food"
                className="btn-interactive inline-flex items-center justify-center bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-full font-bold shadow-sm"
              >
                Get Food Support
              </Link>
              <Link
                href="/volunteer"
                className="btn-interactive inline-flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md px-6 py-3 rounded-full font-bold border border-surface-container-highest"
              >
                Volunteer With Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
