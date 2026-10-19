# Esplanade Community Food Bank — Client Confirmation Checklist

**Document Purpose:** This document catalogs all operational, logistical, and legal details requiring formal client confirmation before activating live public services on the production website.

In accordance with our content integrity guidelines, placeholder contact details and unverified operational claims have been omitted from the public website. Once verified below, configuration variables will be updated accordingly.

---

## 1. Contact & Communications

| Item | Status | Verified Value (To Be Completed by Client) | Notes |
| :--- | :--- | :--- | :--- |
| **Official Helpline Phone** | Pending | | Primary telephone number for public inquiries |
| **Telephone Availability Hours** | Pending | | Specific days and hours when helpline is answered |
| **Official Public Email** | Pending | | General inquiry email address (e.g., info@ or hello@) |
| **Intake / Coordinator Email** | Pending | | Destination inbox for food assistance and volunteer inquiries |
| **Civic Facility Address** | Pending | | Public pantry address, suite number, and postal code |
| **Mailing / Postal Address** | Pending | | If different from facility address |
| **Social Media Profiles** | Pending | | Official Instagram, Facebook, LinkedIn, or Bluesky handles |

---

## 2. Food Assistance & Distribution

| Item | Status | Verified Value (To Be Completed by Client) | Notes |
| :--- | :--- | :--- | :--- |
| **Distribution Days & Hours** | Pending | | Specific days of the week and operating hours for food distribution |
| **Intake / Registration Requirements** | Pending | | Identification or documentation requirements, if any |
| **Service Boundaries** | Pending | | Geographic catchment area (e.g. St. Lawrence / The Esplanade / Downtown East) |
| **Walk-In Policy** | Pending | | Whether walk-in assistance is available or prior inquiry required |
| **Home Delivery Services** | Pending | | Availability, criteria, and schedule for senior/mobility home delivery |
| **Dietary Accommodation Offerings** | Pending | | Specific availability of Halal, Kosher, gluten-free, or vegetarian items |
| **Facility Accessibility** | Pending | | Barrier-free access, ramps, elevator access, or transit proximity |

---

## 3. Donations & Charitable Status

| Item | Status | Verified Value (To Be Completed by Client) | Notes |
| :--- | :--- | :--- | :--- |
| **CRA Charitable Registration #** | Pending | | 15-digit Canadian Charity Registration Number (RR0001) |
| **Tax Receipting Policy** | Pending | | Minimum donation threshold for tax receipts (e.g. $20+) |
| **Online Donation Provider** | Pending | | Preferred payment platform (e.g. CanadaHelps, Stripe, Zeffy, PayPal) |
| **Accepted Physical Donation Items** | Pending | | Verified list of priority non-perishable food and personal care goods |
| **Drop-Off Location & Schedule** | Pending | | Designated receiving hours and loading dock directions |
| **Commercial / Grower Food Rescue** | Pending | | Procedures for supermarkets, distributors, and farm surpluses |

---

## 4. Volunteer Opportunities

| Item | Status | Verified Value (To Be Completed by Client) | Notes |
| :--- | :--- | :--- | :--- |
| **Active Volunteer Roles** | Pending | | Confirmation of specific roles needed (e.g. sorting, hospitality, delivery) |
| **Shift Commitment & Timing** | Pending | | Standard shift durations and weekly scheduling expectations |
| **Orientation & Training** | Pending | | Requirements for orientation sessions, police record checks, or age minimums |

---

## 5. Visual Assets & Photography

| Item | Status | Verified Value (To Be Completed by Client) | Notes |
| :--- | :--- | :--- | :--- |
| **High-Resolution Logo** | Active (`/public/images/logo.jpeg`) | | Vector (SVG) or transparent PNG version if available |
| **Founder & Family Photographs** | Pending | | Archival family, "Bucket Ministry", or community photos for Our Story page |
| **Authentic Community Photos** | Pending | | Client-authorized photos of actual pantry activities with signed model releases |

---

## 6. Live Technical Service Integrations

Before disabling the development test-preview mode on web forms, the following third-party credentials must be provisioned in the hosting environment (`.env.production`):

- [ ] **Resend or SendGrid API Key** (`RESEND_API_KEY`) for transactional email delivery
- [ ] **PostgreSQL Database Connection** (`DATABASE_URL`) for persistent inquiry storage
- [ ] **Cloudflare Turnstile Secret Key** (`TURNSTILE_SECRET_KEY`) for bot protection
- [ ] **Upstash Redis Credentials** (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) for persistent distributed rate-limiting

*All four endpoints (`/api/contact`, `/api/volunteer`, `/api/get-food`, `/api/subscribe`) fail closed in production when these credentials are unconfigured.*
