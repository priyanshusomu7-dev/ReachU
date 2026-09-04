"use client"

import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { motion } from "motion/react"
import { MapPin, Truck, CheckCircle2 } from "lucide-react"

const steps = [
  {
    id: "01",
    title: "Enter Your Locations",
    description: "Select where the movement starts and where it needs to go.",
    icon: MapPin,
  },
  {
    id: "02",
    title: "Choose Your Vehicle",
    description: "Select the vehicle suitable for your transportation requirement.",
    icon: Truck,
  },
  {
    id: "03",
    title: "Book and Move",
    description: "Connect with the transport service and track your movement.",
    icon: CheckCircle2,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <Container>
        <SectionHeading 
          title="How ReachU Works" 
          subtitle="A simple, three-step journey to get your things moving."
          align="center"
          className="mb-20"
        />

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-muted">
            <motion.div 
              className="absolute inset-0 bg-primary origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.4, duration: 0.6 }}
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-2 md:right-1/4 text-5xl font-bold text-muted/30 dark:text-muted/10 select-none pointer-events-none">
                  {step.id}
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center mb-8 shadow-sm">
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-primary"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.4) + 0.3, duration: 0.4 }}
                  />
                  <step.icon className="w-10 h-10 text-primary relative z-10" />
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
