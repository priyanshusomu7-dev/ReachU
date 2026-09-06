"use client"

import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  ArrowRight,
  X,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Clock,
  Truck,
  Package,
  Home,
  FileText,
  Boxes,
  Sparkles,
  Download,
} from "lucide-react"
import { useCustomerAppUrl, getDeviceCustomerAppUrl } from "@/components/shared/app-store-badges"

export interface ServiceDetail {
  id: string
  title: string
  image: string
  badge: string
  description: string
  tagline: string
  fullOverview: string
  useCases: string[]
  keyFeatures: {
    title: string
    description: string
  }[]
  howItWorks: {
    step: string
    title: string
    detail: string
  }[]
  suitableVehicles: string[]
  pricingNote: string
}

export const servicesData: ServiceDetail[] = [
  {
    id: "parcel-delivery",
    title: "Parcel Delivery",
    image: "/images/services/service-1.jpg",
    badge: "Doorstep Express",
    description:
      "Send small to medium-sized parcels quickly within your city or across regions. Affordable pricing & door-to-door service.",
    tagline: "Swift, safe, and trackable courier pickup right from your doorstep.",
    fullOverview:
      "ReachU Parcel Delivery offers an ultra-reliable, point-to-point courier and parcel dispatch service for personal and business needs. Skip the lines at postal offices or courier branches—our verified delivery riders arrive right at your location to pick up and securely transport packages, documents, urgent samples, and boutique orders across the city.",
    useCases: [
      "Important business documents, contracts, and legal papers",
      "E-commerce merchandise and retail orders",
      "Personal parcels, food hampers, and festive gifts",
      "Urgent replacement parts, gadgets, and electronics",
      "Medicines and prescription deliveries",
    ],
    keyFeatures: [
      {
        title: "Doorstep Pickup & Handover",
        description: "Zero visits to courier branches; riders collect directly from your home or office.",
      },
      {
        title: "Real-Time Live GPS Tracking",
        description: "Watch your parcel move on the live map within the ReachU app from start to finish.",
      },
      {
        title: "Secure OTP Handover",
        description: "Guaranteed delivery with two-factor OTP verification at the destination.",
      },
      {
        title: "Instant Digital Proof of Delivery",
        description: "Receive digital signatures and photo confirmations instantly upon arrival.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Enter Locations",
        detail: "Input the pickup and drop-off addresses in the ReachU mobile app.",
      },
      {
        step: "02",
        title: "Instant Fare Estimate",
        detail: "Review the transparent, distance-based price with zero hidden surges.",
      },
      {
        step: "03",
        title: "Rider Pickup",
        detail: "Nearest verified rider arrives at your doorstep to inspect and collect the parcel.",
      },
      {
        step: "04",
        title: "Secure Delivery",
        detail: "Recipient shares the unique delivery OTP to safely receive the consignment.",
      },
    ],
    suitableVehicles: ["Two-Wheelers (Bikes / Scooters)", "Electric Cargo Bikes", "Compact City Vans"],
    pricingNote: "Transparent distance-based fares starting from pocket-friendly base charges with live estimation.",
  },
  {
    id: "home-shifting",
    title: "Home Shifting",
    image: "/images/services/service-2.jpg",
    badge: "Complete Relocation",
    description:
      "Complete relocation solutions with professional movers, packing assistance, and safe transportation of all household goods.",
    tagline: "Zero-stress relocation with professional packing and safe transit.",
    fullOverview:
      "Relocating your household shouldn't be stressful. ReachU provides end-to-end residential moving solutions tailored to apartments, independent houses, and studio flats. From disassembling heavy beds and multi-layer bubble wrapping delicate dinnerware to loading and gentle room-by-room placement, our seasoned movers ensure your valuable memories arrive intact.",
    useCases: [
      "Studio / 1 RK & 1 BHK bachelor or student apartment shifting",
      "2 BHK & 3 BHK complete family household relocation",
      "Fragile electronics: Smart TVs, refrigerators, and washing machines",
      "Bulky furniture: Wardrobes, modular beds, sofa sets, and dining tables",
      "Inter-city and intra-city residential transit",
    ],
    keyFeatures: [
      {
        title: "Multi-Layer Protective Packing",
        description: "Bubble wraps, corrugated sheets, foam rolls, and heavy-duty carton boxes for complete protection.",
      },
      {
        title: "Trained & Verified Moving Crew",
        description: "Expert lifters skilled in maneuvering narrow staircases, elevators, and tight corners safely.",
      },
      {
        title: "Closed & Weatherproof Trucks",
        description: "Shield your goods against dust, moisture, and road vibrations in closed-container vehicles.",
      },
      {
        title: "Disassembly & Placement Assistance",
        description: "Help with dismantling large furniture items and placing them in designated rooms.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Schedule Your Move",
        detail: "Select your home size and preferred shifting date and time slot in the app.",
      },
      {
        step: "02",
        title: "Dedicated Crew Arrives",
        detail: "Our team arrives with heavy-duty packing supplies and modern loading equipment.",
      },
      {
        step: "03",
        title: "Careful Transit",
        detail: "Goods are strapped securely inside closed vehicles and transported smoothly.",
      },
      {
        step: "04",
        title: "Unloading & Setup",
        detail: "Items are unloaded, verified against your checklist, and placed in your new rooms.",
      },
    ],
    suitableVehicles: ["Tata Ace (Chhota Hathi)", "Mahindra Bolero Maxi Truck", "8ft / 14ft Closed Container Trucks"],
    pricingNote: "Comprehensive quote including truck, fuel, driver, and optional loading helper assistance.",
  },
  {
    id: "rental-transport",
    title: "Rental & Local Transport",
    image: "/images/services/service-3.jpg",
    badge: "Commercial & Bulk",
    description:
      "Book small to medium-sized trucks or loaders for rent on an hourly or full-day basis. Ideal for furniture shifting or bulk orders.",
    tagline: "On-demand mini-trucks and loaders by the hour, trip, or day.",
    fullOverview:
      "Whether you are a wholesaler distributing stock, a carpenter transporting timber, an event manager moving sound gear, or an individual picking up new furniture from market, ReachU Rental & Local Transport delivers instant access to commercial loaders. Book flexible single trips or reserve vehicles on hourly packages with verified professional drivers.",
    useCases: [
      "Wholesale market supply runs (hardware, electricals, textiles, FMCG)",
      "B2B store distribution and multi-stop merchant dispatches",
      "Heavy single-item pickups from stores (IKEA, local furniture hubs)",
      "Catering supplies, event staging, audio-visual equipment transit",
      "Factory-to-warehouse materials transport",
    ],
    keyFeatures: [
      {
        title: "Diverse Fleet at Your Fingertips",
        description: "Access 3-wheel loaders, Tata Ace, pickup trucks, and 14ft flatbeds instantly.",
      },
      {
        title: "Flexible Rental Options",
        description: "Rent for one-way point-to-point runs, hourly blocks (2h/4h/8h), or full-day operations.",
      },
      {
        title: "Multi-Point Drop-Offs",
        description: "Easily configure multiple delivery stops along a single cost-effective route.",
      },
      {
        title: "Business Invoicing & GST Support",
        description: "Generate compliant GST business invoices with simple trip logging.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Choose Vehicle & Duration",
        detail: "Select the vehicle category based on payload weight and choose trip or hourly rental.",
      },
      {
        step: "02",
        title: "Instant Driver Match",
        detail: "Nearest available driver is dispatched to your loading point in minutes.",
      },
      {
        step: "03",
        title: "Load & Track Run",
        detail: "Load your cargo and track the multi-stop or direct route on the live navigation map.",
      },
      {
        step: "04",
        title: "Pay & Get Invoice",
        detail: "Settle via UPI, corporate account, or cash and download your digital trip receipt.",
      },
    ],
    suitableVehicles: ["3-Wheeler Loaders (Piaggio Ape)", "Tata Ace / Dost", "Mahindra Bolero Pickup", "Tata 407 / 14ft"],
    pricingNote: "Fair and transparent hourly packages and distance-based rates with zero middleman commissions.",
  },
]

