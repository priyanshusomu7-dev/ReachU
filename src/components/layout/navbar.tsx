"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Container } from "./container"

const navigation = [
  { name: "Services", href: "#services" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Drive With Us", href: "#driver" },
  { name: "About", href: "#why-reachu" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-3"
          : "bg-background border-transparent py-5"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <Image 
                src="/images/brand/reachu-logo.png" 
                alt="ReachU Logo" 
                width={150} 
                height={50} 
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          
          <div className="flex lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className={buttonVariants({ variant: "ghost", className: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground" })}>
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5 flex items-center" onClick={() => setIsOpen(false)}>
                    <Image 
                      src="/images/brand/reachu-logo.png" 
                      alt="ReachU Logo" 
                      width={120} 
                      height={40} 
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-border">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="py-6 flex flex-col gap-3">
                      <Link href="#driver" onClick={() => setIsOpen(false)} className={buttonVariants({ variant: "outline", className: "w-full justify-center" })}>
                        Become a Driver
                      </Link>
                      <Link href="#download" onClick={() => setIsOpen(false)} className={buttonVariants({ className: "w-full justify-center" })}>
                        Download App
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-3">
            <Link href="#driver" className={buttonVariants({ variant: "ghost" })}>
              Become a Driver
            </Link>
            <Link href="#download" className={buttonVariants()}>
              Download App
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  )
}
