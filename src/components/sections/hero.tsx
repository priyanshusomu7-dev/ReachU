"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import Image from "next/image"
import { motion } from "motion/react"
import { Check, CircleUserRound, Download, MapPin, Truck } from "lucide-react"
import { GooglePlayButton, AppStoreButton, DRIVER_APP_URL, useCustomerAppUrl, getDeviceCustomerAppUrl } from "@/components/shared/app-store-badges"

export function Hero() {
  const customerAppUrl = useCustomerAppUrl()
  return (
    <section className="relative overflow-hidden bg-background pt-4 pb-10 sm:pt-6 sm:pb-14 md:pt-8 md:pb-16 lg:pt-8 lg:pb-20">
      <Container className="relative max-w-[1440px] px-3 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] border bg-[linear-gradient(100deg,#ffffff_0%,#ffffff_39%,#fff2f1_100%)] shadow-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_45%,rgba(223,10,23,0.08),transparent_32%),radial-gradient(circle_at_83%_55%,rgba(255,184,0,0.16),transparent_34%)]" />
          <div className="relative grid min-h-[640px] items-center gap-8 px-6 py-10 sm:px-10 md:px-12 lg:min-h-[700px] xl:min-h-[740px] lg:grid-cols-[1fr_1.1fr] lg:items-stretch lg:px-12 lg:py-14 xl:px-16 xl:py-16">
          <motion.div 
            className="z-20 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-foreground sm:text-base">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span>Fast</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>Reliable</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>Secure</span>
            </div>
            <h1 className="mb-5 text-5xl font-extrabold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Smart Delivery for<br />
              <span className="text-primary">Smart Bharat</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              From parcels to home shifting - book the right vehicle, at the right time, with just a few taps.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={customerAppUrl}
                onClick={(e) => {
                  e.currentTarget.href = getDeviceCustomerAppUrl()
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-16 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 sm:px-10"
              >
                <Download className="mr-2 h-5 w-5" />
                Download App
              </a>
              <a
                href={DRIVER_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-16 items-center justify-center rounded-xl border border-slate-900/60 bg-transparent px-8 text-base font-bold text-foreground transition-colors hover:bg-slate-100 sm:px-10"
              >
                <CircleUserRound className="mr-2 h-5 w-5" />
                Become a Driver
              </a>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sm font-semibold text-slate-600 shrink-0">Available on:</span>
              <div className="flex flex-wrap items-center gap-3">
                <GooglePlayButton />
                <AppStoreButton />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative z-10 flex items-center justify-center min-h-[480px] w-full sm:min-h-[580px] lg:h-full lg:min-h-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Ambient subtle background glow */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-primary/15 via-amber-400/10 to-primary/5 blur-2xl opacity-70 pointer-events-none" />

            {/* Poster Card Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] xl:max-w-[490px] aspect-[2/3] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-border/40 bg-white group">
              <Image
                src="/images/hero/reachuchar.png"
                alt="ReachU Smart Delivery - Delivery Partner with packages, live tracking and smart logistics network across Bharat"
                fill
                priority
                sizes="(min-width: 1280px) 490px, (min-width: 1024px) 460px, (min-width: 640px) 420px, 90vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
              />

              {/* Edge ring for crisp card border */}
              <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>

            {/* Floating Live Delivery Status Badge */}
            <motion.div
              className="absolute -bottom-3 left-1 sm:-left-3 z-40 rounded-2xl border border-white/90 bg-white/95 p-3 sm:p-4 shadow-xl shadow-slate-900/10 backdrop-blur-md flex items-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.45 }}
            >
              <div className="grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-md shadow-primary/25">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-600">Live Delivery</p>
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-foreground">Bhopal &rarr; Indore</p>
                <p className="text-[10px] sm:text-[11px] font-medium text-muted-foreground">On Time &bull; Verified</p>
              </div>
            </motion.div>

            {/* Floating Verified Badge */}
            <motion.div
              className="absolute -top-3 right-1 sm:-right-3 z-40 rounded-2xl border border-white/90 bg-white/95 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-lg shadow-slate-900/10 backdrop-blur-md flex items-center gap-2.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.45 }}
            >
              <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-emerald-500 text-white shadow-sm">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground leading-tight">Verified Partner</p>
                <p className="text-[10px] text-muted-foreground leading-tight">100% Safe & Insured</p>
              </div>
            </motion.div>
          </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
