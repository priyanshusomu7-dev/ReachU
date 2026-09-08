"use server"

import { prisma } from "@/lib/db"
import {
  verifyPassword,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  getAdminSession,
} from "@/lib/auth"
import { logAuditAction } from "@/lib/audit"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export interface AuthActionResult {
  success: boolean
  error?: string
}

export async function loginAdminAction(
  prevState: any,
  formData: FormData
): Promise<AuthActionResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase()
  const password = formData.get("password") as string
  const callbackUrl = (formData.get("callbackUrl") as string) || "/admin/dashboard"

  if (!email || !password) {
    return { success: false, error: "Please provide both email and password" }
  }

  try {
    const admin = await prisma.adminUser.findUnique({
      where: { email },
    })

    if (!admin) {
      return { success: false, error: "Invalid email or password" }
    }

    if (admin.status !== "ACTIVE") {
      return { success: false, error: "This administrator account is suspended or inactive" }
    }

    const isValid = await verifyPassword(password, admin.passwordHash)
    if (!isValid) {
      await logAuditAction({
        adminEmail: email,
        action: "LOGIN_FAILED",
        entityType: "AdminUser",
        entityId: admin.id,
        metadata: { reason: "Incorrect password" },
      })
      return { success: false, error: "Invalid email or password" }
    }

    // Update last login timestamp (non-blocking for SQLite concurrency resilience)
    try {
      await prisma.adminUser.update({
        where: { id: admin.id },
        data: { lastLoginAt: new Date() },
      })
    } catch (updateErr) {
      console.warn("Could not update lastLoginAt (non-fatal):", updateErr)
    }

    // Set secure session cookie
    await setAdminSessionCookie({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    })

    // Write audit log (non-blocking for SQLite concurrency resilience)
    try {
      await logAuditAction({
        adminId: admin.id,
        adminEmail: admin.email,
        action: "LOGIN_SUCCESS",
        entityType: "AdminUser",
        entityId: admin.id,
      })
    } catch (auditErr) {
      console.warn("Could not write login audit log (non-fatal):", auditErr)
    }
  } catch (error: any) {
    console.error("Login action error:", error)
    return {
      success: false,
      error: error?.message || "An unexpected error occurred during login. Please try again.",
    }
  }

  redirect(callbackUrl)
}

export async function logoutAdminAction() {
  const session = await getAdminSession()
  if (session) {
    await logAuditAction({
      adminId: session.adminId,
      adminEmail: session.email,
      action: "LOGOUT",
      entityType: "AdminUser",
      entityId: session.adminId,
    })
  }
  await clearAdminSessionCookie()
  revalidatePath("/admin")
  redirect("/admin/login")
}
