import { prisma } from "../src/lib/db"
import bcrypt from "bcryptjs"

async function main() {
  console.log("🌱 Starting database seed...")

  // 1. Seed Admin User
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "Admin@ReachU2026!"
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@reachu.co.in" },
    update: {
      passwordHash,
    },
    create: {
      email: "admin@reachu.co.in",
      name: "ReachU Super Admin",
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  })
  console.log(`✅ Admin user ready: ${admin.email} (Password: ${adminPassword})`)

  // 2. Seed Services
  const services = [
    {
      name: "Parcel Delivery",
      slug: "parcel-delivery",
      shortDescription: "Instant, safe door-to-door courier and parcel delivery across your city.",
      detailedDescription: "Book on-demand two-wheeler or three-wheeler delivery partners for quick parcel transport, confidential documents, e-commerce orders, and gifts with live tracking.",
      icon: "Package",
      displayOrder: 1,
      status: "ACTIVE",
      ctaText: "Book Parcel",
      ctaUrl: "/#services",
    },
    {
      name: "Home Shifting",
      slug: "home-shifting",
      shortDescription: "Hassle-free household and office relocation with trained verified movers.",
      detailedDescription: "End-to-end relocation service including packing assistance, heavy lifting, furniture assembly, and damage protection guarantees for homes and businesses.",
      icon: "Home",
      displayOrder: 2,
      status: "ACTIVE",
      ctaText: "Get Shifting Quote",
      ctaUrl: "/#services",
    },
    {
      name: "Rental & Local Transport",
      slug: "rental-local-transport",
      shortDescription: "Mini-trucks and pickup tempos on-demand for commercial and personal cargo.",
      detailedDescription: "Rent commercial transport vehicles by the hour or trip. Ideal for business stock movements, retail logistics, construction material, and bulk goods.",
      icon: "Truck",
      displayOrder: 3,
      status: "ACTIVE",
      ctaText: "Book Transport",
      ctaUrl: "/#services",
    },
  ]

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    })
  }
  console.log("✅ Default ReachU services seeded")

  // 3. Seed Offers
  const now = new Date()
  const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  const fortyFiveDaysLater = new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000)
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const sixtyDaysLater = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)

  const sampleOffers = [
    {
      title: "First Booking Welcome Offer",
      slug: "first-booking-welcome",
      shortDescription: "Flat ₹100 instant discount on your first vehicle or parcel delivery booking.",
      description: "Welcome to ReachU! Use promo code FIRST100 during checkout to get an immediate flat discount of ₹100 on your first booking with us.",
      promoCode: "FIRST100",
      discountType: "FIXED",
      discountValue: 100,
      minimumBookingAmount: 299,
      maximumDiscount: 100,
      usageLimit: 10000,
      perUserLimit: 1,
      startAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // started yesterday
      endAt: thirtyDaysLater,
      status: "ACTIVE",
      isActive: true,
      applicableService: "ALL",
      isNewUserOnly: true,
      displayOrder: 1,
      createdById: admin.id,
    },
    {
      title: "Mega Shifting Discount",
      slug: "mega-shifting-discount",
      shortDescription: "Get 20% OFF (up to ₹500) on all house and office relocation bookings.",
      description: "Moving into a new home or office? Apply code SHIFT20 to enjoy a 20% discount up to ₹500 on all tempo and shifting reservations.",
      promoCode: "SHIFT20",
      discountType: "PERCENTAGE",
      discountValue: 20,
      minimumBookingAmount: 999,
      maximumDiscount: 500,
      usageLimit: 5000,
      perUserLimit: 2,
      startAt: new Date(now.getTime() - 48 * 60 * 60 * 1000),
      endAt: fortyFiveDaysLater,
      status: "ACTIVE",
      isActive: true,
      applicableService: "SHIFTING",
      isNewUserOnly: false,
      displayOrder: 2,
      createdById: admin.id,
    },
    {
      title: "Festive Parcel Rush",
      slug: "festive-parcel-rush",
      shortDescription: "Scheduled Festival Deal: Flat ₹50 off on same-day courier orders.",
      description: "Upcoming festival special deal for sending sweets, gifts, and packages to family and loved ones with lightning delivery.",
      promoCode: "FEST50",
      discountType: "FIXED",
      discountValue: 50,
      minimumBookingAmount: 199,
      maximumDiscount: 50,
      usageLimit: 2000,
      perUserLimit: 3,
      startAt: sevenDaysLater, // Scheduled in the future
      endAt: sixtyDaysLater,
      status: "SCHEDULED",
      isActive: true,
      applicableService: "PARCEL",
      isNewUserOnly: false,
      displayOrder: 3,
      createdById: admin.id,
    },
  ]

  for (const offer of sampleOffers) {
    await prisma.offer.upsert({
      where: { promoCode: offer.promoCode },
      update: offer,
      create: offer,
    })
  }
  console.log("✅ Initial ReachU promotional offers seeded")

  // 4. Seed Announcements
  const announcement = {
    title: "⚡ ReachU is now expanding city-wide!",
    message: "Experience seamless smart parcel deliveries and home shifting with verified professional drivers. Use code FIRST100 for ₹100 off your first ride.",
    ctaText: "Claim Offer",
    ctaUrl: "/#services",
    status: "ACTIVE",
    isActive: true,
    isDismissible: true,
    startAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    endAt: thirtyDaysLater,
  }

  const existingAnnouncements = await prisma.announcement.count()
  if (existingAnnouncements === 0) {
    await prisma.announcement.create({ data: announcement })
    console.log("✅ Initial announcement seeded")
  }

  // 5. Seed App Links
  const appLinks = [
    {
      targetAudience: "CUSTOMER",
      appName: "ReachU - Smart Delivery App",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.reachu.customer",
      appStoreUrl: "https://apps.apple.com/app/reachu/id123456789",
      description: "Book instant parcel couriers, tempos, and home shifting trucks in seconds.",
      status: "ACTIVE",
    },
    {
      targetAudience: "DRIVER",
      appName: "ReachU Partner - Driver App",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.reachu.driver",
      appStoreUrl: "https://apps.apple.com/app/reachu-partner/id987654321",
      description: "Attach your vehicle, earn on every trip, and get instant payouts.",
      status: "ACTIVE",
    },
  ]

  for (const al of appLinks) {
    const existing = await prisma.appLink.findFirst({
      where: { targetAudience: al.targetAudience },
    })
    if (!existing) {
      await prisma.appLink.create({ data: al })
    }
  }
  console.log("✅ Official ReachU App Links seeded")

  // 6. Seed Site Settings
  const settings = [
    { key: "company_name", value: "ReachU Technologies Pvt. Ltd.", category: "GENERAL" },
    { key: "support_email", value: "support@reachu.co.in", category: "CONTACT" },
    { key: "support_phone", value: "+91 98765 43210", category: "CONTACT" },
    { key: "whatsapp_number", value: "+91 98765 43210", category: "CONTACT" },
    { key: "operating_hours", value: "24/7 Service Across All Major Hubs", category: "GENERAL" },
    { key: "social_twitter", value: "https://twitter.com/reachu_in", category: "SOCIAL" },
    { key: "social_facebook", value: "https://facebook.com/reachu.in", category: "SOCIAL" },
    { key: "social_instagram", value: "https://instagram.com/reachu.in", category: "SOCIAL" },
    { key: "social_linkedin", value: "https://linkedin.com/company/reachu", category: "SOCIAL" },
    { key: "seo_default_title", value: "ReachU | Moving Made Effortless", category: "SEO" },
    { key: "seo_default_description", value: "Smart delivery and mobility platform for parcel delivery, home shifting, and local transport.", category: "SEO" },
  ]

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, category: s.category },
      create: s,
    })
  }
  console.log("✅ Site Settings seeded")

  // 7. Seed Initial Audit Log
  await prisma.auditLog.create({
    data: {
      adminId: admin.id,
      adminEmail: admin.email,
      action: "SYSTEM_INITIALIZED",
      entityType: "System",
      entityId: "SYSTEM",
      metadata: JSON.stringify({ message: "Initial database seed completed successfully" }),
      ipAddress: "127.0.0.1",
      userAgent: "SeedScript/1.0",
    },
  })
  console.log("✅ Audit log initialized")
  console.log("🎉 Database seeding complete!")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
