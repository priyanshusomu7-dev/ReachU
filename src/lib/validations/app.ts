import { z } from "zod"

export const appLinkFormSchema = z.object({
  appName: z.string().min(2, "App name is required"),
  playStoreUrl: z.string().url("Must be a valid Google Play Store URL"),
  appStoreUrl: z.string().url("Must be a valid Apple App Store URL"),
  qrCodeUrl: z.string().optional().default(""),
  description: z.string().optional().default(""),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
})

export type AppLinkFormValues = z.infer<typeof appLinkFormSchema>
