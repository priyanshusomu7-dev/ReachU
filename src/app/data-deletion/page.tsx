import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import {
  Trash2,
  Smartphone,
  Mail,
  Database,
  Clock,
  ShieldCheck,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "User Data Deletion",
  description:
    "Instructions to request deletion of your personal data from Reach U Delivery Express LLP.",
}

const SUPPORT_EMAIL = "support@reachu.co.in"

const steps = [
  {
    icon: Smartphone,
    title: "Option 1: Delete from the ReachU app",
    items: [
      "Open the ReachU app and log in to your account.",
      "Go to Profile → Settings → Delete Account.",
      "Confirm the deletion request. Your account will be deactivated immediately.",
    ],
  },
  {
    icon: Mail,
    title: "Option 2: Request deletion by email",
    items: [
      `Send an email to ${SUPPORT_EMAIL} with the subject "Data Deletion Request".`,
      "Include your full name and the mobile number / email linked to your ReachU account.",
      "We may contact you to verify your identity before processing the request.",
    ],
  },
]

const deletedData = [
  "Name, mobile number, email address and profile photo",
  "Saved addresses and pickup / drop locations",
  "Device tokens, app preferences and marketing preferences",
]

const retainedData = [
  "Invoices, payment and GST records required under Indian tax and accounting laws",
  "Records needed to resolve disputes, prevent fraud or comply with legal requests",
]

export default function DataDeletionPage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-b from-muted/30 via-background to-background py-8 sm:py-12 lg:py-16">
      <Container className="px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">Data Deletion</span>
        </nav>

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            <Trash2 className="h-3.5 w-3.5" />
            Data Deletion Instructions
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            How to Delete Your Data
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Reach U Delivery Express LLP (&quot;ReachU&quot;) respects your right to control your personal data. You can
            request deletion of your account and all associated data using either of the options below.
          </p>
        </div>

        {/* Deletion Options */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-10">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">{step.title}</h2>
                <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal pl-5">
                  {step.items.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            )
          })}
        </div>

        {/* What gets deleted / retained */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-10">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <Database className="h-5 w-5 text-primary" />
              Data we delete
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
              {deletedData.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Data we may retain
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Some information may be kept for the period required by law, after which it is permanently deleted:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
              {retainedData.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm mb-10">
          <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Clock className="h-5 w-5 text-primary" />
            Processing time
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            We acknowledge deletion requests within 48 hours and complete them within 30 days. You will receive a
            confirmation by email or SMS once your data has been deleted. Deletion is permanent and cannot be undone.
          </p>
        </div>

        {/* Contact Banner */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-foreground">Questions about your data?</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Read our{" "}
              <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-primary">
                Privacy Policy
              </Link>{" "}
              or contact our support team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Data%20Deletion%20Request`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary/90 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{SUPPORT_EMAIL}</span>
            </a>
            <a
              href="tel:8586876539"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>8586876539</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
