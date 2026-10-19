---
name: Warm Canopy
colors:
  surface: '#effdf0'
  surface-dim: '#d0ded1'
  surface-bright: '#effdf0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f7eb'
  surface-container: '#e3f2e5'
  surface-container-high: '#deecdf'
  surface-container-highest: '#d8e6da'
  on-surface: '#121e17'
  on-surface-variant: '#414941'
  inverse-surface: '#27332b'
  inverse-on-surface: '#e6f4e8'
  outline: '#717971'
  outline-variant: '#c0c9bf'
  surface-tint: '#336946'
  primary: '#094425'
  on-primary: '#ffffff'
  primary-container: '#265c3a'
  on-primary-container: '#99d2a7'
  inverse-primary: '#9ad4a9'
  secondary: '#39693b'
  on-secondary: '#ffffff'
  secondary-container: '#b8edb3'
  on-secondary-container: '#3e6d3e'
  tertiary: '#503600'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e4b00'
  on-tertiary-container: '#f9ba4c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b6f0c3'
  primary-fixed-dim: '#9ad4a9'
  on-primary-fixed: '#00210e'
  on-primary-fixed-variant: '#195130'
  secondary-fixed: '#baf0b6'
  secondary-fixed-dim: '#9fd49b'
  on-secondary-fixed: '#002105'
  on-secondary-fixed-variant: '#215025'
  tertiary-fixed: '#ffdead'
  tertiary-fixed-dim: '#fabc4d'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#604100'
  background: '#effdf0'
  on-background: '#121e17'
  surface-variant: '#d8e6da'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2rem
  margin: 1.25rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3.5rem
---

## Brand & Style

### Brand Personality & Core Purpose
The brand voice is compassionate, deeply rooted, dignified, and universally welcoming. Grounded in the spirit of the community tree illustration, the system represents mutual aid, organic nourishment, and multi-generational care. Every interaction must remove anxiety, eliminate stigma, and offer immediate clarity for people seeking food assistance, volunteers offering their time, or neighbours donating resources.

### Target Audience & Emotional Impact
- **Clients & Families:** Seniors, families with children, immigrants, and neighbours facing food insecurity who need prompt, stigma-free access to food distribution schedules, dietary options, and registration.
- **Volunteers & Donors:** Local community members seeking tangible, transparent ways to pack hampers, drive delivery routes, or contribute financial and perishable gifts.
- **Emotional Response:** Comfort, hospitality, safety, and mutual dignity. The interface should feel like walking into a bright, sun-dappled neighbourhood pantry staffed by caring neighbours—never bureaucratic, sterile, or institutional.

### Visual Style Philosophy
This design system pairs **Soft Organic Warmth** with **Accessible Modern Humanism**:
- Deep forest and leaf-toned greens evoke vitality, seasonal fresh produce, and stability.
- Rich warm sands, cream linen washes, and sunlit golds replace stark cool whites, eliminating visual fatigue and sterility.
- Generous corner radii (`rounded-2xl` and `rounded-3xl`), pill badges, and tactile organic containers reflect the friendly, rounded leaves of the community canopy.
- Generous physical tap targets, high-contrast readable copy, and clear informational hierarchy prioritize elderly visitors and varied digital literacy levels.

## Colors

### Color Hierarchy & Roles
- **Primary Forest Green (`#265C3A`):** The steadfast anchor. Applied to dominant brand identifiers, hero section backdrops, primary action buttons, key icon emblems, and heavyweight header copy.
- **Secondary Sage Green (`#5B8C5A`):** The living accent. Utilized for interactive status badges, secondary buttons, subtle borders, leaf motifs, and iconography indicating fresh produce or pantry schedules.
- **Tertiary Harvest Gold (`#E5A93C`):** The beacon of warmth. Reserved for urgent support alerts, donation impact metrics, feature spotlights, and active step badges.
- **Accent Berry Red (`#C93B2B`):** The heart and immediate urgency indicator. Derived from the central basket heart, reserved for emergency food notices, immediate crisis hotlines, and critical callout buttons.
- **Dark Neutral Woodland Black (`#1E2A22`):** Delivers WCAG AAA-compliant legibility across all warm background tints without the harshness of pure black (`#000000`).

### Surface & Ambient Tint Strategy
Pure white (`#FFFFFF`) is used sparingly—only for crisp interior card elevations to ensure clean distinction against tinted backgrounds:
- **Warm Cream Canvas (`#FBF8F1`):** The default screen and page canvas tone, imparting organic warmth.
- **Soft Muted Gold Tint (`#FEF6E8`):** Alternating section container for donor spotlights, impact metrics, and volunteer highlights.
- **Fresh Herb Tint (`#EBF3EC`):** Supportive card fills for schedule hours, location details, and dietary information tags.

## Typography

### Typographic Principles
- **Universal Accessibility First:** To guarantee instant readability for seniors, multilingual families, and patrons with vision impairment, standard body text never drops below 18px (`1.125rem`). Subtext and metadata retain a strict floor of 14px (`0.875rem`).
- **Plus Jakarta Sans:** Selected for its open apertures, rounded terminals, tall x-height, and clean geometric curves that resonate with the friendly illustrated leaf canopy.
- **Rhythm & Optical Weight:** Large headings feature tight negative tracking (`-0.015em` to `-0.02em`) to bind headline phrases into cohesive statements. Body text maintains open line height (`1.55` to `1.6`) to prevent eye fatigue across long reading passages.

