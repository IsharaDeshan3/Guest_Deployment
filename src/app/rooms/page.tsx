import type { Metadata } from "next";
import RoomsClient from "./RoomsClient";

export const metadata: Metadata = {
  title: "Polonnaruwa Hotels & Rooms | ISARA Residence",
  description:
    "Find available rooms and compare options among Polonnaruwa hotels. ISARA Residence offers AC and family rooms with private bathrooms and garden lake views.",
  alternates: {
    canonical: "/rooms",
  },
  openGraph: {
    title: "Polonnaruwa Hotels & Rooms | ISARA Residence",
    description:
      "Browse rooms in Polonnaruwa, amenities, and direct accommodation booking for your stay.",
    url: "/rooms",
    images: [
      {
        url: "/images/rooms/deluxe_double/1.jpg",
        width: 1200,
        height: 630,
        alt: "Deluxe double room at ISARA Residence Polonnaruwa",
      },
    ],
  },
  twitter: {
    title: "Polonnaruwa Hotels & Rooms | ISARA Residence",
    description:
      "Find the right room for your Polonnaruwa trip among top guest houses and hotels in Polonnaruwa.",
    images: ["/images/rooms/deluxe_double/1.jpg"],
  },
};

export default function RoomsPage() {
  return <RoomsClient />;
}
