"use client";
import { useState, useEffect } from "react";
import { Main } from "@/components/main";
import { Cursor } from "@/components/cursor";
import FullpageProvider from "@/components/fullpageProvider";
import { HeaderNavigation } from "@/components/headerNavigation";
import LootieAnimation from "@/public/lottie/Splash-effect.json";
import "./index.css";
import Lottie from "lottie-react";

export default function HomePage({}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for fonts and a minimum time
    const loadPromises = [
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 2000)), // Minimum 2 seconds
    ];

    Promise.all(loadPromises).then(() => {
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black">
        <Lottie
          animationData={LootieAnimation}
          loop={true}
          className="h-screen w-screen"
        />
      </div>
    );
  }

  return (
    <>
      <Cursor />
      <HeaderNavigation />
      <FullpageProvider>
        <Main onElementsLoaded={() => {}} />
      </FullpageProvider>
    </>
  );
}
