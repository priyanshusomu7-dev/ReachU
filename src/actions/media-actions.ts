"use server"

import { prisma } from "@/lib/db"
import { requireAdminSession } from "@/lib/auth"
import { logAuditAction } from "@/lib/audit"
import { revalidatePath } from "next/cache"
import { writeFile, unlink, mkdir } from "fs/promises"
import path from "path"

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function uploadMediaAction(formData: FormData) {
  try {
    const session = await requireAdminSession()
    const file = formData.get("file") as File
    if (!file || typeof file === "string") {
      return { success: false, error: "No file provided" }
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return { success: false, error: "Invalid file type. Only PNG, JPG, WEBP, and SVG are allowed." }
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: "File size exceeds the 5MB limit." }
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadsDir, { recursive: true })

    const ext = path.extname(file.name) || ".png"
    const cleanBase = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
    const uniqueFilename = `${cleanBase}-${Date.now().toString().slice(-6)}${ext}`
    const filePath = path.join(uploadsDir, uniqueFilename)

    await writeFile(filePath, buffer)
    const relativeUrl = `/uploads/${uniqueFilename}`

    const media = await prisma.media.create({
      data: {
        filename: uniqueFilename,
        originalName: file.name,
        url: relativeUrl,
        mimeType: file.type,
        sizeBytes: file.size,
        uploadedById: session.adminId,
      },
    })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "MEDIA_UPLOADED",
      entityType: "Media",
      entityId: media.id,
      metadata: { filename: uniqueFilename, size: file.size },
    })

    revalidatePath("/admin/media")
    return { success: true, data: media }
  } catch (error: any) {
    console.error("uploadMediaAction error:", error)
    return { success: false, error: error.message || "Failed to upload image" }
  }
}

export async function deleteMediaAction(id: string) {
  try {
    const session = await requireAdminSession()
    const media = await prisma.media.findUnique({ where: { id } })
    if (!media) return { success: false, error: "Media not found" }

    // Try deleting file from disk
    try {
      const filePath = path.join(process.cwd(), "public", "uploads", media.filename)
      await unlink(filePath)
    } catch (e) {
      // Ignore if file doesn't exist on disk
    }

    await prisma.media.delete({ where: { id } })

    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "MEDIA_DELETED",
      entityType: "Media",
      entityId: id,
      metadata: { filename: media.filename },
    })

    revalidatePath("/admin/media")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete media" }
  }
}
