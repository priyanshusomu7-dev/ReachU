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

export default function Home() {
  return (
    <>
      <Hero />
      <ValueStrip />
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
