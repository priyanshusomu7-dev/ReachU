export interface CompanyApiResponse {
  status?: string
  message?: string
  data?: {
    companyName?: string
    address?: string
    contactNumber?: string
    supportEmail?: string
    whatsappNumber?: string
    timing?: string
    website?: string
    gstNumber?: string
    gstPercentage?: number
    privacyPolicy?: string
    termAndCondition?: string
    aboutUs?: string
    helpandSupport?: string
    googlePlayStoreAppLink?: string
  }
}

export const COMPANY_API_ENDPOINT = "https://api.reachu.co.in/api/v1/company/getCompany"

export async function fetchCompanyData(): Promise<CompanyApiResponse["data"] | null> {
  try {
    const res = await fetch(COMPANY_API_ENDPOINT, {
      next: { revalidate: 3600 }, // Cache and revalidate every hour
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch company data: ${res.status}`)
    }
    const json: CompanyApiResponse = await res.json()
    return json.data || null
  } catch (error) {
    console.error("Error fetching company data from API:", error)
    return null
  }
}
