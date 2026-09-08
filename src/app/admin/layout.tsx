import * as React from "react"
import { getAdminSession } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = await headers()
  const pathname = headerList.get("x-pathname") || ""
  const isLoginPage = pathname === "/admin/login"

  // Login page has its own standalone layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // Enforce session check
  const session = await getAdminSession()
  if (!session) {
    redirect(`/admin/login?callbackUrl=${encodeURIComponent(pathname || "/admin/dashboard")}`)
  }

  return (
    <AdminShell adminEmail={session.email} adminName={session.name}>
      {children}
    </AdminShell>
  )
}
