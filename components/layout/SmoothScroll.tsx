'use client';

import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ---------------------------------------------------------------------------
// ScrollTriggerSync — must live inside ReactLenis to access Lenis context
// ---------------------------------------------------------------------------

function ScrollTriggerSync() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Prevent GSAP from compensating for frame drops — Lenis handles timing
    gsap.ticker.lagSmoothing(0);
  }, []);

  // Fire ScrollTrigger.update on every Lenis scroll tick so scroll-triggered
  // animations track Lenis's interpolated position rather than native scrollY
  useLenis(() => {
    ScrollTrigger.update();
  });

  return null;
}

// ---------------------------------------------------------------------------
// SmoothScroll — wrap the app in this to enable Lenis + ScrollTrigger sync
// NOTE: The Navbar uses document.body.style.overflow for scroll lock on mobile.
// Replace with lenis.stop() / lenis.start() once a useLenis hook is wired up
// in Navbar.tsx to access the Lenis instance from this provider.
// ---------------------------------------------------------------------------

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,           // smoothness (lower = smoother, higher = snappier)
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
