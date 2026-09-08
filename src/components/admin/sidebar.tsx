"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Tag,
  Megaphone,
  Boxes,
  FileText,
  Smartphone,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react"
import { logoutAdminAction } from "@/actions/auth-actions"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Offers", href: "/admin/offers", icon: Tag, badge: "Priority" },
  { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { name: "Services", href: "/admin/services", icon: Boxes },
  { name: "Website Content", href: "/admin/content", icon: FileText },
  { name: "App Management", href: "/admin/apps", icon: Smartphone },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function AdminSidebar({ isMobileOpen = false, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const NavContent = (
    <div className="flex h-full flex-col justify-between">
      <div>
        {/* Logo & Brand */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-border/60">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Image
              src="/images/brand/reachu-logo.png"
              alt="ReachU Logo"
              width={140}
              height={45}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <span className="hidden sm:inline-block rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
            Admin
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard"
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span className="flex-1 truncate">{item.name}</span>
                {item.badge && !isActive && (
                  <span className="rounded-full bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 border border-primary/20">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="border-t border-border/60 p-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View Live Website</span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-border bg-card z-30">
        {NavContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-card shadow-2xl border-r border-border">
            {NavContent}
          </div>
        </div>
      )}
    </>
  )
}
