"use server"

import { prisma } from "@/lib/db"
import { requireAdminSession } from "@/lib/auth"
import { siteSettingsFormSchema, SiteSettingsFormValues } from "@/lib/validations/settings"
import { logAuditAction } from "@/lib/audit"
import { revalidatePath } from "next/cache"

export async function updateSettingsAction(data: SiteSettingsFormValues) {
  try {
    const session = await requireAdminSession()
    const validated = siteSettingsFormSchema.parse(data)

    const entries = Object.entries(validated)
    for (const [key, value] of entries) {
      if (value !== undefined) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      }
    }

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "SETTINGS_UPDATED",
      entityType: "SiteSetting",
      entityId: "ALL",
    })

    revalidatePath("/admin/settings")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update settings" }
  }
}
