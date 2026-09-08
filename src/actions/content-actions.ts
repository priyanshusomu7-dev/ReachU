"use server"

import { prisma } from "@/lib/db"
import { requireAdminSession } from "@/lib/auth"
import { logAuditAction } from "@/lib/audit"
import { revalidatePath } from "next/cache"

export async function updateSectionContentAction(sectionKey: string, contentJson: any) {
  try {
    const session = await requireAdminSession()
    const contentString = typeof contentJson === "string" ? contentJson : JSON.stringify(contentJson)

    await prisma.websiteContent.upsert({
      where: { sectionKey },
      update: {
        content: contentString,
        updatedById: session.adminId,
      },
      create: {
        sectionKey,
        content: contentString,
        updatedById: session.adminId,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "CONTENT_UPDATED",
      entityType: "WebsiteContent",
      entityId: sectionKey,
      metadata: { section: sectionKey },
    })

    revalidatePath("/admin/content")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update content" }
  }
}
