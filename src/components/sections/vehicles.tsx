"use client"

import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { motion } from "motion/react"
import { useState } from "react"
import { Bike, Car, Truck, Caravan } from "lucide-react"

const vehicles = [
  {
    id: "two-wheeler",
    name: "Two-Wheeler",
    description: "Perfect for quick, small parcel deliveries across the city.",
    useCase: "Documents, small packages, food",
    capacity: "Up to 20 kg",
    icon: Bike,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "mini",
    name: "Mini Vehicle",
    description: "Ideal for local deliveries and small items that need covered transport.",
    useCase: "Boxes, electronics, small furniture",
    capacity: "Up to 500 kg",
    icon: Car,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    id: "pickup",
    name: "Pickup",
    description: "Best for medium loads, appliances, or 1BHK home shifting.",
    useCase: "Furniture, appliances, bulk goods",
    capacity: "Up to 1,000 kg",
    icon: Caravan, // Using Caravan as a placeholder for Pickup
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "truck",
    name: "Truck",
    description: "For large cargo, commercial transport, and full house shifting.",
    useCase: "Full home shifting, large cargo",
    capacity: "2,000 kg+",
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
          subtitle="Select from a wide range of vehicles to match your specific logistics requirements."
          align="center"
          className="mb-16"
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Interactive Vehicle Selector */}
          <div className="lg:col-span-5 space-y-4">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setActiveVehicle(vehicle)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border-2 ${
                  activeVehicle.id === vehicle.id 
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-transparent bg-muted/50 hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${vehicle.color}`}>
                    <vehicle.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold ${activeVehicle.id === vehicle.id ? "text-primary" : "text-foreground"}`}>
                      {vehicle.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {vehicle.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Vehicle Display Area */}
          <div className="lg:col-span-7 h-[400px] lg:h-[500px]">
            <motion.div 
              key={activeVehicle.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full bg-muted/30 rounded-3xl border p-8 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Large Background Icon */}
              <activeVehicle.icon className="absolute -bottom-10 -right-10 w-96 h-96 text-muted opacity-20 pointer-events-none" />
              
              <div>
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-background border shadow-sm mb-6">
                  {activeVehicle.capacity}
                </div>
                <h3 className="text-3xl font-extrabold text-foreground mb-4">
                  {activeVehicle.name}
                </h3>
                <p className="text-lg text-muted-foreground max-w-md">
                  {activeVehicle.description}
                </p>
              </div>

              <div className="bg-background/80 backdrop-blur-md border rounded-xl p-6 shadow-sm max-w-sm mt-8 relative z-10">
                <p className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Ideal For</p>
                <p className="text-muted-foreground font-medium">{activeVehicle.useCase}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