export function Services() {
  const [selectedService, setSelectedService] = React.useState<ServiceDetail | null>(null)
  const customerAppUrl = useCustomerAppUrl()

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null)
    }
    if (selectedService) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedService])

  return (
    <section id="services" className="py-20 md:py-32 bg-muted/30 relative">
      <Container>
        <div className="flex flex-col items-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            Our Services
          </div>
          <SectionHeading
            title="Explore Our Services"
            subtitle="From small doorstep parcels to complete home shifting, we provide the right vehicle and professional support for every move."
            align="center"
          />
        </div>

        {/* Exactly 3 Service Cards from reachu.co.in */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Image Container with zoom effect */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/20">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  <p className="text-sm leading-relaxed text-muted-foreground min-h-[4rem]">
                    {service.description}
                  </p>

                  {/* Quick Feature Pills */}
                  <div className="mt-4 pt-4 border-t border-border/60 flex flex-wrap gap-1.5">
                    {service.keyFeatures.slice(0, 2).map((feat) => (
                      <span
                        key={feat.title}
                        className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-foreground"
                      >
                        <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                        <span>{feat.title}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with ReachU's signature sliding "Read More" button */}
              <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  aria-label={`Read more about ${service.title}`}
                  className="relative inline-flex items-center overflow-hidden rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-300 group/btn cursor-pointer p-1 pr-4"
                >
                  {/* Icon Circle */}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:rotate-[-10deg]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  
                  {/* Slide text */}
                  <span className="ml-3 text-xs sm:text-sm font-bold tracking-wide transition-colors duration-300">
                    Read More
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* READ MORE DETAILED CONTENT MODAL / DRAWER */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm p-3 sm:p-6 md:p-8 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl my-auto max-h-[85vh] overflow-y-auto overscroll-contain rounded-2xl sm:rounded-3xl border border-border bg-background shadow-2xl p-6 sm:p-8 md:p-10 animate-in zoom-in-95 duration-200 [scrollbar-width:thin] [scrollbar-color:hsl(var(--primary)/0.4)_transparent]"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Sticky Header with Close Button */}
            <div className="sticky -top-6 sm:-top-8 md:-top-10 -mx-6 sm:-mx-8 md:-mx-10 px-6 sm:px-8 md:px-10 py-3 bg-background/95 backdrop-blur-md z-30 border-b border-border/50 flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                {selectedService.badge}
              </span>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Close modal"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <h2 id="service-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              {selectedService.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-primary">
              {selectedService.tagline}
            </p>

            {/* Image banner inside modal */}
            <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden my-6 border border-border">
              <Image
                src={selectedService.image}
                alt={selectedService.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white text-xs sm:text-sm font-semibold flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <span>Available 7 Days a Week • 12 AM to 11 PM</span>
              </div>
            </div>

            {/* Detailed Overview */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Service Overview
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selectedService.fullOverview}
              </p>
            </div>

            {/* Key Advantages Grid */}
            <div className="mt-8">
              <h4 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Key Benefits & Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedService.keyFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-border/80 bg-muted/40 p-4 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <h5 className="font-bold text-xs sm:text-sm text-foreground">
                        {feature.title}
                      </h5>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed pl-6">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable For / Common Use Cases */}
            <div className="mt-8">
              <h4 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <Boxes className="h-4 w-4 text-primary" />
                Ideal For & Popular Use Cases
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                {selectedService.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2 bg-background p-2.5 rounded-lg border border-border/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step How It Works */}
            <div className="mt-8">
              <h4 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                How It Works
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {selectedService.howItWorks.map((item) => (
                  <div key={item.step} className="rounded-xl border border-border bg-card p-3.5 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-black text-primary tracking-widest font-mono">
                        {item.step}
                      </span>
                      <h5 className="text-xs font-bold text-foreground mt-1">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable Fleet Options */}
            <div className="mt-8 rounded-xl border border-border/70 bg-muted/30 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Available Vehicle Fleet:
                  </h5>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedService.suitableVehicles.map((vehicle) => (
                      <span
                        key={vehicle}
                        className="inline-flex items-center gap-1 rounded-lg bg-background px-3 py-1 text-xs font-semibold text-foreground border border-border"
                      >
                        <Truck className="h-3 w-3 text-primary" />
                        {vehicle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground border-t border-border/60 pt-2">
                <strong>Pricing Note:</strong> {selectedService.pricingNote}
              </p>
            </div>

            {/* Call To Action Buttons in Modal */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-foreground">Ready to book this service?</p>
                <p className="text-[11px] text-muted-foreground">Download the customer app for instant booking & live GPS tracking.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 sm:flex-none h-11 px-5 rounded-xl border border-border text-xs font-bold text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  Back to Services
                </button>
                <a
                  href={customerAppUrl}
                  onClick={(e) => {
                    e.currentTarget.href = getDeviceCustomerAppUrl()
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none h-11 px-6 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Book in App</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}
