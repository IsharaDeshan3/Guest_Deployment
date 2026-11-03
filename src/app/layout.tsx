
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.isararesidence.lk"),

  title: {
    default: "ISARA Residence | Guest House & Rooms in Polonnaruwa",
    template: "%s | ISARA Residence Polonnaruwa",
  },

  description:
    "Stay at ISARA Residence in Polonnaruwa, located near the ancient city and Parakrama Samudra. Featuring air-conditioned rooms, garden views, hot water, and authentic Sri Lankan hospitality.",

  keywords: [
    "guest house in polonnaruwa",
    "isara residence",
    "hotels near parakrama samudraya",
    "budget stay polonnaruwa",
    "rooms in polonnaruwa sri lanka",
    "places to stay near gal viharaya",
    "budget accommodation polonnaruwa",
    "polonnaruwa guest house",
    "family room polonnaruwa",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    siteName: "ISARA Residence",
    locale: "en_US",
    type: "website",
    url: "/",
    title: "ISARA Residence | Guest House & Rooms in Polonnaruwa",
    description:
      "Stay at ISARA Residence in Polonnaruwa, located near the ancient city and Parakrama Samudra. Featuring air-conditioned rooms, garden views, hot water, and authentic Sri Lankan hospitality.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "ISARA Residence Guest House and scenic garden in Polonnaruwa",
      },
      {
        url: "/images/rooms/deluxe_double/1.jpg",
        width: 1200,
        height: 800,
        alt: "Deluxe AC Double Room accommodation at ISARA Residence Polonnaruwa",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ISARA Residence | Guest House & Rooms in Polonnaruwa",
    description:
      "Stay at ISARA Residence in Polonnaruwa, located near the ancient city and Parakrama Samudra. Featuring air-conditioned rooms, garden views, hot water, and authentic Sri Lankan hospitality.",
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

  verification: {
    google: "ps-K7zGKt8PCBq9Mqq-T2W05UJQ2RiXaF93eSLGb9_I",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": ["BedAndBreakfast", "LodgingBusiness"],
  name: "ISARA Residence",
  alternateName: "ISARA Residence Polonnaruwa",

  image: [
    "https://www.isararesidence.lk/about-sec-lnd.jpg",
    "https://www.isararesidence.lk/images/rooms/deluxe_double/1.jpg",
    "https://www.isararesidence.lk/images/rooms/family_room_1/1.jpg",
  ],

  "@id": "https://www.isararesidence.lk/#lodging",
  url: "https://www.isararesidence.lk",
  telephone: "+94706801910",
  email: "isararesidence@gmail.com",
  priceRange: "$$",
  currenciesAccepted: "LKR, USD",
  paymentAccepted: "Cash, Bank Transfer",

  address: {
    "@type": "PostalAddress",
    streetAddress: "26th Mile Post, Bendiwewa",
    addressLocality: "Polonnaruwa",
    addressRegion: "North Central Province",
    postalCode: "51000",
    addressCountry: "LK",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 7.9594659,
    longitude: 80.9940749,
  },

  checkinTime: "15:00",
  checkoutTime: "10:00",

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
      name: "Hot Water",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Private Bathroom",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Garden View",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Parakrama Samudra Backyard View",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Roadside Location",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Free Parking",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Optional Breakfast upon Request",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Small Events & Gathering Facilities",
      value: true,
    },
  ],

  containsPlace: [
    {
      "@type": "HotelRoom",
      name: "Deluxe Double Room",
      description: "Air-conditioned double bedroom with private attached bathroom, hot water, and serene garden view.",
      bed: {
        "@type": "BedDetails",
        numberOfBeds: 1,
        typeOfBed: "Double Bed",
      },
    },
    {
      "@type": "HotelRoom",
      name: "Double Room Non AC",
      description: "Comfortable non-AC double bedroom with private attached bathroom and garden atmosphere.",
      bed: {
        "@type": "BedDetails",
        numberOfBeds: 1,
        typeOfBed: "Double Bed",
      },
    },
    {
      "@type": "HotelRoom",
      name: "Family Room",
      description: "Spacious air-conditioned family room with private bathroom and garden surroundings.",
      bed: {
        "@type": "BedDetails",
        numberOfBeds: 2,
        typeOfBed: "Double Bed",
      },
    },
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "ISARA Residence Room Accommodations",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "HotelRoom",
          name: "Deluxe Double Room",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "LKR",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "HotelRoom",
          name: "Double Room Non AC",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "LKR",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "HotelRoom",
          name: "Family Room",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "LKR",
        },
      },
    ],
  },

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
        {/* Google Tag Manager / Analytics & Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XKCE677R1P"
          strategy="afterInteractive"
        />

        {/* Initialize Google tracking */}
        <Script id="google-tracking" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}

            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', 'AW-11085339418');
            gtag('config', 'G-XKCE677R1P');
          `}
        </Script>

        {/* Lodging Structured Data */}
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
        <Analytics />
      </body>
    </html>
  );
}
