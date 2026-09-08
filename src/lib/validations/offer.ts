import { z } from "zod"

export const offerFormSchema = z
  .object({
    title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title cannot exceed 100 characters"),
    shortDescription: z
      .string()
      .min(5, "Short description must be at least 5 characters")
      .max(255, "Short description cannot exceed 255 characters"),
    description: z.string().optional().nullable(),
    promoCode: z
      .string()
      .min(3, "Promo code must be at least 3 characters")
      .max(20, "Promo code cannot exceed 20 characters")
      .regex(/^[A-Z0-9_-]+$/, "Promo code must be alphanumeric uppercase (e.g. FIRST100, FEST20)"),
    discountType: z.enum(["FIXED", "PERCENTAGE"]),
    discountValue: z.coerce.number().positive("Discount value must be greater than 0"),
    minimumBookingAmount: z.coerce.number().min(0, "Minimum amount cannot be negative").optional().nullable(),
    maximumDiscount: z.coerce.number().min(0, "Maximum discount cannot be negative").optional().nullable(),
    usageLimit: z.coerce.number().int().min(1, "Usage limit must be at least 1").optional().nullable(),
    perUserLimit: z.coerce.number().int().min(1, "Per-user limit must be at least 1").optional().nullable(),
    startAt: z.string().min(1, "Start date and time is required"),
    endAt: z.string().min(1, "End date and time is required"),
    status: z.enum(["DRAFT", "SCHEDULED", "ACTIVE", "INACTIVE"]),
    isActive: z.boolean(),
    imageUrl: z.string().optional().nullable(),
    thumbnailUrl: z.string().optional().nullable(),
    applicableService: z.string(),
    isNewUserOnly: z.boolean(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startAt)
      const end = new Date(data.endAt)
      return end.getTime() > start.getTime()
    },
    {
      message: "End date and time must be after the start date and time",
      path: ["endAt"],
    }
  )
  .refine(
    (data) => {
      if (data.discountType === "PERCENTAGE" && data.discountValue > 100) {
        return false
      }
      return true
    },
    {
      message: "Percentage discount cannot exceed 100%",
      path: ["discountValue"],
    }
  )

export type OfferFormValues = z.infer<typeof offerFormSchema>

/**
 * Calculates real-time computed status based on active toggle and scheduled dates.
 */
export function computeOfferStatus(offer: {
  status: string
  isActive: boolean
  startAt: Date | string
  endAt: Date | string
}): "DRAFT" | "SCHEDULED" | "ACTIVE" | "EXPIRED" | "INACTIVE" {
  if (!offer.isActive) return "INACTIVE"
  if (offer.status === "DRAFT") return "DRAFT"
  if (offer.status === "INACTIVE") return "INACTIVE"

  const now = new Date()
  const start = new Date(offer.startAt)
  const end = new Date(offer.endAt)

  if (now < start) return "SCHEDULED"
  if (now > end) return "EXPIRED"
  return "ACTIVE"
}
