export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About Us", href: "/our-story" },
  { label: "Programs", href: "/programs-and-events" },
  { label: "Get Food", href: "/get-food" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Contact", href: "/contact" },
];

export const CONTACT_INFO = {
  organizationName: "Esplanade Community Food Bank",
  helplineDisplay: process.env.NEXT_PUBLIC_HELPLINE_PHONE || "Inquiries welcomed via form",
  helplineStatus: process.env.NEXT_PUBLIC_HELPLINE_PHONE ? "Direct helpline" : "Inquiries welcomed via online form",
  openHoursDisplay: "Distribution Arrangements",
  openHoursStatus: "Coordinated with intake team",
  buildingName: "David B. Archer Co-operative",
  streetAddress: "7 Jenoves Place",
  cityProvincePostal: "Toronto, Ontario, M5A 4A6",
  country: "Canada",
  address:
    process.env.NEXT_PUBLIC_PANTRY_ADDRESS ||
    "David B. Archer Co-operative, 7 Jenoves Place, Toronto, Ontario, M5A 4A6, Canada",
  addressStatus: "David B. Archer Co-operative",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "EsplanadeFoodbank@gmail.com",
  emailStatus: "Official contact & community coordination",
  charityNumber: process.env.NEXT_PUBLIC_CHARITY_NUMBER || "Community-based initiative",
  charityStatus: "Neighbours Feeding Neighbours",
  languages: "English / Français / Español",
};
