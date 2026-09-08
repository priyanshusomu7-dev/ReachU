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

const navigation = [
  { name: "Services", href: "/#services" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Drive With Us", href: "/#driver" },
  { name: "About", href: "/#why-reachu" },
  { name: "Contact", href: "/contact" },
  { name: "User Ban", href: "/userban" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const customerAppUrl = useCustomerAppUrl()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-200",
        isScrolled
          ? "bg-background border-b border-border shadow-xs py-2 sm:py-2.5"
          : "bg-background border-b border-border/40 py-2.5 sm:py-3"
      )}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
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
              <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-muted/40 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-5 w-5" aria-hidden="true" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm p-6 flex flex-col justify-between overflow-y-auto bg-background">
                <div>
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border/60 pr-8">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
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
                  <div className="py-6 space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                      Navigation
                    </p>
                    {navigation.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold transition-colors active:bg-muted/80",
                            isActive
                              ? "bg-primary/10 text-primary font-bold"
                              : "text-foreground hover:bg-muted"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
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
                      className={cn(buttonVariants({ variant: "outline" }), "w-full h-11 rounded-xl justify-center font-semibold text-sm")}
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
                      className={cn(buttonVariants(), "w-full h-11 rounded-xl justify-center font-bold text-sm shadow-sm")}
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
          <div className="hidden lg:flex lg:items-center lg:gap-x-7">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-semibold transition-colors py-1 relative",
                    isActive
                      ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                      : "text-foreground/80 hover:text-primary"
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
              className={buttonVariants({ variant: "ghost", className: "font-semibold" })}
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
              className={buttonVariants({ className: "font-bold shadow-md shadow-primary/20 hover:shadow-primary/30" })}
            >
              Download App
            </a>
          </div>
        </nav>
      </Container>
    </header>
  )
}
