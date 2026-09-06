import Link from "next/link"
import Image from "next/image"
import { Container } from "./container"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  ChevronRight,
} from "lucide-react"
import { GooglePlayButton, AppStoreButton, DRIVER_APP_URL } from "@/components/shared/app-store-badges"

function WhatsAppIcon({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24h.02zm-3.5 3.6c-.2 0-.48.07-.73.35-.25.27-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.85.14.19 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.53-.32-.28-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.47z" />
    </svg>
  )
}

export function Footer() {
  const services = [
    { name: "Parcel Delivery", href: "#services" },
    { name: "Home Shifting", href: "#services" },
    { name: "Rental & Local Transport", href: "#services" },
  ]

  const quickLinks = [
    { name: "About Us", href: "#why-reachu" },
    { name: "Contact Us", href: "mailto:support@reachu.co.in" },
    { name: "Our Services", href: "#services" },
    { name: "Terms & Conditions", href: "#terms" },
    { name: "Help & Support", href: "mailto:support@reachu.co.in" },
    { name: "Privacy Policy", href: "#privacy" },
  ]

  return (
    <footer className="relative border-t border-neutral-800 bg-[#0B0F19] text-white overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Subtle background ambient map pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" 
        aria-hidden="true" 
      />

      <Container className="relative z-10 pb-10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand & About Column */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center rounded-xl bg-white px-3.5 py-2 shadow-md transition-transform hover:scale-[1.02]">
              <Image 
                src="/images/brand/reachu-logo.png" 
                alt="ReachU Logo" 
                width={150} 
                height={50} 
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-6 text-neutral-400 max-w-sm">
              Smart delivery for Smart Bharat. From instant parcels to complete home shifting, book the right vehicle at the right time.
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Download Mobile Apps
              </p>
              <div className="flex flex-wrap gap-2.5">
                <GooglePlayButton className="h-10 min-w-[145px] text-xs px-3 py-1.5" />
                <AppStoreButton className="h-10 min-w-[145px] text-xs px-3 py-1.5" />
              </div>
              <div className="mt-3">
                <a
                  href={DRIVER_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-red-400 transition-colors group"
                >
                  <span>Looking to earn? Download Partner / Driver App</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Address Column */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-white tracking-tight mb-5">
              Address
            </h3>
            <ul role="list" className="space-y-3.5 text-sm text-neutral-300">
              {/* Location */}
              <li className="flex items-start gap-3 group">
                <MapPin className="h-4 w-4 mt-1 shrink-0 text-primary transition-transform group-hover:scale-110" />
                <span className="leading-snug text-neutral-300 group-hover:text-white transition-colors">
                  flat no 430 M G colony congress road near by hotel Karim&apos;s kitchen
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:scale-110" />
                <a
                  href="tel:8586876539"
                  className="text-neutral-300 hover:text-white hover:underline underline-offset-4 decoration-primary transition-all"
                >
                  8586876539
                </a>
              </li>

              {/* WhatsApp */}
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-emerald-400" />
                <a
                  href="https://wa.me/918586876539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white hover:underline underline-offset-4 decoration-emerald-400 transition-all"
                >
                  8586876539
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href="mailto:support@reachu.co.in"
                  className="text-neutral-300 hover:text-white hover:underline underline-offset-4 decoration-primary transition-all"
                >
                  support@reachu.co.in
                </a>
              </li>

              {/* Hours */}
              <li className="flex items-center gap-3 group">
                <Clock className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:scale-110" />
                <span className="text-neutral-300 group-hover:text-white transition-colors">
                  12 am to 11 pm
                </span>
              </li>

              {/* Website / Reach U */}
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0 text-sky-400" />
                <a
                  href="https://www.reachu.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white hover:underline underline-offset-4 decoration-sky-400 transition-all font-medium"
                >
                  Reach U
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white tracking-tight mb-5">
              Services
            </h3>
            <ul role="list" className="space-y-3.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-300 transition-all duration-200 hover:text-white hover:underline underline-offset-4 decoration-primary"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-white tracking-tight mb-5">
              Quick Links
            </h3>
            <ul role="list" className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-300 transition-all duration-200 hover:text-white hover:underline underline-offset-4 decoration-primary"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright and Legal Row */}
        <div className="mt-14 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} Reach U Delivery Express LLP. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <span className="h-3 w-px bg-neutral-700" />
            <Link href="#terms" className="hover:text-white transition-colors hover:underline underline-offset-4">
              Terms &amp; Conditions
            </Link>
            <span className="h-3 w-px bg-neutral-700" />
            <a href="mailto:support@reachu.co.in" className="hover:text-white transition-colors hover:underline underline-offset-4">
              Support
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
