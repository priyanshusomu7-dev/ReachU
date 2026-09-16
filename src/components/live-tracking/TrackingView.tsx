"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { io, type Socket } from "socket.io-client"
import {
  Loader2,
  MapPinOff,
  PackageCheck,
  Truck,
  XCircle,
  Clock,
  Navigation,
  MapPin,
} from "lucide-react"
import type { TrackRoute } from "./TrackingMap"

const TrackingMap = dynamic(() => import("./TrackingMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted/40">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  ),
})

interface TrackData {
  orderId: string
  orderStatus: string
  isActive: boolean
  route: TrackRoute
  driver: { name: string | null; vehicleName: string | null; vehicleNumber: string | null } | null
  driverLocation: { lat: number; lng: number } | null
}

type ViewState =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; data: TrackData }

const API_BASE = (process.env.NEXT_PUBLIC_PORTER_API_URL || "https://api.reachu.co.in").replace(/\/$/, "")
const INACTIVE_STATUSES = new Set(["Completed", "Cancelled"])

interface RideLocationPayload {
  location?: { lat?: number; lng?: number; latitude?: number; longitude?: number }
}

interface RideStatusPayload {
  status?: string
}

const normalizeSocketLocation = (payload: RideLocationPayload): { lat: number; lng: number } | null => {
  const loc = payload?.location
  const lat = Number(loc?.lat ?? loc?.latitude)
  const lng = Number(loc?.lng ?? loc?.longitude)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  return { lat, lng }
}

