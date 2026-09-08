import { prisma } from "@/lib/db"

export async function getSiteSettings() {
  try {
    const records = await prisma.siteSetting.findMany()
    const map: Record<string, string> = {}
    for (const r of records) {
      map[r.key] = r.value
    }
    return map
  } catch (error) {
    console.error("Error in getSiteSettings:", error)
    return {}
  }
}
