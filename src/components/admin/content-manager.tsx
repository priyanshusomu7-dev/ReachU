"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updateSectionContentAction } from "@/actions/content-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/image-uploader"
import { FileText, Check, Loader2, Sparkles } from "lucide-react"

interface ContentManagerProps {
  initialContent: Record<string, any>
}

export function ContentManager({ initialContent }: ContentManagerProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<"hero" | "driver" | "final">("hero")
  const [saving, setSaving] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  // Hero section form
  const [heroBadge, setHeroBadge] = React.useState(
    initialContent?.hero?.badge || "⚡ Smart Delivery for Bharat"
  )
  const [heroTitle, setHeroTitle] = React.useState(
    initialContent?.hero?.title || "Moving Anything, Anywhere. Fast, Simple, Reliable."
  )
  const [heroDescription, setHeroDescription] = React.useState(
    initialContent?.hero?.description ||
      "On-demand parcel delivery, complete home shifting, and mini-truck rentals at transparent pricing."
  )
  const [heroPrimaryCta, setHeroPrimaryCta] = React.useState(
    initialContent?.hero?.primaryCta || "Book a Delivery"
  )
  const [heroSecondaryCta, setHeroSecondaryCta] = React.useState(
    initialContent?.hero?.secondaryCta || "Explore Services"
  )

  // Driver CTA section form
  const [driverTitle, setDriverTitle] = React.useState(
    initialContent?.driver?.title || "Drive with ReachU. Earn on Your Schedule."
  )
  const [driverDescription, setDriverDescription] = React.useState(
    initialContent?.driver?.description ||
      "Attach your bike, auto, pickup, or mini-truck with ReachU and start earning immediately with weekly payouts."
  )
  const [driverCtaText, setDriverCtaText] = React.useState(
    initialContent?.driver?.ctaText || "Download Partner App"
  )

  // Final CTA form
  const [finalTitle, setFinalTitle] = React.useState(
    initialContent?.final?.title || "Ready to Experience Hassle-Free Transport?"
  )
  const [finalDescription, setFinalDescription] = React.useState(
    initialContent?.final?.description ||
      "Download the ReachU app or book online in seconds with verified drivers and transparent pricing."
  )

  const handleSave = async (sectionKey: string, payload: any) => {
    setSaving(true)
    setSuccess(false)
    const res = await updateSectionContentAction(sectionKey, payload)
    setSaving(false)
    if (res.success) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      router.refresh()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Website Content CMS
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Update marketing headlines, descriptions, and CTA copy across the ReachU website without touching code.
          </p>
        </div>

        {success && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-semibold border border-emerald-500/30">
            <Check className="h-3.5 w-3.5" />
            <span>Content Saved Successfully</span>
          </div>
        )}
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "hero"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Hero Section
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("driver")}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "driver"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Driver Partner CTA
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("final")}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "final"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Bottom Final CTA
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "hero" && (
        <Card>
          <CardHeader>
            <CardTitle>Homepage Hero Section</CardTitle>
            <CardDescription>
              First impression text visible to visitors when they land on ReachU.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Badge Text</label>
              <Input
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                placeholder="e.g. ⚡ Smart Delivery for Bharat"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Main Headline</label>
              <Input
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="Headline"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Subheadline / Description</label>
              <Textarea
                rows={3}
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Primary CTA Label</label>
                <Input
                  value={heroPrimaryCta}
                  onChange={(e) => setHeroPrimaryCta(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Secondary CTA Label</label>
                <Input
                  value={heroSecondaryCta}
                  onChange={(e) => setHeroSecondaryCta(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() =>
                  handleSave("hero", {
                    badge: heroBadge,
                    title: heroTitle,
                    description: heroDescription,
                    primaryCta: heroPrimaryCta,
                    secondaryCta: heroSecondaryCta,
                  })
                }
                disabled={saving}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : null}
                <span>Save Hero Copy</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "driver" && (
        <Card>
          <CardHeader>
            <CardTitle>Driver Recruitment Section</CardTitle>
            <CardDescription>
              Drive With Us banner copy encouraging driver partner app downloads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Driver Heading</label>
              <Input
                value={driverTitle}
                onChange={(e) => setDriverTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Description</label>
              <Textarea
                rows={3}
                value={driverDescription}
                onChange={(e) => setDriverDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">CTA Button Text</label>
              <Input
                value={driverCtaText}
                onChange={(e) => setDriverCtaText(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <Button
                onClick={() =>
                  handleSave("driver", {
                    title: driverTitle,
                    description: driverDescription,
                    ctaText: driverCtaText,
                  })
                }
                disabled={saving}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : null}
                <span>Save Driver Section</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "final" && (
        <Card>
          <CardHeader>
            <CardTitle>Final Conversion CTA</CardTitle>
            <CardDescription>
              Bottom banner displayed right before the website footer.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Headline</label>
              <Input
                value={finalTitle}
                onChange={(e) => setFinalTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Description</label>
              <Textarea
                rows={3}
                value={finalDescription}
                onChange={(e) => setFinalDescription(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <Button
                onClick={() =>
                  handleSave("final", {
                    title: finalTitle,
                    description: finalDescription,
                  })
                }
                disabled={saving}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : null}
                <span>Save Final CTA</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
