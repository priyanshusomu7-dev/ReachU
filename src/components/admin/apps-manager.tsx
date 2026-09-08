"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updateAppLinkAction } from "@/actions/app-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Smartphone, ExternalLink, Check, Loader2, AlertCircle } from "lucide-react"

interface AppLinkRecord {
  id: string
  targetAudience: string
  appName: string
  playStoreUrl: string
  appStoreUrl: string
  qrCodeUrl?: string | null
  description?: string | null
  status: string
}

interface AppsManagerProps {
  initialAppLinks: AppLinkRecord[]
}

export function AppsManager({ initialAppLinks }: AppsManagerProps) {
  const router = useRouter()
  const customerApp = initialAppLinks.find((a) => a.targetAudience === "CUSTOMER")
  const driverApp = initialAppLinks.find((a) => a.targetAudience === "DRIVER")

  const [customerName, setCustomerName] = React.useState(customerApp?.appName || "ReachU - Smart Delivery")
  const [customerPlayUrl, setCustomerPlayUrl] = React.useState(customerApp?.playStoreUrl || "")
  const [customerAppStoreUrl, setCustomerAppStoreUrl] = React.useState(customerApp?.appStoreUrl || "")
  const [customerDesc, setCustomerDesc] = React.useState(customerApp?.description || "")

  const [driverName, setDriverName] = React.useState(driverApp?.appName || "ReachU Partner - Driver App")
  const [driverPlayUrl, setDriverPlayUrl] = React.useState(driverApp?.playStoreUrl || "")
  const [driverAppStoreUrl, setDriverAppStoreUrl] = React.useState(driverApp?.appStoreUrl || "")
  const [driverDesc, setDriverDesc] = React.useState(driverApp?.description || "")

  const [savingTarget, setSavingTarget] = React.useState<string | null>(null)
  const [successTarget, setSuccessTarget] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const handleSave = async (id: string, target: string, data: any) => {
    setError(null)
    setSavingTarget(target)
    setSuccessTarget(null)

    const res = await updateAppLinkAction(id, {
      ...data,
      status: "ACTIVE",
    })

    setSavingTarget(null)
    if (res.success) {
      setSuccessTarget(target)
      setTimeout(() => setSuccessTarget(null), 3000)
      router.refresh()
    } else {
      setError(res.error || "Failed to update links")
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-5">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          App Store Links & Distribution
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Manage live Google Play Store and Apple App Store links consumed by website download badges.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs sm:text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer App Card */}
        {customerApp && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">Customer Mobile App</CardTitle>
                  <CardDescription>Target: Passengers & Delivery Senders</CardDescription>
                </div>
              </div>
              {successTarget === "CUSTOMER" && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Saved
                </span>
              )}
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">App Title</label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-foreground">Google Play Store URL</label>
                  {customerPlayUrl && (
                    <a
                      href={customerPlayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <Input
                  type="url"
                  value={customerPlayUrl}
                  onChange={(e) => setCustomerPlayUrl(e.target.value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-foreground">Apple App Store URL</label>
                  {customerAppStoreUrl && (
                    <a
                      href={customerAppStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <Input
                  type="url"
                  value={customerAppStoreUrl}
                  onChange={(e) => setCustomerAppStoreUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Description</label>
                <Textarea
                  rows={2}
                  value={customerDesc}
                  onChange={(e) => setCustomerDesc(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button
                  onClick={() =>
                    handleSave(customerApp.id, "CUSTOMER", {
                      appName: customerName,
                      playStoreUrl: customerPlayUrl,
                      appStoreUrl: customerAppStoreUrl,
                      description: customerDesc,
                    })
                  }
                  disabled={savingTarget === "CUSTOMER"}
                >
                  {savingTarget === "CUSTOMER" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                  ) : null}
                  <span>Save Customer App Links</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Driver App Card */}
        {driverApp && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">Driver / Partner App</CardTitle>
                  <CardDescription>Target: Drivers & Vehicle Owners</CardDescription>
                </div>
              </div>
              {successTarget === "DRIVER" && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Saved
                </span>
              )}
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">App Title</label>
                <Input
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-foreground">Google Play Store URL</label>
                  {driverPlayUrl && (
                    <a
                      href={driverPlayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <Input
                  type="url"
                  value={driverPlayUrl}
                  onChange={(e) => setDriverPlayUrl(e.target.value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-foreground">Apple App Store URL</label>
                  {driverAppStoreUrl && (
                    <a
                      href={driverAppStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <Input
                  type="url"
                  value={driverAppStoreUrl}
                  onChange={(e) => setDriverAppStoreUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Description</label>
                <Textarea
                  rows={2}
                  value={driverDesc}
                  onChange={(e) => setDriverDesc(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button
                  onClick={() =>
                    handleSave(driverApp.id, "DRIVER", {
                      appName: driverName,
                      playStoreUrl: driverPlayUrl,
                      appStoreUrl: driverAppStoreUrl,
                      description: driverDesc,
                    })
                  }
                  disabled={savingTarget === "DRIVER"}
                >
                  {savingTarget === "DRIVER" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                  ) : null}
                  <span>Save Driver App Links</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
