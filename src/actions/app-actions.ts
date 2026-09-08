"use server"

import { prisma } from "@/lib/db"
import { requireAdminSession } from "@/lib/auth"
import { appLinkFormSchema, AppLinkFormValues } from "@/lib/validations/app"
import { logAuditAction } from "@/lib/audit"
import { revalidatePath } from "next/cache"

export async function updateAppLinkAction(id: string, data: AppLinkFormValues) {
  try {
    const session = await requireAdminSession()
    const validated = appLinkFormSchema.parse(data)

    const updated = await prisma.appLink.update({
      where: { id },
      data: {
        appName: validated.appName,
        playStoreUrl: validated.playStoreUrl,
        appStoreUrl: validated.appStoreUrl,
        qrCodeUrl: validated.qrCodeUrl || null,
        description: validated.description || null,
        status: validated.status,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "APP_LINK_UPDATED",
      entityType: "AppLink",
      entityId: id,
      metadata: { target: updated.targetAudience },
    })

    revalidatePath("/admin/apps")
    revalidatePath("/")
    return { success: true, data: updated }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update app link" }
  }
}
