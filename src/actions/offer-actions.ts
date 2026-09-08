"use server"

import { prisma } from "@/lib/db"
import { requireAdminSession } from "@/lib/auth"
import { offerFormSchema, OfferFormValues, computeOfferStatus } from "@/lib/validations/offer"
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

export async function createOfferAction(data: OfferFormValues) {
  try {
    const session = await requireAdminSession()

    const parseResult = offerFormSchema.safeParse(data)
    if (!parseResult.success) {
      const errorMsg = parseResult.error.errors.map((e) => e.message).join(", ")
      return { success: false, error: errorMsg }
    }

    const validated = parseResult.data

    // Check unique promoCode
    const existingCode = await prisma.offer.findUnique({
      where: { promoCode: validated.promoCode.toUpperCase() },
    })

    if (existingCode && !existingCode.isDeleted) {
      return { success: false, error: `Promo code "${validated.promoCode}" is already in use.` }
    }

    // Generate unique slug
    let baseSlug = slugify(validated.title) || "offer"
    let slug = baseSlug
    let counter = 1
    while (await prisma.offer.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const startAtDate = new Date(validated.startAt)
    const endAtDate = new Date(validated.endAt)

    const newOffer = await prisma.offer.create({
      data: {
        title: validated.title,
        slug,
        shortDescription: validated.shortDescription,
        description: validated.description || "",
        promoCode: validated.promoCode.toUpperCase(),
        discountType: validated.discountType,
        discountValue: validated.discountValue,
        minimumBookingAmount: validated.minimumBookingAmount ?? null,
        maximumDiscount: validated.maximumDiscount ?? null,
        usageLimit: validated.usageLimit ?? null,
        perUserLimit: validated.perUserLimit ?? 1,
        startAt: startAtDate,
        endAt: endAtDate,
        status: validated.status,
        isActive: validated.isActive,
        imageUrl: validated.imageUrl || null,
        thumbnailUrl: validated.thumbnailUrl || null,
        applicableService: validated.applicableService || "ALL",
        isNewUserOnly: validated.isNewUserOnly,
        createdById: session.adminId,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "OFFER_CREATE",
      entityType: "Offer",
      entityId: newOffer.id,
      metadata: {
        title: newOffer.title,
        code: newOffer.promoCode,
        discount: `${newOffer.discountType === "PERCENTAGE" ? `${newOffer.discountValue}%` : `₹${newOffer.discountValue}`}`,
      },
    })

    revalidatePath("/admin/offers")
    revalidatePath("/admin/dashboard")
    revalidatePath("/")

    return { success: true, data: newOffer }
  } catch (error: any) {
    console.error("createOfferAction error:", error)
    return { success: false, error: error.message || "Failed to create offer" }
  }
}

export async function updateOfferAction(id: string, data: OfferFormValues) {
  try {
    const session = await requireAdminSession()

    const parseResult = offerFormSchema.safeParse(data)
    if (!parseResult.success) {
      const errorMsg = parseResult.error.errors.map((e) => e.message).join(", ")
      return { success: false, error: errorMsg }
    }

    const validated = parseResult.data

    const existing = await prisma.offer.findUnique({
      where: { id },
    })

    if (!existing || existing.isDeleted) {
      return { success: false, error: "Offer not found." }
    }

    // Check code uniqueness if changed
    if (existing.promoCode !== validated.promoCode.toUpperCase()) {
      const codeTaken = await prisma.offer.findUnique({
        where: { promoCode: validated.promoCode.toUpperCase() },
      })
      if (codeTaken && codeTaken.id !== id && !codeTaken.isDeleted) {
        return { success: false, error: `Promo code "${validated.promoCode}" is already in use.` }
      }
    }

    const updatedOffer = await prisma.offer.update({
      where: { id },
      data: {
        title: validated.title,
        shortDescription: validated.shortDescription,
        description: validated.description || "",
        promoCode: validated.promoCode.toUpperCase(),
        discountType: validated.discountType,
        discountValue: validated.discountValue,
        minimumBookingAmount: validated.minimumBookingAmount ?? null,
        maximumDiscount: validated.maximumDiscount ?? null,
        usageLimit: validated.usageLimit ?? null,
        perUserLimit: validated.perUserLimit ?? 1,
        startAt: new Date(validated.startAt),
        endAt: new Date(validated.endAt),
        status: validated.status,
        isActive: validated.isActive,
        imageUrl: validated.imageUrl || null,
        thumbnailUrl: validated.thumbnailUrl || null,
        applicableService: validated.applicableService || "ALL",
        isNewUserOnly: validated.isNewUserOnly,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "OFFER_UPDATE",
      entityType: "Offer",
      entityId: updatedOffer.id,
      metadata: {
        title: updatedOffer.title,
        code: updatedOffer.promoCode,
      },
    })

    revalidatePath("/admin/offers")
    revalidatePath(`/admin/offers/${id}`)
    revalidatePath("/admin/dashboard")
    revalidatePath("/")

    return { success: true, data: updatedOffer }
  } catch (error: any) {
    console.error("updateOfferAction error:", error)
    return { success: false, error: error.message || "Failed to update offer" }
  }
}

export async function toggleOfferActiveAction(id: string, isActive: boolean) {
  try {
    const session = await requireAdminSession()

    const offer = await prisma.offer.update({
      where: { id },
      data: { isActive },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: isActive ? "OFFER_ACTIVATED" : "OFFER_DEACTIVATED",
      entityType: "Offer",
      entityId: offer.id,
      metadata: { promoCode: offer.promoCode, isActive },
    })

    revalidatePath("/admin/offers")
    revalidatePath("/admin/dashboard")
    revalidatePath("/")

    return { success: true, isActive: offer.isActive }
  } catch (error: any) {
    console.error("toggleOfferActiveAction error:", error)
    return { success: false, error: error.message || "Failed to change offer status" }
  }
}

export async function deleteOfferAction(id: string) {
  try {
    const session = await requireAdminSession()

    // Soft delete to preserve auditability and history
    const offer = await prisma.offer.update({
      where: { id },
      data: {
        isDeleted: true,
        isActive: false,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "OFFER_DELETED",
      entityType: "Offer",
      entityId: offer.id,
      metadata: { title: offer.title, promoCode: offer.promoCode },
    })

    revalidatePath("/admin/offers")
    revalidatePath("/admin/dashboard")
    revalidatePath("/")

    return { success: true }
  } catch (error: any) {
    console.error("deleteOfferAction error:", error)
    return { success: false, error: error.message || "Failed to delete offer" }
  }
}

export async function duplicateOfferAction(id: string) {
  try {
    const session = await requireAdminSession()
    const original = await prisma.offer.findUnique({ where: { id } })
    if (!original) return { success: false, error: "Original offer not found" }

    const uniqueCode = `${original.promoCode}_COPY_${Math.floor(100 + Math.random() * 900)}`
    const newTitle = `${original.title} (Copy)`
    const newSlug = slugify(newTitle) + `-${Date.now().toString().slice(-4)}`

    const duplicated = await prisma.offer.create({
      data: {
        title: newTitle,
        slug: newSlug,
        shortDescription: original.shortDescription,
        description: original.description,
        promoCode: uniqueCode,
        discountType: original.discountType,
        discountValue: original.discountValue,
        minimumBookingAmount: original.minimumBookingAmount,
        maximumDiscount: original.maximumDiscount,
        usageLimit: original.usageLimit,
        perUserLimit: original.perUserLimit,
        startAt: original.startAt,
        endAt: original.endAt,
        status: "DRAFT",
        isActive: false,
        imageUrl: original.imageUrl,
        thumbnailUrl: original.thumbnailUrl,
        applicableService: original.applicableService,
        isNewUserOnly: original.isNewUserOnly,
        createdById: session.adminId,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "OFFER_DUPLICATED",
      entityType: "Offer",
      entityId: duplicated.id,
      metadata: { originalCode: original.promoCode, newCode: duplicated.promoCode },
    })

    revalidatePath("/admin/offers")
    revalidatePath("/admin/dashboard")

    return { success: true, data: duplicated }
  } catch (error: any) {
    console.error("duplicateOfferAction error:", error)
    return { success: false, error: error.message || "Failed to duplicate offer" }
  }
}
