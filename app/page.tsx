"use client"

import HeroSection from "@/components/HeroSection"
import ProductShowcaseSection from "@/components/ProductShowcaseSection"
import AboutSection from "@/components/AboutSection"
import RepresentativeSection from "@/components/RepresentativeSection"
import ServicesSection from "@/components/ServicesSection"
import FlowSection from "@/components/FlowSection"
import PricingSection from "@/components/PricingSection"
import FAQSection from "@/components/FAQSection"
import CTASection from "@/components/CTASection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductShowcaseSection />
      <AboutSection />
      <RepresentativeSection />
      <ServicesSection />
      <FlowSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
