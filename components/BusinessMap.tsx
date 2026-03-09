"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Business } from "../types/database";

const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629]; // India center
const DEFAULT_ZOOM = 5;

type Props = {
  businesses: Business[];
  center?: [number, number];
  zoom?: number;
};

export default function BusinessMap({ businesses, center, zoom = DEFAULT_ZOOM }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstance.current) return;

    const map = L.map(mapRef.current).setView(
      center ?? DEFAULT_CENTER,
      zoom
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [center, zoom]);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const markers: L.Marker[] = [];
    const withCoords = businesses.filter(
      (b): b is Business & { lat: number; lng: number } =>
        b.lat != null && b.lng != null
    );
    withCoords.forEach((b) => {
      const marker = L.marker([b.lat, b.lng])
        .bindPopup(
          `<a href="/b/${b.slug}" class="font-medium text-blue-600 hover:underline">${escapeHtml(b.name)}</a>`
        )
        .addTo(map);
      markers.push(marker);
    });
    if (withCoords.length > 1) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    } else if (withCoords.length === 1) {
      map.setView([withCoords[0].lat, withCoords[0].lng], Math.max(zoom, 14));
    }

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [businesses, zoom]);

  return <div ref={mapRef} className="h-full w-full min-h-[200px]" />;
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
