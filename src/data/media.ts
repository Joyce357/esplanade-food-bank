/**
 * Centrally Managed Media & Photographic Assets
 * 
 * Esplanade Community Food Bank
 * Maps authentic photography from public/images to approved site sections.
 */

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption?: string;
  category: "community" | "volunteers" | "staples" | "pantry" | "brand";
  orientation: "landscape" | "portrait" | "square";
  preferredSection: string;
  objectPosition?: string;
  isDuplicate?: boolean;
  duplicateOf?: string;
  notes?: string;
}

export const SITE_MEDIA: Record<string, MediaAsset> = {
  // Brand Logo
  logo: {
    id: "logo",
    src: "/images/logo.jpeg",
    alt: "Esplanade Community Food Bank logo emblem featuring a diverse neighbourhood community under a green tree canopy with a heart basket of fresh produce",
    title: "Esplanade Community Food Bank Emblem",
    caption: "Nourishing Our Neighbours. Building a Stronger Community.",
    category: "brand",
    orientation: "landscape",
    preferredSection: "Navbar, Footer, Brand Headers",
  },

  // Hero & Community Connection Primary
  communityHallGathering: {
    id: "communityHallGathering",
    src: "/images/WhatsApp Image 2026-10-15 at 12.18.59 PM.jpeg",
    alt: "Esplanade Community Food Bank team and neighbours gathered warmly together around a fresh produce and beverage distribution table in the community hall",
    title: "Community in the Hall",
    caption: "Neighbours gathering in mutual support, warmth, and inclusion",
    category: "community",
    orientation: "landscape",
    preferredSection: "Hero Slideshow (Slide 1), About Story Banner, Community Spotlight",
    objectPosition: "center 35%",
  },

  // Volunteer & Service with Dignity
  volunteersAtDryGoodsTable: {
    id: "volunteersAtDryGoodsTable",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.17 PM (2).jpeg",
    alt: "Two smiling Esplanade Community Food Bank volunteers in apron and cap serving a neighbour at the dry goods table labeled with the official organization emblem",
    title: "Serving with Dignity",
    caption: "Friendly volunteers welcoming neighbours with dignity and care",
    category: "volunteers",
    orientation: "landscape",
    preferredSection: "Hero Slideshow (Slide 2), Volunteer Spotlight, Get Food Pathway",
    objectPosition: "center 25%",
  },

  // Diverse Dry Staples & Wholesome Grains
  stapleNoodlesRicePasta: {
    id: "stapleNoodlesRicePasta",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.16 PM (3).jpeg",
    alt: "Wholesome dry staples including white rice, Chinese style steam fried noodles, and Italian pasta neatly arranged on a clean table for community distribution",
    title: "Wholesome Dry Staples",
    caption: "Culturally familiar staples and nutritious everyday essentials",
    category: "staples",
    orientation: "landscape",
    preferredSection: "Hero Slideshow (Slide 3), Programs (Food & Nourishment), Get Food (Step 2)",
    objectPosition: "center center",
  },

  // Wholesome Breakfast & Family Nutrition
  breakfastCerealsAndSnacks: {
    id: "breakfastCerealsAndSnacks",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.16 PM (4).jpeg",
    alt: "Round table neatly organized with breakfast cereals, All-Bran, granola, oats, digestive biscuits, and family snack boxes",
    title: "Nutritious Breakfast & Wholesome Snacks",
    caption: "Wholesome breakfast cereals and staples supporting family mornings",
    category: "pantry",
    orientation: "landscape",
    preferredSection: "Hero Slideshow (Slide 4), Donate Page, Welcome Split Collage",
    objectPosition: "center center",
  },

  // Long Distribution Table Overview
  longDistributionTable: {
    id: "longDistributionTable",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.16 PM.jpeg",
    alt: "Overview of a food distribution table laden with fresh eggs, milk, steam fried noodles, bread rolls, canned vegetables, and condiments",
    title: "Community Food Distribution Table",
    caption: "Essential groceries prepared with care for neighbourhood distribution",
    category: "pantry",
    orientation: "portrait",
    preferredSection: "Get Food (Step 1), Volunteer Mosaic (Primary Card), Programs Detail",
    objectPosition: "center center",
  },

  // Snack Packs & Grab-and-Go Provisions
  snackPacksAndCrackers: {
    id: "snackPacksAndCrackers",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.16 PM (1).jpeg",
    alt: "Care package station with boxes of Triscuit crackers, Ritz, packaged artisan chips, and portioned snack bags for neighbourhood distribution",
    title: "Packaged Snacks & Staples",
    caption: "Thoughtfully portioned snacks and family care provisions",
    category: "pantry",
    orientation: "landscape",
    preferredSection: "Get Food (Step 3), Volunteer Mosaic Stack, Community Gallery",
    objectPosition: "center center",
  },

  // Community Room with Fresh Superfoods & Daylight
  communityRoomSuperfoods: {
    id: "communityRoomSuperfoods",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.16 PM (6).jpeg",
    alt: "Bright community room with vertical blinds and a long table arranged with crackers, organic superfood blends, fresh berry cups, and grocery bags",
    title: "Community Room & Wholesome Provisions",
    caption: "Welcoming interior space and nutritious provisions for neighbours",
    category: "community",
    orientation: "landscape",
    preferredSection: "Our Story (Chapter 1), Programs (Dignity & Belonging), Gallery",
    objectPosition: "center center",
  },

  // Canned Goods & Protein Staples
  cannedPeasAndBeans: {
    id: "cannedPeasAndBeans",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.16 PM (5).jpeg",
    alt: "Stacks of canned peas, navy beans, white beans, and diced tomatoes on distribution counter beside an Ending Hunger, Nourishing Hope flyer",
    title: "Canned Staples & Non-Perishables",
    caption: "Hearty pantry staples and essential proteins for household cupboards",
    category: "staples",
    orientation: "landscape",
    preferredSection: "Donate Section, Community Giving Guidelines, Community Gallery",
    objectPosition: "center center",
  },

  // Volunteer Hall Setup
  volunteerHallSetup: {
    id: "volunteerHallSetup",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.16 PM (2).jpeg",
    alt: "Dedicated food bank volunteer in blue polo and cap preparing beverage cartons and grocery boxes in the community hall",
    title: "Behind-the-Scenes Hall Preparation",
    caption: "Volunteers preparing supplies ahead of community distribution",
    category: "volunteers",
    orientation: "portrait",
    preferredSection: "Volunteer Spotlight (Mosaic Stack), Volunteer Page, Gallery",
    objectPosition: "center 30%",
  },

  // Specialty Nutrition & Treats
  specialtyNutritionAndTreats: {
    id: "specialtyNutritionAndTreats",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.16 PM (7).jpeg",
    alt: "Close-up of Navitas Organics Goji Powder and superfood pouches with cups of treats and peanuts",
    title: "Specialty Nutrition & Treats",
    caption: "Nutritional supplements and treats for community wellness",
    category: "pantry",
    orientation: "landscape",
    preferredSection: "Community Gallery, Programs (Vulnerable Neighbours)",
    objectPosition: "center center",
  },

  // --- DUPLICATES & NEAR-DUPLICATES CATALOGED FOR TRANSPARENCY ---
  volunteerHallSetupDuplicate: {
    id: "volunteerHallSetupDuplicate",
    src: "/images/WhatsApp Image 2026-10-15 at 12.19.36 PM.jpeg",
    alt: "Duplicate image of volunteer in blue polo",
    title: "Duplicate Image",
    category: "volunteers",
    orientation: "portrait",
    preferredSection: "Skipped (Binary MD5 duplicate of WhatsApp Image 2026-10-15 at 12.14.16 PM (2).jpeg)",
    isDuplicate: true,
    duplicateOf: "volunteerHallSetup",
  },

  volunteersAtDryGoodsTableAlt: {
    id: "volunteersAtDryGoodsTableAlt",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.17 PM (3).jpeg",
    alt: "Alternate frame of volunteers at the dry goods table",
    title: "Alternate Frame Volunteers",
    category: "volunteers",
    orientation: "landscape",
    preferredSection: "Skipped (Near-duplicate of WhatsApp Image 2026-10-15 at 12.14.17 PM (2).jpeg)",
    isDuplicate: true,
    duplicateOf: "volunteersAtDryGoodsTable",
  },

  cannedGoodsTightCrop: {
    id: "cannedGoodsTightCrop",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.17 PM.jpeg",
    alt: "Tighter crop of canned peas and beans",
    title: "Tightly Cropped Cans",
    category: "staples",
    orientation: "landscape",
    preferredSection: "Skipped (Near-duplicate of WhatsApp Image 2026-10-15 at 12.14.16 PM (5).jpeg)",
    isDuplicate: true,
    duplicateOf: "cannedPeasAndBeans",
  },

  stapleNoodlesTightCrop: {
    id: "stapleNoodlesTightCrop",
    src: "/images/WhatsApp Image 2026-10-15 at 12.14.17 PM (1).jpeg",
    alt: "Tighter crop of noodles and pasta without rice bags",
    title: "Tightly Cropped Pasta",
    category: "staples",
    orientation: "landscape",
    preferredSection: "Skipped (Near-duplicate of WhatsApp Image 2026-10-15 at 12.14.16 PM (3).jpeg)",
    isDuplicate: true,
    duplicateOf: "stapleNoodlesRicePasta",
  },
};
