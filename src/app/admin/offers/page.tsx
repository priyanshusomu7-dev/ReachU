import * as React from "react"
import Link from "next/link"
import { Plus, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OffersTable } from "@/components/admin/offers-table"
import { getOffers } from "@/data/offers"

export const dynamic = "force-dynamic"

export default async function AdminOffersPage() {
  const offers = await getOffers()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Promotional Offers
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Create, schedule, activate, and manage discounts visible on the ReachU public website.
          </p>
        </div>

        <Link href="/admin/offers/new">
          <Button className="gap-2 font-semibold shadow-xs">
            <Plus className="h-4 w-4" />
            <span>Create New Offer</span>
          </Button>
        </Link>
      </div>

      <OffersTable initialOffers={offers} />
    </div>
  )
}
