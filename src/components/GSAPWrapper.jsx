"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugins globally once
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function GSAPWrapper({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure plugins are registered on mount
    if (!gsap.plugins.useGSAP) {
      gsap.registerPlugin(useGSAP);
    }
    if (!gsap.plugins.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // Refresh ScrollTrigger when pathname changes (page navigation)
  useEffect(() => {
    // Small delay to ensure DOM is ready after navigation
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return <>{children}</>;
}
