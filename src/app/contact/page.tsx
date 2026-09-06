"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  Headphones,
} from "lucide-react"

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24h.02zm-3.5 3.6c-.2 0-.48.07-.73.35-.25.27-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.85.14.19 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.53-.32-.28-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.47z" />
    </svg>
  )
}

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "flat no 430 M G colony congress road near by hotel Karim's kitchen",
    href: null,
    badge: "Head Office",
  },
  {
    icon: Phone,
    label: "Contact Numbers",
    value: "8586876539 / 9814037044",
    secondaryValue: "Call for any query or delivery support",
    href: "tel:8586876539",
    badge: "Direct Helpline",
  },
  {
    icon: WhatsAppIcon,
    isCustomIcon: true,
    label: "WhatsApp Support",
    value: "8586876539",
    secondaryValue: "Instant chat assistance",
    href: "https://wa.me/918586876539",
    badge: "Fast Response",
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200",
  },
  {
    icon: Mail,
    label: "Support Email",
    value: "support@reachu.co.in",
    secondaryValue: "We typically reply within 24 hours",
    href: "mailto:support@reachu.co.in",
    badge: "Official Support",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "12 am to 11 pm",
    secondaryValue: "Operational 7 days a week",
    href: null,
    badge: "Active Hours",
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.reachu.co.in",
    secondaryValue: "Official logistics platform",
    href: "https://www.reachu.co.in",
    badge: "Web Portal",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill out all required fields.")
      return
    }

    setIsSubmitting(true)

    // Simulate reliable form submission with quick feedback
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setIsSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch {
      setErrorMessage("Unable to send your message. Please try again later or reach out via WhatsApp.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-b from-muted/30 via-background to-background py-8 sm:py-12 lg:py-16">
      <Container className="px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">Contact</span>
        </nav>

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            <Headphones className="h-3.5 w-3.5" />
            Get In Touch
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Contact For Any Query
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Whether you have a question about services, pricing, or need assistance with deliveries, our team is here to help.
          </p>
        </div>

        {/* Two-Column Grid: Contact Form + Contact Info */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-sm transition-all">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Send us a Message
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Fill in your details below and our customer support team will get back to you promptly.
                </p>
              </div>

              {isSuccess && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 p-4 text-sm text-emerald-900 dark:text-emerald-200 flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Your message has been sent successfully!</h3>
                    <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                      Thank you for contacting ReachU. Our representative will contact you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="mt-3 inline-flex items-center text-xs font-bold underline underline-offset-2 hover:opacity-80"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Notice</h3>
                    <p className="mt-1 text-xs">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-fullName" className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-fullName"
                      name="fullName"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Your Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      placeholder="e.g. 9814037044"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      placeholder="e.g. Parcel Delivery Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Leave your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y min-h-[120px]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-primary px-6 font-bold text-sm text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="border-b border-border pb-4 mb-6">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Contact Information
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Official contact details of Reach U Delivery Express LLP
                </p>
              </div>

              <div className="space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 transition-transform group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-medium bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="mt-1 block text-sm font-semibold text-foreground hover:text-primary transition-colors break-words"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm font-semibold text-foreground break-words leading-snug">
                            {item.value}
                          </p>
                        )}
                        {item.secondaryValue && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.secondaryValue}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quick Action Buttons */}
              <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-3">
                <a
                  href="tel:8586876539"
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-border bg-background px-4 text-xs font-bold text-foreground transition-all hover:bg-muted hover:border-primary/40 text-center"
                >
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/918586876539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 px-4 text-xs font-bold transition-all hover:bg-emerald-100 text-center"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Helpline Banner */}
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-foreground">Need Urgent Logistics Assistance?</h4>
                <p className="text-xs text-muted-foreground mt-1">Our support agents are available from 12 AM to 11 PM.</p>
              </div>
              <a
                href="tel:9814037044"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary/90 transition-colors"
              >
                <span>9814037044</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}
