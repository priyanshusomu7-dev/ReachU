"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import TrackingView from "@/components/live-tracking/TrackingView"

function LiveLocationContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  return <TrackingView token={token} />
}

export default function LiveLocationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh w-full items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <LiveLocationContent />
    </Suspense>
  )
}
