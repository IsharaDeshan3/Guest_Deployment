"use client";

import { useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import L from "leaflet";
import { nearbyLocations, type NearbyLocation } from "@/data/nearbyLocations";
import LocationModal from "@/components/locations/LocationModal";

export default function LocationsMap() {
  const [selected, setSelected] = useState<NearbyLocation | null>(null);
  const locationsWithImages = useMemo(
    () => nearbyLocations.filter((loc) => (loc.images?.length ?? 0) > 0),
    []
  );

  // Compute a tight initial center from the nearby locations (centroid)
  const center = useMemo<[number, number]>(() => {
    if (!locationsWithImages || locationsWithImages.length === 0) {
      return [7.94722222, 81.00111111];
    }
    const sum = locationsWithImages.reduce(
      (acc, l) => {
        acc.lat += l.lat;
        acc.lng += l.lng;
        return acc;
      },
      { lat: 0, lng: 0 }
    );
    return [sum.lat / locationsWithImages.length, sum.lng / locationsWithImages.length];
  }, [locationsWithImages]);

  const pinIcon = useMemo(() => {
    const html = `
      <div style="transform: translate(-50%, -100%);">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" fill="#111827"/>
          <circle cx="12" cy="11" r="2.6" fill="white"/>
        </svg>
      </div>
    `;

    return L.divIcon({
      className: "isara-pin",
      html,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
    });
  }, []);


  return (
    <>
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-black/10 flex justify-center">
        <div className={`${selected ? 'filter blur-sm' : ''} w-full flex justify-center`}> 
          <div className="w-full md:w-[90%] mx-auto aspect-video">
            <MapContainer
              center={center}
              zoom={15}
              minZoom={11}
              scrollWheelZoom
              className="w-full h-full"
            >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {locationsWithImages.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={pinIcon}
              eventHandlers={{
                click: () => setSelected(loc),
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -22]}
                opacity={1}
                sticky
              >
                {loc.name}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
        </div>
      </div>
      </div>

      {selected && (
        <LocationModal location={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
