import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-on-primary rounded-t-3xl mt-space-xl overflow-hidden">
      {/* 3 Quick-Action Callout Cards Strip */}
      <div className="bg-primary-container text-on-primary py-space-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Get Food */}
            <div className="bg-surface-container-lowest/10 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between items-start border border-surface-container-lowest/15 card-hover-lift">
              <div>
                <span className="font-headline-sm text-headline-sm font-bold text-primary-fixed">
                  Food Support, with Dignity
                </span>
                <p className="font-body-md text-body-md text-on-primary/90 mt-2 mb-4 leading-relaxed">
                  If you or your family are experiencing food insecurity, reach out to ask about current assistance arrangements.
                </p>
              </div>
              <Link
                href="/get-food"
                className="w-full sm:w-auto text-center font-label-md text-label-md bg-primary-fixed text-on-primary-fixed px-5 py-2.5 rounded-full font-bold hover:bg-primary-fixed-dim transition-colors btn-interactive"
              >
                Get Food Information
              </Link>
            </div>

            {/* Card 2: Donate */}
            <div className="bg-surface-container-lowest/10 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between items-start border border-surface-container-lowest/15 card-hover-lift">
              <div>
                <span className="font-headline-sm text-headline-sm font-bold text-tertiary-fixed">
                  Give What You Can
                </span>
                <p className="font-body-md text-body-md text-on-primary/90 mt-2 mb-4 leading-relaxed">
                  A gift of food, time, or financial support helps build a community where neighbours look after neighbours.
                </p>
              </div>
              <Link
                href="/donate"
                className="w-full sm:w-auto text-center font-label-md text-label-md bg-tertiary-fixed text-on-tertiary-fixed px-5 py-2.5 rounded-full font-bold hover:bg-tertiary-fixed-dim transition-colors btn-interactive"
              >
                Support Our Work
              </Link>
            </div>

            {/* Card 3: Volunteer */}
            <div className="bg-surface-container-lowest/10 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between items-start border border-surface-container-lowest/15 sm:col-span-2 lg:col-span-1 card-hover-lift">
              <div>
                <span className="font-headline-sm text-headline-sm font-bold text-secondary-fixed">
                  Room for Kindness Here
                </span>
                <p className="font-body-md text-body-md text-on-primary/90 mt-2 mb-4 leading-relaxed">
                  The Esplanade story was built through people showing up for one another. If you would like to give your time, reach out.
                </p>
              </div>
              <Link
                href="/volunteer"
                className="w-full sm:w-auto text-center font-label-md text-label-md bg-secondary-fixed text-on-secondary-fixed px-5 py-2.5 rounded-full font-bold hover:bg-secondary-fixed-dim transition-colors btn-interactive"
              >
                Volunteer With Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-on-primary/80">
          {/* Brand Info */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-20 overflow-hidden rounded-md bg-surface-container-lowest/10 p-1 flex items-center">
                <Image
                  src="/images/logo.jpeg"
                  alt="Esplanade Community Food Bank Logo"
                  width={80}
                  height={48}
                  className="object-contain max-h-full w-auto"
                />
              </div>
              <span className="font-headline-md text-headline-md text-on-primary font-bold">
                Esplanade Community Food Bank
              </span>
            </div>
            <p className="font-headline-sm text-base text-primary-fixed font-semibold mb-2">
              Nourishing Our Neighbours. Building a Stronger Community.
            </p>
            <p className="font-body-md text-body-md text-on-primary/80 max-w-sm mb-4 leading-relaxed">
              Neighbours Feeding Neighbours.
            </p>
            <p className="text-xs text-on-primary/70 leading-relaxed max-w-md">
              Serving neighbours facing food insecurity with dignity, compassion, and respect in downtown Toronto.
            </p>
          </div>

          {/* Quick Navigation (Strictly Approved Items) */}
          <div className="md:col-span-3 lg:col-span-4">
            <span className="font-label-lg text-label-lg text-on-primary block font-bold mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 font-label-md text-label-md">
              <li>
                <Link href="/" className="hover:text-primary-fixed transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-primary-fixed transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/programs-and-events"
                  className="hover:text-primary-fixed transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/get-food" className="hover:text-primary-fixed transition-colors">
                  Get Food
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-primary-fixed transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-fixed transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Our Work & Inquiries */}
          <div className="md:col-span-3 lg:col-span-3">
            <span className="font-label-lg text-label-lg text-on-primary block font-bold mb-4">
              Get Involved
            </span>
            <ul className="space-y-2.5 font-label-md text-label-md">
              <li>
                <Link href="/donate" className="hover:text-tertiary-fixed transition-colors">
                  Support Our Work
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-primary-fixed transition-colors">
                  Volunteer With Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-fixed transition-colors">
                  Send an Inquiry
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-surface-container-lowest/15 text-xs text-on-primary/70">
              <p>For urgent food support across Toronto, call 211 (free, 24/7 community dispatch).</p>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="mt-space-lg pt-6 border-t border-surface-container-lowest/10 flex flex-col md:flex-row items-center justify-between text-on-primary/60 font-label-md text-xs sm:text-label-md gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} Esplanade Community Food Bank. Neighbours Feeding Neighbours.</p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-xs">
            <Link href="/our-story" className="hover:text-on-primary transition-colors">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-on-primary transition-colors">
              Contact &amp; Inquiries
            </Link>
            <Link href="/unsubscribe" className="hover:text-on-primary transition-colors">
              Manage Email Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
