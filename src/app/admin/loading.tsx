import * as React from "react"

export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-2">
          <div className="h-7 w-48 sm:w-64 bg-muted rounded-md" />
          <div className="h-4 w-72 sm:w-96 bg-muted/60 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 bg-muted rounded-lg" />
          <div className="h-9 w-36 bg-muted/60 rounded-lg" />
        </div>
      </div>

      {/* 4 Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border/60 bg-card p-5 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-8 w-8 rounded-lg bg-muted/80" />
            </div>
            <div className="h-8 w-16 bg-muted rounded font-bold" />
            <div className="h-3 w-32 bg-muted/50 rounded" />
          </div>
        ))}
      </div>

      {/* Quick Action Navigation Strip Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4"
          >
            <div className="h-8 w-8 rounded-lg bg-muted shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 w-20 bg-muted rounded" />
              <div className="h-2.5 w-28 bg-muted/50 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content / Table Area Skeleton */}
      <div className="rounded-xl border border-border/60 bg-card shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-border/60 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-5 w-40 bg-muted rounded" />
            <div className="h-3.5 w-60 bg-muted/50 rounded" />
          </div>
          <div className="h-8 w-24 bg-muted/60 rounded-md" />
        </div>
        <div className="p-0 divide-y divide-border/40">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-9 w-9 rounded-lg bg-muted shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-1/3 bg-muted rounded" />
                  <div className="h-3 w-1/2 bg-muted/50 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="h-6 w-16 bg-muted/60 rounded-full" />
                <div className="h-8 w-16 bg-muted rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
