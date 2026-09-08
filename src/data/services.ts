import { prisma } from "@/lib/db"

export async function getServices() {
  try {
    return await prisma.service.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    })
  } catch (error) {
    console.error("Error in getServices:", error)
    return []
  }
}

export async function getActiveServices() {
  try {
    return await prisma.service.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    })
  } catch (error) {
    console.error("Error in getActiveServices:", error)
    return []
  }
}
