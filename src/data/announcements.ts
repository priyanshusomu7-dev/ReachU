import { prisma } from "@/lib/db"

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

export async function getActiveAnnouncement() {
  try {
    const now = new Date()
    return await prisma.announcement.findFirst({
      where: {
        isActive: true,
        status: "ACTIVE",
        OR: [
          { startAt: null, endAt: null },
          {
            startAt: { lte: now },
            endAt: { gte: now },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Error in getActiveAnnouncement:", error)
    return null
  }
}
