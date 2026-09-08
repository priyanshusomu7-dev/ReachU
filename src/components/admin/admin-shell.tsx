"use client"

import * as React from "react"
import { AdminSidebar } from "./sidebar"
import { AdminHeader } from "./header"

interface AdminShellProps {
  children: React.ReactNode
  adminEmail?: string
  adminName?: string
}

export function AdminShell({ children, adminEmail, adminName }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-muted/20 text-foreground flex">
      <AdminSidebar
        isMobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex flex-1 flex-col lg:pl-64">
        <AdminHeader
          onMenuClick={() => setMobileOpen(true)}
          adminEmail={adminEmail}
          adminName={adminName}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
