import { z } from "zod"

export const serviceFormSchema = z.object({
  name: z.string().min(2, "Service name is required").max(100),
  shortDescription: z.string().min(5, "Short description must be at least 5 characters").max(255),
  detailedDescription: z.string().optional().default(""),
  imageUrl: z.string().optional().default(""),
  icon: z.string().optional().default("Package"),
  displayOrder: z.coerce.number().int().min(0).default(0),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  ctaText: z.string().max(50).optional().default(""),
  ctaUrl: z.string().max(255).optional().default(""),
})

export type ServiceFormValues = z.infer<typeof serviceFormSchema>
