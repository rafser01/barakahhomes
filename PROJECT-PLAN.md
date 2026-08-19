# Barakah Homes — 30 Project Website Plan

## Goal

Create a premium, mobile-first real-estate experience where visitors can quickly understand the land-share model, discover projects, inspect legal and financial details, and register interest without feeling overwhelmed by 30 listings.

## How 30 projects should appear

The homepage should stay curated:

1. Hero with one clear promise and a visible building image.
2. Three featured projects: one hot active project, one family-focused project and one pre-launch opportunity.
3. A project directory section with all 30 projects behind filters and search.
4. Individual project pages at `/projects/[slug]` so every project can be shared directly.

The directory should support:

- Active, Pre-Launch, Construction and Completed filters.
- Location filters such as Gulshan, Banani, Uttara, Bashundhara and Mirpur.
- Budget range, flat size, handover year and remaining shares.
- Search by project name or area.
- Sorting by newest, price, availability and handover date.

## Data needed for every project

Each project should have one consistent record containing:

- Identity: name, slug, status, short description and highlight label.
- Location: full address, area, map coordinates and nearby landmarks.
- Media: cover image, 4–8 gallery images, logo/architect image and floor-plan images.
- Building: floors, total flats, flat sizes, land area and parking information.
- Money: land-share price range, construction budget range and milestone payment plan.
- Availability: sold shares, remaining shares, entrepreneur slots and floor-by-floor status.
- Legal: deed number, registration status, RAJUK status and key documents.
- Delivery: architect, builder, start date, handover date and progress timeline.
- Living: amenities, utilities, security, lifts, parking and rooftop features.
- Contact: preferred project inquiry label and responsible sales contact.

The current TypeScript `Project` type already covers the core structure. The next step is moving the records into a dedicated `data/projects.ts` file or a CMS-ready JSON/API so 30 projects can be updated without editing the page component.

## Premium animation direction

Animation should communicate quality and progress, not slow down the visitor:

- Hero: building image parallax, scroll zoom, light movement and text reveal.
- Directory: staggered card entrance, subtle 3D hover and availability-bar animation.
- Detail page: smooth route transition, image gallery crossfade and tab underline motion.
- Progress: animated construction timeline and share-availability meter.
- Contact: bright glass card with soft light drift and a clean success transition.
- Mobile: keep motion lightweight, use touch-safe transitions and honor `prefers-reduced-motion`.

## Build phases

### Phase 1 — Brand and content foundation

Collect the real project spreadsheet, approved photos, logo files, brand colors, legal wording, phone/WhatsApp number and inquiry destination.

### Phase 2 — 30-project directory

Create the shared project schema, add search/filter/sort, lazy-load cards and show featured projects separately from the full directory.

### Phase 3 — Shareable project detail pages

Move the current modal content into `/projects/[slug]` pages with gallery, floor plan, legal information, milestones, payment plan and inquiry CTA.

### Phase 4 — Inquiry and operations

Connect the contact forms to WhatsApp, email or a CRM. Add inquiry source, selected project and consent fields so the sales team receives useful leads.

### Phase 5 — World-class polish

Add page transitions, loading states, image optimization, accessibility review, mobile device QA, analytics and performance checks before launch.

## What is needed from Barakah Homes

- A spreadsheet containing the 30 verified projects.
- Final project photos and floor-plan files.
- Confirmed pricing, legal and RAJUK wording.
- Official WhatsApp number, email and office address.
- Which projects should be featured on the homepage.
- Preferred inquiry destination: WhatsApp, email, CRM or all three.
