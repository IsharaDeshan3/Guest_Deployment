import type { Metadata } from "next";
import RoomsClient from "./RoomsClient";

export const metadata: Metadata = {
  title: "Rooms In Polonnaruwa",
  description:
    "Explore AC and family-friendly room options at ISARA Residence with private bathrooms, peaceful surroundings, and convenient access to Polonnaruwa attractions.",
  alternates: {
    canonical: "/rooms",
  },
  openGraph: {
    title: "Rooms at ISARA Residence",
    description:
      "Browse room types, amenities, and availability for your Polonnaruwa stay.",
    url: "/rooms",
    images: [
      {
        url: "/images/rooms/deluxe_double/1.jpg",
        width: 1200,
        height: 630,
        alt: "Deluxe double room at ISARA Residence",
      },
    ],
  },
  twitter: {
    title: "Rooms at ISARA Residence",
    description:
      "Find the right room for your Polonnaruwa trip, from deluxe doubles to family stays.",
    images: ["/images/rooms/deluxe_double/1.jpg"],
  },
};

export default function RoomsPage() {
  return <RoomsClient />;
}
