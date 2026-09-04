"use client"

import { Container } from "@/components/layout/container"
import { motion } from "motion/react"
import { Smartphone, Truck, Zap, ShieldCheck } from "lucide-react"

const benefits = [
  {
    name: "Easy Booking",
    description: "Book your transport in just a few taps.",
    icon: Smartphone,
  },
  {
    name: "Suitable Vehicles",
    description: "From bikes to large trucks, we have it all.",
    icon: Truck,
  },
  {
    name: "Tech-Driven",
    description: "Smart routing and real-time tracking.",
    icon: Zap,
  },
  {
    name: "Reliable Transport",
    description: "Trusted drivers and safe deliveries.",
    icon: ShieldCheck,
  },
]

export function ValueStrip() {
  return (
    <div className="bg-primary/5 py-12 border-y border-border">
      <Container>
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={benefit.name} 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <benefit.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{benefit.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  )
}
