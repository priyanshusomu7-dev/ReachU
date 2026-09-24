"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Download, Menu } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Container } from "./container"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import {
  GooglePlayButton,
  AppStoreButton,
  PLAY_STORE_URL,
  DRIVER_APP_URL,
  useCustomerAppUrl,
  getDeviceCustomerAppUrl,
} from "@/components/shared/app-store-badges"

import { AnnouncementBar } from "./announcement-bar"

const navigation = [
  { name: "Home", href: "/", sectionId: "home" },
  { name: "Services", href: "/#services", sectionId: "services" },
  { name: "How It Works", href: "/#how-it-works", sectionId: "how-it-works" },
  { name: "Drive With Us", href: "/#driver", sectionId: "driver" },
  { name: "About", href: "/#why-reachu", sectionId: "why-reachu" },
  { name: "Contact", href: "/contact", sectionId: "contact" },
]

export function Navbar({ announcement }: { announcement?: any }) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isBannerVisible, setIsBannerVisible] = React.useState(Boolean(announcement))
  const [activeSection, setActiveSection] = React.useState<string>("home")
  const customerAppUrl = useCustomerAppUrl()

  React.useEffect(() => {
    setIsBannerVisible(Boolean(announcement))
  }, [announcement])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll-spy active section observer for homepage sections
  React.useEffect(() => {
    if (pathname !== "/") return

    const handleScrollSpy = () => {
      const sectionIds = ["home", "services", "how-it-works", "why-reachu", "driver"]
      const scrollPosition = window.scrollY + 180

      if (window.scrollY < 120) {
        setActiveSection("home")
        return
      }

      let current = "home"
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }

    handleScrollSpy()
    window.addEventListener("scroll", handleScrollSpy, { passive: true })
    return () => window.removeEventListener("scroll", handleScrollSpy)
  }, [pathname])

  const checkIsActive = (item: { name: string; href: string; sectionId?: string }) => {
    if (pathname === "/contact") {
      return item.href === "/contact"
    }
    if (pathname === "/about") {
      return item.href === "/about" || item.sectionId === "why-reachu"
    }
    if (pathname === "/services") {
      return item.href === "/services" || item.sectionId === "services"
    }
    if (pathname === "/") {
      if (item.sectionId) {
        return activeSection === item.sectionId
      }
      return activeSection === "home"
    }
    return pathname === item.href
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Top Special Offer Banner */}
      {announcement && isBannerVisible && (
        <AnnouncementBar
          announcement={announcement}
          onDismiss={() => setIsBannerVisible(false)}
        />
      )}

      {/* Main Navigation Bar */}
      <div
        className={cn(
          "transition-all duration-200",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-xs py-2 sm:py-2.5"
            : "bg-background border-b border-border/40 py-2.5 sm:py-3"
        )}
      >
        <Container className="px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between" aria-label="Global">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center transition-transform duration-200 hover:scale-[1.03] active:scale-95">
              <Image 
                src="/images/brand/reachu-logo.png" 
                alt="ReachU Logo" 
                width={240} 
                height={84} 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-muted/40 text-foreground transition-all duration-200 hover:bg-primary/10 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-5 w-5" aria-hidden="true" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm p-6 flex flex-col justify-between overflow-y-auto bg-background">
                <div>
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border/60 pr-8">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <Link href="/" className="flex items-center transition-transform hover:scale-[1.02]" onClick={() => setIsOpen(false)}>
                      <Image 
                        src="/images/brand/reachu-logo.png" 
                        alt="ReachU Logo" 
                        width={180} 
                        height={63} 
                        className="h-10 sm:h-12 w-auto object-contain"
                      />
                    </Link>
                  </div>

                  {/* Drawer Navigation Links */}
                  <div className="py-6 space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                      Navigation
                    </p>
                    {navigation.map((item) => {
                      const isActive = checkIsActive(item)
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "group flex items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary/5 text-primary font-bold border-l-2 border-primary"
                              : "text-foreground/80 hover:bg-primary/5 hover:text-primary hover:translate-x-0.5"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className={cn("h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5", isActive ? "text-primary" : "text-muted-foreground")} />
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-4 border-t border-border/60 space-y-4">
                  <div className="flex flex-col gap-2.5">
                    <a 
                      href={DRIVER_APP_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => setIsOpen(false)} 
                      className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-primary/30 bg-primary/5 px-4 text-sm font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary active:scale-[0.98]"
                    >
                      Become a Driver
                    </a>
                    <a 
                      href={customerAppUrl} 
                      onClick={(e) => {
                        e.currentTarget.href = getDeviceCustomerAppUrl()
                        setIsOpen(false)
                      }}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Customer App
                    </a>
                  </div>

                  <div className="pt-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 text-center sm:text-left">
                      Available on Mobile:
                    </p>
                    <div className="flex flex-col gap-2">
                      <GooglePlayButton className="w-full justify-center" />
                      <AppStoreButton className="w-full justify-center" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-1">
            {navigation.map((item) => {
              const isActive = checkIsActive(item)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 relative select-none",
                    isActive
                      ? "text-primary font-bold bg-primary/5 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-primary after:rounded-full"
                      : "text-foreground/75 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Desktop Call to Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <a
              href={DRIVER_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-full border border-primary/30 bg-primary/5 px-4.5 text-sm font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary shadow-2xs hover:shadow-primary/25 hover:scale-105 active:scale-95"
            >
              Become a Driver
            </a>
            <a 
              href={customerAppUrl} 
              onClick={(e) => {
                e.currentTarget.href = getDeviceCustomerAppUrl()
              }}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary px-5 text-sm font-bold text-white shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/35 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Download className="h-4 w-4" />
              <span>Download App</span>
            </a>
          </div>
        </nav>
      </Container>
      </div>
    </header>
  )
}
