"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/content";

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 mb-16">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 card-hover-lift"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between text-left font-headline-sm text-headline-sm text-primary font-bold cursor-pointer group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="group-hover:text-secondary transition-colors pr-4">
                {item.question}
              </span>
              <span
                className={`material-symbols-outlined text-2xl transition-transform duration-300 text-secondary shrink-0 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                expand_more
              </span>
            </button>
            {isOpen && (
              <div
                id={`faq-answer-${item.id}`}
                className="pt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed animate-in fade-in duration-200 border-t border-surface-container mt-4"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
