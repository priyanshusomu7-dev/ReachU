import { prisma } from "@/lib/db"

export async function getWebsiteContent() {
  try {
    const contents = await prisma.websiteContent.findMany()
    const result: Record<string, unknown> = {}
    for (const c of contents) {
      try {
        result[c.sectionKey] = JSON.parse(c.content)
      } catch {
        result[c.sectionKey] = c.content
      }
    }
    return result
  } catch (error) {
    console.error("Error in getWebsiteContent:", error)
    return {}
  }
}

export async function getSectionContent(sectionKey: string) {
  try {
    const record = await prisma.websiteContent.findUnique({
      where: { sectionKey },
    })
    if (!record) return null
    try {
      return JSON.parse(record.content)
    } catch {
      return record.content
    }
  } catch (error) {
    console.error(`Error in getSectionContent(${sectionKey}):`, error)
    return null
  }
}
