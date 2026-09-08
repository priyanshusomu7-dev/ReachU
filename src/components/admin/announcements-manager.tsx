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
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { EmptyState } from "@/components/admin/empty-state"
import {
  createAnnouncementAction,
  updateAnnouncementAction,
  deleteAnnouncementAction,
  toggleAnnouncementActiveAction,
} from "@/actions/announcement-actions"
import { Megaphone, Plus, Edit2, Trash2, ArrowRight, Loader2 } from "lucide-react"

interface AnnouncementRecord {
  id: string
  title: string
  message: string
  ctaText?: string | null
  ctaUrl?: string | null
  imageUrl?: string | null
  startAt?: Date | string | null
  endAt?: Date | string | null
  status: string
  isActive: boolean
  isDismissible: boolean
  createdAt: Date | string
}

interface AnnouncementsManagerProps {
  initialAnnouncements: AnnouncementRecord[]
}

export function AnnouncementsManager({ initialAnnouncements }: AnnouncementsManagerProps) {
  const router = useRouter()
  const [announcements, setAnnouncements] = React.useState(initialAnnouncements)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<AnnouncementRecord | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Form states
  const [title, setTitle] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [ctaText, setCtaText] = React.useState("")
  const [ctaUrl, setCtaUrl] = React.useState("")
  const [status, setStatus] = React.useState("ACTIVE")
  const [isActive, setIsActive] = React.useState(true)
  const [isDismissible, setIsDismissible] = React.useState(true)

  // Delete state
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const [prevInitial, setPrevInitial] = React.useState(initialAnnouncements)
  if (prevInitial !== initialAnnouncements) {
    setPrevInitial(initialAnnouncements)
    setAnnouncements(initialAnnouncements)
  }

  const openCreateModal = () => {
    setEditingItem(null)
    setTitle("")
    setMessage("")
    setCtaText("")
    setCtaUrl("")
    setStatus("ACTIVE")
    setIsActive(true)
    setIsDismissible(true)
    setError(null)
    setModalOpen(true)
  }

  const openEditModal = (item: AnnouncementRecord) => {
    setEditingItem(item)
    setTitle(item.title)
    setMessage(item.message)
    setCtaText(item.ctaText || "")
    setCtaUrl(item.ctaUrl || "")
    setStatus(item.status)
    setIsActive(item.isActive)
    setIsDismissible(item.isDismissible)
    setError(null)
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const payload = {
      title,
      message,
      ctaText,
      ctaUrl,
      imageUrl: null,
      status: status as any,
      isActive,
      isDismissible,
    }

    let res
    if (editingItem) {
      res = await updateAnnouncementAction(editingItem.id, payload)
    } else {
      res = await createAnnouncementAction(payload)
    }

    setIsSubmitting(false)
    if (res.success) {
      setModalOpen(false)
      router.refresh()
    } else {
      setError(res.error || "Failed to save announcement")
    }
  }

  const handleToggle = async (id: string, current: boolean) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !current } : a))
    )
    await toggleAnnouncementActiveAction(id, !current)
    router.refresh()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    await deleteAnnouncementAction(deleteId)
    setIsDeleting(false)
    setDeleteId(null)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Website Announcements
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Display high-priority banner notifications across the top of the ReachU public website.
          </p>
        </div>

        <Button onClick={openCreateModal} className="gap-1.5 font-semibold">
          <Plus className="h-4 w-4" />
          <span>New Announcement</span>
        </Button>
      </div>

      {announcements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No announcements published"
          description="Create banner announcements to inform visitors about new cities, service updates, or app features."
          actionLabel="Create First Announcement"
          onAction={openCreateModal}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title & Message</TableHead>
              <TableHead>CTA Action</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Live Toggle</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  <div className="max-w-md">
                    <p className="font-semibold text-foreground text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.message}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {a.ctaText && a.ctaUrl ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      <span>{a.ctaText}</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">None</span>
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={a.isActive ? a.status : "INACTIVE"} />
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={a.isActive}
                    onCheckedChange={() => handleToggle(a.id, a.isActive)}
                    aria-label="Toggle active"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => openEditModal(a)}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteId(a.id)}
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

      {/* Create / Edit Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <form onSubmit={handleSave} className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Announcement" : "Create New Announcement"}
            </DialogTitle>
            <DialogDescription>
              This banner appears at the very top of all public ReachU website pages.
            </DialogDescription>
          </DialogHeader>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Title *</label>
              <Input
                required
                placeholder="e.g. ⚡ ReachU is now expanding city-wide!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Message *</label>
              <Textarea
                required
                rows={2}
                placeholder="Short announcement copy displayed in the banner..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">CTA Label</label>
                <Input
                  placeholder="e.g. Explore Now"
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

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs font-semibold text-foreground">Active on Website</p>
                <p className="text-[11px] text-muted-foreground">Show in header banner immediately</p>
              </div>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>
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
              <span>{editingItem ? "Save Changes" : "Publish Announcement"}</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete announcement?"
        description="Are you sure you want to remove this announcement banner from ReachU?"
        confirmText="Delete"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  )
}
