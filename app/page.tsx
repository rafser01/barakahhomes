"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

type ProjectStatus = "Active" | "Pre-Launch";
type FloorStatus = "Available" | "Sold" | "Entrepreneur" | `${number} Left`;
type Theme = "light" | "dark";

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

const navigationItems = [
  ["Projects", "projects"],
  ["How it works", "how-it-works"],
  ["Pricing", "pricing"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
] as const;

const fmtLac = (value: number) => `${Math.round(value / 100_000)} Lac`;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
}

function Logo({ compact = false }: { compact?: boolean }) {
  const [animationCycle, setAnimationCycle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAnimating) {
        setIsAnimating(false);
        return;
      }

      setAnimationCycle((cycle) => cycle + 1);
      setIsAnimating(true);
    }, isAnimating ? 6_000 : 15_000);

    return () => clearTimeout(timer);
  }, [isAnimating]);

  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="Barakah Homes home">
      <span className={`logo-lockup ${compact ? "h-16 w-24" : "h-16 w-24 sm:h-20 sm:w-28"} relative block overflow-hidden rounded-sm`}>
        {isAnimating ? (
          <picture key={animationCycle} className="block h-full w-full">
            <source srcSet={`/barakah-logo-transparent-smooth.apng?cycle=${animationCycle}`} type="image/apng" />
            <Image
              src="/barakah-logo-transparent-smooth.png"
              alt="Barakah Homes Ltd"
              width={280}
              height={280}
              unoptimized
              priority
              className="h-full w-full scale-[1.08] object-contain"
            />
          </picture>
        ) : (
          <Image
            src="/barakah-logo-transparent-smooth.png"
            alt="Barakah Homes Ltd"
            width={280}
            height={280}
            unoptimized
            priority
            className="h-full w-full scale-[1.08] object-contain"
          />
        )}
      </span>
    </a>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-toggle grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-surface text-heading shadow-sm transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
        </svg>
      )}
    </button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">{children}</p>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="view-reveal mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-3xl leading-tight text-heading sm:text-4xl lg:text-5xl">{title}</h2>
      {copy && <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-subtle">{copy}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: FloorStatus }) {
  const style = status === "Sold"
    ? "border-green/40 bg-green/15 text-green-light"
    : status === "Entrepreneur"
      ? "border-gold/40 bg-gold/10 text-gold"
      : status.includes("Left")
        ? "border-orange-400/35 bg-orange-400/10 text-warning"
        : "border-border bg-panel text-subtle";
  return <span className={`inline-flex whitespace-nowrap border px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${style}`}>{status}</span>;
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

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || motion.matches || !("IntersectionObserver" in window)) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1100, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    const stop = () => {
      if (!motion.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
    observer.observe(element);
    motion.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", stop);
    };
  }, [value]);

  return <span ref={ref} className="tabular-nums"><span className="sr-only">{value}</span><span aria-hidden="true">{display}</span></span>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className={`project-card view-reveal group relative overflow-hidden rounded-sm border bg-surface shadow-[0_20px_70px_rgba(0,0,0,.28)] transition duration-500 hover:shadow-[0_32px_90px_rgba(0,0,0,.48)] ${project.highlight ? "border-gold/70" : "border-border"}`}>
      <div className="relative h-56 overflow-hidden sm:h-64">
        <Image src={project.img} alt={project.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/20 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-white ${project.status === "Active" ? "bg-green" : "bg-muted"}`}>{project.status}</span>
          {project.highlight && <span className="bg-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-on-accent">Hot deal</span>}
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
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.09em] text-muted">{label}</p>
            </div>
          ))}
        </div>
        <p className="mb-5 text-lg font-semibold text-gold">
          {fmtLac(project.priceFrom)} <span className="text-xs font-normal text-muted">–</span> {fmtLac(project.priceTo)}
          <span className="ml-1 text-xs font-medium text-muted">BDT / share</span>
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
        <button onClick={onOpen} className={`w-full border border-gold px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition hover:bg-gold hover:text-on-accent ${project.highlight ? "bg-gold text-on-accent" : "text-gold"}`}>
          View full details <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose, onEnquire }: { project: Project; onClose: () => void; onEnquire: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const sections = ["overview", "floors", "timeline", "payment"] as const;
  const sectionLabels = { overview: "Overview", floors: "Floors & prices", timeline: "Timeline", payment: "Payments" };
  const [tab, setTab] = useState<"overview" | "floors" | "timeline" | "payment">("overview");
  const [imageIndex, setImageIndex] = useState(0);
  const remaining = project.totalFlats - project.soldShares;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement as HTMLElement | null;
    const overlay = dialogRef.current?.parentElement;
    const siblings = Array.from(overlay?.parentElement?.children ?? []).filter((element): element is HTMLElement => element instanceof HTMLElement && element !== overlay);
    const inertStates = siblings.map((element) => element.inert);
    siblings.forEach((element) => { element.inert = true; });
    dialogRef.current?.focus();
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key !== "Tab") return;
      const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], input, [tabindex="0"]') ?? []).filter((item) => item.getClientRects().length > 0 && !item.hasAttribute("disabled"));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      siblings.forEach((element, index) => { element.inert = inertStates[index]; });
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/55 backdrop-blur-sm md:p-6">
      <button type="button" onClick={onClose} tabIndex={-1} className="absolute inset-0 cursor-default" aria-label="Close project details" />
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="project-title" className="modal-panel relative flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden border-border bg-surface shadow-2xl outline-none md:h-[min(900px,90dvh)] md:rounded-2xl md:border">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-2 pt-[max(.5rem,env(safe-area-inset-top))] sm:px-6">
          <div><p className="text-xs font-semibold text-muted">Explore your land share</p><p className="text-sm font-semibold text-heading">Project details</p></div>
          <button onClick={onClose} className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold text-heading transition hover:bg-panel" aria-label="Close details and return to projects">Close ×</button>
        </header>
        <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">

        <div className="relative h-52 overflow-hidden sm:h-72 md:h-80">
          {project.imgs.map((src, index) => (
            <Image key={src} src={src} alt={index === imageIndex ? project.name : ""} aria-hidden={index !== imageIndex} fill sizes="(min-width: 1024px) 1024px, 100vw" className={`object-cover transition-opacity duration-500 ${index === imageIndex ? "opacity-100" : "opacity-0"}`} priority={index === 0} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/15 to-transparent" />
          <span className="absolute right-4 top-4 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white" aria-live="polite">Photo {imageIndex + 1} of {project.imgs.length}</span>
          <div className="absolute bottom-4 left-4 flex gap-2 md:left-6">
            {project.imgs.map((image, index) => (
              <button key={image} onClick={() => setImageIndex(index)} aria-label={`Show image ${index + 1}`} aria-pressed={imageIndex === index} className={`relative h-11 w-16 overflow-hidden border-2 ${imageIndex === index ? "border-gold" : "border-transparent"}`}>
                <Image src={image} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold">{project.status} · {remaining} shares remaining</p>
          <h2 id="project-title" className="font-display text-2xl leading-tight text-heading sm:text-3xl">{project.name}</h2>
          <p className="mt-2 text-sm text-subtle">{project.location}</p>
          <p className="mt-3 text-sm leading-6 text-subtle">Explore the project, compare floor prices, then review the timeline and payments. When you’re ready, request details from our team.</p>
        </div>

        <div className="grid grid-cols-2 border-b border-border sm:grid-cols-5">
          {[
            ["Structure", `G + ${project.floors}`],
            ["Total flats", String(project.totalFlats)],
            ["Land area", project.landArea],
            ["Flat size", project.flatSize],
            ["Handover", project.completion],
          ].map(([label, value]) => (
            <div key={label} className="border-r border-t border-border px-3 py-4 text-center first:border-t-0 last:col-span-2 sm:border-t-0 sm:last:col-span-1">
              <p className="text-sm font-semibold text-gold">{value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-muted">{label}</p>
            </div>
          ))}
        </div>

        <div data-section-start />
        <div className="details-nav sticky top-0 z-20 grid grid-cols-4 border-b border-border bg-surface px-1" aria-label="Project detail sections">
          {(["overview", "floors", "timeline", "payment"] as const).map((item) => (
            <button key={item} onClick={() => {
              setTab(item);
              const marker = contentRef.current?.querySelector<HTMLElement>("[data-section-start]");
              if (marker && contentRef.current) {
                const top = marker.offsetTop - contentRef.current.offsetTop;
                if (contentRef.current.scrollTop > top) contentRef.current.scrollTo({ top, behavior: "instant" });
              }
            }} aria-pressed={tab === item} className={`min-h-14 border-b-2 px-1 py-3 text-xs font-semibold transition sm:text-sm ${tab === item ? "border-gold text-gold" : "border-transparent text-muted hover:text-body"}`}>
              {sectionLabels[item]}
            </button>
          ))}
        </div>

        <div key={tab} className="content-enter p-4 sm:p-6 md:p-8">
          {tab === "overview" && (
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <div className="space-y-5">
                <div className="border border-border bg-panel p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-body">Share availability</h3>
                    <span className="text-sm font-semibold text-green-light">{remaining} remaining</span>
                  </div>
                  <ShareProgress project={project} />
                </div>
                <div className="border border-border bg-panel p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.11em] text-muted">Share price range</p>
                  <p className="mt-2 font-display text-3xl text-gold">{fmtLac(project.priceFrom)} – {fmtLac(project.priceTo)} <span className="font-sans text-xs text-muted">BDT</span></p>
                  <p className="mt-2 text-xs text-subtle">Price varies by floor level and flat position.</p>
                </div>
                <div className="border border-border bg-panel p-5">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.11em] text-muted">Nearby landmarks</p>
                  {project.nearbyLandmarks.map((item) => <p key={item} className="border-b border-border py-2 text-sm text-body last:border-0">{item}</p>)}
                </div>
              </div>
              <div className="space-y-5">
                <div className="border border-border bg-panel p-5">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.11em] text-muted">Legal & project details</p>
                  {[
                    ["Land price", project.landPrice],
                    ["Registration", project.registrationStatus],
                    ["Architect", project.architect],
                    ["RAJUK status", project.status === "Active" ? "Approved" : "Pending"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-1 border-b border-border py-2.5 text-sm last:border-0 sm:flex-row sm:gap-5">
                      <span className="w-24 shrink-0 text-muted">{label}</span><span className="min-w-0 flex-1 break-words text-body sm:text-right">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="border border-border bg-panel p-5">
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.11em] text-muted">Amenities included</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {project.amenities.map((item) => <p key={item} className="flex gap-2 text-xs text-body"><span className="text-green-light">✓</span>{item}</p>)}
                  </div>
                </div>

              </div>
            </div>
          )}

          {tab === "floors" && (
            <div>
              <p className="mb-4 text-sm leading-6 text-subtle">Compare prices and availability below. Our team can confirm the latest options for your preferred floor.</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
                {project.floorPlan.map((row) => (
                  <article key={row.floor} className="rounded-xl border border-border bg-panel p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold text-heading">{row.floor}</h3><StatusBadge status={row.status} /></div>
                    <p className="mt-1 text-sm text-subtle">{row.type}</p>
                    <dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-muted">Flat size</dt><dd className="font-medium text-heading">{row.size}</dd></div><div><dt className="text-muted">Flats on floor</dt><dd className="font-medium text-heading">{row.flats}</dd></div></dl>
                    <p className="mt-4 border-t border-border pt-3 font-semibold text-gold">{row.price} BDT <span className="text-xs font-normal text-subtle">/ land share</span></p>
                  </article>
                ))}
              </div>
              <div className="hidden overflow-x-auto lg:block"><table className="w-full min-w-[720px] border-collapse text-left">
                <thead><tr>{["Floor", "Type", "Flats", "Size", "Price / Share", "Status"].map((label) => <th key={label} className="border border-border bg-panel px-4 py-3 text-xs font-semibold uppercase tracking-[0.09em] text-muted">{label}</th>)}</tr></thead>
                <tbody>{project.floorPlan.map((row) => <tr key={row.floor} className="transition hover:bg-panel/60"><td className="border border-border px-4 py-3 text-sm font-medium text-body">{row.floor}</td><td className="border border-border px-4 py-3 text-xs text-subtle">{row.type}</td><td className="border border-border px-4 py-3 text-sm text-subtle">{row.flats}</td><td className="border border-border px-4 py-3 text-xs text-subtle">{row.size}</td><td className="border border-border px-4 py-3 text-sm font-semibold text-gold">{row.price} BDT</td><td className="border border-border px-4 py-3"><StatusBadge status={row.status} /></td></tr>)}</tbody>
              </table></div>
            </div>
          )}

          {tab === "timeline" && (
            <div className="mx-auto max-w-xl">
              {project.timeline.map((item, index) => (
                <div key={`${item.date}-${item.event}`} className="relative flex gap-5 pb-8 last:pb-0">
                  {index < project.timeline.length - 1 && <span className={`absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px ${item.done ? "bg-green" : "bg-border"}`} />}
                  <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xs ${item.done ? "border-green-light bg-green text-white" : "border-border bg-panel text-muted"}`}>{item.done ? "✓" : "○"}</span>
                  <div><p className={`text-xs font-medium uppercase tracking-[0.1em] ${item.done ? "text-gold" : "text-muted"}`}>{item.date}</p><p className={`mt-1 text-sm ${item.done ? "font-medium text-heading" : "text-subtle"}`}>{item.event}</p></div>
                </div>
              ))}
            </div>
          )}

          {tab === "payment" && (
            <div>
              <p className="mb-6 max-w-2xl text-base leading-8 text-subtle">Payments are connected to documented project milestones, giving owners a clear view of when and why every instalment is due.</p>
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
          <div className="mt-6 rounded-xl border border-border bg-panel p-4">
            <p className="text-xs font-semibold text-muted">Step {sections.indexOf(tab) + 1} of 4 · {sectionLabels[tab]}</p>
            {tab !== "payment" ? <button onClick={() => {
              setTab(sections[sections.indexOf(tab) + 1]);
              const nav = contentRef.current?.querySelector<HTMLElement>("[data-section-start]");
              if (nav && contentRef.current) contentRef.current.scrollTo({ top: nav.offsetTop - contentRef.current.offsetTop, behavior: "instant" });
              requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>('.details-nav button[aria-pressed="true"]')?.focus({ preventScroll: true }));
            }} className="mt-2 min-h-11 text-left text-sm font-bold text-gold">Next: {sectionLabels[sections[sections.indexOf(tab) + 1]]} →</button> : <p className="mt-2 text-sm leading-6 text-body">Next, request details. Share your name and WhatsApp number so our team can discuss availability and documents. This does not reserve a share.</p>}
          </div>
        </div>
        </div>
        <footer className="shrink-0 border-t border-border bg-surface px-4 py-3 pb-[max(.75rem,env(safe-area-inset-bottom))] sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-xs text-muted">Land share from</p><p className="text-lg font-bold text-gold">{fmtLac(project.priceFrom)} <span className="text-xs">BDT</span></p></div>
            <button onClick={onEnquire} className="min-h-12 rounded-lg bg-gold px-5 py-3 text-sm font-bold text-on-accent transition hover:bg-accent-hover active:scale-[.98]">Request details →</button>
          </div>
          <p className="mt-2 text-xs text-muted">Next: contact form · No payment required</p>
        </footer>
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
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="max-w-3xl pr-8 text-base leading-8 text-subtle">{item.a}</p></div></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [projectFilter, setProjectFilter] = useState<ProjectStatus>("Active");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryProject, setEnquiryProject] = useState<Project | null>(null);

  const visibleProjects = useMemo(() => projects.filter((project) => project.status === projectFilter), [projectFilter]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("barakah-theme") === "dark" ? "dark" : "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.style.colorScheme = savedTheme;
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const updateHeroMotion = () => {
      cancelAnimationFrame(frame);
      if (motion.matches) {
        document.documentElement.style.removeProperty("--hero-image-y");
        document.documentElement.style.removeProperty("--hero-image-scale");
        document.documentElement.style.removeProperty("--hero-image-opacity");
        return;
      }
      frame = requestAnimationFrame(() => {
        const scrollY = Math.max(0, window.scrollY);
        const scale = 1.015 + Math.min(scrollY / 2600, 0.055);
        const translateY = scrollY * 0.18;
        const opacity = Math.max(0.62, 0.92 - scrollY / 1600);
        document.documentElement.style.setProperty("--hero-image-y", `${translateY}px`);
        document.documentElement.style.setProperty("--hero-image-scale", String(scale));
        document.documentElement.style.setProperty("--hero-image-opacity", String(opacity));
      });
    };

    updateHeroMotion();
    motion.addEventListener("change", updateHeroMotion);
    window.addEventListener("scroll", updateHeroMotion, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeroMotion);
      motion.removeEventListener("change", updateHeroMotion);
      document.documentElement.style.removeProperty("--hero-image-y");
      document.documentElement.style.removeProperty("--hero-image-scale");
      document.documentElement.style.removeProperty("--hero-image-opacity");
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".view-reveal:not(.is-revealed)").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [projectFilter]);

  const handleMenuKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") setMenuOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("barakah-theme", nextTheme);
  };

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-ground text-body">
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onEnquire={() => {
        setEnquiryProject(selectedProject);
        setSubmitted(false);
        setSelectedProject(null);
        setTimeout(() => {
          scrollToId("contact");
          document.getElementById("full-name")?.focus({ preventScroll: true });
        }, 50);
      }} />}

      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-ground/90 shadow-[0_8px_30px_rgba(12,41,23,.06)] backdrop-blur-xl">
        <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between px-4 sm:h-[5.25rem] sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary navigation">
            {navigationItems.map(([label, id]) => <a key={id} href={`#${id}`} className="nav-link text-[0.8rem] font-bold uppercase tracking-[0.09em] text-body transition-colors duration-200 hover:text-gold">{label}</a>)}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button onClick={() => scrollToId("contact")} className="cta-shine hidden overflow-hidden bg-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-on-accent transition hover:bg-accent-hover lg:block">Book a share</button>
            <button onClick={() => setMenuOpen((value) => !value)} onKeyDown={handleMenuKey} aria-expanded={menuOpen} aria-controls="mobile-menu" title={menuOpen ? "Close menu" : "Open menu"} className="menu-toggle grid h-12 w-12 place-items-center rounded-sm bg-transparent text-gold transition hover:bg-panel/60 active:scale-90 lg:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}>
              <span className={`menu-icon ${menuOpen ? "is-open" : ""}`} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        <div id="mobile-menu" aria-hidden={!menuOpen} className={`mobile-menu overflow-hidden border-t border-border bg-ground/95 px-3 shadow-[0_18px_40px_rgba(12,41,23,.12)] backdrop-blur-xl transition-[max-height,opacity,transform,visibility,padding] duration-300 lg:hidden ${menuOpen ? "mobile-menu-open visible max-h-[32rem] translate-y-0 py-3 opacity-100" : "invisible pointer-events-none max-h-0 -translate-y-2 py-0 opacity-0"}`}>
          <nav className="mx-auto max-w-7xl" aria-label="Mobile navigation">
            {navigationItems.map(([label, id], index) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} style={{ animationDelay: `${index * 55}ms` }} className="mobile-menu-link flex min-h-14 items-center justify-between rounded-sm border-b border-border/70 px-3 text-sm font-bold uppercase tracking-[0.1em] text-body last:border-0 hover:bg-panel hover:text-gold">
                <span className="flex items-center gap-3"><span className="text-xs font-semibold text-gold">0{index + 1}</span>{label}</span>
                <span className="mobile-menu-arrow text-lg text-muted" aria-hidden="true">→</span>
              </a>
            ))}
            <button onClick={() => { setMenuOpen(false); scrollToId("contact"); }} style={{ animationDelay: `${navigationItems.length * 55}ms` }} className="mobile-menu-link mt-3 flex min-h-12 w-full items-center justify-center bg-gold px-5 text-xs font-bold uppercase tracking-[0.12em] text-on-accent hover:bg-accent-hover">
              Book a share
            </button>
          </nav>
        </div>
      </header>

      <section className="hero-grid relative flex min-h-[94svh] items-center overflow-hidden pt-24">
        <div className="hero-photo absolute inset-[-5%]" aria-hidden="true" />
        <div className="hero-shade absolute inset-0" aria-hidden="true" />
        <div className="float-orb absolute -left-32 top-8 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
        <div className="float-orb float-orb-delay absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-green/15 blur-[120px]" />
        <div className="hero-copy relative z-10 mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <div className="hero-eyebrow fade-up relative z-20 mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-green-light/70 bg-ground/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-green-light shadow-[0_8px_30px_rgba(11,20,16,.16)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-light shadow-[0_0_12px_#5E9E71]" />
            A new land-share model for Bangladesh
          </div>
          <h1 className="fade-up fade-delay-1 mx-auto max-w-5xl font-display text-[2.75rem] leading-[0.94] tracking-[-0.025em] text-heading sm:text-6xl md:text-7xl lg:text-[6rem]">
            Own the land.<br /><em className="gold-sheen font-normal">Build your future.</em>
          </h1>
          <p className="fade-up fade-delay-2 mx-auto mt-7 max-w-2xl text-base font-medium leading-8 text-body md:text-lg">We buy the land. You own a registered share. Together, we build the home—giving you real ownership before the foundation is laid.</p>
          <div className="fade-up fade-delay-3 mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => scrollToId("projects")} className="cta-shine overflow-hidden bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-on-accent transition hover:-translate-y-1 hover:bg-accent-hover">View available shares</button>
            <button onClick={() => scrollToId("how-it-works")} className="border border-border bg-ground/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-body backdrop-blur transition hover:border-green hover:text-green-light">How it works ↓</button>
          </div>
          <div className="fade-up fade-delay-4 mx-auto mt-12 grid max-w-4xl grid-cols-2 border border-border/70 bg-ground/70 backdrop-blur md:mt-16 md:grid-cols-4">
            {[["6", "Projects"], ["196", "Total flats"], ["15–35 Lac", "Per share"], ["RAJUK", "Approved"]].map(([value, label]) => <div key={label} className="border-b border-r border-border/70 px-3 py-5 last:border-r-0 md:border-b-0"><p className="font-display text-xl text-heading sm:text-2xl">{label === "Projects" || label === "Total flats" ? <CountUp value={Number(value)} /> : value}</p><p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-muted">{label}</p></div>)}
          </div>
        </div>
      </section>

      <div className="marquee-shell border-y border-border bg-surface py-3" aria-hidden="true">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {["Registered Land", "Transparent Pricing", "RAJUK Approval", "Collective Building", "Real Ownership"].map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center whitespace-nowrap px-5 text-xs font-semibold uppercase tracking-[0.16em] text-subtle sm:px-8">
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
                <p className={`text-xs font-bold uppercase tracking-[0.13em] ${index % 2 ? "text-green-light" : "text-gold"}`}>Step {step.num}</p>
                <h3 className="mt-3 font-display text-xl text-heading sm:text-2xl">{step.title}</h3>
                <p className="mt-3 text-base leading-8 text-subtle">{step.desc}</p>
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
              {(["Active", "Pre-Launch"] as const).map((filter) => <button key={filter} onClick={() => setProjectFilter(filter)} className={`flex-1 border px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] sm:flex-none ${projectFilter === filter ? "border-gold bg-gold text-on-accent" : "border-border text-muted hover:text-gold"}`}>{filter}</button>)}
            </div>
          </div>
          <div key={projectFilter} className="content-enter grid gap-6 md:grid-cols-2">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={() => setSelectedProject(project)} />)}</div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="view-reveal mx-auto grid max-w-7xl border border-border bg-gradient-to-br from-panel to-surface lg:grid-cols-2">
          <div className="p-6 sm:p-10 lg:p-14">
            <Eyebrow>Transparent pricing</Eyebrow>
            <h2 className="font-display text-3xl leading-tight text-heading sm:text-4xl">BDT 15 Lac to 35 Lac<br /><span className="text-gold">per Land Share</span></h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-subtle">Price depends on the project, floor level and flat position. Every buyer receives registered land rights before construction.</p>
            <ul className="mt-7 space-y-3">{["Registered land deed in your name", "Clear milestone-based payments", "Collectively managed construction", "Transferable ownership", "RAJUK-approved plans on active projects"].map((item) => <li key={item} className="flex gap-3 text-base text-body"><span className="font-bold text-green-light">✓</span>{item}</li>)}</ul>
          </div>
          <div className="border-t border-border p-4 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="space-y-2">{[
              ["Ground floor", "25–35 Lac", "Commercial / lobby potential"],
              ["1st–3rd floor", "15–22 Lac", "Standard residential"],
              ["4th–6th floor", "20–27 Lac", "Mid-level view premium"],
              ["7th–9th floor", "25–30 Lac", "Elevated view — high demand"],
              ["Top floor", "28–35 Lac", "Penthouse + roof rights"],
            ].map(([floor, price, note], index) => <div key={floor} style={{ animationDelay: `${index * 70}ms` }} className="view-reveal flex items-center justify-between gap-4 border border-border bg-ground p-4 transition hover:border-gold/50"><div><p className="text-sm font-semibold text-body">{floor}</p><p className="mt-1 text-xs font-medium text-muted">{note}</p></div><p className="shrink-0 text-sm font-bold text-gold">{price} BDT</p></div>)}</div>
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
        <div className="contact-card view-reveal relative mx-auto max-w-7xl overflow-hidden rounded-sm border border-border px-5 py-10 sm:px-10 md:px-14 md:py-14">
          <div className="relative grid gap-10 md:grid-cols-[1.05fr_.95fr] md:items-center md:gap-16">
            <div className="text-center md:text-left">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gold-light">Start your ownership journey</p>
              <h2 className="font-display text-3xl leading-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,.35)] sm:text-4xl md:text-5xl">Ready to own your share?</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/90 md:mx-0">Tell us how to reach you. We&apos;ll share available floors, legal documents and the next project briefing within 24 hours.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-white md:justify-start">
                <span className="rounded-full border border-gold/40 bg-ground/75 px-3 py-2">No obligation</span>
                <span className="rounded-full border border-gold/40 bg-ground/75 px-3 py-2">Verified projects</span>
                <span className="rounded-full border border-gold/40 bg-ground/75 px-3 py-2">WhatsApp support</span>
              </div>
            </div>
            <div className="contact-form-card rounded-sm border border-border bg-ground/75 p-4 shadow-[0_22px_60px_rgba(0,0,0,.24)] backdrop-blur sm:p-6">
              {submitted ? (
                <div className="content-enter grid min-h-44 place-items-center text-center" role="status">
                  <div><span className="success-check mx-auto grid h-12 w-12 place-items-center rounded-full bg-green text-xl text-white">✓</span><p className="mt-4 font-semibold text-white">Interest registered</p><p className="mt-1 text-sm text-white/80">Our team will contact you shortly.</p></div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-3">
                  {enquiryProject && <div className="mb-2 rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white"><p className="text-xs text-white/70">You’re requesting details for</p><p className="mt-1 font-semibold">{enquiryProject.name}</p><input type="hidden" name="project" value={enquiryProject.name} /></div>}
                  <label className="text-left text-xs font-bold uppercase tracking-[0.1em] text-gold-light" htmlFor="full-name">Full name</label>
                  <input id="full-name" name="name" required placeholder="Your full name" className="min-w-0 rounded-sm border border-border bg-surface px-4 py-3.5 text-sm text-heading outline-none transition placeholder:text-subtle focus:border-gold focus:ring-2 focus:ring-gold/15" />
                  <label className="mt-1 text-left text-xs font-bold uppercase tracking-[0.1em] text-gold-light" htmlFor="phone">WhatsApp number</label>
                  <input id="phone" name="phone" type="tel" required placeholder="+880 1XXX XXXXXX" className="min-w-0 rounded-sm border border-border bg-surface px-4 py-3.5 text-sm text-heading outline-none transition placeholder:text-subtle focus:border-gold focus:ring-2 focus:ring-gold/15" />
                  <button className="cta-shine mt-2 overflow-hidden rounded-sm bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-on-accent transition hover:bg-accent-hover">Register interest <span aria-hidden="true">→</span></button>
                  <p className="text-center text-xs text-white/80">Your details stay private. No spam, ever.</p>
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
