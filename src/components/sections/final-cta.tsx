"use client"

import { Container } from "@/components/layout/container"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCta() {
  return (
    <section className="py-24 md:py-32 bg-background border-t">
      <Container>
        <div className="relative rounded-3xl bg-muted/30 border p-8 md:p-16 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl mix-blend-multiply" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl mix-blend-multiply" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
                Got Something to Move?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                ReachU is ready when you are.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-14 px-8 text-base shadow-lg hover:shadow-xl transition-shadow group">
                  Download Customer App
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background/50 backdrop-blur-sm">
                  Become a Driver
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
