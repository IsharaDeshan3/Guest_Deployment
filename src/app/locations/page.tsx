import type { Metadata } from "next";
import LocationsClientPage from "./LocationsClientPage";
import { nearbyLocations } from "@/data/nearbyLocations";

export const metadata: Metadata = {
  title: "Nearby Attractions in Polonnaruwa | Polonnaruwa Hotels Guide",
  description:
    "Discover historical attractions and cultural landmarks near ISARA Residence. Ideal guide for travelers staying at Polonnaruwa hotels, guest houses, and resorts.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Nearby Attractions Around ISARA Residence | Polonnaruwa Hotels Guide",
    description:
      "Plan your historical visit near top places to stay in Polonnaruwa, from Gal Viharaya to Parakrama Samudra.",
    url: "/locations",
    images: [
      {
        url: "/location-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Historic locations around Polonnaruwa hotels",
      },
    ],
  },
  twitter: {
    title: "Nearby Attractions Around ISARA Residence | Polonnaruwa Hotels",
    description:
      "Explore Polonnaruwa landmarks within easy reach of your hotel or guest house.",
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
        ? `https://www.isararesidence.lk${location.images[0]}`
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
