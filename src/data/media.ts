import { prisma } from "@/lib/db"
import { Prisma } from "@prisma/client"

export async function getMediaList(search?: string) {
  try {
    const where: Prisma.MediaWhereInput = {}
    if (search) {
      where.OR = [
        { filename: { contains: search } },
        { originalName: { contains: search } },
      ]
    }
    return await prisma.media.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Error in getMediaList:", error)
    return []
  }
}
