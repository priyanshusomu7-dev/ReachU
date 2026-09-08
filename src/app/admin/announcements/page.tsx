import * as React from "react"
import { AnnouncementsManager } from "@/components/admin/announcements-manager"
import { getAnnouncements } from "@/data/announcements"

export const dynamic = "force-dynamic"

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements()
  return <AnnouncementsManager initialAnnouncements={announcements} />
}
