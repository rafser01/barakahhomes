import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barakah Homes Ltd | Own Land. Build Together.",
  description: "Discover registered land-share homes in Dhaka with transparent pricing, legal ownership and milestone-based construction.",
  icons: {
    icon: "/barakah-logo-transparent.png",
    shortcut: "/barakah-logo-transparent.png",
  },
  openGraph: {
    title: "Barakah Homes Ltd",
    description: "Own a registered share of the land, then build your home together.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
