import * as React from "react"
import { cn } from "@/lib/utils"

export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.reachu.user.app"
export const APP_STORE_URL = "https://apps.apple.com/in/app/reach-u/id6806275349"
export const DRIVER_APP_URL = "https://play.google.com/store/apps/details?id=com.reachu.driver"

export function getDeviceCustomerAppUrl(): string {
  if (typeof window === "undefined") {
    return PLAY_STORE_URL
  }
  const ua = window.navigator.userAgent || window.navigator.vendor || ""
  const isApple =
    /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(ua) ||
    (typeof navigator !== "undefined" &&
      navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1)

  return isApple ? APP_STORE_URL : PLAY_STORE_URL
}

export function useCustomerAppUrl(): string {
  const [url, setUrl] = React.useState(PLAY_STORE_URL)

  React.useEffect(() => {
    setUrl(getDeviceCustomerAppUrl())
  }, [])

  return url
}

interface BadgeProps {
  className?: string
  variant?: "black" | "outline"
}

export function GooglePlayButton({ className = "", variant = "black" }: BadgeProps) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
      className={cn(
        "group inline-flex h-12 min-w-[162px] items-center gap-3 rounded-xl px-4 py-2 text-left shadow-md transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:translate-y-0 select-none",
        variant === "black"
          ? "bg-black text-white border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 hover:shadow-lg"
          : "bg-background text-foreground border border-border hover:bg-muted hover:border-border/80",
        className
      )}
    >
      {/* Official Google Play 4-Color Mark */}
      <svg
        className="h-6 w-6 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.6 1.84L13.78 12 3.6 22.16C3.23 21.68 3 21 3 20.2V3.8C3 3 3.23 2.32 3.6 1.84Z"
          fill="#00D3FF"
        />
        <path
          d="M13.78 12L3.6 1.84C4.16 1.34 4.96 1.2 5.72 1.63L17.2 8.23L13.78 12Z"
          fill="#00F076"
        />
        <path
          d="M13.78 12L17.2 15.77L5.72 22.37C4.96 22.8 4.16 22.66 3.6 22.16L13.78 12Z"
          fill="#FF3A44"
        />
        <path
          d="M20.65 10.23L17.2 8.23L13.78 12L17.2 15.77L20.65 13.77C21.84 13.08 21.84 10.92 20.65 10.23Z"
          fill="#FFE000"
        />
      </svg>
      <div className="leading-none">
        <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-300">
          GET IT ON
        </p>
        <p className="mt-1 text-[15px] font-bold tracking-tight text-white">
          Google Play
        </p>
      </div>
    </a>
  )
}

export function AppStoreButton({ className = "", variant = "black" }: BadgeProps) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
      className={cn(
        "group inline-flex h-12 min-w-[162px] items-center gap-3 rounded-xl px-4 py-2 text-left shadow-md transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:translate-y-0 select-none",
        variant === "black"
          ? "bg-black text-white border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 hover:shadow-lg"
          : "bg-background text-foreground border border-border hover:bg-muted hover:border-border/80",
        className
      )}
    >
      {/* Official Apple Logo Mark */}
      <svg
        className="h-6 w-6 shrink-0 fill-white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-.99 1.72-.88 2.74 1.01.08 2-.51 2.6-1.24z" />
      </svg>
      <div className="leading-none">
        <p className="text-[10px] font-medium tracking-tight text-neutral-300">
          Download on the
        </p>
        <p className="mt-1 text-[15px] font-bold tracking-tight text-white">
          App Store
        </p>
      </div>
    </a>
  )
}
