"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updateSettingsAction } from "@/actions/settings-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Check, Loader2, History } from "lucide-react"

interface AuditRecord {
  id: string
  action: string
  entityType: string
  entityId?: string | null
  metadata?: string | null
  adminEmail?: string | null
  admin?: { name?: string | null; email?: string | null } | null
  createdAt: Date | string
}

interface SettingsManagerProps {
  initialSettings: Record<string, string>
  auditLogs: AuditRecord[]
}

export function SettingsManager({ initialSettings, auditLogs }: SettingsManagerProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<"general" | "contact" | "social" | "seo" | "audit">("general")
  const [saving, setSaving] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [companyName, setCompanyName] = React.useState(initialSettings.company_name || "ReachU Technologies Pvt. Ltd.")
  const [supportEmail, setSupportEmail] = React.useState(initialSettings.support_email || "support@reachu.co.in")
  const [supportPhone, setSupportPhone] = React.useState(initialSettings.support_phone || "+91 98765 43210")
  const [whatsappNumber, setWhatsappNumber] = React.useState(initialSettings.whatsapp_number || "+91 98765 43210")
  const [operatingHours, setOperatingHours] = React.useState(initialSettings.operating_hours || "24/7 Operations Across All Major Hubs")

  const [twitter, setTwitter] = React.useState(initialSettings.social_twitter || "https://twitter.com/reachu_in")
  const [facebook, setFacebook] = React.useState(initialSettings.social_facebook || "https://facebook.com/reachu.in")
  const [instagram, setInstagram] = React.useState(initialSettings.social_instagram || "https://instagram.com/reachu.in")
  const [linkedin, setLinkedin] = React.useState(initialSettings.social_linkedin || "https://linkedin.com/company/reachu")

  const [seoTitle, setSeoTitle] = React.useState(initialSettings.seo_default_title || "ReachU | Moving Made Effortless")
  const [seoDesc, setSeoDesc] = React.useState(initialSettings.seo_default_description || "ReachU is a modern, technology-driven platform for transportation and logistics needs.")

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setError(null)

    const payload = {
      company_name: companyName,
      support_email: supportEmail,
      support_phone: supportPhone,
      whatsapp_number: whatsappNumber,
      operating_hours: operatingHours,
      social_twitter: twitter,
      social_facebook: facebook,
      social_instagram: instagram,
      social_linkedin: linkedin,
      seo_default_title: seoTitle,
      seo_default_description: seoDesc,
    }

    const res = await updateSettingsAction(payload)
    setSaving(false)

    if (res.success) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      router.refresh()
    } else {
      setError(res.error || "Failed to save settings")
    }
  }

  const formatTimestamp = (d: Date | string) => {
    try {
      return new Date(d).toLocaleString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "Recently"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Settings & Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Configure ReachU company contacts, operational parameters, SEO defaults, and review system audit trails.
          </p>
        </div>

        {success && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-semibold border border-emerald-500/30">
            <Check className="h-3.5 w-3.5" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "general"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          General & Contact
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "social"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Social Media
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "seo"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Default SEO
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "audit"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <History className="h-3.5 w-3.5" />
          <span>Audit Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* General & Contact Tab */}
      {activeTab === "general" && (
        <form onSubmit={handleSave}>
          <Card>
            <CardHeader>
              <CardTitle>Company & Customer Support Details</CardTitle>
              <CardDescription>
                These contact points appear across the public header, footer, and contact pages.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Company Name</label>
                  <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Support Email</label>
                  <Input type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Support Helpline Phone</label>
                  <Input value={supportPhone} onChange={(e) => setSupportPhone(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">WhatsApp Support Number</label>
                  <Input value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Operating Hours</label>
                <Input value={operatingHours} onChange={(e) => setOperatingHours(e.target.value)} />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : null}
                  <span>Save General Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}

      {/* Social Tab */}
      {activeTab === "social" && (
        <form onSubmit={handleSave}>
          <Card>
            <CardHeader>
              <CardTitle>Social Media Handles</CardTitle>
              <CardDescription>
                Official links attached to social icons in the footer and navigation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Twitter / X URL</label>
                  <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Facebook URL</label>
                  <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Instagram URL</label>
                  <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">LinkedIn URL</label>
                  <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : null}
                  <span>Save Social Links</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}

      {/* SEO Tab */}
      {activeTab === "seo" && (
        <form onSubmit={handleSave}>
          <Card>
            <CardHeader>
              <CardTitle>Default Search Engine Optimization</CardTitle>
              <CardDescription>
                Meta tags for search engine results and social card shares.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Default Title Tag</label>
                <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Default Meta Description</label>
                <Textarea
                  rows={3}
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : null}
                  <span>Save SEO Metadata</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}

      {/* Audit Log Tab */}
      {activeTab === "audit" && (
        <Card>
          <CardHeader>
            <CardTitle>System Audit Trails</CardTitle>
            <CardDescription>
              Chronological log of administrative actions, modifications, and security events.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Administrator</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => {
                  let parsedMeta = ""
                  try {
                    if (log.metadata) {
                      parsedMeta = JSON.stringify(JSON.parse(log.metadata))
                    }
                  } catch {
                    parsedMeta = log.metadata || ""
                  }

                  return (
                    <TableRow key={log.id}>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(log.createdAt)}
                      </TableCell>
                      <TableCell className="text-xs font-medium">
                        {log.adminEmail || log.admin?.email || "System"}
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs font-semibold bg-muted px-2 py-0.5 rounded text-foreground">
                          {log.action}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {log.entityType} {log.entityId ? `#${log.entityId.slice(-6)}` : ""}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono truncate max-w-xs">
                        {parsedMeta}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
