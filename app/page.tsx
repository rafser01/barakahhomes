"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";

type ProjectStatus = "Active" | "Pre-Launch";
type FloorStatus = "Available" | "Sold" | "Entrepreneur" | `${number} Left`;

type Project = {
  id: number;
  name: string;
  location: string;
  area: string;
  floors: number;
  totalFlats: number;
  flatSize: string;
  soldShares: number;
  priceFrom: number;
  priceTo: number;
  status: ProjectStatus;
  img: string;
  imgs: string[];
  entrepreneursNeeded: number;
  entrepreneursJoined: number;
  completion: string;
  landArea: string;
  landPrice: string;
  registrationStatus: string;
  architect: string;
  highlight: boolean;
  floorPlan: Array<{
    floor: string;
    flats: number;
    type: string;
    price: string;
    size: string;
    status: FloorStatus;
  }>;
  timeline: Array<{ date: string; event: string; done: boolean }>;
  amenities: string[];
  nearbyLandmarks: string[];
};

const projects: Project[] = [
  {
    id: 1,
    name: "Barakah Heights — Phase 1",
    location: "Gulshan-2, Road 54, Dhaka",
    area: "Gulshan, Dhaka",
    floors: 9,
    totalFlats: 36,
    flatSize: "1,200–1,450 sq ft",
    soldShares: 28,
    priceFrom: 2_000_000,
    priceTo: 3_000_000,
    status: "Active",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1100&h=760&fit=crop&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600494448850-6013c64ba722?w=1100&h=760&fit=crop&auto=format",
    ],
    entrepreneursNeeded: 6,
    entrepreneursJoined: 6,
    completion: "Dec 2026",
    landArea: "5 Katha",
    landPrice: "3.2 Crore BDT",
    registrationStatus: "Registered — Deed No. DCC-2024-7814",
    architect: "Ar. Kamal Hossain & Associates",
    highlight: true,
    floorPlan: [
      { floor: "Ground (G)", flats: 4, type: "Commercial / Parking", price: "30 Lac", size: "1,450 sq ft", status: "Sold" },
      { floor: "1st Floor", flats: 4, type: "Residential", price: "22 Lac", size: "1,250 sq ft", status: "Sold" },
      { floor: "2nd Floor", flats: 4, type: "Residential", price: "22 Lac", size: "1,250 sq ft", status: "Sold" },
      { floor: "3rd Floor", flats: 4, type: "Residential", price: "23 Lac", size: "1,250 sq ft", status: "Sold" },
      { floor: "4th Floor", flats: 4, type: "Residential", price: "23 Lac", size: "1,250 sq ft", status: "Sold" },
      { floor: "5th Floor", flats: 4, type: "Residential", price: "25 Lac", size: "1,300 sq ft", status: "Sold" },
      { floor: "6th Floor", flats: 4, type: "Residential", price: "25 Lac", size: "1,300 sq ft", status: "Sold" },
      { floor: "7th Floor", flats: 4, type: "Residential", price: "27 Lac", size: "1,350 sq ft", status: "2 Left" },
      { floor: "8th Floor", flats: 4, type: "Residential", price: "27 Lac", size: "1,350 sq ft", status: "2 Left" },
      { floor: "9th (Top)", flats: 4, type: "Penthouse + Roof", price: "30 Lac", size: "1,450 sq ft", status: "Available" },
    ],
    timeline: [
      { date: "Jan 2024", event: "Land purchased & registered", done: true },
      { date: "Mar 2024", event: "Building plan approved by RAJUK", done: true },
      { date: "Jun 2024", event: "Entrepreneur partners onboarded", done: true },
      { date: "Sep 2024", event: "Public land shares opened", done: true },
      { date: "Mar 2025", event: "All land shares distributed to owners", done: false },
      { date: "Jun 2025", event: "Construction begins", done: false },
      { date: "Dec 2026", event: "Handover & possession", done: false },
    ],
    amenities: ["24/7 Security", "CCTV Surveillance", "Generator Backup", "Two Lifts", "Rooftop Garden", "Underground Parking", "TITAS Gas Line", "Fire Safety System"],
    nearbyLandmarks: ["500m — Gulshan-2 Circle", "800m — United Hospital", "1.2km — Gulshan Club", "2km — Hatirjheel Lake"],
  },
  {
    id: 2,
    name: "Barakah Garden View",
    location: "Bashundhara R/A, Block C, Dhaka",
    area: "Bashundhara, Dhaka",
    floors: 7,
    totalFlats: 28,
    flatSize: "1,100–1,300 sq ft",
    soldShares: 12,
    priceFrom: 1_800_000,
    priceTo: 2_500_000,
    status: "Active",
    img: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?w=1100&h=760&fit=crop&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1614595737476-42487331b8a1?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1100&h=760&fit=crop&auto=format",
    ],
    entrepreneursNeeded: 5,
    entrepreneursJoined: 4,
    completion: "Mar 2027",
    landArea: "4 Katha",
    landPrice: "2.4 Crore BDT",
    registrationStatus: "Registered — Deed No. DCC-2024-9203",
    architect: "Ar. Sadia Rahman Design Studio",
    highlight: false,
    floorPlan: [
      { floor: "Ground (G)", flats: 4, type: "Parking / Lobby", price: "25 Lac", size: "1,300 sq ft", status: "Available" },
      { floor: "1st Floor", flats: 4, type: "Residential", price: "18 Lac", size: "1,100 sq ft", status: "Sold" },
      { floor: "2nd Floor", flats: 4, type: "Residential", price: "18 Lac", size: "1,100 sq ft", status: "Sold" },
      { floor: "3rd Floor", flats: 4, type: "Residential", price: "20 Lac", size: "1,200 sq ft", status: "3 Left" },
      { floor: "4th Floor", flats: 4, type: "Residential", price: "20 Lac", size: "1,200 sq ft", status: "Available" },
      { floor: "5th Floor", flats: 4, type: "Residential", price: "22 Lac", size: "1,250 sq ft", status: "Available" },
      { floor: "6th Floor", flats: 4, type: "Residential", price: "22 Lac", size: "1,250 sq ft", status: "Available" },
      { floor: "7th (Top)", flats: 4, type: "Penthouse + Roof", price: "25 Lac", size: "1,300 sq ft", status: "Available" },
    ],
    timeline: [
      { date: "Apr 2024", event: "Land purchased & registered", done: true },
      { date: "Jul 2024", event: "Building plan approved by RAJUK", done: true },
      { date: "Oct 2024", event: "Entrepreneur partners onboarding", done: true },
      { date: "Feb 2025", event: "Public land shares open", done: false },
      { date: "Aug 2025", event: "All shares distributed", done: false },
      { date: "Oct 2025", event: "Construction begins", done: false },
      { date: "Mar 2027", event: "Handover & possession", done: false },
    ],
    amenities: ["24/7 Security", "CCTV Surveillance", "Generator Backup", "Lift", "Rooftop Access", "Ground Parking", "TITAS Gas Line", "Intercom System"],
    nearbyLandmarks: ["300m — Bashundhara City Mall", "600m — North South University", "1km — Aftabnagar Lake", "1.5km — Badda Link Road"],
  },
  {
    id: 3,
    name: "Barakah Skyline Tower",
    location: "Banani, Block J, Road 11, Dhaka",
    area: "Banani, Dhaka",
    floors: 11,
    totalFlats: 44,
    flatSize: "1,400–1,800 sq ft",
    soldShares: 6,
    priceFrom: 2_500_000,
    priceTo: 3_500_000,
    status: "Pre-Launch",
    img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1100&h=760&fit=crop&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1694343906811-ca20586db78b?w=1100&h=760&fit=crop&auto=format",
    ],
    entrepreneursNeeded: 6,
    entrepreneursJoined: 2,
    completion: "Jun 2027",
    landArea: "6 Katha",
    landPrice: "4.8 Crore BDT",
    registrationStatus: "Under Registration — Expected Jan 2025",
    architect: "Ar. Rafiqul Islam & Partners",
    highlight: false,
    floorPlan: [
      { floor: "Ground (G)", flats: 4, type: "Commercial / Lobby", price: "35 Lac", size: "1,800 sq ft", status: "Available" },
      { floor: "1st Floor", flats: 4, type: "Residential", price: "25 Lac", size: "1,400 sq ft", status: "Available" },
      { floor: "2nd Floor", flats: 4, type: "Residential", price: "25 Lac", size: "1,400 sq ft", status: "Available" },
      { floor: "3rd Floor", flats: 4, type: "Residential", price: "27 Lac", size: "1,500 sq ft", status: "Available" },
      { floor: "4th Floor", flats: 4, type: "Residential", price: "27 Lac", size: "1,500 sq ft", status: "Available" },
      { floor: "5th Floor", flats: 4, type: "Residential", price: "28 Lac", size: "1,550 sq ft", status: "Available" },
      { floor: "6th Floor", flats: 4, type: "Residential", price: "28 Lac", size: "1,550 sq ft", status: "Available" },
      { floor: "7th Floor", flats: 4, type: "Residential", price: "30 Lac", size: "1,600 sq ft", status: "Entrepreneur" },
      { floor: "8th Floor", flats: 4, type: "Residential", price: "30 Lac", size: "1,600 sq ft", status: "Entrepreneur" },
      { floor: "9th Floor", flats: 4, type: "Residential", price: "32 Lac", size: "1,700 sq ft", status: "Available" },
      { floor: "10th Floor", flats: 4, type: "Residential", price: "32 Lac", size: "1,700 sq ft", status: "Available" },
      { floor: "11th (Top)", flats: 4, type: "Penthouse + Roof", price: "35 Lac", size: "1,800 sq ft", status: "Available" },
    ],
    timeline: [
      { date: "Oct 2024", event: "Land acquired", done: true },
      { date: "Jan 2025", event: "Land registration complete", done: false },
      { date: "Apr 2025", event: "Building plan approved by RAJUK", done: false },
      { date: "Jul 2025", event: "Entrepreneur partners onboarded", done: false },
      { date: "Oct 2025", event: "Public shares open", done: false },
      { date: "Jan 2026", event: "Construction begins", done: false },
      { date: "Jun 2027", event: "Handover & possession", done: false },
    ],
    amenities: ["Armed Security", "Video Intercom", "Dual Generator", "Two High-Speed Lifts", "Rooftop Pool", "Basement Parking", "Fire Suppression", "Children's Play Area", "Gym Room"],
    nearbyLandmarks: ["400m — Banani Club", "700m — Banani Lake", "1km — Kamal Ataturk Avenue", "1.5km — Gulshan-1 Circle"],
  },
  {
    id: 4,
    name: "Barakah Mirpur Residency",
    location: "Mirpur DOHS, Road 6, Dhaka",
    area: "Mirpur, Dhaka",
    floors: 8,
    totalFlats: 32,
    flatSize: "950–1,150 sq ft",
    soldShares: 5,
    priceFrom: 1_500_000,
    priceTo: 2_200_000,
    status: "Pre-Launch",
    img: "https://images.unsplash.com/photo-1585074773760-751694845cd9?w=1100&h=760&fit=crop&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1585074773760-751694845cd9?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?w=1100&h=760&fit=crop&auto=format",
    ],
    entrepreneursNeeded: 5,
    entrepreneursJoined: 1,
    completion: "Sep 2027",
    landArea: "3.5 Katha",
    landPrice: "1.8 Crore BDT",
    registrationStatus: "Under Negotiation — Expected Feb 2025",
    architect: "To be appointed collectively",
    highlight: false,
    floorPlan: [
      { floor: "Ground (G)", flats: 4, type: "Parking / Lobby", price: "22 Lac", size: "1,150 sq ft", status: "Available" },
      { floor: "1st Floor", flats: 4, type: "Residential", price: "15 Lac", size: "950 sq ft", status: "Available" },
      { floor: "2nd Floor", flats: 4, type: "Residential", price: "15 Lac", size: "950 sq ft", status: "Entrepreneur" },
      { floor: "3rd Floor", flats: 4, type: "Residential", price: "17 Lac", size: "1,000 sq ft", status: "Available" },
      { floor: "4th Floor", flats: 4, type: "Residential", price: "17 Lac", size: "1,000 sq ft", status: "Available" },
      { floor: "5th Floor", flats: 4, type: "Residential", price: "19 Lac", size: "1,100 sq ft", status: "Available" },
      { floor: "6th Floor", flats: 4, type: "Residential", price: "19 Lac", size: "1,100 sq ft", status: "Available" },
      { floor: "7th Floor", flats: 4, type: "Residential", price: "20 Lac", size: "1,100 sq ft", status: "Available" },
      { floor: "8th (Top)", flats: 4, type: "Penthouse + Roof", price: "22 Lac", size: "1,150 sq ft", status: "Available" },
    ],
    timeline: [
      { date: "Nov 2024", event: "Land negotiations started", done: true },
      { date: "Feb 2025", event: "Land purchased & registered", done: false },
      { date: "May 2025", event: "Building plan approved", done: false },
      { date: "Aug 2025", event: "Entrepreneur partners onboarded", done: false },
      { date: "Nov 2025", event: "Public shares open", done: false },
      { date: "Feb 2026", event: "Construction begins", done: false },
      { date: "Sep 2027", event: "Handover & possession", done: false },
    ],
    amenities: ["Security Guard", "CCTV Surveillance", "Generator Backup", "Lift", "Rooftop Access", "Parking", "TITAS Gas Line"],
    nearbyLandmarks: ["300m — Mirpur DOHS Market", "600m — Army Golf Club", "1km — Mirpur-10 Circle", "2km — National Zoo"],
  },
  {
    id: 5,
    name: "Barakah Lakeview Villas",
    location: "Uttara Sector 10, Road 12, Dhaka",
    area: "Uttara, Dhaka",
    floors: 6,
    totalFlats: 24,
    flatSize: "1,250–1,550 sq ft",
    soldShares: 9,
    priceFrom: 2_100_000,
    priceTo: 2_800_000,
    status: "Active",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1100&h=760&fit=crop&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1100&h=760&fit=crop&auto=format",
    ],
    entrepreneursNeeded: 5,
    entrepreneursJoined: 5,
    completion: "Nov 2027",
    landArea: "4.5 Katha",
    landPrice: "2.9 Crore BDT",
    registrationStatus: "Registered — Deed No. DCC-2025-1042",
    architect: "Studio North Architecture",
    highlight: false,
    floorPlan: [
      { floor: "Ground (G)", flats: 4, type: "Parking / Lobby", price: "28 Lac", size: "1,550 sq ft", status: "Sold" },
      { floor: "1st Floor", flats: 4, type: "Residential", price: "21 Lac", size: "1,250 sq ft", status: "Sold" },
      { floor: "2nd Floor", flats: 4, type: "Residential", price: "21 Lac", size: "1,250 sq ft", status: "Sold" },
      { floor: "3rd Floor", flats: 4, type: "Residential", price: "23 Lac", size: "1,350 sq ft", status: "3 Left" },
      { floor: "4th Floor", flats: 4, type: "Residential", price: "24 Lac", size: "1,400 sq ft", status: "Available" },
      { floor: "5th Floor", flats: 4, type: "Residential", price: "25 Lac", size: "1,450 sq ft", status: "Available" },
      { floor: "6th (Top)", flats: 4, type: "Penthouse + Roof", price: "28 Lac", size: "1,550 sq ft", status: "Available" },
    ],
    timeline: [
      { date: "Feb 2025", event: "Land purchased & registered", done: true },
      { date: "May 2025", event: "Building plan submitted to RAJUK", done: true },
      { date: "Aug 2025", event: "Entrepreneur partners onboarded", done: true },
      { date: "Jan 2026", event: "Public land shares opened", done: false },
      { date: "Jun 2026", event: "All shares distributed", done: false },
      { date: "Sep 2026", event: "Construction begins", done: false },
      { date: "Nov 2027", event: "Handover & possession", done: false },
    ],
    amenities: ["24/7 Security", "CCTV Surveillance", "Generator Backup", "Two Lifts", "Lake-facing Rooftop", "Basement Parking", "TITAS Gas Line", "Community Lounge"],
    nearbyLandmarks: ["450m — Uttara Lake", "700m — Rajuk Uttara Model College", "1km — Uttara Crescent Hospital", "1.4km — Uttara North Metro"],
  },
  {
    id: 6,
    name: "Barakah Uttara Courtyard",
    location: "Uttara Sector 12, Road 8, Dhaka",
    area: "Uttara, Dhaka",
    floors: 8,
    totalFlats: 32,
    flatSize: "1,050–1,350 sq ft",
    soldShares: 3,
    priceFrom: 1_600_000,
    priceTo: 2_300_000,
    status: "Pre-Launch",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1100&h=760&fit=crop&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1100&h=760&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1100&h=760&fit=crop&auto=format",
    ],
    entrepreneursNeeded: 5,
    entrepreneursJoined: 2,
    completion: "Apr 2028",
    landArea: "4 Katha",
    landPrice: "2.1 Crore BDT",
    registrationStatus: "Under Registration — Expected Oct 2026",
    architect: "Ar. Nabila Karim & Studio",
    highlight: false,
    floorPlan: [
      { floor: "Ground (G)", flats: 4, type: "Parking / Lobby", price: "23 Lac", size: "1,350 sq ft", status: "Available" },
      { floor: "1st Floor", flats: 4, type: "Residential", price: "16 Lac", size: "1,050 sq ft", status: "Entrepreneur" },
      { floor: "2nd Floor", flats: 4, type: "Residential", price: "16 Lac", size: "1,050 sq ft", status: "Entrepreneur" },
      { floor: "3rd Floor", flats: 4, type: "Residential", price: "18 Lac", size: "1,150 sq ft", status: "Available" },
      { floor: "4th Floor", flats: 4, type: "Residential", price: "18 Lac", size: "1,150 sq ft", status: "Available" },
      { floor: "5th Floor", flats: 4, type: "Residential", price: "20 Lac", size: "1,250 sq ft", status: "Available" },
      { floor: "6th Floor", flats: 4, type: "Residential", price: "20 Lac", size: "1,250 sq ft", status: "Available" },
      { floor: "7th (Top)", flats: 4, type: "Penthouse + Roof", price: "23 Lac", size: "1,350 sq ft", status: "Available" },
    ],
    timeline: [
      { date: "Jun 2025", event: "Land shortlisted & due diligence started", done: true },
      { date: "Oct 2026", event: "Land registration complete", done: false },
      { date: "Jan 2027", event: "Building plan approved", done: false },
      { date: "Apr 2027", event: "Entrepreneur partners onboarded", done: false },
      { date: "Jul 2027", event: "Public shares open", done: false },
      { date: "Sep 2027", event: "Construction begins", done: false },
      { date: "Apr 2028", event: "Handover & possession", done: false },
    ],
    amenities: ["Security Guard", "CCTV Surveillance", "Generator Backup", "Lift", "Courtyard Garden", "Ground Parking", "TITAS Gas Line", "Intercom System"],
    nearbyLandmarks: ["500m — Uttara Sector 12 Park", "900m — Milestone School", "1.2km — House Building Metro", "1.8km — Diabari Lake"],
  },
];

