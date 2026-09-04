"use client"

import { Container } from "@/components/layout/container"
import { motion } from "motion/react"

const stats = [
  { id: 1, name: 'Active Users', value: '10,000+' },
  { id: 2, name: 'Deliveries Completed', value: '50,000+' },
  { id: 3, name: 'Cities Covered', value: '15+' },
  { id: 4, name: 'On-time Performance', value: '98%' },
]

export function Statistics() {
  return (
    <section className="bg-background py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by thousands to keep things moving
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              We take pride in our reliability and scale. These numbers represent our commitment to delivering excellence every day.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4 border bg-border">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.id} 
                className="flex flex-col bg-background p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <dt className="text-sm font-semibold leading-6 text-muted-foreground">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-foreground sm:text-5xl mb-2">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
