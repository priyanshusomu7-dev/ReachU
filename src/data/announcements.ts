import { prisma } from "@/lib/db"
import { unstable_cache } from "next/cache"

export async function getAnnouncements() {
  try {
    return await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Error in getAnnouncements:", error)
    return []
  }
}

async function fetchActiveAnnouncement() {
  try {
    const now = new Date()

    // 1. First check explicit announcements
    const announcement = await prisma.announcement.findFirst({
      where: {
        isActive: true,
        status: "ACTIVE",
        AND: [
          {
            OR: [
              { startAt: null },
              { startAt: { lte: now } },
            ],
          },
          {
            OR: [
              { endAt: null },
              { endAt: { gte: now } },
            ],
          },
        ],
      },
      orderBy: { updatedAt: "desc" },
    })

    if (announcement) {
      return announcement
    }

    // 2. If no custom announcement is active, check for an active Offer to display in the banner
    const activeOffer = await prisma.offer.findFirst({
      where: {
        isActive: true,
        status: { in: ["ACTIVE", "SCHEDULED"] },
        isDeleted: false,
        startAt: { lte: now },
        endAt: { gte: now },
      },
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "desc" },
      ],
    })

    if (activeOffer) {
      return {
        id: `offer-${activeOffer.id}`,
        title: `⚡ ${activeOffer.title}`,
        message: activeOffer.shortDescription || activeOffer.description || `Use promo code ${activeOffer.promoCode} at checkout!`,
        ctaText: `Use ${activeOffer.promoCode}`,
        ctaUrl: "/#offers",
        imageUrl: activeOffer.imageUrl,
        startAt: activeOffer.startAt,
        endAt: activeOffer.endAt,
        status: activeOffer.status,
        isActive: activeOffer.isActive,
        isDismissible: true,
        createdAt: activeOffer.createdAt,
        updatedAt: activeOffer.updatedAt,
      }
    }

    return null
  } catch (error) {
    console.error("Error in fetchActiveAnnouncement:", error)
    return null
  }
}

export const getActiveAnnouncement = unstable_cache(
  fetchActiveAnnouncement,
  ["active-announcement"],
  { revalidate: 60, tags: ["announcements", "offers"] }
)


