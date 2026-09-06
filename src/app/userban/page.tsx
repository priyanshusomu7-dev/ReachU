"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import {
  ShieldAlert,
  Trash2,
  Ban,
  CheckCircle2,
  AlertTriangle,
  Info,
  PhoneCall,
  RotateCcw,
  UserX,
} from "lucide-react"

export default function UserBanPage() {
  const [mobile, setMobile] = React.useState("")
  const [statusMessage, setStatusMessage] = React.useState<{
    type: "success" | "error" | "info"
    text: string
    action?: "banned" | "deleted"
    mobile?: string
  } | null>(null)

  const isValid10Digits = /^\d{10}$/.test(mobile)

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only digits, maximum 10 characters
    const digits = e.target.value.replace(/\D/g, "")
    if (digits.length <= 10) {
      setMobile(digits)
      // clear status when user starts retyping
      if (statusMessage) setStatusMessage(null)
    }
  }

  const handleAction = (actionType: "deleted" | "banned") => {
    if (!isValid10Digits) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid 10-digit mobile number.",
      })
      return
    }

    // Success response conforming exactly to reachu.co.in specification
    setStatusMessage({
      type: "success",
      text: `User is ${actionType}.`,
      action: actionType,
      mobile: mobile,
    })
    setMobile("")
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-b from-muted/30 via-background to-background py-8 sm:py-12 lg:py-16">
      <Container className="px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">User Ban</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-4">
            <ShieldAlert className="h-3.5 w-3.5" />
            Manage User
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Delete or Ban User
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Manage account status for registered customers or drivers. Enter the 10-digit mobile number to take necessary moderation actions.
          </p>
        </div>

        {/* Central Moderation Card */}
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-sm transition-all">
            
            {/* Status Feedback Alert */}
            {statusMessage && (
              <div
                className={`mb-6 rounded-xl border p-4 text-sm flex items-start gap-3 transition-all animate-in fade-in ${
                  statusMessage.type === "success"
                    ? "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200"
                    : statusMessage.type === "error"
                    ? "border-destructive/30 bg-destructive/10 text-destructive"
                    : "border-blue-200 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-sm">
                    {statusMessage.text}
                  </h3>
                  {statusMessage.mobile && (
                    <p className="mt-1 text-xs opacity-90">
                      Action applied to account: <span className="font-mono font-semibold">+91 {statusMessage.mobile}</span>
                    </p>
                  )}
                  {statusMessage.type === "success" && (
                    <button
                      type="button"
                      onClick={() => setStatusMessage(null)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-2 hover:opacity-80"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Perform another action
                    </button>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="userban-mobile"
                    className="text-xs font-bold uppercase tracking-wider text-foreground"
                  >
                    Mobile Number <span className="text-primary">*</span>
                  </label>
                  <span className="text-xs font-medium text-muted-foreground font-mono">
                    {mobile.length}/10 digits
                  </span>
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground font-semibold text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="userban-mobile"
                    name="mobile"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={handleMobileChange}
                    className="w-full h-12 rounded-xl border border-border bg-background pl-14 pr-4 text-base font-medium text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span>Only digits, maximum 10 characters.</span>
                  {mobile.length > 0 && !isValid10Digits && (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      Enter {10 - mobile.length} more digit{10 - mobile.length > 1 ? "s" : ""}
                    </span>
                  )}
                  {isValid10Digits && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Valid mobile number
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={!isValid10Digits}
                  onClick={() => handleAction("deleted")}
                  className="flex-1 h-12 rounded-xl bg-red-600 px-5 font-bold text-sm text-white shadow-sm transition-all hover:bg-red-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete User</span>
                </button>

                <button
                  type="button"
                  disabled={!isValid10Digits}
                  onClick={() => handleAction("banned")}
                  className="flex-1 h-12 rounded-xl bg-amber-500 px-5 font-bold text-sm text-white shadow-sm transition-all hover:bg-amber-600 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Ban className="h-4 w-4" />
                  <span>Ban User</span>
                </button>
              </div>
            </form>

            {/* Information Notice */}
            <div className="mt-8 rounded-xl border border-border/80 bg-muted/40 p-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Info className="h-4 w-4 text-primary shrink-0" />
                <span>Notice regarding moderation actions:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-foreground">Delete User:</strong> Clears user profile information and unlinks ongoing sessions.
                </li>
                <li>
                  <strong className="text-foreground">Ban User:</strong> Prevents the user from creating bookings or logging into ReachU platforms.
                </li>
              </ul>
            </div>

            {/* Help & Support Contact Link */}
            <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>Need help or disputed action?</span>
              <Link
                href="/contact"
                className="font-bold text-primary hover:underline underline-offset-4 flex items-center gap-1"
              >
                <PhoneCall className="h-3 w-3" />
                <span>Contact Support</span>
              </Link>
            </div>

          </div>
        </div>

      </Container>
    </div>
  )
}
