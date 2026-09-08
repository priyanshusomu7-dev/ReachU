"use client"

import Image from "next/image"
import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import { Bike, Car, Truck, Caravan, CheckCircle2, ShieldCheck, Gauge } from "lucide-react"

const vehicles = [
  {
    id: "two-wheeler",
    name: "Two-Wheeler",
    image: "/images/vehicles/two-wheeler.jpg",
    description: "Perfect for quick, small parcel deliveries across the city with rapid pickup and drop-off.",
    useCase: "Documents, urgent files, food, medicine, and small e-commerce packets",
    capacity: "Up to 20 kg",
    speedBadge: "Fastest in City Traffic",
    icon: Bike,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "mini",
    name: "Mini Vehicle",
    image: "/images/vehicles/mini-vehicle.jpg",
    description: "Ideal for local deliveries and small items that need weatherproof, covered transport.",
    useCase: "Cartons, consumer electronics, small furniture, and grocery supplies",
    capacity: "Up to 500 kg",
    speedBadge: "Compact & Weatherproof",
    icon: Car,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    id: "pickup",
    name: "Pickup",
    image: "/images/vehicles/pickup.jpg",
    description: "Best for medium loads, home shifts, appliances, or bulk goods requiring sturdy transport.",
    useCase: "Furniture, refrigerators, washing machines, hardware & bulk retail goods",
    capacity: "Up to 1,000 kg",
    speedBadge: "High Cargo Payload",
    icon: Caravan,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "truck",
    name: "Truck",
    image: "/images/vehicles/truck.jpg",
    description: "For large cargo, industrial transport, and complete residential or commercial house shifting.",
    useCase: "Full home shifting, office relocations, palletized goods, heavy industrial freight",
    capacity: "2,000 kg+",
    speedBadge: "Heavy Freight Ready",
    icon: Truck,
    color: "bg-secondary text-secondary-foreground",
  },
]

export function Vehicles() {
  const [activeVehicle, setActiveVehicle] = useState(vehicles[0])

  return (
    <section className="py-20 md:py-32 bg-background border-t">
      <Container>
        <SectionHeading 
          title="The Right Vehicle for Every Move." 
          subtitle="Select from a wide range of verified vehicles to match your exact logistics and delivery requirements."
          align="center"
          className="mb-16"
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Interactive Vehicle Selector */}
          <div className="lg:col-span-5 space-y-3.5">
            {vehicles.map((vehicle) => {
              const isSelected = activeVehicle.id === vehicle.id
              return (
                <button
                  key={vehicle.id}
                  onClick={() => setActiveVehicle(vehicle)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 border-2 flex items-center gap-4 group ${
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/20" 
                      : "border-border/60 bg-card hover:bg-muted/60 hover:border-border"
                  }`}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-border/80 bg-muted">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className={`absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-white shadow-sm ${vehicle.color}`}>
                      <vehicle.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className={`text-base sm:text-lg font-bold truncate ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {vehicle.name}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold shrink-0">
                        {vehicle.capacity}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {vehicle.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Vehicle Display Area */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeVehicle.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-card rounded-3xl border border-border/80 p-5 sm:p-7 flex flex-col gap-6 shadow-lg overflow-hidden"
              >
                {/* Hero Vehicle Photo Container */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border/60 bg-muted shadow-sm group">
                  <Image
                    src={activeVehicle.image}
                    alt={activeVehicle.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                      <activeVehicle.icon className="w-3.5 h-3.5 text-primary" />
                      {activeVehicle.name}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                      <Gauge className="w-3.5 h-3.5 text-primary" />
                      {activeVehicle.speedBadge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-white/80 block">
                        Verified Fleet
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">
                        {activeVehicle.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-white/80 block font-medium">Max Payload</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-primary text-primary-foreground shadow-md">
                        {activeVehicle.capacity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description & Specs Grid */}
                <div className="space-y-4">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {activeVehicle.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                    <div className="bg-muted/40 border rounded-xl p-4">
                      <div className="flex items-center gap-2 text-foreground font-semibold text-sm mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>Ideal Deliveries</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {activeVehicle.useCase}
                      </p>
                    </div>

                    <div className="bg-muted/40 border rounded-xl p-4">
                      <div className="flex items-center gap-2 text-foreground font-semibold text-sm mb-1.5">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                        <span>Driver & Protection</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Background verified drivers with real-time GPS live tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}
