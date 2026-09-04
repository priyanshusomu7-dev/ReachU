"use client"

import { Container } from "@/components/layout/container"
import { motion } from "motion/react"
import { DRIVER_APP_URL } from "@/components/shared/app-store-badges"

export function DriverCta() {
  return (
    <section id="driver" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent skew-x-12 transform origin-top-right"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Drive With ReachU. <br className="hidden sm:block" />
              <span className="text-white/80">Move Forward.</span>
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              Turn your vehicle into a business. Enjoy flexible hours, reliable earnings, and become part of a network that keeps the city moving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={DRIVER_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 text-base font-bold text-primary shadow-lg hover:bg-white/95 transition-all"
              >
                Become a Driver
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
