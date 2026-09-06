import type { Metadata } from "next"
import { LegalContentViewer } from "@/components/shared/legal-content-viewer"
import { fetchCompanyData } from "@/lib/company-api"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Official Privacy Policy of Reach U Delivery Express LLP. Understand how we collect, use, and safeguard user data.",
}

export default async function PrivacyPolicyPage() {
  const companyData = await fetchCompanyData()

  return (
    <LegalContentViewer
      type="privacy"
      initialData={companyData}
      title="Privacy Policy"
      subtitle="This policy explains how Reach U Delivery Express LLP collects, processes, and protects personal data for customers and drivers."
      badge="Data Protection & Privacy"
    />
  )
}