## Layout & Spacing

### Layout Structure & Responsiveness
- **Desktop (1024px+):** Max-width container of `1280px` centered with fluid 12-column grid, `2rem` gutters, and `3rem` canvas margins.
- **Tablet (768px - 1023px):** 8-column layout with `1.5rem` gutters and `2rem` margins. Multicolumn forms simplify into stacked dual-column patterns.
- **Mobile (< 768px):** Single-column stack with `1.25rem` horizontal safe margin. All buttons, list items, and input controls span 100% width or lock to ergonomic bottom thumb zones.

### Vertical Rhythm
- Section blocks use generous vertical padding (`space-xl` to `4.5rem`) alternating between Warm Cream (`#FBF8F1`), Herb Tint (`#EBF3EC`), and Soft Muted Gold (`#FEF6E8`) to create distinct, non-jarring topical boundaries.
- Card interiors enforce balanced padding: minimum `1.5rem` on mobile, scaling to `2rem` on desktop to allow adequate room around large 18px body copy.

## Elevation & Depth

### Atmospheric Tonal Layering
Rather than cold drop shadows, depth is achieved through gentle atmospheric warm layering:
- **Base Canvas:** `#FBF8F1` serves as the grounding plane.
- **Level 1 (Card & Section Containers):** `#FFFFFF` surfaces sitting on `#FBF8F1`, bounded by a soft ghost border (`1.5px solid rgba(38, 92, 58, 0.08)`).
- **Level 2 (Interactive Floating Elements & Modals):** Gentle diffused shadow tinted with forest-green undertones: `box-shadow: 0 12px 32px -8px rgba(38, 92, 58, 0.12), 0 4px 12px -2px rgba(38, 92, 58, 0.06)`.
- **Level 3 (Urgent Alerts & Modals):** High-relief card lifted with `box-shadow: 0 20px 40px -12px rgba(30, 42, 34, 0.18)` and an accented top border in Tertiary Gold (`#E5A93C`) or Berry Red (`#C93B2B`).

## Shapes

### Organic Pill & Soft Contour Language
- **Level 3 (Pill-shaped):** Form controls, interaction triggers, status indicators, and badges feature fully rounded pill shapes (`border-radius: 9999px`).
- **Surface Panels & Cards:** Major containers, food parcel cards, and informational tiles adopt `rounded-2xl` (`1.25rem`) and `rounded-3xl` (`1.75rem`) corner radii, echoing the organic leaves and basket curves of the community emblem.
- **Imagery & Illustrations:** Photography and graphics are housed in organic capsules or softly rounded window cuts (`1.5rem` to `2.5rem`) with soft borders.

## Components

### Buttons
- **Primary Action (e.g., 'Find Food Today', 'Register'):** High-density `#265C3A` background with crisp white `#FFFFFF` text, pill shape (`rounded-full`), min-height `56px`, and horizontal padding `2rem`. Hover: `#1B442A` with a micro-lift of `-1px`.
- **Secondary Action (e.g., 'Volunteer Hours', 'Donate Goods'):** Warm Cream or Herb Tint fill with `2px solid #5B8C5A`, `#265C3A` label, min-height `56px`. Hover: `#5B8C5A` background with white text.
- **Urgent Crisis Button (e.g., 'Emergency Hamper'):** `#C93B2B` fill with `#FFFFFF` label, subtle pulse or heart icon prefix.
- **Minimum Tap Target:** Strict `52px` vertical hit state across all viewports to accommodate motor-impaired and elderly users.

### Cards & Informational Tiles
- **Pantry / Distribution Card:** Solid `#FFFFFF` background, `rounded-3xl`, padded with `2rem`, subtle leaf-green border (`1.5px solid rgba(38, 92, 58, 0.1)`). Features a header badge, clear delivery/pickup schedule, bold address, and primary action pill.
- **Impact & Callout Card:** Soft Muted Gold (`#FEF6E8`) surface with a warm accent icon pill in Harvest Gold (`#E5A93C`), large numerical callout in Forest Green (`#265C3A`), and 18px supporting copy.

### Chips & Status Badges
- **Capsule Pill Badges:** Min-height `36px`, rounded pill (`rounded-full`), padding `0.375rem 1rem`.
- **Dietary & Category Tags:** Halal, Kosher, Vegetarian, Baby Supplies, and Senior Priority tags use Fresh Herb Tint (`#EBF3EC`) with `#265C3A` bold label (`label-md`).
- **Hours & Status:** "Open Today" badge pairs an emerald dot with `#265C3A` on `#EBF3EC`; "Emergency Alert" pairs `#C93B2B` text on `#FDF2F0`.

### Form Controls & Inputs
- **Text & Select Inputs:** Min-height `56px`, background `#FFFFFF`, border `2px solid rgba(38, 92, 58, 0.2)`, `rounded-2xl`, internal padding `1rem 1.25rem`, font size `18px`.
- **Focus States:** Crisp ring: `0 0 0 4px rgba(91, 140, 90, 0.35)`, border switches to `#265C3A`.
- **Assistive Text:** Set at 16px (`label-lg`) positioned directly below the field with high-contrast neutral `#1E2A22`.

### Checkboxes & Radio Buttons
- Generous `28px x 28px` touch target with `#265C3A` active fill, `rounded-lg` for checkboxes, circular for radios, enclosing a clear white check icon or solid inner pip.