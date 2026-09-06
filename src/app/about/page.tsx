import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/layout/container"
import {
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  Building2,
  Phone,
  Mail,
  ArrowRight,
  Package,
  Home,
  Boxes,
  Lock,
  Sparkles,
  FileCheck,
} from "lucide-react"
import { DRIVER_APP_URL } from "@/components/shared/app-store-badges"
import { FinalCta } from "@/components/sections/final-cta"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Reach U Delivery Express LLP — our mission, technology, verified commercial fleet, and commitment to effortless logistics across Bharat.",
}

const keyPillars = [
  {
    icon: Package,
    title: "Express Parcel Delivery",
    desc: "Door-to-door courier dispatch for documents, retail orders, samples, and personal packages with live GPS tracking and OTP verification.",
  },
  {
    icon: Home,
    title: "Complete Home Shifting",
    desc: "Stress-free residential relocation with professional packing assistance, closed weatherproof container trucks, and careful furniture placement.",
  },
  {
    icon: Boxes,
    title: "Rental & Local Transport",
    desc: "On-demand booking of commercial mini-trucks and loaders (Tata Ace, 3-wheelers, Bolero Pickup, 14ft trucks) on trip, hourly, or full-day bases.",
  },
]

const values = [
  {
    icon: ShieldCheck,
    title: "Verified & Background-Checked Drivers",
    description:
      "Every driver partner submits government-approved ID, valid commercial driving license, vehicle fitness certificates, and insurance documents before onboarding.",
  },
  {
    icon: Clock,
    title: "Zero-Bargaining Transparent Pricing",
    description:
      "No haggling with roadside brokers or unorganized stands. Transparent distance and vehicle-based fares calculated directly in the app before booking.",
  },
  {
    icon: Lock,
    title: "Two-Factor Secure OTP Delivery",
    description:
      "Consignments are safely handed over only after verifying a secure 4-digit OTP shared directly between the sender and recipient.",
  },
  {
    icon: Users,
    title: "Driver Empowerment & Fair Earnings",
    description:
      "We treat our driver community as growth partners, offering transparent commission structures, timely payouts, and respect for their hard work.",
  },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-b from-muted/30 via-background to-background py-8 sm:py-12 lg:py-16">
      <Container className="px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            About Reach U
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
            Moving Made Effortless for <span className="text-primary">Smart Bharat</span>.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Founded as <strong>Reach U Delivery Express LLP</strong>, ReachU is a modern, technology-driven logistics platform. We bridge the gap between customers, small businesses, and commercial transport drivers—making local and regional movement as seamless, predictable, and dependable as booking a cab.
          </p>
        </div>

        {/* Who We Are & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Our Mission &amp; Purpose
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                For years, booking a commercial vehicle or shifting homes required visiting unorganized truck stands, negotiating uncertain prices with multiple brokers, and worrying about cargo safety without any live tracking.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                ReachU replaces this chaos with a <strong>single, transparent digital platform</strong>. With instant app-based matching, verified commercial drivers, upfront transparent pricing, and live GPS movement, we give individuals and businesses absolute control and peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
                <span className="text-2xl sm:text-3xl font-black text-primary">100%</span>
                <p className="text-xs sm:text-sm font-semibold text-foreground mt-1">Verified Drivers</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Checked licenses &amp; permits</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
                <span className="text-2xl sm:text-3xl font-black text-primary">12 AM - 11 PM</span>
                <p className="text-xs sm:text-sm font-semibold text-foreground mt-1">Daily Operations</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">7 days a week active support</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-background p-6 sm:p-8 md:p-10 shadow-lg">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <Building2 className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold text-base text-foreground">Official Corporate Identity</h3>
                <p className="text-xs text-muted-foreground">Government registered entity</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="font-bold text-muted-foreground min-w-[120px]">Entity Name:</span>
                <span className="font-semibold text-foreground">Reach U Delivery Express LLP</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-muted-foreground min-w-[120px]">GSTIN:</span>
                <span className="font-mono font-bold text-primary">29ABLFR9453Q1ZY</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-muted-foreground min-w-[120px]">Operational Hub:</span>
                <span className="text-foreground leading-snug">Flat no 430 M G colony congress road near by hotel Karim&apos;s kitchen</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-muted-foreground min-w-[120px]">Helpline Desk:</span>
                <span className="text-foreground font-semibold">8586876539 / 9814037044</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-muted-foreground min-w-[120px]">Support Email:</span>
                <span className="text-foreground">support@reachu.co.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 3 Core Offerings Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              What We Do
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Tailored transportation services designed around the real-world needs of Bharat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 border border-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/60">
                    <Link
                      href="/services"
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Explore service details</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Why ReachU Stands Apart - Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Why ReachU Stands Apart
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Our core operating pillars built on safety, honesty, and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val) => {
              const Icon = val.icon
              return (
                <div
                  key={val.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-xs"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {val.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Driver Partner Commitment Section */}
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-background p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3">
              <FileCheck className="h-3.5 w-3.5" />
              Partner With ReachU
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground">
              Own a Mini-Truck, Loader, or 3-Wheeler?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Earn steady daily income, enjoy flexible hours, and get instant trip requests with direct cashless settlements on the official ReachU Driver App.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href={DRIVER_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm px-6 py-3.5 shadow-md shadow-primary/20 hover:bg-primary/90 transition-all text-center"
            >
              <span>Download Driver App</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card hover:bg-muted font-bold text-xs sm:text-sm px-6 py-3.5 transition-colors text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>

      </Container>

      {/* Final CTA */}
      <FinalCta />
    </div>
  )
}
