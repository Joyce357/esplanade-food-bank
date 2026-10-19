"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Escape key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Body scroll locking with proper cleanup
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container/40">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
          {/* 1. Official Logo Only (Clicking returns to home) */}
          <Link
            href="/"
            className="flex items-center shrink-0 group py-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg"
            aria-label="Esplanade Community Food Bank - Home"
          >
            <div className="relative h-12 w-24 sm:h-14 sm:w-28 overflow-hidden rounded-lg flex items-center">
              <Image
                src="/images/logo.jpeg"
                alt="Esplanade Community Food Bank"
                width={120}
                height={60}
                className="object-contain max-h-full w-auto transition-transform group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* 2. Desktop Navigation (5 single-line clean links: About Us, Programs, Get Food, Volunteer, Contact) */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2.5 text-on-surface-variant font-label-md"
            aria-label="Primary Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-all rounded-full px-3 lg:px-4 py-2 font-bold whitespace-nowrap text-xs lg:text-label-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    isActive
                      ? "text-primary bg-surface-container shadow-xs"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Mobile Hamburger Toggle Button */}
          <button
            ref={toggleButtonRef}
            type="button"
            className="md:hidden w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none btn-interactive cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="md:hidden bg-surface border-t border-surface-container-highest px-6 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200 relative z-50"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-5 py-3.5 rounded-2xl font-label-md text-label-md transition-colors flex items-center justify-between focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                      isActive
                        ? "bg-primary text-on-primary font-bold shadow-xs"
                        : "text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-lg opacity-60">
                      chevron_right
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Backdrop overlay for Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 bg-on-background/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
