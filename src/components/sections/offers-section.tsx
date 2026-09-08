"use client"

import * as React from "react"
import { Tag, Sparkles, Calendar, Check, Copy, ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import Image from "next/image"
import Link from "next/link"

interface OfferItem {
  id: string
  title: string
  shortDescription: string
  promoCode: string
  discountType: string
  discountValue: number
  minimumBookingAmount?: number | null
  endAt: Date | string
  imageUrl?: string | null
  applicableService?: string | null
}

interface OffersSectionProps {
  offers: OfferItem[]
}

export function OffersSection({ offers }: OffersSectionProps) {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  if (!offers || offers.length === 0) {
    return null
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2500)
  }

  const formatDate = (date: Date | string) => {
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return "Limited Time"
    }
  }

  return (
    <section id="offers" className="py-16 sm:py-24 bg-muted/30 border-y border-border/50 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-3.5 border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>EXCLUSIVE PROMOTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Save Big on Your Next Delivery
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Use these active ReachU promo codes at checkout to get instant discounts on parcels, tempos, and home shifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const isCopied = copiedCode === offer.promoCode
            const discountBadge =
              offer.discountType === "PERCENTAGE"
                ? `${offer.discountValue}% OFF`
                : `₹${offer.discountValue} OFF`

            return (
              <div
                key={offer.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all duration-200"
              >
                <div>
                  {/* Top Badge & Service */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-xs">
                      <Tag className="h-3 w-3" />
                      <span>{discountBadge}</span>
                    </div>

                    {offer.minimumBookingAmount ? (
                      <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        Min. ₹{offer.minimumBookingAmount}
                      </span>
                    ) : null}
                  </div>

                  {/* Optional Offer Image */}
                  {offer.imageUrl ? (
                    <div className="relative mb-4 h-36 w-full rounded-xl overflow-hidden bg-muted">
                      <Image
                        src={offer.imageUrl}
                        alt={offer.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                  ) : null}

                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {offer.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {offer.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 space-y-3">
                  {/* Promo Code Copy Box */}
                  <div className="flex items-center justify-between rounded-xl border border-dashed border-primary/50 bg-primary/5 p-2.5">
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-muted-foreground">PROMO CODE</p>
                      <p className="font-mono text-sm font-bold tracking-wider text-primary">
                        {offer.promoCode}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(offer.promoCode)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs hover:bg-muted transition-colors border border-border"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Validity & CTA */}
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Valid till {formatDate(offer.endAt)}</span>
                    </div>
                    <Link
                      href="/#services"
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