const steps = [
  { num: "01", title: "We Buy the Land", desc: "We secure a prime, legally cleared plot in a high-demand Dhaka neighbourhood." },
  { num: "02", title: "Plan & Approval", desc: "Architects create the building plan and we obtain the required RAJUK approval." },
  { num: "03", title: "Partners Join First", desc: "Five to six founding entrepreneurs co-own the development at preferred pricing." },
  { num: "04", title: "Shares Go Public", desc: "Remaining flats are offered with a proportional, registered share of the land." },
  { num: "05", title: "Deed in Your Name", desc: "Your land share is legally transferred and registered before construction begins." },
  { num: "06", title: "We Build Together", desc: "Owners collectively appoint the builder while our team manages quality and progress." },
];

const faqs = [
  { q: "What exactly do I own when I buy a Land Share?", a: "You own a proportional registered share of the land plot itself—not just a promise of a flat. Your name is placed on the legal deed before construction begins." },
  { q: "How is the price of each share determined?", a: "Prices range from BDT 15 Lac to 35 Lac depending on project location, floor level and flat position. Ground-floor commercial and penthouse shares carry premium pricing." },
  { q: "What protects me if construction is delayed?", a: "Your investment is backed by registered land ownership. The land share remains legally yours and can be sold or transferred according to the project agreement." },
  { q: "Who manages construction?", a: "Shareholders collectively appoint a licensed contractor. Barakah Homes facilitates selection and oversees project timing, reporting and quality control." },
  { q: "Can I sell my share before completion?", a: "Yes. Because the land is registered in your name, your share can be transferred or sold before the building is complete, subject to the agreement terms." },
  { q: "Is RAJUK approval required?", a: "Yes. Active projects open to public buyers only after the relevant land checks and building-plan approval have been completed." },
];

