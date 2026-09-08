"use client"

import * as React from "react"
import Link from "next/link"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/admin/status-badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { EmptyState } from "@/components/admin/empty-state"
import {
  toggleOfferActiveAction,
  deleteOfferAction,
  duplicateOfferAction,
} from "@/actions/offer-actions"
import {
  Search,
  Plus,
  Edit2,
  Copy,
  Trash2,
  Tag,
  ExternalLink,
  Calendar,
  Sparkles,
  Check,
  Eye,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface OfferRecord {
  id: string
  title: string
  slug: string
  shortDescription: string
  promoCode: string
  discountType: string
  discountValue: number
  minimumBookingAmount?: number | null
  maximumDiscount?: number | null
  startAt: Date | string
  endAt: Date | string
  status: string
  isActive: boolean
  applicableService?: string | null
  computedStatus: string
  createdAt: Date | string
}

interface OffersTableProps {
  initialOffers: OfferRecord[]
}

export function OffersTable({ initialOffers }: OffersTableProps) {
  const router = useRouter()
  const [offers, setOffers] = React.useState(initialOffers)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("ALL")
  const [discountFilter, setDiscountFilter] = React.useState("ALL")

  // Delete modal state
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [deleteTitle, setDeleteTitle] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Duplicating state
  const [isDuplicating, setIsDuplicating] = React.useState<string | null>(null)

  // Keep state in sync with server props
  const [prevInitial, setPrevInitial] = React.useState(initialOffers)
  if (prevInitial !== initialOffers) {
    setPrevInitial(initialOffers)
    setOffers(initialOffers)
  }

  const handleToggleActive = async (id: string, current: boolean) => {
    // Optimistic UI update
    setOffers((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              isActive: !current,
              computedStatus: !current ? "ACTIVE" : "INACTIVE",
            }
          : o
      )
    )

    const res = await toggleOfferActiveAction(id, !current)
    if (!res.success) {
      // Rollback if failed
      setOffers(initialOffers)
    } else {
      router.refresh()
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    const res = await deleteOfferAction(deleteId)
    setIsDeleting(false)
    setDeleteId(null)

    if (res.success) {
      setOffers((prev) => prev.filter((o) => o.id !== deleteId))
      router.refresh()
    }
  }

  const handleDuplicate = async (id: string) => {
    setIsDuplicating(id)
    const res = await duplicateOfferAction(id)
    setIsDuplicating(null)
    if (res.success) {
      router.refresh()
    }
  }

  // Filter offers locally
  const filteredOffers = offers.filter((o) => {
    const matchesSearch =
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.promoCode.toLowerCase().includes(search.toLowerCase()) ||
      o.shortDescription.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "ALL" || o.computedStatus === statusFilter

    const matchesDiscount =
      discountFilter === "ALL" || o.discountType === discountFilter

    return matchesSearch && matchesStatus && matchesDiscount
  })

  const formatDate = (date: Date | string) => {
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return "TBD"
    }
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, promo code, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-[140px]"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="DRAFT">Draft</option>
            <option value="EXPIRED">Expired</option>
            <option value="INACTIVE">Inactive</option>
          </Select>

          <Select
            value={discountFilter}
            onChange={(e) => setDiscountFilter(e.target.value)}
            className="w-[140px]"
          >
            <option value="ALL">All Discounts</option>
            <option value="FIXED">Fixed (₹)</option>
            <option value="PERCENTAGE">Percentage (%)</option>
          </Select>
        </div>
      </div>

      {/* Offers Data Table */}
      {filteredOffers.length === 0 ? (
        <EmptyState
          icon={Tag}
          title={search || statusFilter !== "ALL" ? "No matching offers found" : "No offers yet"}
          description={
            search || statusFilter !== "ALL"
              ? "Try adjusting your search query or filters."
              : "Create your first promotional offer to engage ReachU customers with discounts."
          }
          actionLabel="Create Offer"
          actionHref="/admin/offers/new"
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Offer Details</TableHead>
              <TableHead>Promo Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Validity Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Live Toggle</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffers.map((offer) => {
              const discountText =
                offer.discountType === "PERCENTAGE"
                  ? `${offer.discountValue}%`
                  : `₹${offer.discountValue}`

              return (
                <TableRow key={offer.id}>
                  {/* Title & Description */}
                  <TableCell>
                    <div className="max-w-xs sm:max-w-sm">
                      <p className="font-semibold text-foreground text-sm truncate">
                        {offer.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {offer.shortDescription}
                      </p>
                      {offer.applicableService && offer.applicableService !== "ALL" && (
                        <span className="inline-block mt-1 text-[10px] font-medium bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                          {offer.applicableService}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Promo Code */}
                  <TableCell>
                    <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/25">
                      {offer.promoCode}
                    </span>
                  </TableCell>

                  {/* Discount */}
                  <TableCell>
                    <div>
                      <span className="font-bold text-foreground text-sm block">
                        {discountText}
                      </span>
                      {offer.minimumBookingAmount ? (
                        <span className="text-[11px] text-muted-foreground">
                          Min. ₹{offer.minimumBookingAmount}
                        </span>
                      ) : null}
                    </div>
                  </TableCell>

                  {/* Validity */}
                  <TableCell>
                    <div className="text-xs space-y-0.5">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-[11px]">From:</span>
                        <span className="font-medium text-foreground">{formatDate(offer.startAt)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-[11px]">To:</span>
                        <span className="font-medium text-foreground">{formatDate(offer.endAt)}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Computed Status */}
                  <TableCell>
                    <StatusBadge status={offer.computedStatus} />
                  </TableCell>

                  {/* Live Active Switch */}
                  <TableCell className="text-center">
                    <div className="flex justify-center" title="Instantly activate or deactivate on website">
                      <Switch
                        checked={offer.isActive}
                        onCheckedChange={() => handleToggleActive(offer.id, offer.isActive)}
                        aria-label={`Toggle active state for ${offer.title}`}
                      />
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/offers/${offer.id}`}>
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          title="Edit offer"
                          className="h-8 w-8"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                      </Link>

                      <Button
                        size="icon-xs"
                        variant="ghost"
                        title="Duplicate offer"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        disabled={isDuplicating === offer.id}
                        onClick={() => handleDuplicate(offer.id)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        size="icon-xs"
                        variant="ghost"
                        title="Delete offer"
                        className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setDeleteId(offer.id)
                          setDeleteTitle(offer.title)
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}

      {/* Confirmation Dialog for Delete */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title={`Delete "${deleteTitle}"?`}
        description="This action will remove the offer from the system and deactivate it on the public website. You can recreate or restore it later."
        confirmText="Delete Offer"
        cancelText="Keep Offer"
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </div>
  )
}
