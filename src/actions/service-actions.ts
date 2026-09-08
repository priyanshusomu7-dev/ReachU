"use server"

import { prisma } from "@/lib/db"
import { requireAdminSession } from "@/lib/auth"
import { serviceFormSchema, ServiceFormValues } from "@/lib/validations/service"
import { logAuditAction } from "@/lib/audit"
import { revalidatePath } from "next/cache"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function createServiceAction(data: ServiceFormValues) {
  try {
    const session = await requireAdminSession()
    const validated = serviceFormSchema.parse(data)

    let baseSlug = slugify(validated.name)
    let slug = baseSlug
    let counter = 1
    while (await prisma.service.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const service = await prisma.service.create({
      data: {
        name: validated.name,
        slug,
        shortDescription: validated.shortDescription,
        detailedDescription: validated.detailedDescription || null,
        imageUrl: validated.imageUrl || null,
        icon: validated.icon || "Package",
        displayOrder: validated.displayOrder,
        status: validated.status,
        ctaText: validated.ctaText || null,
        ctaUrl: validated.ctaUrl || null,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "SERVICE_CREATED",
      entityType: "Service",
      entityId: service.id,
      metadata: { name: service.name },
    })

    revalidatePath("/admin/services")
    revalidatePath("/")
    revalidatePath("/services")
    return { success: true, data: service }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create service" }
  }
}

export async function updateServiceAction(id: string, data: ServiceFormValues) {
  try {
    const session = await requireAdminSession()
    const validated = serviceFormSchema.parse(data)

    const updated = await prisma.service.update({
      where: { id },
      data: {
        name: validated.name,
        shortDescription: validated.shortDescription,
        detailedDescription: validated.detailedDescription || null,
        imageUrl: validated.imageUrl || null,
        icon: validated.icon || "Package",
        displayOrder: validated.displayOrder,
        status: validated.status,
        ctaText: validated.ctaText || null,
        ctaUrl: validated.ctaUrl || null,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "SERVICE_UPDATED",
      entityType: "Service",
      entityId: updated.id,
    })

    revalidatePath("/admin/services")
    revalidatePath("/")
    revalidatePath("/services")
    return { success: true, data: updated }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update service" }
  }
}

export async function deleteServiceAction(id: string) {
  try {
    const session = await requireAdminSession()
    await prisma.service.delete({ where: { id } })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "SERVICE_DELETED",
      entityType: "Service",
      entityId: id,
    })

    revalidatePath("/admin/services")
    revalidatePath("/")
    revalidatePath("/services")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete service" }
  }
}
