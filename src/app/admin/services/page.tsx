import * as React from "react"
import { ServicesManager } from "@/components/admin/services-manager"
import { getServices } from "@/data/services"

export const dynamic = "force-dynamic"

export default async function AdminServicesPage() {
  const services = await getServices()
  return <ServicesManager initialServices={services} />
}
