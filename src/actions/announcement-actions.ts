"use server"

import { prisma } from "@/lib/db"
import { requireAdminSession } from "@/lib/auth"
import { announcementFormSchema, AnnouncementFormValues } from "@/lib/validations/announcement"
import { logAuditAction } from "@/lib/audit"
import { revalidatePath } from "next/cache"

export async function createAnnouncementAction(data: AnnouncementFormValues) {
  try {
    const session = await requireAdminSession()
    const validated = announcementFormSchema.parse(data)

    const announcement = await prisma.announcement.create({
      data: {
        title: validated.title,
        message: validated.message,
        ctaText: validated.ctaText || null,
        ctaUrl: validated.ctaUrl || null,
        imageUrl: validated.imageUrl || null,
        startAt: validated.startAt ? new Date(validated.startAt) : null,
        endAt: validated.endAt ? new Date(validated.endAt) : null,
        status: validated.status,
        isActive: validated.isActive,
        isDismissible: validated.isDismissible,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "ANNOUNCEMENT_CREATE",
      entityType: "Announcement",
      entityId: announcement.id,
      metadata: { title: announcement.title },
    })

    revalidatePath("/admin/announcements")
    revalidatePath("/")
    return { success: true, data: announcement }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create announcement" }
  }
}

export async function updateAnnouncementAction(id: string, data: AnnouncementFormValues) {
  try {
    const session = await requireAdminSession()
    const validated = announcementFormSchema.parse(data)

    const updated = await prisma.announcement.update({
      where: { id },
      data: {
        title: validated.title,
        message: validated.message,
        ctaText: validated.ctaText || null,
        ctaUrl: validated.ctaUrl || null,
        imageUrl: validated.imageUrl || null,
        startAt: validated.startAt ? new Date(validated.startAt) : null,
        endAt: validated.endAt ? new Date(validated.endAt) : null,
        status: validated.status,
        isActive: validated.isActive,
        isDismissible: validated.isDismissible,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "ANNOUNCEMENT_UPDATE",
      entityType: "Announcement",
      entityId: updated.id,
    })

    revalidatePath("/admin/announcements")
    revalidatePath("/")
    return { success: true, data: updated }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update announcement" }
  }
}

export async function toggleAnnouncementActiveAction(id: string, isActive: boolean) {
  try {
    const session = await requireAdminSession()
    await prisma.announcement.update({
      where: { id },
      data: { isActive },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: isActive ? "ANNOUNCEMENT_ACTIVATED" : "ANNOUNCEMENT_DEACTIVATED",
      entityType: "Announcement",
      entityId: id,
    })

    revalidatePath("/admin/announcements")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update status" }
  }
}

export async function deleteAnnouncementAction(id: string) {
  try {
    const session = await requireAdminSession()
    await prisma.announcement.delete({ where: { id } })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "ANNOUNCEMENT_DELETED",
      entityType: "Announcement",
      entityId: id,
    })

    revalidatePath("/admin/announcements")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete announcement" }
  }
}
