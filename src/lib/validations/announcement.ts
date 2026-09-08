import { z } from "zod"

export const announcementFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  message: z.string().min(5, "Message must be at least 5 characters").max(500),
  ctaText: z.string().max(50).optional().nullable(),
  ctaUrl: z.string().max(255).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  startAt: z.string().optional().nullable(),
  endAt: z.string().optional().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "SCHEDULED", "DRAFT"]),
  isActive: z.boolean(),
  isDismissible: z.boolean(),
})

export type AnnouncementFormValues = z.infer<typeof announcementFormSchema>
