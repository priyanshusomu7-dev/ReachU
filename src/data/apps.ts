import { prisma } from "@/lib/db"

export async function getAppLinks() {
  try {
    return await prisma.appLink.findMany({
      orderBy: { targetAudience: "asc" },
    })
  } catch (error) {
    console.error("Error in getAppLinks:", error)
    return []
  }
}
