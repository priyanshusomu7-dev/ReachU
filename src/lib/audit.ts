import { prisma } from "./db"

export interface LogAuditParams {
  adminId?: string
  adminEmail?: string
  action: string
  entityType: string
  entityId?: string
  metadata?: Record<string, unknown> | string
  ipAddress?: string
  userAgent?: string
}

export async function logAuditAction(params: LogAuditParams) {
  try {
    const metadataString =
      typeof params.metadata === "object"
        ? JSON.stringify(params.metadata)
        : params.metadata ?? null

    await prisma.auditLog.create({
      data: {
        adminId: params.adminId || null,
        adminEmail: params.adminEmail || null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId || null,
        metadata: metadataString,
        ipAddress: params.ipAddress || null,
        userAgent: params.userAgent || null,
      },
    })
  } catch (err) {
    console.error("Failed to write audit log:", err)
  }
}
