import type { Metadata } from "next"
import { LegalContentViewer } from "@/components/shared/legal-content-viewer"
import { fetchCompanyData } from "@/lib/company-api"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Official Terms and Conditions of Reach U Delivery Express LLP. Guidelines for customers and driver partners.",
}

export default async function TermsPage() {
  const companyData = await fetchCompanyData()

  return (
    <LegalContentViewer
      type="terms"
      initialData={companyData}
      title="Terms & Conditions"
      subtitle="Comprehensive terms of service governing ride bookings, order deliveries, driver partnerships, and platform usage."
      badge="Service Agreement & Guidelines"
    />
  )
}
