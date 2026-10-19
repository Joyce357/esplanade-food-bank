import React from "react";
import { CONTACT_INFO } from "@/data/navigation";

export default function TopBar() {
  return (
    <div className="bg-surface-container-high/60 hidden md:block text-on-surface-variant font-label-md text-label-md border-b border-surface-container-highest/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-9 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-primary">Helpline:</span>
            <span>{CONTACT_INFO.helplineDisplay}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-semibold text-primary">{CONTACT_INFO.openHoursDisplay}:</span>
            <span>{CONTACT_INFO.openHoursStatus}</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span>{CONTACT_INFO.languages}</span>
        </div>
      </div>
    </div>
  );
}
