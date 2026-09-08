import * as React from "react"
import Link from "next/link"
import {
  Tag,
  Clock,
  Sparkles,
  Megaphone,
  Plus,
  Boxes,
  FileText,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertCircle,
} from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/admin/empty-state"
import { getOfferStats, getOffers } from "@/data/offers"
import { getAnnouncements } from "@/data/announcements"
import { getAuditLogs } from "@/data/audit"
import { getAdminSession } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const session = await getAdminSession()
  const offerStats = await getOfferStats()
  const announcements = await getAnnouncements()
  const recentOffers = await getOffers()
  const auditLogs = await getAuditLogs(8)

  const activeAnnouncementsCount = (announcements as any[]).filter(
    (a: any) => a.isActive && a.status === "ACTIVE"
  ).length

  // Filter offers for the summary tab
  const activeOffers = (recentOffers as any[]).filter((o: any) => o.computedStatus === "ACTIVE").slice(0, 5)
  const scheduledOffers = (recentOffers as any[]).filter((o: any) => o.computedStatus === "SCHEDULED").slice(0, 5)

  const formatDate = (date: Date | string) => {
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return "TBD"
    }
  }

  const formatRelativeTime = (date: Date | string) => {
    try {
      const diffMs = Date.now() - new Date(date).getTime()
      const mins = Math.floor(diffMs / 60000)
      if (mins < 1) return "Just now"
      if (mins < 60) return `${mins}m ago`
      const hours = Math.floor(mins / 60)
      if (hours < 24) return `${hours}h ago`
      const days = Math.floor(hours / 24)
      return `${days}d ago`
    } catch {
      return "Recently"
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Operational Overview
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Welcome back, {session?.name || "Administrator"}. Here is your live ReachU system status.
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/offers/new">
            <Button size="sm" className="gap-1.5 shadow-2xs font-semibold">
              <Plus className="h-4 w-4" />
              <span>Create Offer</span>
            </Button>
          </Link>
          <Link href="/admin/announcements">
            <Button size="sm" variant="outline" className="gap-1.5 shadow-2xs">
              <Megaphone className="h-4 w-4" />
              <span>New Announcement</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* A. Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Offers"
          value={offerStats.total}
          subtitle="All created promotional records"
          icon={Tag}
          color="primary"
        />
        <StatCard
          title="Active Offers"
          value={offerStats.active}
          subtitle="Currently live on public website"
          icon={Sparkles}
          color="emerald"
        />
        <StatCard
          title="Scheduled Offers"
          value={offerStats.scheduled}
          subtitle="Auto-activating on future dates"
          icon={Clock}
          color="blue"
        />
        <StatCard
          title="Active Announcements"
          value={activeAnnouncementsCount}
          subtitle="Banners live on public website"
          icon={Megaphone}
          color="amber"
        />
      </div>

      {/* Quick Action Navigation Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/admin/offers"
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-xs transition-all group"
        >
          <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:scale-105 transition-transform">
            <Tag className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Manage Offers</p>
            <p className="text-[11px] text-muted-foreground">Promo codes & limits</p>
          </div>
        </Link>

        <Link
          href="/admin/services"
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-xs transition-all group"
        >
          <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
            <Boxes className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Manage Services</p>
            <p className="text-[11px] text-muted-foreground">Order & descriptions</p>
          </div>
        </Link>

        <Link
          href="/admin/content"
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-xs transition-all group"
        >
          <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Website Copy</p>
            <p className="text-[11px] text-muted-foreground">Hero & section text</p>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-xs transition-all group"
        >
          <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Audit & Settings</p>
            <p className="text-[11px] text-muted-foreground">System logs & contacts</p>
          </div>
        </Link>
      </div>

      {/* Main Grid: Offer Summary + Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* D. Offer Summary Column */}
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/60">
              <div>
                <CardTitle className="text-base">Live & Scheduled Offers</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Currently running promotional campaigns in the ReachU system
                </p>
              </div>
              <Link
                href="/admin/offers"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <span>View All ({recentOffers.length})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>

            <CardContent className="p-0">
              {recentOffers.length === 0 ? (
                <div className="p-6">
                  <EmptyState
                    icon={Tag}
                    title="No offers created yet"
                    description="Create your first promotional offer to attract bookings and engage customers."
                    actionLabel="Create First Offer"
                    actionHref="/admin/offers/new"
                  />
                </div>
              ) : (
                <div className="divide-y divide-border/60">
                  {(recentOffers as any[]).slice(0, 5).map((offer: any) => {
                    const discount =
                      offer.discountType === "PERCENTAGE"
                        ? `${offer.discountValue}% OFF`
                        : `₹${offer.discountValue} OFF`

                    return (
                      <div
                        key={offer.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/20 transition-colors gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0 mt-0.5">
                            <Tag className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-foreground">
                                {offer.title}
                              </span>
                              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                                {offer.promoCode}
                              </span>
                              <StatusBadge status={offer.computedStatus} />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {offer.shortDescription}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs shrink-0 pl-9 sm:pl-0">
                          <div className="text-left sm:text-right">
                            <span className="font-bold text-foreground block">{discount}</span>
                            <span className="text-[11px] text-muted-foreground">
                              Till {formatDate(offer.endAt)}
                            </span>
                          </div>
                          <Link href={`/admin/offers/${offer.id}`}>
                            <Button size="xs" variant="outline">
                              Edit
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* B. Recent Activity Column */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-base">System Audit Activity</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Real-time operational audit trails
              </p>
            </CardHeader>
            <CardContent className="p-4">
              {auditLogs.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-6">
                  No activity logged yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {(auditLogs as any[]).map((log: any) => {
                    let details = ""
                    try {
                      if (log.metadata) {
                        const m = JSON.parse(log.metadata)
                        details = m.title || m.name || m.promoCode || m.reason || ""
                      }
                    } catch {
                      details = log.metadata || ""
                    }

                    return (
                      <div key={log.id} className="flex items-start gap-3 text-xs">
                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate">
                            {log.action.replace(/_/g, " ")}
                          </p>
                          {details && (
                            <p className="text-[11px] text-muted-foreground truncate">{details}</p>
                          )}
                          <span className="text-[10px] text-muted-foreground">
                            {formatRelativeTime(log.createdAt)} • {log.adminEmail || "Admin"}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
