"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { offerFormSchema, OfferFormValues } from "@/lib/validations/offer"
import { createOfferAction, updateOfferAction } from "@/actions/offer-actions"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/admin/image-uploader"
import { OfferPreview } from "@/components/admin/offer-preview"
import { Loader2, ArrowLeft, Check, Sparkles, AlertCircle } from "lucide-react"
import Link from "next/link"

interface OfferFormProps {
  initialData?: any
  isEditing?: boolean
}

export function OfferForm({ initialData, isEditing = false }: OfferFormProps) {
  const router = useRouter()
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Format dates for datetime-local inputs
  const formatDatetimeLocal = (date?: Date | string | null) => {
    if (!date) return ""
    const d = new Date(date)
    const pad = (n: number) => n.toString().padStart(2, "0")
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  }

  const defaultValues: Partial<OfferFormValues> = {
    title: initialData?.title || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    promoCode: initialData?.promoCode || "",
    discountType: (initialData?.discountType as "FIXED" | "PERCENTAGE") || "FIXED",
    discountValue: initialData?.discountValue ?? 100,
    minimumBookingAmount: initialData?.minimumBookingAmount ?? null,
    maximumDiscount: initialData?.maximumDiscount ?? null,
    usageLimit: initialData?.usageLimit ?? null,
    perUserLimit: initialData?.perUserLimit ?? 1,
    startAt: initialData?.startAt ? formatDatetimeLocal(initialData.startAt) : formatDatetimeLocal(new Date()),
    endAt: initialData?.endAt ? formatDatetimeLocal(initialData.endAt) : formatDatetimeLocal(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
    status: (initialData?.status as any) || "ACTIVE",
    isActive: initialData?.isActive ?? true,
    imageUrl: initialData?.imageUrl || "",
    applicableService: initialData?.applicableService || "ALL",
    isNewUserOnly: initialData?.isNewUserOnly ?? false,
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(offerFormSchema) as any,
    defaultValues: defaultValues as any,
  })

  // Watch fields for real-time live preview
  const watchedValues = watch()

  const onSubmit = async (data: any) => {
    setServerError(null)
    setIsSubmitting(true)

    try {
      let res
      if (isEditing && initialData?.id) {
        res = await updateOfferAction(initialData.id, data)
      } else {
        res = await createOfferAction(data)
      }

      if (res.success) {
        router.push("/admin/offers")
        router.refresh()
      } else {
        setServerError(res.error || "Failed to save offer")
      }
    } catch (err: any) {
      setServerError(err.message || "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFutureStart = watchedValues.startAt && new Date(watchedValues.startAt) > new Date()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {serverError && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-6">
          {/* Basic Details Card */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider border-b border-border/60 pb-3">
              1. Basic Information
            </h3>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Offer Title <span className="text-primary">*</span>
              </label>
              <Input
                placeholder="e.g. First Ride Welcome Discount"
                {...register("title")}
              />
              {errors.title?.message && (
                <p className="text-xs text-destructive mt-1">{String(errors.title.message)}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Promo Code <span className="text-primary">*</span>
                </label>
                <Input
                  placeholder="e.g. FIRST100"
                  className="font-mono uppercase font-bold"
                  {...register("promoCode", {
                    onChange: (e) => {
                      e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, "")
                    },
                  })}
                />
                {errors.promoCode?.message && (
                  <p className="text-xs text-destructive mt-1">{String(errors.promoCode.message)}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Applicable Service
                </label>
                <Select {...register("applicableService")}>
                  <option value="ALL">All Services</option>
                  <option value="PARCEL">Parcel Delivery</option>
                  <option value="SHIFTING">Home Shifting</option>
                  <option value="TRANSPORT">Rental & Local Transport</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Short Description <span className="text-primary">*</span>
              </label>
              <Input
                placeholder="e.g. Flat ₹100 instant discount on your first booking."
                {...register("shortDescription")}
              />
              {errors.shortDescription?.message && (
                <p className="text-xs text-destructive mt-1">{String(errors.shortDescription.message)}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Detailed Terms & Conditions (Optional)
              </label>
              <Textarea
                placeholder="Provide specific guidelines, exclusions, or rules for this promotion..."
                rows={3}
                {...register("description")}
              />
            </div>
          </div>

          {/* Discount & Constraints Card */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider border-b border-border/60 pb-3">
              2. Discount & Constraints
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Discount Type
                </label>
                <Select {...register("discountType")}>
                  <option value="FIXED">Fixed Amount (₹)</option>
                  <option value="PERCENTAGE">Percentage (%)</option>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Discount Value <span className="text-primary">*</span>
                </label>
                <Input
                  type="number"
                  step="any"
                  placeholder={watchedValues.discountType === "PERCENTAGE" ? "20" : "100"}
                  {...register("discountValue")}
                />
                {errors.discountValue?.message && (
                  <p className="text-xs text-destructive mt-1">{String(errors.discountValue.message)}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Minimum Booking Amount (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Optional, e.g. 299"
                  {...register("minimumBookingAmount")}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Maximum Discount Cap (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Optional, e.g. 500"
                  {...register("maximumDiscount")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Total Usage Limit
                </label>
                <Input
                  type="number"
                  placeholder="Optional, e.g. 1000"
                  {...register("usageLimit")}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Per-User Usage Limit
                </label>
                <Input
                  type="number"
                  placeholder="Default: 1"
                  {...register("perUserLimit")}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs font-semibold text-foreground">New Users Only</p>
                <p className="text-[11px] text-muted-foreground">
                  Restrict this promo code to first-time ReachU bookings
                </p>
              </div>
              <Switch
                checked={watchedValues.isNewUserOnly}
                onCheckedChange={(checked) => setValue("isNewUserOnly", checked)}
              />
            </div>
          </div>

          {/* Validity & Schedule Card */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider border-b border-border/60 pb-3">
              3. Validity & Scheduling
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Start Date & Time <span className="text-primary">*</span>
                </label>
                <Input type="datetime-local" {...register("startAt")} />
                {errors.startAt?.message && (
                  <p className="text-xs text-destructive mt-1">{String(errors.startAt.message)}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  End Date & Time <span className="text-primary">*</span>
                </label>
                <Input type="datetime-local" {...register("endAt")} />
                {errors.endAt?.message && (
                  <p className="text-xs text-destructive mt-1">{String(errors.endAt.message)}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <div>
                <p className="text-xs font-semibold text-foreground">Active Status</p>
                <p className="text-[11px] text-muted-foreground">
                  When deactivated, the offer is immediately hidden from the public website
                </p>
              </div>
              <Switch
                checked={watchedValues.isActive}
                onCheckedChange={(checked) => setValue("isActive", checked)}
              />
            </div>
          </div>

          {/* Media Card */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider border-b border-border/60 pb-3">
              4. Media & Banner
            </h3>

            <ImageUploader
              value={watchedValues.imageUrl || ""}
              onChange={(url) => setValue("imageUrl", url)}
              label="Offer Promotional Banner (Optional)"
              helperText="Recommended ratio 16:9 or 2:1 for best card display"
            />
          </div>
        </div>

        {/* Right Column: Sticky Live Preview & Action Buttons */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <OfferPreview
            title={watchedValues.title}
            shortDescription={watchedValues.shortDescription}
            promoCode={watchedValues.promoCode}
            discountType={watchedValues.discountType}
            discountValue={watchedValues.discountValue}
            minimumBookingAmount={watchedValues.minimumBookingAmount}
            startAt={watchedValues.startAt}
            endAt={watchedValues.endAt}
            imageUrl={watchedValues.imageUrl}
            applicableService={watchedValues.applicableService}
          />

          {/* Action Buttons Box */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Publication Controls
            </h4>

            <div className="flex flex-col gap-2.5">
              <Button
                type="button"
                className="w-full h-10 font-semibold"
                disabled={isSubmitting}
                onClick={() => {
                  setValue("status", isFutureStart ? "SCHEDULED" : "ACTIVE")
                  setValue("isActive", true)
                  handleSubmit(onSubmit)()
                }}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-1.5" />
                )}
                {isEditing
                  ? "Update & Publish Offer"
                  : isFutureStart
                  ? "Schedule Offer"
                  : "Publish Offer Now"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-10"
                disabled={isSubmitting}
                onClick={() => {
                  setValue("status", "DRAFT")
                  handleSubmit(onSubmit)()
                }}
              >
                Save as Draft
              </Button>

              <Link href="/admin/offers" className="w-full">
                <Button type="button" variant="ghost" className="w-full text-xs text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                  Discard & Return to Offers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
