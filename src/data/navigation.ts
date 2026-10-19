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
  helplineDisplay: process.env.NEXT_PUBLIC_HELPLINE_PHONE || "Inquiries welcomed via form",
  helplineStatus: process.env.NEXT_PUBLIC_HELPLINE_PHONE ? "Direct helpline" : "Inquiries welcomed via online form",
  openHoursDisplay: "Distribution Arrangements",
  openHoursStatus: "Coordinated with intake team",
  address: process.env.NEXT_PUBLIC_PANTRY_ADDRESS || "The Esplanade Community Facility",
  addressStatus: "Downtown East Toronto",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Online inquiry form available below",
  emailStatus: "Direct inquiries via web form",
  charityNumber: process.env.NEXT_PUBLIC_CHARITY_NUMBER || "Community-based initiative",
  charityStatus: "Neighbours Feeding Neighbours",
  languages: "English / Français / Español",
};
