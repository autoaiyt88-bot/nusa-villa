import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://nusavilla21.netlify.app",
  ),

  verification: {
    google: "WvlH9-vt82WwaarA1UQ_uNUE5gM0SuS8D-PjtkhqvHk",
  },

  icons: {
    icon: [
      { url: "/favicon.jpg", type: "image/jpeg" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.jpg",
    apple: "/apple-icon.jpg",
  },
  title: "NUSA VILLA — Luxury Private Villas & Tropical Escapes in Bali",
  description:
    "Discover handpicked luxury villas in Bali designed for unforgettable stays. Experience panoramic cliffside views, private infinity pools, and world-class bespoke hospitality.",
  keywords: [
    "luxury villas bali",
    "bali private pool villa",
    "cliffside villa uluwatu",
    "ubud rainforest retreat",
    "nusa villa booking",
    "bali holiday rentals",
  ],
  authors: [{ name: "Nusa Villa Luxury Retreats" }],
  openGraph: {
    title: "NUSA VILLA — Luxury Private Villas & Tropical Escapes",
    description:
      "Handpicked luxury villas in Bali with cliffside sunset views, private pools, and five-star concierge service.",
    url: "https://nusavilla.com",
    siteName: "NUSA VILLA",
    images: [
      {
        url: "/images/hero-villa.jpg",
        width: 1920,
        height: 1080,
        alt: "Nusa Villa Luxury Cliffside Villa in Uluwatu Bali",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NUSA VILLA — Luxury Private Villas in Bali",
    description:
      "Discover handpicked luxury villas designed for unforgettable stays across Bali.",
    images: ["/images/hero-villa.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#12372A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF9F6] text-[#111827] antialiased">
        {children}
      </body>
    </html>
  );
}
