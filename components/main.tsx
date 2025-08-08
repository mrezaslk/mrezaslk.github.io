import React, { useEffect } from "react";
import { WorkSection } from "@/components/workSection/workSection";
import { HeroSection } from "@/components/heroSection/heroSection";
import { AboutSection } from "@/components/aboutSection/aboutSection";
import { ContactSection } from "@/components/contactSection/contactSection";
import { useLoadingState } from "@/hooks/useLoadingState";

interface MainProps {
  onElementsLoaded: (elementName: string) => void;
}

export function Main({ onElementsLoaded }: MainProps) {
  useEffect(() => {
    // Mark hero section as loaded
    onElementsLoaded('heroSection');
  }, [onElementsLoaded]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      {/* <WorkSection /> */}
      <ContactSection />
    </>
  );
}
