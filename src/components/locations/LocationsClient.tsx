"use client";

import dynamic from "next/dynamic";

const LocationsMap = dynamic(() => import("@/components/locations/LocationsMap"), {
  ssr: false,
});

export default function LocationsClient() {
  return <LocationsMap />;
}
