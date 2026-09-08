import { prisma } from "@/lib/db"
import { computeOfferStatus } from "@/lib/validations/offer"
import { Prisma } from "@prisma/client"

export async function getOffers(params?: {
  search?: string
  status?: string
  discountType?: string
  service?: string
}) {
  try {
    const where: Prisma.OfferWhereInput = {
      isDeleted: false,
    }

    if (params?.search) {
      const q = params.search.trim()
      where.OR = [
        { title: { contains: q } },
        { promoCode: { contains: q } },
        { shortDescription: { contains: q } },
      ]
    }

    if (params?.discountType && params.discountType !== "ALL") {
      where.discountType = params.discountType
    }

    if (params?.service && params.service !== "ALL") {
      where.applicableService = params.service
    }

    const rawOffers = await prisma.offer.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
      },
    })

    // Compute real-time status and filter if requested
    const offers = rawOffers.map((o) => ({
      ...o,
      computedStatus: computeOfferStatus(o),
    }))

    if (params?.status && params.status !== "ALL") {
      return offers.filter((o) => o.computedStatus === params.status)
    }

    return offers
  } catch (error) {
    console.error("Error in getOffers:", error)
    return []
  }
}

export async function getOfferById(id: string) {
  try {
    const offer = await prisma.offer.findUnique({
      where: { id, isDeleted: false },
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
      },
    })
    if (!offer) return null
    return {
      ...offer,
      computedStatus: computeOfferStatus(offer),
    }
  } catch (error) {
    console.error("Error in getOfferById:", error)
    return null
  }
}

/**
 * Retrieves public-facing active offers.
 * Used on the public website home page.
 */
export async function getActiveOffers(limit: number = 6) {
  try {
    const now = new Date()
    const rawOffers = await prisma.offer.findMany({
      where: {
        isDeleted: false,
        isActive: true,
        status: { in: ["ACTIVE", "SCHEDULED"] },
        startAt: { lte: now },
        endAt: { gte: now },
      },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      take: limit,
    })

    return rawOffers.map((o) => ({
      ...o,
      computedStatus: "ACTIVE" as const,
    }))
  } catch (error) {
    console.error("Error in getActiveOffers:", error)
    return []
  }
}

export async function getOfferStats() {
  try {
    const all = await prisma.offer.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        isActive: true,
        status: true,
        startAt: true,
        endAt: true,
      },
    })

    let activeCount = 0
    let scheduledCount = 0
    let expiredCount = 0
    let draftCount = 0

    for (const o of all) {
      const computed = computeOfferStatus(o)
      if (computed === "ACTIVE") activeCount++
      else if (computed === "SCHEDULED") scheduledCount++
      else if (computed === "EXPIRED") expiredCount++
      else if (computed === "DRAFT") draftCount++
    }

    return {
      total: all.length,
      active: activeCount,
      scheduled: scheduledCount,
      expired: expiredCount,
      draft: draftCount,
    }
  } catch (error) {
    console.error("Error in getOfferStats:", error)
    return { total: 0, active: 0, scheduled: 0, expired: 0, draft: 0 }
  }
}
