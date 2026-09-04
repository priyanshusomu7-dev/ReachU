"use client"

import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { motion } from "motion/react"
import { Smartphone, Download, MapPin, Truck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AppShowcase() {
  const [activeTab, setActiveTab] = useState<"customer" | "driver">("customer")

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <Container>
        <SectionHeading 
          title="Everything You Need to Keep Things Moving." 
          subtitle="Powerful, intuitive apps designed specifically for customers and our transport partners."
          align="center"
          className="mb-16"
        />

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center p-1 bg-background border rounded-full shadow-sm">
            <button 
              onClick={() => setActiveTab("customer")}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === "customer" 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Customer App
            </button>
            <button 
              onClick={() => setActiveTab("driver")}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === "driver" 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Driver App
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center max-w-5xl mx-auto">
          {/* App UI Mockup */}
          <div className="relative mx-auto w-full max-w-[320px] aspect-[1/2] perspective-1000">
            <motion.div 
              key={activeTab}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full bg-background rounded-[2.5rem] border-[8px] border-muted shadow-2xl overflow-hidden relative"
            >
              {/* Top Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                <div className="w-1/3 h-full bg-muted rounded-b-2xl"></div>
              </div>

              {activeTab === "customer" ? (
                <div className="w-full h-full bg-muted/20 relative pt-12 flex flex-col">
                  {/* Customer App Map Mockup */}
                  <div className="flex-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary">
                      <div className="relative">
                        <MapPin className="w-8 h-8 drop-shadow-md z-10 relative" fill="currentColor" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                  {/* Customer App Bottom Sheet */}
                  <div className="h-64 bg-background rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-5 relative z-10 flex flex-col">
                    <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4"></div>
                    <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-xl mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm font-medium">Home, Block B...</span>
                    </div>
                    <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-xl mb-4">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <span className="text-sm font-medium">Office, Tech Park...</span>
                    </div>
                    <Button className="w-full mt-auto rounded-xl h-12">
                      Find Vehicles
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-primary relative pt-12 flex flex-col">
                  {/* Driver App Earnings/Dashboard */}
                  <div className="p-6 text-primary-foreground">
                    <p className="text-primary-foreground/70 text-sm font-medium">Today's Earnings</p>
                    <h2 className="text-4xl font-bold mt-1">₹1,240</h2>
                    
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="bg-primary-foreground/10 rounded-xl p-4">
                        <p className="text-primary-foreground/70 text-xs mb-1">Trips</p>
                        <p className="font-bold text-lg">4</p>
                      </div>
                      <div className="bg-primary-foreground/10 rounded-xl p-4">
                        <p className="text-primary-foreground/70 text-xs mb-1">Online</p>
                        <p className="font-bold text-lg">3.5 hrs</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Driver App New Request */}
                  <div className="mt-auto h-72 bg-background rounded-t-3xl p-5 shadow-lg relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-2 py-1 bg-secondary text-secondary-foreground rounded-md">NEW REQUEST</span>
                      <span className="text-sm font-bold">2.5 km away</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">Mini Truck Booking</h3>
                    <p className="text-muted-foreground text-sm mb-6">Pickup in 5 mins • Est. ₹450</p>
                    
                    <div className="flex items-center justify-between gap-4">
                      <Button variant="outline" className="flex-1 rounded-xl h-12">Decline</Button>
                      <Button className="flex-1 rounded-xl h-12">Accept</Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* App Details & CTA */}
          <div>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-3xl font-bold mb-4">
                {activeTab === "customer" 
                  ? "Book transport anytime, anywhere." 
                  : "Earn on your own schedule."}
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                {activeTab === "customer"
                  ? "The ReachU app makes it incredibly simple to select your pickup, choose the right vehicle, and track your goods until they safely reach their destination."
                  : "Join the ReachU network. Get regular transport requests, track your daily earnings, and enjoy flexible working hours as a transport partner."}
              </p>
              
              <ul className="space-y-4 mb-10">
                {(activeTab === "customer" 
                  ? [
                      "Instant price estimates before booking",
                      "Live GPS tracking for your peace of mind",
                      "Multiple secure payment options",
                      "24/7 customer support access"
                    ]
                  : [
                      "Transparent earning reports and quick payouts",
                      "Turn-by-turn navigation built directly into the app",
                      "Choose the jobs that fit your vehicle",
                      "Dedicated partner support team"
                    ]
                ).map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 gap-2">
                  <Download className="w-5 h-5" />
                  {activeTab === "customer" ? "Download Customer App" : "Download Partner App"}
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-6 group">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
