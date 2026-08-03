import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { TrustedBySection } from '@/components/landing/TrustedBySection';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { LiveDemoSection } from '@/components/landing/LiveDemoSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export function LandingPage() {
  return (
    <div className="relative">
      <LandingHeader />
      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesGrid />
        <LiveDemoSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
