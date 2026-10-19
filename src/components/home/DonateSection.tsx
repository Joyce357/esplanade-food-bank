import React from "react";
import Link from "next/link";

export default function DonateSection() {
  return (
    <section className="w-full py-space-xl bg-surface-container" id="donate">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column A: Editorial Giving Message */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 lg:p-10 rounded-3xl shadow-sm flex flex-col justify-between border border-surface-container-high/60 card-hover-lift">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                  Community Giving
                </span>
                <span className="bg-surface-container text-primary font-label-md text-xs sm:text-label-md px-3 py-1 rounded-full font-bold">
                  Neighbours Feeding Neighbours
                </span>
              </div>
              <h3 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-primary font-extrabold mb-4">
                Give What You Can. Help a Neighbour.
              </h3>
              <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                A gift of food, time, or financial support can help build a community where neighbours look after neighbours. Contact us to learn about current giving opportunities and how your generosity can support local households facing food insecurity.
              </p>

              {/* Dignity Callout Inset */}
              <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">
                    volunteer_activism
                  </span>
                  <div>
                    <span className="font-headline-sm text-sm sm:text-base font-bold text-primary block mb-1">
                      Giving Is About How We Make People Feel
                    </span>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
                      Whether sharing non-perishable staples, contributing towards fresh groceries, or giving of your time, every contribution strengthens our neighbourhood fabric.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="btn-interactive inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-lg text-sm sm:text-label-lg py-3.5 sm:py-4 px-6 rounded-full font-bold shadow-md text-center"
              >
                <span className="material-symbols-outlined text-[20px]">
                  support_agent
                </span>
                <span>Support Our Work</span>
              </Link>
              <Link
                href="/donate"
                className="btn-interactive inline-flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-sm sm:text-label-lg py-3.5 sm:py-4 px-6 rounded-full font-bold border border-surface-container-highest text-center"
              >
                <span>Learn Ways to Give</span>
              </Link>
            </div>
          </div>

          {/* Column B: Ways to Make a Difference */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-6 sm:p-8 lg:p-10 rounded-3xl shadow-sm flex flex-col justify-between border border-surface-container-high/60 card-hover-lift">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-md text-label-md font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-base">diversity_3</span>
                <span>Ways to Make a Difference</span>
              </div>
              <h3 className="font-headline-lg text-headline-md sm:text-headline-lg text-primary font-extrabold mb-3">
                Current Community Needs
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                Contact the team to learn which food items, supplies, and other forms of support are currently needed.
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">
                    inventory_2
                  </span>
                  <div>
                    <h4 className="font-label-lg text-label-lg text-primary font-bold">Food Contributions</h4>
                    <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      Wholesome, non-perishable goods and staples that support everyday household meals.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">
                    payments
                  </span>
                  <div>
                    <h4 className="font-label-lg text-label-lg text-primary font-bold">Financial Support</h4>
                    <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      Direct contributions to help acquire fresh produce and essential supplies for neighbours.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">
                    diversity_1
                  </span>
                  <div>
                    <h4 className="font-label-lg text-label-lg text-primary font-bold">Community Initiatives</h4>
                    <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      Neighbourhood food drives and community-rooted mutual aid activities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest text-xs text-on-surface-variant">
              <span>
                To coordinate a donation or inquire about currently needed items, please connect directly with our coordination team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
