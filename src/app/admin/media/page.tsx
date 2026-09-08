import * as React from "react"
import { MediaManager } from "@/components/admin/media-manager"
import { getMediaList } from "@/data/media"

export const dynamic = "force-dynamic"

export default async function AdminMediaPage() {
  const media = await getMediaList()
  return <MediaManager initialMedia={media} />
}
