import { prisma } from "@/lib/db"

export async function getAuditLogs(limit: number = 25) {
  try {
    return await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        admin: {
          select: { name: true, email: true },
        },
      },
    })
  } catch (error) {
    console.error("Error in getAuditLogs:", error)
    return []
  }
}