const paymentPlan = [
  { phase: "Booking", pct: "20%", note: "Reserve your selected land share" },
  { phase: "Land Registration", pct: "30%", note: "Legal deed is transferred to your name" },
  { phase: "Foundation", pct: "20%", note: "Paid when construction begins" },
  { phase: "Structure Complete", pct: "20%", note: "Paid after structural completion" },
  { phase: "Handover", pct: "10%", note: "Final payment on possession" },
];

const fmtLac = (value: number) => `${Math.round(value / 100_000)} Lac`;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="Barakah Homes home">
      <span className={`logo-lockup ${compact ? "h-16 w-24" : "h-20 w-28"} relative block overflow-hidden rounded-sm`}>
        <picture className="block h-full w-full">
          <source srcSet="/barakah-logo-transparent-smooth.apng" type="image/apng" />
          <Image
            src="/barakah-logo-transparent-smooth.png"
            alt="Barakah Homes Ltd animated logo"
            width={280}
            height={280}
            unoptimized
            priority
            className="h-full w-full scale-[1.08] object-contain"
          />
        </picture>
      </span>
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">{children}</p>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="view-reveal mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-3xl leading-tight text-heading sm:text-4xl lg:text-5xl">{title}</h2>
      {copy && <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-subtle sm:text-base">{copy}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: FloorStatus }) {
  const style = status === "Sold"
    ? "border-green/40 bg-green/15 text-green-light"
    : status === "Entrepreneur"
      ? "border-gold/40 bg-gold/10 text-gold"
      : status.includes("Left")
        ? "border-orange-400/35 bg-orange-400/10 text-orange-300"
        : "border-border bg-panel text-subtle";
  return <span className={`inline-flex whitespace-nowrap border px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.1em] ${style}`}>{status}</span>;
}

