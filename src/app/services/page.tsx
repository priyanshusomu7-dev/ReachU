import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Services } from "@/components/sections/services"
import { FinalCta } from "@/components/sections/final-cta"

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore ReachU services: Parcel Delivery, Home Shifting, and Rental & Local Transport. Reliable, affordable, and on-demand logistics.",
}

export default function ServicesPage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-b from-muted/30 via-background to-background py-8 sm:py-12">
      <Container className="px-4 sm:px-6 lg:px-8 mb-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">Services</span>
        </nav>
      </Container>

      {/* Services Section with 3 Cards and Read More Details */}
      <Services />

      {/* Final CTA */}
      <FinalCta />
    </div>
  )
}
