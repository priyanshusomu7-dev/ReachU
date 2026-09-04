import Link from "next/link"
import Image from "next/image"
import { Container } from "./container"

export function Footer() {
  const navigation = {
    services: [
      { name: "Send a Parcel", href: "#" },
      { name: "Shift Home", href: "#" },
      { name: "Transport Goods", href: "#" },
      { name: "Rent a Vehicle", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Contact", href: "#" },
    ],
    app: [
      { name: "Google Play Store", href: "https://play.google.com/store/apps/details?id=com.reachu.user.app" },
      { name: "Apple App Store", href: "https://apps.apple.com/in/app/reach-u/id6806275349" },
      { name: "Driver / Partner App", href: "https://play.google.com/store/apps/details?id=com.reachu.driver" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  }

  return (
    <footer className="border-t bg-background" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="pb-8 pt-16 sm:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/brand/reachu-logo.png" 
                alt="ReachU Logo" 
                width={180} 
                height={60} 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-6 text-muted-foreground max-w-xs">
              Moving made effortless. A technology-driven platform for all your transportation and logistics needs.
            </p>
            <div className="flex space-x-6">
              {/* Social links placeholders */}
              <div className="h-6 w-6 rounded bg-muted" />
              <div className="h-6 w-6 rounded bg-muted" />
              <div className="h-6 w-6 rounded bg-muted" />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Apps</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.app.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} ReachU. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
