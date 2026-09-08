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
  } | null
}

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false)

  // Use layout effect or event listener to avoid direct setState cascading render
  React.useEffect(() => {
    if (announcement?.id && typeof window !== "undefined") {
      const isDismissed = localStorage.getItem(`reachu_dismissed_announcement_${announcement.id}`)
      if (isDismissed) {
        requestAnimationFrame(() => setDismissed(true))
      }
    }
  }, [announcement?.id])

  if (!announcement || dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    if (announcement?.id && typeof window !== "undefined") {
      localStorage.setItem(`reachu_dismissed_announcement_${announcement.id}`, "true")
    }
  }

  return (
    <div className="relative z-40 bg-neutral-950 text-neutral-200 border-b border-neutral-800 px-4 py-2 text-xs sm:text-sm font-medium shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 truncate mx-auto text-center">
          <Sparkles className="h-4 w-4 shrink-0 animate-pulse text-amber-300" />
          <span className="font-semibold">{announcement.title}</span>
          <span className="hidden md:inline text-white/90">— {announcement.message}</span>

          {announcement.ctaText && announcement.ctaUrl && (
            <Link
              href={announcement.ctaUrl}
              className="inline-flex items-center gap-1 rounded-full bg-white/20 hover:bg-white/30 px-2.5 py-0.5 text-xs font-semibold text-white ml-2 transition-colors"
            >
              <span>{announcement.ctaText}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        {announcement.isDismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded p-1 text-white/80 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
