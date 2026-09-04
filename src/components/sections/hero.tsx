"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import Image from "next/image"
import { motion } from "motion/react"
import { Apple, Check, CircleUserRound, Download, MapPin, Play, Truck } from "lucide-react"

export function Hero() {
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
              <Button size="lg" className="h-16 rounded-xl px-8 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 sm:px-10">
                <Download className="mr-2 h-5 w-5" />
                Download Customer App
              </Button>
              <Button size="lg" variant="outline" className="h-16 rounded-xl border-slate-900/60 px-8 text-base font-bold sm:px-10">
                <CircleUserRound className="mr-2 h-5 w-5" />
                Become a Driver
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="mr-1 text-sm font-semibold text-slate-600">Available on:</span>
              <button type="button" className="flex h-12 min-w-40 items-center gap-3 rounded-lg bg-black px-4 text-left text-white shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                <Play className="h-6 w-6 fill-primary text-primary" />
                <div className="leading-none">
                  <p className="text-[10px] uppercase text-white/80">Get it on</p>
                  <p className="text-base font-bold">Google Play</p>
                </div>
              </button>
              <button type="button" className="flex h-12 min-w-40 items-center gap-3 rounded-lg bg-black px-4 text-left text-white shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                <Apple className="h-6 w-6 fill-white" />
                <div className="leading-none">
                  <p className="text-[10px] text-white/80">Download on the</p>
                  <p className="text-base font-bold">App Store</p>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="relative z-10 min-h-[560px] w-full overflow-hidden sm:min-h-[620px] lg:h-full lg:min-h-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            aria-label="ReachU delivery partner, Smart Bharat network, road, vehicle, and delivery tracking"
          >
            <Image
              src="/images/hero/reachuChar.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="absolute inset-0 z-0 object-cover object-center opacity-20 blur-sm saturate-125"
              aria-hidden="true"
            />
            <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,0.82)_0%,rgba(255,247,246,0.72)_35%,rgba(255,236,232,0.36)_100%)]" />
            <div className="absolute inset-x-[-12%] bottom-0 z-[2] h-[66%] rounded-t-[55%] bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(223,10,23,0.13))]" />
            <div className="absolute inset-x-[-10%] bottom-0 z-[2] h-[43%] rounded-t-[58%] bg-[linear-gradient(135deg,#f8d8d4_0%,#f8b8ad_52%,#fce7e2_100%)]" />
            <svg
              aria-hidden="true"
              className="absolute inset-x-[-7%] bottom-0 z-[3] h-[58%] w-[114%]"
              viewBox="0 0 820 310"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M0 245C170 142 356 103 820 31V310H0V245Z" fill="#514f57" opacity="0.86" />
              <path d="M0 238C180 136 360 98 820 21" stroke="#ffffff" strokeWidth="18" opacity="0.75" />
              <path d="M0 273C184 172 372 130 820 58" stroke="#ffffff" strokeWidth="4" strokeDasharray="34 32" opacity="0.7" />
              <path d="M0 286C190 196 398 152 820 92" stroke="#df0a17" strokeWidth="6" opacity="0.17" />
            </svg>

            <div className="absolute bottom-[40%] left-0 right-0 z-[4] h-44 opacity-70">
              <div className="absolute bottom-0 left-[2%] h-20 w-14 rounded-t-md bg-primary/10" />
              <div className="absolute bottom-0 left-[12%] h-28 w-20 rounded-t-md bg-primary/15" />
              <div className="absolute bottom-0 left-[25%] h-16 w-16 rounded-t-md bg-secondary/20" />
              <div className="absolute bottom-0 right-[30%] h-24 w-16 rounded-t-md bg-primary/10" />
              <div className="absolute bottom-0 right-[18%] h-36 w-20 rounded-t-md bg-primary/15" />
              <div className="absolute bottom-0 right-[5%] h-24 w-16 rounded-t-md bg-slate-500/10" />
              <div className="absolute bottom-28 right-[27%] h-14 w-8 rounded-t-full bg-primary/15" />
            </div>

            <motion.div
              className="absolute bottom-[28%] right-[22%] z-20 hidden rounded-md bg-primary px-5 py-3 text-white shadow-2xl sm:block"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className="text-lg font-black italic leading-none">RU</div>
              <div className="mt-2 h-7 w-14 rounded-sm bg-white" />
              <div className="absolute -right-8 bottom-2 h-7 w-8 rounded-r-md bg-slate-200" />
              <div className="absolute bottom-[-7px] left-4 h-4 w-4 rounded-full bg-slate-950 ring-4 ring-white" />
              <div className="absolute bottom-[-7px] right-[-22px] h-4 w-4 rounded-full bg-slate-950 ring-4 ring-white" />
            </motion.div>

            <div className="absolute bottom-0 left-[47%] z-30 aspect-[2/3] h-[92%] max-h-[660px] max-w-[78%] -translate-x-1/2 sm:max-w-[70%] lg:left-[44%] lg:h-[98%]">
              <Image
                src="/images/hero/reachuChar.png"
                alt="ReachU delivery partner with phone, delivery bag, packages, India logistics map, and Smart Delivery for Smart Bharat sign"
                fill
                priority
                sizes="(min-width: 1024px) 430px, (min-width: 640px) 390px, 310px"
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>

            <motion.div
              className="absolute right-0 top-[24%] z-40 w-[210px] rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur sm:right-4 sm:w-[230px] lg:right-0 xl:right-4"
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.45 }}
            >
              <div className="absolute bottom-10 left-[31px] top-9 w-1 rounded-full bg-emerald-500" />
              <div className="relative space-y-7">
                <div className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-md">
                    <Check className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold leading-tight text-foreground">Pickup</p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
                      <MapPin className="h-3.5 w-3.5 fill-primary text-primary" />
                      Bhopal
                    </p>
                  </div>
                </div>
                <div className="relative -mx-1 flex gap-3 rounded-2xl bg-primary/10 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md">
                    <Truck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold leading-tight text-foreground">In Transit</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">Your package is moving</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-md">
                    <Check className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold leading-tight text-foreground">Delivered</p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
                      <MapPin className="h-3.5 w-3.5 fill-primary text-primary" />
                      Indore
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
