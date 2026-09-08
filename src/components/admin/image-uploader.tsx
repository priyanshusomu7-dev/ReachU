"use client"

import * as React from "react"
import { uploadMediaAction } from "@/actions/media-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
  helperText?: string
}

export function ImageUploader({
  value,
  onChange,
  label = "Banner / Image",
  helperText = "PNG, JPG, WEBP up to 5MB",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [urlMode, setUrlMode] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await uploadMediaAction(formData)
    setIsUploading(false)

    if (res.success && res.data?.url) {
      onChange(res.data.url)
    } else {
      setError(res.error || "Failed to upload file")
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setUrlMode(!urlMode)}
          className="text-xs text-primary hover:underline"
        >
          {urlMode ? "Upload File Instead" : "Paste URL Instead"}
        </button>
      </div>

      {urlMode ? (
        <Input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div>
          {value ? (
            <div className="relative inline-block rounded-xl border border-border p-1 bg-muted/20">
              <div className="relative h-28 w-48 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={value}
                  alt="Uploaded media"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute -top-2 -right-2 rounded-full bg-destructive text-destructive-foreground p-1 shadow-md hover:bg-destructive/80 transition-colors"
                title="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 hover:bg-muted/40 p-5 text-center cursor-pointer transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              {isUploading ? (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>Uploading image...</span>
                </div>
              ) : (
                <>
                  <div className="rounded-full bg-muted p-2.5 text-muted-foreground group-hover:text-primary transition-colors">
                    <Upload className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-foreground">
                    Click to select an image from your device
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{helperText}</p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
