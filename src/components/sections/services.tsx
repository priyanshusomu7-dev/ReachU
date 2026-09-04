"use client"

import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { motion } from "motion/react"
import { Package, Home, Box, Car } from "lucide-react"

const services = [
  {
    name: "Send a Parcel",
    description: "Fast and reliable delivery for smaller packages and documents across the city.",
    icon: Package,
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Shift Your Home",
    description: "Complete household shifting solutions with trained professionals.",
    icon: Home,
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Transport Goods",
    description: "Commercial and personal goods transportation with multiple vehicle options.",
    icon: Box,
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Rent / Book a Vehicle",
    description: "Choose and book the perfect vehicle for your specific transportation needs.",
    icon: Car,
    color: "bg-primary/10 text-primary",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-muted/30">
      <Container>
        <SectionHeading 
          title="One Platform. Every Move." 
          subtitle="Whatever you need to move, we have a specialized service ready for you."
          align="center"
          className="mb-16"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-background rounded-2xl p-8 shadow-sm border hover:shadow-md transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.name}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
