"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, ArrowRight, X } from "lucide-react"

export interface AnnouncementBarProps {
  announcement?: {
    id: string
    title: string
    message: string
    ctaText?: string | null
    ctaUrl?: string | null
    isDismissible: boolean
    updatedAt?: Date | string | null
  } | null
  onDismiss?: () => void
}

export function AnnouncementBar({ announcement, onDismiss }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    if (announcement?.id && typeof window !== "undefined") {
      try {
        localStorage.removeItem(`reachu_dismissed_announcement_${announcement.id}`)
      } catch {}

      const timeKey = announcement.updatedAt ? new Date(announcement.updatedAt).getTime() : ""
      const isDismissed = sessionStorage.getItem(`reachu_dismissed_announcement_${announcement.id}_${timeKey}`)
      if (isDismissed) {
        setDismissed(true)
        onDismiss?.()
      } else {
        setDismissed(false)
      }
    }
  }, [announcement?.id, announcement?.updatedAt, onDismiss])

  if (!announcement || dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
    if (announcement?.id && typeof window !== "undefined") {
      const timeKey = announcement.updatedAt ? new Date(announcement.updatedAt).getTime() : ""
      sessionStorage.setItem(`reachu_dismissed_announcement_${announcement.id}_${timeKey}`, "true")
    }
  }

  return (
    <aside
      aria-label="Special Offer Announcement"
      className="relative z-50 bg-gradient-to-r from-[#7a060d] via-[#9e0c15] to-[#7a060d] text-white border-b border-amber-500/20 shadow-xs overflow-hidden transition-all duration-300"
    >
      {/* Eye-soothing ambient subtle backlight */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(255,191,0,0.18),transparent_70%)] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-3 text-xs sm:text-[13px]">
        <div className="flex items-center gap-2 sm:gap-3 mx-auto text-center min-w-0 flex-wrap justify-center py-0.5">
          {/* Eye-soothing badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-2xs shrink-0">
            <Sparkles className="h-3 w-3 fill-neutral-950 text-neutral-950 animate-pulse" />
            <span>Special Offer</span>
          </span>

          {/* Title */}
          <span className="font-bold text-white tracking-tight drop-shadow-xs">
            {announcement.title}
          </span>

          {/* Message for tablet and desktop */}
          <span className="hidden md:inline text-amber-100/90 font-normal">
            — {announcement.message}
          </span>

          {/* CTA Link */}
          {announcement.ctaText && announcement.ctaUrl && (
            <Link
              href={announcement.ctaUrl}
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#9e0c15] hover:bg-amber-300 hover:text-neutral-950 px-3 py-0.5 text-xs font-bold transition-all duration-200 shadow-2xs hover:shadow-md hover:scale-105 active:scale-95 shrink-0 ml-1"
            >
              <span>{announcement.ctaText}</span>
              <ArrowRight className="h-3 w-3 stroke-[2.5]" />
            </Link>
          )}
        </div>

        {/* Dismiss Button */}
        {announcement.isDismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-full p-1 text-white/70 hover:text-white hover:bg-white/15 transition-all shrink-0 active:scale-90 cursor-pointer"
            aria-label="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </aside>
  )
}


