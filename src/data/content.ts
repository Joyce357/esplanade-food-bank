import { SITE_MEDIA } from "./media";

export interface StepItem {
  number: string;
  title: string;
  description: string;
  badge: string;
  icon: string;
  imageUrl: string;
  alt: string;
  objectPosition?: string;
  buttonText?: string;
  buttonHref?: string;
}

export const GET_FOOD_STEPS: StepItem[] = [
  {
    number: "01",
    title: "Taking the First Step",
    description:
      "We understand that asking for help can be difficult. Your circumstances deserve care and respect. Please contact the team for information about availability, how to access support, and any registration requirements.",
    badge: "Respect & Care",
    icon: "support_agent",
    imageUrl: SITE_MEDIA.longDistributionTable.src,
    alt: SITE_MEDIA.longDistributionTable.alt,
    objectPosition: "center 35%",
    buttonText: "Ask About Food Assistance",
    buttonHref: "/get-food#assistance-inquiry",
  },
  {
    number: "02",
    title: "Seeing Each Person",
    description:
      "A welcoming community begins with seeing each person, hearing their story, and offering support without judgment. Every neighbour is received with dignity.",
    badge: "Dignity First",
    icon: "favorite",
    imageUrl: SITE_MEDIA.stapleNoodlesRicePasta.src,
    alt: SITE_MEDIA.stapleNoodlesRicePasta.alt,
    objectPosition: "center center",
  },
  {
    number: "03",
    title: "Nutritious Food & Care",
    description:
      "Providing nutritious food, healthy snacks, and compassionate support to ease the pressure on individuals and families in need across our neighbourhood.",
    badge: "Neighbourhood Support",
    icon: "shopping_basket",
    imageUrl: SITE_MEDIA.snackPacksAndCrackers.src,
    alt: SITE_MEDIA.snackPacksAndCrackers.alt,
    objectPosition: "center center",
  },
];

export interface ProgramItem {
  id: string;
  category: string;
  title: string;
  description: string;
  schedule: string;
  scheduleNote?: string;
  icon: string;
  columns: number;
  imageUrl: string;
  alt: string;
  objectPosition?: string;
  badgeBg: string;
  badgeText: string;
}

// Grounded in verified organizational areas of focus from ESPLANADE_WEBSITE_CONTENT.md
export const PROGRAMS: ProgramItem[] = [
  {
    id: "food-and-nourishment",
    category: "Area of Focus",
    title: "Food and Nourishment",
    description:
      "Nutritious food and healthy snacks can help ease some of the pressure facing individuals and families in our community.",
    schedule: "Arrangements in coordination with intake team",
    scheduleNote: "Inquire for current food assistance arrangements",
    icon: "nutrition",
    columns: 7,
    imageUrl: SITE_MEDIA.stapleNoodlesRicePasta.src,
    alt: SITE_MEDIA.stapleNoodlesRicePasta.alt,
    objectPosition: "center center",
    badgeBg: "bg-primary-fixed",
    badgeText: "text-on-primary-fixed",
  },
  {
    id: "dignity-and-belonging",
    category: "Guiding Principle",
    title: "Dignity and Belonging",
    description:
      "Every person has a name, a story, and a right to be treated with respect. Kindness is measured by how we make people feel.",
    schedule: "Every interaction, always",
    icon: "handshake",
    columns: 5,
    imageUrl: SITE_MEDIA.volunteersAtDryGoodsTable.src,
    alt: SITE_MEDIA.volunteersAtDryGoodsTable.alt,
    objectPosition: "center 25%",
    badgeBg: "bg-tertiary-fixed",
    badgeText: "text-on-tertiary-fixed",
  },
  {
    id: "community-care",
    category: "Community Principle",
    title: "Community Care",
    description:
      "Neighbours helping neighbours is the principle behind this work, from sharing resources to showing up for one another in times of need.",
    schedule: "Neighbour-to-neighbour mutual support",
    icon: "diversity_1",
    columns: 5,
    imageUrl: SITE_MEDIA.communityHallGathering.src,
    alt: SITE_MEDIA.communityHallGathering.alt,
    objectPosition: "center 35%",
    badgeBg: "bg-secondary-container",
    badgeText: "text-on-secondary-container",
  },
  {
    id: "vulnerable-neighbours",
    category: "Priority Focus",
    title: "Care for Vulnerable Neighbours",
    description:
      "The founder's experiences have shaped a particular concern for seniors, single-parent families, people experiencing homelessness, and neighbours living with mental health challenges.",
    schedule: "Dedicated focus and ongoing commitment",
    icon: "volunteer_activism",
    columns: 7,
    imageUrl: SITE_MEDIA.breakfastCerealsAndSnacks.src,
    alt: SITE_MEDIA.breakfastCerealsAndSnacks.alt,
    objectPosition: "center center",
    badgeBg: "bg-primary-fixed",
    badgeText: "text-on-primary-fixed",
  },
];

export interface ImpactStat {
  icon: string;
  value: string;
  label: string;
  colorClass: string;
  isFraction?: boolean;
}

