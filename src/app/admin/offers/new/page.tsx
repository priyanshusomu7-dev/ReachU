import * as React from "react"
import { OfferForm } from "@/components/admin/offer-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function CreateOfferPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-5">
        <Link
          href="/admin/offers"
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground mb-2 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Offers</span>
        </Link>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Create New Offer
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Configure promo code rules, discount values, validity schedule, and target services.
        </p>
      </div>

      <OfferForm isEditing={false} />
    </div>
  )
}