const STATUS_META: Record<string, { label: string; icon: typeof Truck; tone: string }> = {
  Pending: { label: "Waiting for driver", icon: Clock, tone: "text-amber-600 bg-amber-50 border-amber-200" },
  Accepted: { label: "Driver assigned", icon: Truck, tone: "text-blue-600 bg-blue-50 border-blue-200" },
  Arriving: { label: "Driver arriving", icon: Navigation, tone: "text-blue-600 bg-blue-50 border-blue-200" },
  Progress: { label: "Ride in progress", icon: Truck, tone: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  Completed: { label: "Ride completed", icon: PackageCheck, tone: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  Cancelled: { label: "Ride cancelled", icon: XCircle, tone: "text-red-600 bg-red-50 border-red-200" },
  Scheduled: { label: "Ride scheduled", icon: Clock, tone: "text-amber-600 bg-amber-50 border-amber-200" },
}

async function fetchTrackData(token: string): Promise<TrackData> {
  const res = await fetch(`${API_BASE}/api/v1/order/share/track?token=${encodeURIComponent(token)}`, {
    cache: "no-store",
  })
  const body = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(body?.message || body?.error || "This live location link is invalid or has expired.")
  }

  return body?.data as TrackData
}

export default function TrackingView({ token }: { token: string | null }) {
  const [state, setState] = useState<ViewState>({ kind: "loading" })

  useEffect(() => {
    let cancelled = false
    let socket: Socket | null = null
    let hasConnectedBefore = false

    const disconnectSocket = () => {
      if (socket) {
        socket.disconnect()
        socket = null
      }
    }

    // One-off resync used only when we've missed events (initial connect
    // failure, or a reconnect after a real disconnect) — never on a timer.
    const resync = async () => {
      if (!token) return
      try {
        const data = await fetchTrackData(token)
        if (cancelled) return
        setState({ kind: "ready", data })
        if (!data.isActive) disconnectSocket()
      } catch (error) {
        if (cancelled) return
        setState({ kind: "error", message: error instanceof Error ? error.message : "Something went wrong." })
        disconnectSocket()
      }
    }

    const connectSocket = () => {
      if (!token || socket) return

      // Real-time position/status come from the same `ride:${orderId}` room the
      // driver app and rider app use — the backend already accepts this shareToken
      // as socket auth (see handleViewerLocation in SocketService.js). No polling:
      // `ride:location` and `ride:status` cover every update, including the ride
      // ending, while this socket is connected.
      socket = io(API_BASE, {
        auth: { shareToken: token },
        reconnection: true,
        transports: ['websocket'],
        reconnectionAttempts: 10,
      })

      socket.on("connect", () => {
        if (hasConnectedBefore) void resync()
        hasConnectedBefore = true
      })

      socket.on("ride:location", (payload: RideLocationPayload) => {
        if (cancelled) return
        const location = normalizeSocketLocation(payload)
        if (!location) return
        setState((prev) =>
          prev.kind === "ready" ? { kind: "ready", data: { ...prev.data, driverLocation: location } } : prev
        )
      })

      socket.on("ride:status", (payload: RideStatusPayload) => {
        if (cancelled || !payload?.status) return
        const nextStatus = payload.status
        const nextIsActive = !INACTIVE_STATUSES.has(nextStatus)
        setState((prev) =>
          prev.kind === "ready"
            ? { kind: "ready", data: { ...prev.data, orderStatus: nextStatus, isActive: nextIsActive } }
            : prev
        )
        if (!nextIsActive) disconnectSocket()
      })
    }

    const init = async () => {
      if (!token) {
        setState({ kind: "error", message: "This link is missing its tracking token." })
        return
      }

      try {
        const data = await fetchTrackData(token)
        if (cancelled) return
        setState({ kind: "ready", data })
        if (data.isActive) connectSocket()
      } catch (error) {
        if (cancelled) return
        setState({ kind: "error", message: error instanceof Error ? error.message : "Something went wrong." })
      }
    }

    void init()

    return () => {
      cancelled = true
      disconnectSocket()
    }
  }, [token])

  if (state.kind === "loading") {
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-3 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">Loading live location…</p>
      </div>
    )
  }

  if (state.kind === "error") {
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-muted/40 via-background to-background px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10 text-destructive">
          <MapPinOff className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <h1 className="text-lg font-bold text-foreground">Link unavailable</h1>
          <p className="max-w-sm text-sm text-muted-foreground">{state.message}</p>
        </div>
        <Link
          href="/"
          className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          Go to ReachU
        </Link>
      </div>
    )
  }

  const { data } = state
  const meta = STATUS_META[data.orderStatus] || STATUS_META.Pending
  const StatusIcon = meta.icon

  if (!data.isActive) {
    return (
      <div className="relative h-dvh w-full bg-background">
        <div className="absolute inset-0 opacity-70 grayscale-[0.15]">
          <TrackingMap route={data.route} driverLocation={null} />
        </div>
        <div className="absolute inset-0 z-[1100] flex items-end justify-center bg-gradient-to-t from-background/95 via-background/60 to-transparent sm:items-center">
          <div className="mx-4 mb-6 w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-lg sm:mb-0">
            <div
              className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border ${meta.tone}`}
            >
              <StatusIcon className="h-7 w-7" />
            </div>
            <h1 className="text-lg font-bold text-foreground">{meta.label}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {data.orderStatus === "Completed"
                ? "This ride has already been completed. Live tracking is no longer available."
                : data.orderStatus === "Cancelled"
                  ? "This ride was cancelled. Live tracking is no longer available."
                  : "Live tracking will begin once the ride is active."}
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground hover:bg-primary/90"
            >
              Go to ReachU
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-dvh w-full flex-col bg-background">
      <div className="flex-1">
        <TrackingMap route={data.route} driverLocation={data.driverLocation} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1100] flex justify-center p-3 sm:p-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2 shadow-md backdrop-blur">
          <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${meta.tone}`}>
            <StatusIcon className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-bold text-foreground">{meta.label}</span>
          {!data.driverLocation && (
            <span className="text-xs text-muted-foreground">· Waiting for GPS…</span>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1100] p-3 sm:p-4">
        <div className="pointer-events-auto mx-auto max-w-md rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">
                {data.driver?.name || "Your driver"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {data.driver?.vehicleName || "Vehicle"}
                {data.driver?.vehicleNumber ? ` · ${data.driver.vehicleNumber}` : ""}
              </p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Truck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">{data.route.destination?.address || "Destination"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
