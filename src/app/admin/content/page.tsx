import * as React from "react"
import { ContentManager } from "@/components/admin/content-manager"
import { getWebsiteContent } from "@/data/content"

export const dynamic = "force-dynamic"

export default async function AdminContentPage() {
  const content = await getWebsiteContent()
  return <ContentManager initialContent={content} />
}
