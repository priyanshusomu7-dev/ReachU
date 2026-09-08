"use client"

import * as React from "react"
import { Menu, Shield, User, LogOut } from "lucide-react"
import { logoutAdminAction } from "@/actions/auth-actions"

interface AdminHeaderProps {
  onMenuClick: () => void
  adminEmail?: string
  adminName?: string
  title?: string
}

export function AdminHeader({
  onMenuClick,
  adminEmail = "admin@reachu.co.in",
  adminName = "ReachU Admin",
  title,
}: AdminHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {title && (
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Environment / System Pill */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Live</span>
        </div>

        {/* Profile Avatar & Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 rounded-full p-1 sm:px-2.5 sm:py-1.5 hover:bg-muted transition-colors border border-border/80"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
              {adminName?.charAt(0) || "A"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold leading-none text-foreground">{adminName}</p>
              <p className="text-[10px] text-muted-foreground leading-none mt-1 truncate max-w-[120px]">
                {adminEmail}
              </p>
            </div>
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-xl z-40 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-border/60 mb-1">
                  <p className="text-xs font-semibold text-foreground">{adminName}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{adminEmail}</p>
                </div>

                <form action={logoutAdminAction}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
