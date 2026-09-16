"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export interface TrackPoint {
  lat: number | null
  lng: number | null
  address?: string | null
}

export interface TrackStop extends TrackPoint {
  delivered?: boolean
}

export interface TrackRoute {
  origin: TrackPoint | null
  stops: TrackStop[]
  destination: TrackPoint | null
}

interface TrackingMapProps {
  route: TrackRoute
  driverLocation: { lat: number; lng: number } | null
}

const isValidPoint = <T extends TrackPoint>(
  point?: T | null
): point is T & { lat: number; lng: number } =>
  !!point && typeof point.lat === "number" && typeof point.lng === "number"

const createPinIcon = (color: string, label: string) =>
  L.divIcon({
    className: "rt-pin",
    html: `
      <div class="rt-pin-wrap" style="--pin-color:${color}">
        <div class="rt-pin-body"><span>${label}</span></div>
      </div>
    `,
    iconSize: [30, 40],
    iconAnchor: [15, 38],
    popupAnchor: [0, -34],
  })

const createDriverIcon = () =>
  L.divIcon({
    className: "rt-driver",
    html: `
      <div class="rt-driver-wrap">
        <span class="rt-driver-pulse"></span>
        <span class="rt-driver-core">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <path d="M5 16l1.2-4.2A2 2 0 018.1 10h7.8a2 2 0 011.9 1.8L19 16" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M7 16h10" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="8" cy="16.5" r="1.4" fill="#fff"/>
            <circle cx="16" cy="16.5" r="1.4" fill="#fff"/>
            <path d="M8.5 10l1-2.5h5L16 10" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })

export default function TrackingMap({ route, driverLocation }: TrackingMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const routeLayerRef = useRef<L.LayerGroup | null>(null)
  const driverMarkerRef = useRef<L.Marker | null>(null)
  const hasFitRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: true,
    }).setView([20.5937, 78.9629], 5)

    L.control.zoom({ position: "bottomright" }).addTo(map)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      subdomains: "abc",
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      routeLayerRef.current = null
      driverMarkerRef.current = null
      hasFitRef.current = false
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (routeLayerRef.current) {
      routeLayerRef.current.remove()
    }

    const layerGroup = L.layerGroup().addTo(map)
    routeLayerRef.current = layerGroup

    const points: [number, number][] = []

    if (isValidPoint(route.origin)) {
      const p = route.origin
      points.push([p.lat, p.lng])
      L.marker([p.lat, p.lng], { icon: createPinIcon("#16a34a", "A") })
        .addTo(layerGroup)
        .bindPopup(`<b>Pickup</b><br/>${p.address || "Origin"}`)
    }

    route.stops.forEach((stop, index) => {
      if (!isValidPoint(stop)) return
      points.push([stop.lat, stop.lng])
      L.marker([stop.lat, stop.lng], {
        icon: createPinIcon(stop.delivered ? "#94a3b8" : "#ffb800", String(index + 1)),
      })
        .addTo(layerGroup)
        .bindPopup(
          `<b>Stop ${index + 1}${stop.delivered ? " · Delivered" : ""}</b><br/>${stop.address || "Waypoint"}`
        )
    })

    if (isValidPoint(route.destination)) {
      const p = route.destination
      points.push([p.lat, p.lng])
      L.marker([p.lat, p.lng], { icon: createPinIcon("#df0a17", "B") })
        .addTo(layerGroup)
        .bindPopup(`<b>Drop</b><br/>${p.address || "Destination"}`)
    }

    if (points.length >= 2) {
      L.polyline(points, {
        color: "#df0a17",
        weight: 3,
        opacity: 0.55,
        dashArray: "1, 10",
        lineCap: "round",
      }).addTo(layerGroup)
    }

    if (!hasFitRef.current && points.length > 0) {
      if (points.length === 1) {
        map.setView(points[0], 14)
      } else {
        map.fitBounds(L.latLngBounds(points), { padding: [48, 48], maxZoom: 15 })
      }
      hasFitRef.current = true
    }
  }, [route])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !driverLocation) return

    const position: [number, number] = [driverLocation.lat, driverLocation.lng]

    if (driverMarkerRef.current) {
      driverMarkerRef.current.setLatLng(position)
    } else {
      driverMarkerRef.current = L.marker(position, { icon: createDriverIcon(), zIndexOffset: 1000 }).addTo(map)
    }
  }, [driverLocation])

  return <div ref={containerRef} className="h-full w-full" />
}
