import { z } from "zod"

export const siteSettingsFormSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  support_email: z.string().email("Valid email required"),
  support_phone: z.string().min(5, "Phone number required"),
  whatsapp_number: z.string().min(5, "WhatsApp number required"),
  operating_hours: z.string().min(3, "Operating hours required"),
  social_twitter: z.string().url("Must be valid URL").optional().or(z.literal("")),
  social_facebook: z.string().url("Must be valid URL").optional().or(z.literal("")),
  social_instagram: z.string().url("Must be valid URL").optional().or(z.literal("")),
  social_linkedin: z.string().url("Must be valid URL").optional().or(z.literal("")),
  seo_default_title: z.string().min(5, "SEO Title required"),
  seo_default_description: z.string().min(10, "SEO Description required"),
})

export type SiteSettingsFormValues = z.infer<typeof siteSettingsFormSchema>
