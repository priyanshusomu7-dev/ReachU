"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, ArrowRight, X } from "lucide-react"

interface AnnouncementBarProps {
  announcement?: {
    id: string
    title: string
    message: string
    ctaText?: string | null
    ctaUrl?: string | null
    isDismissible: boolean
    updatedAt?: Date | string | null
  } | null
}

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false)

  // Use layout effect to sync dismissal state cleanly
  React.useEffect(() => {
    if (announcement?.id && typeof window !== "undefined") {
      // Clean up legacy permanent dismissals in localStorage so active banners display
      try {
        localStorage.removeItem(`reachu_dismissed_announcement_${announcement.id}`)
      } catch {}

      // Check session storage scoped to this announcement's timestamp version
      const timeKey = announcement.updatedAt ? new Date(announcement.updatedAt).getTime() : ""
      const isDismissed = sessionStorage.getItem(`reachu_dismissed_announcement_${announcement.id}_${timeKey}`)
      if (isDismissed) {
        requestAnimationFrame(() => setDismissed(true))
      } else {
        setDismissed(false)
      }
    }
  }, [announcement?.id, announcement?.updatedAt])

  if (!announcement || dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    if (announcement?.id && typeof window !== "undefined") {
      const timeKey = announcement.updatedAt ? new Date(announcement.updatedAt).getTime() : ""
      sessionStorage.setItem(`reachu_dismissed_announcement_${announcement.id}_${timeKey}`, "true")
    }
  }

  return (
    <aside
      aria-label="Promotional Announcement"
      className="relative z-40 bg-gradient-to-r from-[#b70611] via-[#df0a17] to-[#e62426] text-white border-b border-red-800/80 shadow-xs overflow-hidden"
    >
      {/* Ambient subtle decorative light effect */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(255,184,0,0.22),transparent_40%),radial-gradient(circle_at_85%_50%,rgba(255,255,255,0.14),transparent_35%)] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2 sm:gap-2.5 mx-auto text-center min-w-0 flex-wrap justify-center py-0.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow-2xs shrink-0">
            <Sparkles className="h-3 w-3 fill-neutral-950 text-neutral-950 animate-pulse" />
            <span>Special Offer</span>
          </span>

          <span className="font-bold text-white tracking-tight drop-shadow-xs">
            {announcement.title}
          </span>
          <span className="hidden md:inline text-white/90 font-normal">
            — {announcement.message}
          </span>

          {announcement.ctaText && announcement.ctaUrl && (
            <Link
              href={announcement.ctaUrl}
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#df0a17] hover:bg-amber-300 hover:text-neutral-950 px-3 py-0.5 text-xs font-bold transition-all duration-200 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 shrink-0 ml-1.5"
            >
              <span>{announcement.ctaText}</span>
              <ArrowRight className="h-3 w-3 stroke-[2.5]" />
            </Link>
          )}
        </div>

        {announcement.isDismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-full p-1 text-white/80 hover:text-white hover:bg-white/20 transition-all shrink-0 active:scale-90"
            aria-label="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </aside>
  )
}