// Verified Toronto-wide figures from Who's Hungry 2025 report (Daily Bread & North York Harvest)
export const IMPACT_STATS: ImpactStat[] = [
  {
    icon: "trending_up",
    value: "4.1M",
    label: "Food bank visits across Toronto (April 1, 2024–March 31, 2025)",
    colorClass: "text-primary-fixed",
  },
  {
    icon: "percent",
    value: "18%",
    label: "Increase in visits compared with the previous reporting year",
    colorClass: "text-tertiary-fixed",
  },
  {
    icon: "groups",
    value: "> 1 in 10",
    label: "Torontonians relying on food banks across our city",
    colorClass: "text-secondary-fixed",
    isFraction: true,
  },
];

export const IMPACT_ATTRIBUTION = {
  sourceText:
    "Source: Who's Hungry 2025, Daily Bread Food Bank and North York Harvest Food Bank. Toronto-wide data, not Esplanade Community Food Bank results.",
  reportUrl:
    "https://www.dailybread.ca/research-and-advocacy/research/whos-hungry-report/",
};

export interface GalleryItem {
  id: number;
  imageUrl: string;
  tag: string;
  alt: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    imageUrl: SITE_MEDIA.communityHallGathering.src,
    tag: "#CommunityCare",
    alt: SITE_MEDIA.communityHallGathering.alt,
  },
  {
    id: 2,
    imageUrl: SITE_MEDIA.volunteersAtDryGoodsTable.src,
    tag: "#DignityInGiving",
    alt: SITE_MEDIA.volunteersAtDryGoodsTable.alt,
  },
  {
    id: 3,
    imageUrl: SITE_MEDIA.stapleNoodlesRicePasta.src,
    tag: "#FoodIsConnection",
    alt: SITE_MEDIA.stapleNoodlesRicePasta.alt,
  },
  {
    id: 4,
    imageUrl: SITE_MEDIA.breakfastCerealsAndSnacks.src,
    tag: "#NourishingNeighbours",
    alt: SITE_MEDIA.breakfastCerealsAndSnacks.alt,
  },
  {
    id: 5,
    imageUrl: SITE_MEDIA.snackPacksAndCrackers.src,
    tag: "#ActsOfKindness",
    alt: SITE_MEDIA.snackPacksAndCrackers.alt,
  },
  {
    id: 6,
    imageUrl: SITE_MEDIA.cannedPeasAndBeans.src,
    tag: "#NeighboursFeedingNeighbours",
    alt: SITE_MEDIA.cannedPeasAndBeans.alt,
  },
];

export interface EventItem {
  id: number;
  badge: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  location: string;
}

// Honest community news and updates without fabricated dates or places
export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 1,
    badge: "Food Support",
    badgeBg: "bg-primary-fixed",
    badgeText: "text-on-primary-fixed",
    icon: "support_agent",
    title: "Food Assistance Inquiries",
    description:
      "Connect with our team to ask about current assistance arrangements, availability, and intake procedures.",
    time: "Inquiries Welcome",
    location: "Online & Direct Message",
  },
  {
    id: 2,
    badge: "Volunteer",
    badgeBg: "bg-tertiary-fixed",
    badgeText: "text-on-tertiary-fixed",
    icon: "diversity_1",
    title: "Express Volunteer Interest",
    description:
      "Whether you have occasional time or hope to become more involved, reaching out is the first step.",
    time: "Ongoing Interest",
    location: "The Esplanade Community",
  },
  {
    id: 3,
    badge: "Community Giving",
    badgeBg: "bg-secondary-container",
    badgeText: "text-on-secondary-container",
    icon: "volunteer_activism",
    title: "Support Our Neighbours",
    description:
      "Contact our team to learn which food items, supplies, and other forms of support are currently needed.",
    time: "Ongoing Need",
    location: "Community Inquiries",
  },
];

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

// Approved FAQs from ESPLANADE_WEBSITE_CONTENT.md
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "Who can contact Esplanade Community Food Bank about food support?",
    answer:
      "Anyone experiencing food insecurity can ask about available assistance. The organization places particular emphasis on seniors, single-parent families, people experiencing homelessness, and neighbours living with mental health challenges.",
  },
  {
    id: 2,
    question: "Do I need to register before receiving assistance?",
    answer:
      "Please contact the team for the current intake process and any information they may need. The website will be updated when these details are confirmed.",
  },
  {
    id: 3,
    question: "When and where is food distributed?",
    answer:
      "Current distribution dates, hours, and location details will be published once confirmed by the organization.",
  },
  {
    id: 4,
    question: "How can I help?",
    answer:
      "You can express interest in volunteering or ask about the organization's current donation needs. Use the Volunteer or Contact page to get started.",
  },
  {
    id: 5,
    question: "Why is dignity so important to this food bank?",
    answer:
      "The founder's earliest experiences of community service taught her that the way help is offered matters just as much as what is given. That belief continues to shape Esplanade's purpose.",
  },
];
