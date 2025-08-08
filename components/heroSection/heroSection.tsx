import React, { useRef } from "react";

import { HeroWrapper } from "@/components/heroSection/heroWrapper";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";
import { ThreeModel } from "@/components/heroSection/threeModel";

export function HeroSection({}) {
  const sectionRef = useRef(null);
  return (
    <section
      ref={sectionRef}
      className="section section__1 darkGradient first relative z-0 px-paddingX text-colorLight "
    >
      <Bulge type="Light" />
      <Header color="Light" />
      {/* <div className="h-full w-full px-12"> */}
      <HeroWrapper />
      {/* </div> */}
      {/* <div className="relative -z-20 h-full w-full"> */}
        <ThreeModel sectionRef={sectionRef} />
      {/* </div> */}
    </section>
  );
}