function ShareProgress({ project, compact = false }: { project: Project; compact?: boolean }) {
  const percentage = Math.round((project.soldShares / project.totalFlats) * 100);
  const remaining = project.totalFlats - project.soldShares;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-subtle">{project.soldShares} shares sold</span>
        <span className={remaining <= 5 ? "font-semibold text-orange-300" : "font-semibold text-green-light"}>{remaining} left</span>
      </div>
      <div className={`${compact ? "h-1" : "h-1.5"} overflow-hidden rounded-full bg-border`}>
        <div className="h-full rounded-full bg-gradient-to-r from-green to-gold" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className={`project-card view-reveal group relative overflow-hidden rounded-sm border bg-surface shadow-[0_20px_70px_rgba(0,0,0,.28)] transition duration-500 hover:shadow-[0_32px_90px_rgba(0,0,0,.48)] ${project.highlight ? "border-gold/70" : "border-border"}`}>
      <div className="relative h-56 overflow-hidden sm:h-64">
        <Image src={project.img} alt={project.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/20 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className={`px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-white ${project.status === "Active" ? "bg-green" : "bg-muted"}`}>{project.status}</span>
          {project.highlight && <span className="bg-gold px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-ground">Hot deal</span>}
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <h3 className="font-display text-xl text-heading sm:text-2xl">{project.name}</h3>
          <p className="mt-1 text-xs text-subtle">Dhaka · {project.area}</p>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="mb-5 grid grid-cols-3 gap-2">
          {[
            ["Structure", `G+${project.floors}`],
            ["Flats", String(project.totalFlats)],
            ["Handover", project.completion],
          ].map(([label, value]) => (
            <div key={label} className="border border-border bg-panel p-2.5 text-center">
              <p className="text-sm font-semibold text-gold">{value}</p>
              <p className="mt-1 text-[0.52rem] uppercase tracking-[0.13em] text-muted">{label}</p>
            </div>
          ))}
        </div>
        <p className="mb-5 text-lg font-semibold text-gold">
          {fmtLac(project.priceFrom)} <span className="text-xs font-normal text-muted">–</span> {fmtLac(project.priceTo)}
          <span className="ml-1 text-[0.68rem] font-normal text-muted">BDT / share</span>
        </p>
        <ShareProgress project={project} compact />
        <div className="my-5 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-border bg-panel p-3">
            <p className="uppercase tracking-[0.12em] text-muted">Partners</p>
            <p className="mt-1 font-semibold text-body">{project.entrepreneursJoined}/{project.entrepreneursNeeded} joined</p>
          </div>
          <div className="border border-border bg-panel p-3">
            <p className="uppercase tracking-[0.12em] text-muted">Land area</p>
            <p className="mt-1 font-semibold text-body">{project.landArea}</p>
          </div>
        </div>
        <button onClick={onOpen} className={`w-full border border-gold px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] transition hover:bg-gold hover:text-ground ${project.highlight ? "bg-gold text-ground" : "text-gold"}`}>
          View full details <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "floors" | "timeline" | "payment">("overview");
  const [imageIndex, setImageIndex] = useState(0);
  const remaining = project.totalFlats - project.soldShares;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: globalThis.KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-ground/95 backdrop-blur-xl md:p-6">
      <button type="button" onClick={onClose} className="fixed inset-0 cursor-default" aria-label="Close project details" />
      <div role="dialog" aria-modal="true" aria-labelledby="project-title" className="relative mx-auto min-h-screen w-full max-w-5xl overflow-hidden border-border bg-surface shadow-2xl md:min-h-0 md:border">
        <div className="relative h-64 overflow-hidden md:h-80">
          <Image src={project.imgs[imageIndex]} alt={project.name} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/15 to-transparent" />
          <button onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-ground/70 text-lg text-heading transition hover:border-gold hover:text-gold" aria-label="Close project details">×</button>
          <div className="absolute bottom-4 left-4 flex gap-2 md:left-6">
            {project.imgs.map((image, index) => (
              <button key={image} onClick={() => setImageIndex(index)} aria-label={`Show image ${index + 1}`} className={`relative h-11 w-16 overflow-hidden border-2 ${imageIndex === index ? "border-gold" : "border-transparent"}`}>
                <Image src={image} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 max-w-[55%] text-right md:right-6">
            <h2 id="project-title" className="font-display text-xl leading-tight text-heading md:text-3xl">{project.name}</h2>
            <p className="mt-1 text-xs text-subtle md:text-sm">{project.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-border sm:grid-cols-5">
          {[
            ["Structure", `G + ${project.floors}`],
            ["Total flats", String(project.totalFlats)],
            ["Land area", project.landArea],
            ["Flat size", project.flatSize],
            ["Handover", project.completion],
          ].map(([label, value]) => (
            <div key={label} className="border-r border-t border-border px-3 py-4 text-center first:border-t-0 sm:border-t-0">
              <p className="text-sm font-semibold text-gold">{value}</p>
              <p className="mt-1 text-[0.55rem] uppercase tracking-[0.11em] text-muted">{label}</p>
            </div>
          ))}
        </div>

        <div className="hide-scrollbar flex overflow-x-auto border-b border-border">
          {(["overview", "floors", "timeline", "payment"] as const).map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`shrink-0 border-b-2 px-5 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.15em] transition ${tab === item ? "border-gold text-gold" : "border-transparent text-muted hover:text-body"}`}>
              {item === "floors" ? "Floor plan" : item === "payment" ? "Payment plan" : item}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {tab === "overview" && (
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <div className="space-y-5">
                <div className="border border-border bg-panel p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-body">Share availability</h3>
                    <span className="text-sm font-semibold text-green-light">{remaining} remaining</span>
                  </div>
                  <ShareProgress project={project} />
                </div>
                <div className="border border-border bg-panel p-5">
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">Share price range</p>
                  <p className="mt-2 font-display text-3xl text-gold">{fmtLac(project.priceFrom)} – {fmtLac(project.priceTo)} <span className="font-sans text-xs text-muted">BDT</span></p>
                  <p className="mt-2 text-xs text-subtle">Price varies by floor level and flat position.</p>
                </div>
                <div className="border border-border bg-panel p-5">
                  <p className="mb-3 text-[0.62rem] uppercase tracking-[0.16em] text-muted">Nearby landmarks</p>
                  {project.nearbyLandmarks.map((item) => <p key={item} className="border-b border-border py-2 text-sm text-body last:border-0">{item}</p>)}
                </div>
              </div>
              <div className="space-y-5">
                <div className="border border-border bg-panel p-5">
                  <p className="mb-3 text-[0.62rem] uppercase tracking-[0.16em] text-muted">Legal & project details</p>
                  {[
                    ["Land price", project.landPrice],
                    ["Registration", project.registrationStatus],
                    ["Architect", project.architect],
                    ["RAJUK status", project.status === "Active" ? "Approved" : "Pending"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-5 border-b border-border py-2.5 text-xs last:border-0">
                      <span className="w-24 shrink-0 text-muted">{label}</span><span className="flex-1 text-right text-body">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="border border-border bg-panel p-5">
                  <p className="mb-4 text-[0.62rem] uppercase tracking-[0.16em] text-muted">Amenities included</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {project.amenities.map((item) => <p key={item} className="flex gap-2 text-xs text-body"><span className="text-green-light">✓</span>{item}</p>)}
                  </div>
                </div>
                <button onClick={() => { onClose(); setTimeout(() => scrollToId("contact"), 50); }} className="w-full bg-gold px-5 py-4 text-xs font-bold uppercase tracking-[0.17em] text-ground transition hover:bg-gold-light">Book this land share →</button>
              </div>
            </div>
          )}

          {tab === "floors" && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead><tr>{["Floor", "Type", "Flats", "Size", "Price / Share", "Status"].map((label) => <th key={label} className="border border-border bg-panel px-4 py-3 text-[0.6rem] uppercase tracking-[0.14em] text-muted">{label}</th>)}</tr></thead>
                <tbody>{project.floorPlan.map((row) => <tr key={row.floor} className="transition hover:bg-panel/60"><td className="border border-border px-4 py-3 text-sm font-medium text-body">{row.floor}</td><td className="border border-border px-4 py-3 text-xs text-subtle">{row.type}</td><td className="border border-border px-4 py-3 text-sm text-subtle">{row.flats}</td><td className="border border-border px-4 py-3 text-xs text-subtle">{row.size}</td><td className="border border-border px-4 py-3 text-sm font-semibold text-gold">{row.price} BDT</td><td className="border border-border px-4 py-3"><StatusBadge status={row.status} /></td></tr>)}</tbody>
              </table>
            </div>
          )}

          {tab === "timeline" && (
            <div className="mx-auto max-w-xl">
              {project.timeline.map((item, index) => (
                <div key={`${item.date}-${item.event}`} className="relative flex gap-5 pb-8 last:pb-0">
                  {index < project.timeline.length - 1 && <span className={`absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px ${item.done ? "bg-green" : "bg-border"}`} />}
                  <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xs ${item.done ? "border-green-light bg-green text-white" : "border-border bg-panel text-muted"}`}>{item.done ? "✓" : "○"}</span>
                  <div><p className={`text-[0.65rem] uppercase tracking-[0.14em] ${item.done ? "text-gold" : "text-muted"}`}>{item.date}</p><p className={`mt-1 text-sm ${item.done ? "font-medium text-heading" : "text-subtle"}`}>{item.event}</p></div>
                </div>
              ))}
            </div>
          )}

          {tab === "payment" && (
            <div>
              <p className="mb-6 max-w-2xl text-sm leading-7 text-subtle">Payments are connected to documented project milestones, giving owners a clear view of when and why every instalment is due.</p>
              <div className="space-y-3">
                {paymentPlan.map((item) => (
                  <div key={item.phase} className="flex items-center gap-4 border border-border bg-panel p-4 sm:p-5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-gold font-display text-lg text-gold">{item.pct}</span>
                    <div><h3 className="text-sm font-semibold text-heading">{item.phase}</h3><p className="mt-1 text-xs text-muted">{item.note}</p></div>
                  </div>
                ))}
              </div>
              <p className="mt-5 border border-gold/35 bg-gold/5 p-4 text-xs leading-6 text-gold">Land registration triggers the legal transfer of the deed into your name through the relevant Sub-Registrar&apos;s office.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ item, open, onToggle }: { item: { q: string; a: string }; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border">
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-medium text-heading sm:text-base">
        <span>{item.q}</span><span className={`shrink-0 text-2xl font-light text-gold transition ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="max-w-3xl pr-8 text-sm leading-7 text-subtle">{item.a}</p></div></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<ProjectStatus>("Active");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const visibleProjects = useMemo(() => projects.filter((project) => project.status === projectFilter), [projectFilter]);

  useEffect(() => {
    let frame = 0;
    const updateHeroMotion = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollY = Math.max(0, window.scrollY);
        const scale = 1.04 + Math.min(scrollY / 1800, 0.1);
        const translateY = scrollY * 0.18;
        const opacity = Math.max(0.52, 0.86 - scrollY / 1200);
        document.documentElement.style.setProperty("--hero-image-y", `${translateY}px`);
        document.documentElement.style.setProperty("--hero-image-scale", String(scale));
        document.documentElement.style.setProperty("--hero-image-opacity", String(opacity));
      });
    };

    updateHeroMotion();
    window.addEventListener("scroll", updateHeroMotion, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeroMotion);
      document.documentElement.style.removeProperty("--hero-image-y");
      document.documentElement.style.removeProperty("--hero-image-scale");
      document.documentElement.style.removeProperty("--hero-image-opacity");
    };
  }, []);

  const handleMenuKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") setMenuOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-ground text-body">
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-ground/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[5.25rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {[["Projects", "projects"], ["How it works", "how-it-works"], ["Pricing", "pricing"], ["FAQ", "faq"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`} className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted transition hover:text-gold">{label}</a>)}
          </nav>
          <button onClick={() => scrollToId("contact")} className="cta-shine hidden overflow-hidden bg-gold px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ground transition hover:bg-gold-light lg:block">Book a share</button>
          <button onClick={() => setMenuOpen((value) => !value)} onKeyDown={handleMenuKey} aria-expanded={menuOpen} aria-controls="mobile-menu" title={menuOpen ? "Close menu" : "Open menu"} className="menu-toggle grid h-12 w-12 place-items-center rounded-sm bg-transparent text-gold transition hover:bg-panel/60 active:scale-90 md:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}>
            <span className={`menu-icon ${menuOpen ? "is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
        <div id="mobile-menu" className={`mobile-menu border-t border-border bg-ground px-4 transition-[max-height,opacity,padding] duration-300 md:hidden ${menuOpen ? "mobile-menu-open max-h-96 py-4 opacity-100" : "max-h-0 overflow-hidden py-0 opacity-0"}`}>
          {["projects", "how-it-works", "pricing", "faq", "contact"].map((id, index) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} style={{ animationDelay: `${index * 55}ms` }} className="mobile-menu-link block border-b border-border/60 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-subtle last:border-0">{id.replaceAll("-", " ")}</a>)}
        </div>
      </header>

      <section className="hero-grid relative flex min-h-[94svh] items-center overflow-hidden pt-24">
        <div className="hero-photo absolute inset-[-5%]" aria-hidden="true" />
        <div className="hero-shade absolute inset-0" aria-hidden="true" />
        <div className="float-orb absolute -left-32 top-8 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
        <div className="float-orb float-orb-delay absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-green/15 blur-[120px]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <div className="fade-up relative z-20 mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-green-light/70 bg-ground/75 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-green-light shadow-[0_8px_30px_rgba(11,20,16,.28)] backdrop-blur-sm sm:text-[0.68rem]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-light shadow-[0_0_12px_#5E9E71]" />
            A new land-share model for Bangladesh
          </div>
          <h1 className="fade-up fade-delay-1 mx-auto max-w-5xl font-display text-[2.75rem] leading-[0.94] tracking-[-0.025em] text-heading sm:text-6xl md:text-7xl lg:text-[6rem]">
            Own the land.<br /><em className="gold-sheen font-normal">Build your future.</em>
          </h1>
          <p className="fade-up fade-delay-2 mx-auto mt-7 max-w-2xl text-sm leading-7 text-body sm:text-base md:text-lg md:leading-8">We buy the land. You own a registered share. Together, we build the home—giving you real ownership before the foundation is laid.</p>
          <div className="fade-up fade-delay-3 mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => scrollToId("projects")} className="cta-shine overflow-hidden bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ground transition hover:-translate-y-1 hover:bg-gold-light">View available shares</button>
            <button onClick={() => scrollToId("how-it-works")} className="border border-border bg-ground/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-body backdrop-blur transition hover:border-green hover:text-green-light">How it works ↓</button>
          </div>
          <div className="fade-up fade-delay-4 mx-auto mt-12 grid max-w-4xl grid-cols-2 border border-border/70 bg-ground/70 backdrop-blur md:mt-16 md:grid-cols-4">
            {[["6", "Projects"], ["196", "Total flats"], ["15–35 Lac", "Per share"], ["RAJUK", "Approved"]].map(([value, label]) => <div key={label} className="border-b border-r border-border/70 px-3 py-5 last:border-r-0 md:border-b-0"><p className="font-display text-xl text-heading sm:text-2xl">{value}</p><p className="mt-1 text-[0.55rem] uppercase tracking-[0.15em] text-muted">{label}</p></div>)}
          </div>
        </div>
      </section>

      <div className="marquee-shell border-y border-border bg-surface py-3" aria-hidden="true">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {["Registered Land", "Transparent Pricing", "RAJUK Approval", "Collective Building", "Real Ownership"].map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center whitespace-nowrap px-5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-subtle sm:px-8">
                  <span className="mr-5 h-1.5 w-1.5 rotate-45 bg-gold sm:mr-8" />{item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="how-it-works" className="scroll-mt-20 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="The land share model" title="A clear path from land to home" copy="A transparent six-step process designed to put registered ownership first." />
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.num} className="view-reveal group relative bg-surface p-6 transition hover:-translate-y-1 hover:bg-panel sm:p-8" style={{ animationDelay: `${index * 70}ms` }}>
                <span className="absolute right-4 top-1 font-display text-7xl text-gold/[0.06]">{step.num}</span>
                <div className={`mb-7 h-1 w-12 ${index % 2 ? "bg-green" : "bg-gold"}`} />
                <p className={`text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${index % 2 ? "text-green-light" : "text-gold"}`}>Step {step.num}</p>
                <h3 className="mt-3 font-display text-xl text-heading sm:text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-subtle">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 bg-surface/40 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div><Eyebrow>Available now</Eyebrow><h2 className="font-display text-3xl text-heading sm:text-4xl md:text-5xl">Land Share Projects</h2></div>
            <div className="flex w-full sm:w-auto">
              {(["Active", "Pre-Launch"] as const).map((filter) => <button key={filter} onClick={() => setProjectFilter(filter)} className={`flex-1 border px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] sm:flex-none ${projectFilter === filter ? "border-gold bg-gold text-ground" : "border-border text-muted hover:text-gold"}`}>{filter}</button>)}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={() => setSelectedProject(project)} />)}</div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="view-reveal mx-auto grid max-w-7xl border border-border bg-gradient-to-br from-panel to-surface lg:grid-cols-2">
          <div className="p-6 sm:p-10 lg:p-14">
            <Eyebrow>Transparent pricing</Eyebrow>
            <h2 className="font-display text-3xl leading-tight text-heading sm:text-4xl">BDT 15 Lac to 35 Lac<br /><span className="text-gold">per Land Share</span></h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-subtle">Price depends on the project, floor level and flat position. Every buyer receives registered land rights before construction.</p>
            <ul className="mt-7 space-y-3">{["Registered land deed in your name", "Clear milestone-based payments", "Collectively managed construction", "Transferable ownership", "RAJUK-approved plans on active projects"].map((item) => <li key={item} className="flex gap-3 text-sm text-body"><span className="text-green-light">✓</span>{item}</li>)}</ul>
          </div>
          <div className="border-t border-border p-4 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="space-y-2">{[
              ["Ground floor", "25–35 Lac", "Commercial / lobby potential"],
              ["1st–3rd floor", "15–22 Lac", "Standard residential"],
              ["4th–6th floor", "20–27 Lac", "Mid-level view premium"],
              ["7th–9th floor", "25–30 Lac", "Elevated view — high demand"],
              ["Top floor", "28–35 Lac", "Penthouse + roof rights"],
            ].map(([floor, price, note]) => <div key={floor} className="flex items-center justify-between gap-4 border border-border bg-ground p-4 transition hover:border-gold/50"><div><p className="text-sm font-medium text-body">{floor}</p><p className="mt-1 text-[0.65rem] text-muted">{note}</p></div><p className="shrink-0 text-sm font-semibold text-gold">{price} BDT</p></div>)}</div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Common questions" title="The details, clearly explained" />
          <div className="border-t border-border">{faqs.map((item, index) => <FAQItem key={item.q} item={item} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? null : index)} />)}</div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <div className="contact-card relative mx-auto max-w-7xl overflow-hidden rounded-sm border border-border px-5 py-10 sm:px-10 md:px-14 md:py-14">
          <div className="relative grid gap-10 md:grid-cols-[1.05fr_.95fr] md:items-center md:gap-16">
            <div className="text-center md:text-left">
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">Start your ownership journey</p>
              <h2 className="font-display text-3xl leading-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,.35)] sm:text-4xl md:text-5xl">Ready to own your share?</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white sm:text-base md:mx-0">Tell us how to reach you. We&apos;ll share available floors, legal documents and the next project briefing within 24 hours.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-[0.63rem] font-semibold uppercase tracking-[0.12em] text-white md:justify-start">
                <span className="rounded-full border border-gold/40 bg-ground/75 px-3 py-2">No obligation</span>
                <span className="rounded-full border border-gold/40 bg-ground/75 px-3 py-2">Verified projects</span>
                <span className="rounded-full border border-gold/40 bg-ground/75 px-3 py-2">WhatsApp support</span>
              </div>
            </div>
            <div className="contact-form-card rounded-sm border border-border bg-ground/75 p-4 shadow-[0_22px_60px_rgba(0,0,0,.24)] backdrop-blur sm:p-6">
              {submitted ? (
                <div className="grid min-h-44 place-items-center text-center" role="status">
                  <div><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green text-xl text-white">✓</span><p className="mt-4 font-semibold text-white">Interest registered</p><p className="mt-1 text-sm text-white/80">Our team will contact you shortly.</p></div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-3">
                  <label className="text-left text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-gold-light" htmlFor="full-name">Full name</label>
                  <input id="full-name" name="name" required placeholder="Your full name" className="min-w-0 rounded-sm border border-border bg-surface px-4 py-3.5 text-sm text-heading outline-none transition placeholder:text-subtle focus:border-gold focus:ring-2 focus:ring-gold/15" />
                  <label className="mt-1 text-left text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-gold-light" htmlFor="phone">WhatsApp number</label>
                  <input id="phone" name="phone" type="tel" required placeholder="+880 1XXX XXXXXX" className="min-w-0 rounded-sm border border-border bg-surface px-4 py-3.5 text-sm text-heading outline-none transition placeholder:text-subtle focus:border-gold focus:ring-2 focus:ring-gold/15" />
                  <button className="cta-shine mt-2 overflow-hidden rounded-sm bg-gold px-6 py-4 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ground transition hover:bg-gold-light">Register interest <span aria-hidden="true">→</span></button>
                  <p className="text-center text-[0.65rem] text-white/80">Your details stay private. No spam, ever.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <Logo compact />
          <p className="text-xs text-muted">© 2026 Barakah Homes Ltd. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted"><a href="#projects" className="hover:text-gold">Projects</a><a href="#faq" className="hover:text-gold">FAQ</a><a href="#contact" className="hover:text-gold">Contact</a></div>
        </div>
      </footer>
    </main>
  );
}
