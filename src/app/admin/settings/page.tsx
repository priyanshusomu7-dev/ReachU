import * as React from "react"
import { SettingsManager } from "@/components/admin/settings-manager"
import { getSiteSettings } from "@/data/settings"
import { getAuditLogs } from "@/data/audit"

export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings()
  const auditLogs = await getAuditLogs(50)

  return <SettingsManager initialSettings={settings} auditLogs={auditLogs} />
}
