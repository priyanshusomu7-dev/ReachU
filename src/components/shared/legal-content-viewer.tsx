"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import {
  ShieldCheck,
  FileText,
  Clock,
  Building2,
  Mail,
  Phone,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import { COMPANY_API_ENDPOINT, CompanyApiResponse } from "@/lib/company-api"

interface LegalContentViewerProps {
  type: "privacy" | "terms"
  title: string
  subtitle: string
  badge: string
  initialData?: CompanyApiResponse["data"] | null
}

export function LegalContentViewer({
  type,
  title,
  subtitle,
  badge,
  initialData,
}: LegalContentViewerProps) {
  const [data, setData] = React.useState<CompanyApiResponse["data"] | null>(initialData || null)
  const [isLoading, setIsLoading] = React.useState(!initialData)
  const [error, setError] = React.useState<string | null>(null)

  const loadData = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(COMPANY_API_ENDPOINT, { cache: "no-store" })
      if (!res.ok) throw new Error("Could not load document from server")
      const json: CompanyApiResponse = await res.json()
      if (json.data) {
        setData(json.data)
      } else {
        throw new Error("No data returned")
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load document"
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (!initialData) {
      loadData()
    }
  }, [loadData, initialData])

  const rawHtml = type === "privacy" ? data?.privacyPolicy : data?.termAndCondition

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-b from-muted/30 via-background to-background py-8 sm:py-12 lg:py-16">
      <Container className="px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">{title}</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            {type === "privacy" ? (
              <ShieldCheck className="h-3.5 w-3.5" />
            ) : (
              <FileText className="h-3.5 w-3.5" />
            )}
            {badge}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            {subtitle}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-y border-border/60 py-3">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <span>Reach U Delivery Express LLP</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>Live API Source: api.reachu.co.in</span>
            </div>
            {data?.gstNumber && (
              <>
                <span>•</span>
                <span>GSTIN: {data.gstNumber}</span>
              </>
            )}
          </div>
        </div>

        {/* Main Document Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Legal Content Card */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-12 shadow-sm">
              
              {isLoading && (
                <div className="py-16 text-center space-y-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent mx-auto" />
                  <p className="text-sm font-semibold text-foreground">
                    Fetching latest {title} from ReachU API...
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Connecting to https://api.reachu.co.in/api/v1/company/getCompany
                  </p>
                </div>
              )}

              {error && !isLoading && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center space-y-3">
                  <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
                  <h3 className="font-bold text-destructive">Failed to Load Content</h3>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    {error}. Please verify your connection or retry fetching from the company endpoint.
                  </p>
                  <button
                    type="button"
                    onClick={loadData}
                    className="inline-flex items-center gap-2 rounded-xl bg-destructive text-white text-xs font-bold px-4 py-2 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              )}

              {!isLoading && !error && rawHtml && (
                <article
                  className="legal-prose text-foreground space-y-4 [&>h1]:text-2xl [&>h1]:sm:text-3xl [&>h1]:font-black [&>h1]:text-foreground [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:border-b [&>h1]:border-border [&>h1]:pb-2.5 [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-base [&>h3]:sm:text-lg [&>h3]:font-bold [&>h3]:text-primary [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:text-sm [&>p]:sm:text-base [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1.5 [&>ul]:mb-4 [&>ul]:text-sm [&>ul]:sm:text-base [&>ul]:text-muted-foreground [&>li]:leading-relaxed [&>strong]:text-foreground [&>strong]:font-semibold [&>em]:text-xs [&>em]:sm:text-sm [&>em]:text-muted-foreground [&>em]:italic [&>a]:text-primary [&>a]:underline [&>a]:font-medium hover:[&>a]:opacity-80"
                  dangerouslySetInnerHTML={{ __html: rawHtml }}
                />
              )}
            </div>
          </div>

          {/* Quick Help & Company Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-3">
                Legal & Governance Inquiries
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Have questions regarding our policies or data protection? Our legal and operations desk is available to assist you.
              </p>

              <div className="space-y-3 text-xs border-t border-border pt-4">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="mailto:support@reachu.co.in"
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    support@reachu.co.in
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="tel:8586876539"
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    8586876539 / 9814037044
                  </a>
                </div>
                <div className="flex items-start gap-2.5 pt-1 text-muted-foreground">
                  <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Flat no 430 M G colony congress road near by hotel Karim&apos;s kitchen</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-2 text-xs">
              <p className="font-bold text-foreground uppercase tracking-wider mb-2">
                Related Legal Documents:
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/privacy-policy"
                  className={`p-2.5 rounded-xl border transition-all ${
                    type === "privacy"
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-border bg-card text-foreground hover:bg-muted font-medium"
                  }`}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className={`p-2.5 rounded-xl border transition-all ${
                    type === "terms"
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-border bg-card text-foreground hover:bg-muted font-medium"
                  }`}
                >
                  Terms &amp; Conditions
                </Link>
                <Link
                  href="/contact"
                  className="p-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-muted font-medium"
                >
                  Contact Support Desk
                </Link>
              </div>
            </div>
          </div>

        </div>

      </Container>
    </div>
  )
}
