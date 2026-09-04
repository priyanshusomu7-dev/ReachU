"use client"

import { Container } from "@/components/layout/container"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { GooglePlayButton, AppStoreButton, DRIVER_APP_URL, useCustomerAppUrl, getDeviceCustomerAppUrl } from "@/components/shared/app-store-badges"

export function FinalCta() {
  const customerAppUrl = useCustomerAppUrl()
  return (
    <section className="py-20 md:py-32 bg-background border-t">
      <Container>
        <div className="relative rounded-3xl bg-muted/30 border p-8 md:p-16 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl mix-blend-multiply pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl mix-blend-multiply pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 sm:mb-6">
                Got Something to Move?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10">
                ReachU is ready when you are.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                <a
                  href={customerAppUrl}
                  onClick={(e) => {
                    e.currentTarget.href = getDeviceCustomerAppUrl()
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all group"
                >
                  Download Customer App
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={DRIVER_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-xl border border-input bg-background/50 backdrop-blur-sm px-8 text-base font-bold text-foreground transition-colors hover:bg-muted"
                >
                  Become a Driver
                </a>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Available for iOS & Android
                </span>
                <div className="flex flex-wrap justify-center items-center gap-3">
                  <GooglePlayButton />
                  <AppStoreButton />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
