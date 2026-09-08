import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon: LucideIcon
  color?: "primary" | "secondary" | "emerald" | "blue" | "amber"
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "primary",
}: StatCardProps) {
  const colorMap = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/15 text-amber-900 dark:text-amber-300 border-secondary/30",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  }

  return (
    <Card className="p-5 relative overflow-hidden transition-all hover:shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn("rounded-xl p-3 border", colorMap[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}
