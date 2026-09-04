"use client"

import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { motion } from "motion/react"
import { Clock, ShieldCheck, Map, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    name: "Quick and Easy Booking",
    description: "Our app is designed for speed. Enter your locations, select a vehicle, and you're done in seconds.",
    icon: Clock,
  },
  {
    name: "Multiple Vehicle Options",
    description: "We don't believe in one-size-fits-all. Choose the exact vehicle that matches your cargo.",
    icon: Truck,
  },
  {
    name: "Journey Visibility",
    description: "Track your movement in real-time. Know exactly where your goods are at any moment.",
    icon: Map,
  },
  {
    name: "Reliable Transportation",
    description: "Verified drivers, transparent pricing, and secure transport for complete peace of mind.",
    icon: ShieldCheck,
  },
]

export function WhyReachU() {
  return (
    <section id="why-reachu" className="py-20 md:py-32 overflow-hidden">
      <Container>
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <SectionHeading 
              title="Why Choose ReachU?" 
              subtitle="We're combining technology with logistics to make moving things simpler, faster, and more reliable."
              align="left"
              className="mb-10"
            />
            
            <dl className="mt-10 space-y-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name} 
                  className="relative pl-16"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <div className="mt-12">
              <Button size="lg" className="h-12 px-8">
                Learn More About Us
              </Button>
            </div>
          </div>

          {/* Visual Side */}
          <motion.div 
            className="mt-16 sm:mt-24 lg:mt-0 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-y-20 -inset-x-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent blur-3xl -z-10" />
            
            <div className="relative rounded-3xl bg-muted/40 border p-8 shadow-2xl h-[500px] flex items-center justify-center overflow-hidden">
              {/* Abstract decorative elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 w-full max-w-sm space-y-6">
                {/* Simulated UI Cards */}
                <motion.div 
                  className="bg-background p-4 rounded-xl shadow-lg border flex items-center gap-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Driver Verified</p>
                    <p className="text-xs text-muted-foreground">Rahul K. - 4.9★</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-background p-4 rounded-xl shadow-lg border ml-8 flex items-center gap-4"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Map className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Arriving in 5 mins</p>
                    <p className="text-xs text-muted-foreground">Distance: 1.2 km</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-background p-4 rounded-xl shadow-lg border flex items-center gap-4"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Mini Truck Assigned</p>
                    <p className="text-xs text-muted-foreground">Capacity: 500kg</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
