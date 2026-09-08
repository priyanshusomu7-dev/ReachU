import { Hero } from "@/components/sections/hero";
import { ValueStrip } from "@/components/sections/value-strip";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Vehicles } from "@/components/sections/vehicles";
import { WhyReachU } from "@/components/sections/why-reachu";
import { AppShowcase } from "@/components/sections/app-showcase";
import { DriverCta } from "@/components/sections/driver-cta";
import { Statistics } from "@/components/sections/statistics";
import { FinalCta } from "@/components/sections/final-cta";
import { OffersSection } from "@/components/sections/offers-section";
import { getActiveOffers } from "@/data/offers";

export const revalidate = 60; // Revalidate every minute, or on-demand via server actions

export default async function Home() {
  const activeOffers = await getActiveOffers(6);

  return (
    <>
      <Hero />
      <ValueStrip />
      {activeOffers.length > 0 && <OffersSection offers={activeOffers} />}
      <Services />
      <HowItWorks />
      <Vehicles />
      <WhyReachU />
      <AppShowcase />
      <DriverCta />
      <Statistics />
      <FinalCta />
    </>
  );
}
