import * as React from "react"
import { AppsManager } from "@/components/admin/apps-manager"
import { getAppLinks } from "@/data/apps"

export const dynamic = "force-dynamic"

export default async function AdminAppsPage() {
  const appLinks = await getAppLinks()
  return <AppsManager initialAppLinks={appLinks} />
}
