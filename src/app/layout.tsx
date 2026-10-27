import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif", // We map this to the CSS variable we defined
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://isararesidence.vercel.app"),
  title: {
    default: "ISARA Residence | Guest House in Polonnaruwa",
    template: "%s | ISARA Residence",
  },
  description:
    "Stay near Polonnaruwa Ancient City at ISARA Residence, a peaceful guest house with comfortable rooms, curated local experiences, and warm Sri Lankan hospitality.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ISARA Residence",
    title: "ISARA Residence | Guest House in Polonnaruwa",
    description:
      "Comfortable stays near Polonnaruwa's heritage landmarks, with modern amenities and local hospitality.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Garden and rooms at ISARA Residence, Polonnaruwa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISARA Residence | Guest House in Polonnaruwa",
    description:
      "Plan your Polonnaruwa stay at ISARA Residence with cozy rooms, local charm, and easy access to ancient sites.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "BedAndBreakfast",
  name: "ISARA Residence",
  alternateName: "ISARA Residence Polonnaruwa",
  image: [
    "https://isararesidence.vercel.app/about-sec-lnd.jpg",
    "https://isararesidence.vercel.app/images/rooms/deluxe_double/1.jpg",
  ],
  "@id": "https://isararesidence.vercel.app/#lodging",
  url: "https://isararesidence.vercel.app",
  telephone: "+94714723538",
  priceRange: "$$",
  currenciesAccepted: "LKR, USD",
  paymentAccepted: "Cash, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Isara Residence, No 26, 25th Mile Post, Bendiwewa, Polonnaruwa",
    addressLocality: "Polonnaruwa",
    addressRegion: "North Central Province",
    postalCode: "51000",
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 7.9439,
    longitude: 80.9992,
  },
  checkinTime: "14:00",
  checkoutTime: "11:00",
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Air Conditioning",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Free High-Speed Wi-Fi",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Garden View",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Private Bathroom",
      value: true,
    },
  ],
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Polonnaruwa Ancient City",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(lodgingJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
