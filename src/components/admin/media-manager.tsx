"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { EmptyState } from "@/components/admin/empty-state"
import { uploadMediaAction, deleteMediaAction } from "@/actions/media-actions"
import {
  Upload,
  Search,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react"

interface MediaItem {
  id: string
  filename: string
  originalName: string
  url: string
  mimeType: string
  sizeBytes: number
  createdAt: Date | string
}

export function MediaManager({ initialMedia }: { initialMedia: MediaItem[] }) {
  const router = useRouter()
  const [mediaList, setMediaList] = React.useState(initialMedia)
  const [search, setSearch] = React.useState("")
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadError, setUploadError] = React.useState<string | null>(null)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  // Delete modal
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setMediaList(initialMedia)
  }, [initialMedia])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)
    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await uploadMediaAction(formData)
    setIsUploading(false)

    if (res.success) {
      router.refresh()
    } else {
      setUploadError(res.error || "Failed to upload image")
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleCopy = (id: string, url: string) => {
    const fullUrl = window.location.origin + url
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    await deleteMediaAction(deleteId)
    setIsDeleting(false)
    setDeleteId(null)
    router.refresh()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const filtered = mediaList.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.originalName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Media Library
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Upload, inspect, and copy links for banners, offer graphics, vehicle photos, and icons.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/svg+xml"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="gap-1.5 font-semibold"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>Upload Image</span>
          </Button>
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs sm:text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by filename or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title={search ? "No media found" : "Your media library is empty"}
          description="Upload images to use in promotional offers, service listings, or announcements."
          actionLabel="Upload Image"
          onAction={() => fileInputRef.current?.click()}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => {
            const isCopied = copiedId === item.id

            return (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-2xs hover:shadow-md hover:border-primary/40 transition-all"
              >
                <div className="relative h-32 w-full bg-muted/30">
                  <Image
                    src={item.url}
                    alt={item.originalName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="p-2.5 flex flex-col justify-between flex-1">
                  <div>
                    <p className="font-semibold text-foreground text-xs truncate" title={item.originalName}>
                      {item.originalName}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {formatFileSize(item.sizeBytes)} • {item.mimeType.split("/")[1]?.toUpperCase()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/60">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.url)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy URL"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteId(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      title="Delete media"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete image?"
        description="Are you sure you want to permanently remove this media file? Any offers or services referencing this URL might fail to load it."
        confirmText="Delete Image"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  )
}
