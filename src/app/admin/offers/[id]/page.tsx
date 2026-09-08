import * as React from "react"
import { notFound } from "next/navigation"
import { getOfferById } from "@/data/offers"
import { OfferForm } from "@/components/admin/offer-form"
import { StatusBadge } from "@/components/admin/status-badge"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

interface EditOfferPageProps {
  params: Promise<{ id: string }>
}

export default async function EditOfferPage({ params }: EditOfferPageProps) {
  const { id } = await params
  const offer = await getOfferById(id)

  if (!offer) {
    notFound()
  }

  const formatDate = (date: Date | string) => {
    try {
      return new Date(date).toLocaleString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "TBD"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <Link
            href="/admin/offers"
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Offers</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Edit Offer: {offer.title}
            </h1>
            <StatusBadge status={offer.computedStatus} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Created on {formatDate(offer.createdAt)} • Last updated on {formatDate(offer.updatedAt)}
          </p>
        </div>
      </div>

      <OfferForm initialData={offer} isEditing={true} />
    </div>
  )
}
