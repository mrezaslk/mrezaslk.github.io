import React, { useRef, useEffect } from "react";

import { HeroWrapper } from "@/components/heroSection/heroWrapper";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";
import { ThreeModel } from "@/components/heroSection/threeModel";
import { useLoadingState } from "@/hooks/useLoadingState";

interface HeroSectionProps {
  onLoaded?: () => void;
}

export function HeroSection({ onLoaded }: HeroSectionProps) {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Mark hero section as loaded after a short delay
    const timer = setTimeout(() => {
      onLoaded?.();
    }, 100);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <section
      ref={sectionRef}
      className="section section__1 darkGradient first relative z-0 px-paddingX text-colorLight "
    >
      <Bulge type="Light" />
      <Header color="Light" />
      <HeroWrapper />
      <ThreeModel sectionRef={sectionRef} onLoaded={onLoaded} />
    </section>
  );
}
