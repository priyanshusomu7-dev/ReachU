import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle, EyeOff, FileEdit } from "lucide-react"

export function StatusBadge({ status }: { status: string }) {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
      return (
        <Badge variant="success" className="gap-1 font-medium">
          <CheckCircle2 className="h-3 w-3" />
          Active
        </Badge>
      )
    case "SCHEDULED":
      return (
        <Badge variant="info" className="gap-1 font-medium">
          <Clock className="h-3 w-3" />
          Scheduled
        </Badge>
      )
    case "DRAFT":
      return (
        <Badge variant="warning" className="gap-1 font-medium">
          <FileEdit className="h-3 w-3" />
          Draft
        </Badge>
      )
    case "EXPIRED":
      return (
        <Badge variant="muted" className="gap-1 font-medium text-neutral-500">
          <AlertCircle className="h-3 w-3" />
          Expired
        </Badge>
      )
    case "INACTIVE":
    default:
      return (
        <Badge variant="destructive" className="gap-1 font-medium">
          <EyeOff className="h-3 w-3" />
          Inactive
        </Badge>
      )
  }
}
