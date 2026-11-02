
import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://isararesidence.vercel.app"),

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
    "https://isararesidence.vercel.app/about-sec-lnd.jpg",
    "https://isararesidence.vercel.app/images/rooms/deluxe_double/1.jpg",
    "https://isararesidence.vercel.app/images/rooms/family_room_1/1.jpg",
  ],

  "@id": "https://isararesidence.vercel.app/#lodging",
  url: "https://isararesidence.vercel.app",
  telephone: "+94714723538",
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
    latitude: 7.9403,
    longitude: 81.0188,
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
      name: "Hot Water",
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
    {
      "@type": "LocationFeatureSpecification",
      name: "24/7 Front Desk",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Free Parking",
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
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: 2,
      },
    },
    {
      "@type": "HotelRoom",
      name: "Family Room",
      description: "Spacious air-conditioned family suite accommodating up to 4 guests with private bathroom and garden surroundings.",
      bed: {
        "@type": "BedDetails",
        numberOfBeds: 2,
        typeOfBed: "Double Bed",
      },
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: 4,
      },
    },
    {
      "@type": "HotelRoom",
      name: "Garden View Room",
      description: "Comfortable room overlooking tropical gardens with peaceful natural surroundings.",
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: 4,
      },
    },
    {
      "@type": "HotelRoom",
      name: "Lake View Double Room",
      description: "Double room with serene views towards the breeze of Parakrama Samudraya and garden greenery.",
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: 2,
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
          name: "Family Room",
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
          name: "Garden View Room",
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
          name: "Lake View Double Room",
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
        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11085339418"
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 */}
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
      </body>
    </html>
  );
}
