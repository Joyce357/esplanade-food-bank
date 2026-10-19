import { SITE_MEDIA } from "./media";

export interface HeroAction {
  label: string;
  href: string;
  variant: "primary" | "tertiary" | "outline";
  icon?: string;
}

export interface HeroSlide {
  id: number;
  imageUrl: string;
  alt: string;
  eyebrow: string;
  headline: string;
  supportingLine: string;
  tabTitle: string;
  tabSubtitle: string;
  actions: HeroAction[];
  objectPosition?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    imageUrl: SITE_MEDIA.communityHallGathering.src,
    alt: SITE_MEDIA.communityHallGathering.alt,
    eyebrow: "Esplanade Community Food Bank",
    headline: "Neighbours Feeding Neighbours.",
    supportingLine:
      "Food, kindness, and community belong together. We are here to help neighbours facing food insecurity with dignity and compassion.",
    tabTitle: "01 Neighbours",
    tabSubtitle: "Feeding Neighbours",
    objectPosition: "center 38%",
    actions: [
      {
        label: "Get Food",
        href: "/get-food",
        variant: "primary",
        icon: "arrow_forward",
      },
      {
        label: "Volunteer",
        href: "/volunteer",
        variant: "outline",
        icon: "diversity_1",
      },
      {
        label: "Support Our Work",
        href: "/donate",
        variant: "tertiary",
        icon: "volunteer_activism",
      },
    ],
  },
  {
    id: 1,
    imageUrl: SITE_MEDIA.volunteersAtDryGoodsTable.src,
    alt: SITE_MEDIA.volunteersAtDryGoodsTable.alt,
    eyebrow: "Compassion in Action",
    headline: "Everyone Deserves to Be Treated with Dignity.",
    supportingLine:
      "A welcoming community begins with seeing each person, hearing their story, and offering support without judgment.",
    tabTitle: "02 Dignity",
    tabSubtitle: "Compassion in Action",
    objectPosition: "center 26%",
    actions: [
      {
        label: "Our Story",
        href: "/our-story",
        variant: "primary",
        icon: "menu_book",
      },
      {
        label: "Get Food",
        href: "/get-food",
        variant: "tertiary",
        icon: "arrow_forward",
      },
    ],
  },
  {
    id: 2,
    imageUrl: SITE_MEDIA.stapleNoodlesRicePasta.src,
    alt: SITE_MEDIA.stapleNoodlesRicePasta.alt,
    eyebrow: "Our Community, Our Strength",
    headline: "Small Acts of Kindness. Stronger Neighbourhoods.",
    supportingLine:
      "Inspired by generations of neighbours helping neighbours, we believe caring for one another can make a lasting difference.",
    tabTitle: "03 Community",
    tabSubtitle: "Acts of Kindness",
    objectPosition: "center center",
    actions: [
      {
        label: "Volunteer",
        href: "/volunteer",
        variant: "primary",
        icon: "diversity_1",
      },
      {
        label: "Donate",
        href: "/donate",
        variant: "tertiary",
        icon: "volunteer_activism",
      },
    ],
  },
  {
    id: 3,
    imageUrl: SITE_MEDIA.breakfastCerealsAndSnacks.src,
    alt: SITE_MEDIA.breakfastCerealsAndSnacks.alt,
    eyebrow: "Wholesome Nutrition",
    headline: "Wholesome Staples for Families & Seniors.",
    supportingLine:
      "Nutritious breakfast cereals, healthy dry staples, and caring support to ease daily pressures for neighbourhood households.",
    tabTitle: "04 Nourishment",
    tabSubtitle: "Breakfast & Wholesome Care",
    objectPosition: "center center",
    actions: [
      {
        label: "Our Programs",
        href: "/programs-and-events",
        variant: "primary",
        icon: "inventory_2",
      },
      {
        label: "Get Food Support",
        href: "/get-food",
        variant: "tertiary",
        icon: "arrow_forward",
      },
    ],
  },
];
