import { cn } from "@/lib/utils"

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-4",
        {
          "text-left": align === "left",
          "text-center items-center": align === "center",
          "text-right items-end": align === "right",
        },
        className
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-[85%] text-muted-foreground sm:text-lg sm:leading-7">
          {subtitle}
        </p>
      )}
    </div>
  )
}
