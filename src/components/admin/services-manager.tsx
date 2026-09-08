"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { EmptyState } from "@/components/admin/empty-state"
import { ImageUploader } from "@/components/admin/image-uploader"
import {
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
} from "@/actions/service-actions"
import { Boxes, Plus, Edit2, Trash2, Package, Home, Truck, Loader2 } from "lucide-react"

interface ServiceRecord {
  id: string
  name: string
  slug: string
  shortDescription: string
  detailedDescription?: string | null
  imageUrl?: string | null
  icon?: string | null
  displayOrder: number
  status: string
  ctaText?: string | null
  ctaUrl?: string | null
}

export function ServicesManager({ initialServices }: { initialServices: ServiceRecord[] }) {
  const router = useRouter()
  const [services, setServices] = React.useState(initialServices)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<ServiceRecord | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Form states
  const [name, setName] = React.useState("")
  const [shortDescription, setShortDescription] = React.useState("")
  const [detailedDescription, setDetailedDescription] = React.useState("")
  const [icon, setIcon] = React.useState("Package")
  const [imageUrl, setImageUrl] = React.useState("")
  const [displayOrder, setDisplayOrder] = React.useState(1)
  const [status, setStatus] = React.useState("ACTIVE")
  const [ctaText, setCtaText] = React.useState("")
  const [ctaUrl, setCtaUrl] = React.useState("")

  // Delete state
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [deleteName, setDeleteName] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)

  const [prevInitial, setPrevInitial] = React.useState(initialServices)
  if (prevInitial !== initialServices) {
    setPrevInitial(initialServices)
    setServices(initialServices)
  }

  const openCreateModal = () => {
    setEditingItem(null)
    setName("")
    setShortDescription("")
    setDetailedDescription("")
    setIcon("Package")
    setImageUrl("")
    setDisplayOrder(services.length + 1)
    setStatus("ACTIVE")
    setCtaText("Book Service")
    setCtaUrl("/#services")
    setError(null)
    setModalOpen(true)
  }

  const openEditModal = (s: ServiceRecord) => {
    setEditingItem(s)
    setName(s.name)
    setShortDescription(s.shortDescription)
    setDetailedDescription(s.detailedDescription || "")
    setIcon(s.icon || "Package")
    setImageUrl(s.imageUrl || "")
    setDisplayOrder(s.displayOrder)
    setStatus(s.status)
    setCtaText(s.ctaText || "")
    setCtaUrl(s.ctaUrl || "")
    setError(null)
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const payload = {
      name,
      shortDescription,
      detailedDescription,
      icon,
      imageUrl,
      displayOrder,
      status: status as any,
      ctaText,
      ctaUrl,
    }

    let res
    if (editingItem) {
      res = await updateServiceAction(editingItem.id, payload)
    } else {
      res = await createServiceAction(payload)
    }

    setIsSubmitting(false)
    if (res.success) {
      setModalOpen(false)
      router.refresh()
    } else {
      setError(res.error || "Failed to save service")
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    await deleteServiceAction(deleteId)
    setIsDeleting(false)
    setDeleteId(null)
    router.refresh()
  }

  const renderIcon = (iconName?: string | null) => {
    switch (iconName) {
      case "Home":
        return <Home className="h-4 w-4" />
      case "Truck":
        return <Truck className="h-4 w-4" />
      case "Package":
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Services Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage ReachU core services, descriptions, icons, display order, and CTAs.
          </p>
        </div>

        <Button onClick={openCreateModal} className="gap-1.5 font-semibold">
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </Button>
      </div>

      {services.length === 0 ? (
        <EmptyState
          icon={Boxes}
          title="No services found"
          description="Add ReachU services like Parcel Delivery, Home Shifting, and Local Transport."
          actionLabel="Add Service"
          onAction={openCreateModal}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Service Name</TableHead>
              <TableHead>Short Description</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono font-bold text-xs text-muted-foreground">
                  #{s.displayOrder}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary/10 p-1.5 text-primary">
                      {renderIcon(s.icon)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{s.name}</p>
                      <p className="text-[11px] font-mono text-muted-foreground">slug: {s.slug}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-muted-foreground line-clamp-1 max-w-sm">
                    {s.shortDescription}
                  </p>
                </TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">
                  {s.icon || "Package"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={s.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button size="icon-xs" variant="ghost" onClick={() => openEditModal(s)}>
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setDeleteId(s.id)
                        setDeleteName(s.name)
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Service Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <form onSubmit={handleSave} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Service" : "Add ReachU Service"}</DialogTitle>
            <DialogDescription>
              Update service details displayed dynamically across the public website.
            </DialogDescription>
          </DialogHeader>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Name *</label>
                <Input
                  required
                  placeholder="e.g. Parcel Delivery"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Display Order</label>
                <Input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Icon</label>
                <Select value={icon} onChange={(e) => setIcon(e.target.value)}>
                  <option value="Package">Package (Parcel)</option>
                  <option value="Home">Home (Shifting)</option>
                  <option value="Truck">Truck (Transport)</option>
                </Select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Status</label>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Short Description *</label>
              <Input
                required
                placeholder="One line summary for service card..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Detailed Description</label>
              <Textarea
                rows={3}
                placeholder="Detailed features and description..."
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">CTA Button Label</label>
                <Input
                  placeholder="e.g. Book Now"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">CTA Link</label>
                <Input
                  placeholder="e.g. /#services"
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                />
              </div>
            </div>

            <ImageUploader
              value={imageUrl}
              onChange={setImageUrl}
              label="Service Artwork / Photo"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : null}
              <span>{editingItem ? "Save Changes" : "Create Service"}</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Delete Dialog */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title={`Delete "${deleteName}"?`}
        description="Are you sure you want to remove this service from ReachU? This will update the services list."
        confirmText="Delete"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  )
}
