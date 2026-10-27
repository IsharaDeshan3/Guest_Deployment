import type { Metadata } from "next";
import LocationsClientPage from "./LocationsClientPage";
import { nearbyLocations } from "@/data/nearbyLocations";

export const metadata: Metadata = {
  title: "Nearby Attractions In Polonnaruwa",
  description:
    "Discover cultural landmarks near ISARA Residence, including Polonnaruwa's temples, museums, and archaeological highlights.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Nearby Attractions Around ISARA Residence",
    description:
      "Plan your visit with top historical places near Polonnaruwa and view photos before you go.",
    url: "/locations",
    images: [
      {
        url: "/location-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Historic locations around Polonnaruwa",
      },
    ],
  },
  twitter: {
    title: "Nearby Attractions Around ISARA Residence",
    description:
      "Explore Polonnaruwa landmarks within easy reach of your stay.",
    images: ["/location-bg.jpg"],
  },
};

const locationsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Nearby attractions around ISARA Residence",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: nearbyLocations.length,
  itemListElement: nearbyLocations.map((location, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "TouristAttraction",
      name: location.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.lat,
        longitude: location.lng,
      },
      image: location.images?.[0]
        ? `https://isararesidence.vercel.app${location.images[0]}`
        : undefined,
      description: location.description.en,
    },
  })),
};

export default function LocationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(locationsJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LocationsClientPage />
    </>
  );
}
