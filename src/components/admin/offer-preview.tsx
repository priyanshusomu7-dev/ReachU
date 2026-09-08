"use client"

import * as React from "react"
import { Tag, Sparkles, Calendar, ArrowRight, ShieldCheck, Check } from "lucide-react"
import Image from "next/image"

interface OfferPreviewProps {
  title: string
  shortDescription: string
  promoCode: string
  discountType: string
  discountValue: number
  minimumBookingAmount?: number | null
  startAt: string
  endAt: string
  imageUrl?: string
  applicableService?: string
}

export function OfferPreview({
  title,
  shortDescription,
  promoCode,
  discountType,
  discountValue,
  minimumBookingAmount,
  startAt,
  endAt,
  imageUrl,
  applicableService = "ALL",
}: OfferPreviewProps) {
  const [copied, setCopied] = React.useState(false)

  const discountBadge =
    discountType === "PERCENTAGE"
      ? `${discountValue || 0}% OFF`
      : `₹${discountValue || 0} OFF`

  const handleCopy = () => {
    if (!promoCode) return
    navigator.clipboard.writeText(promoCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (d: string) => {
    if (!d) return "TBD"
    try {
      return new Date(d).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return "TBD"
    }
  }

  return (
    <div className="rounded-2xl border border-border/80 bg-gradient-to-b from-card to-card/60 p-5 shadow-lg">
      <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          Public Website Preview
        </span>
        <span className="text-[11px] text-muted-foreground">
          Applicable: {applicableService}
        </span>
      </div>

      {/* Offer Card Preview */}
      <div className="relative overflow-hidden rounded-xl border border-primary/25 bg-radial from-primary/5 via-card to-card p-5 shadow-xs">
        {/* Top ribbon / discount badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-xs">
            <Tag className="h-3 w-3" />
            <span>{discountBadge}</span>
          </div>
          {minimumBookingAmount ? (
            <span className="text-[11px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
              Min. booking ₹{minimumBookingAmount}
            </span>
          ) : null}
        </div>

        {/* Optional Image */}
        {imageUrl ? (
          <div className="relative mt-3.5 h-36 w-full rounded-lg overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={title || "Offer Banner"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : null}

        {/* Title & Description */}
        <h4 className="mt-3 text-base font-bold text-foreground">
          {title || "Special Promotional Offer"}
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          {shortDescription || "Book your ride or delivery with ReachU and save with this limited-time offer."}
        </p>

        {/* Promo code box */}
        <div className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-primary/50 bg-primary/5 p-2.5">
          <div>
            <p className="text-[10px] uppercase font-semibold text-muted-foreground">PROMO CODE</p>
            <p className="font-mono text-sm font-bold tracking-wider text-primary">
              {promoCode || "CODE100"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-md bg-white dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs hover:bg-muted transition-colors border border-border"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <span>Copy Code</span>
            )}
          </button>
        </div>

        {/* Validity & CTA Footer */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Valid till {formatDate(endAt)}</span>
          </div>
          <div className="inline-flex items-center gap-1 font-semibold text-primary">
            <span>Book Now</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
        <span>Instantly synchronizes to the public ReachU home page upon publishing.</span>
      </div>
    </div>
  )
}
