'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

import { isMobile, prefersReducedMotion } from '@/lib/animations';

export function SpotlightBackground() {
  const [isClient, setIsClient] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Use springs to give the spotlight a smooth, delayed trailing effect
  const springX = useSpring(0, { stiffness: 100, damping: 25, mass: 0.5 });
  const springY = useSpring(0, { stiffness: 100, damping: 25, mass: 0.5 });

  useEffect(() => {
    setIsClient(true);
    if (isMobile() || prefersReducedMotion()) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Setup the raw coordinate goals
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Send to springs
      springX.set(e.clientX);
      springY.set(e.clientY);
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [springX, springY]);

  if (!isClient) return null;

  return (
    <>
      {/* Primary warm amber glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[-1]"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(200, 164, 110, 0.04), transparent 40%)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      {/* Secondary cool indigo glow — offset for depth */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[-1]"
        style={{
          opacity: opacity * 0.5,
          background: `radial-gradient(800px circle at ${position.x + 100}px ${position.y - 80}px, rgba(99, 102, 160, 0.03), transparent 40%)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: opacity * 0.5 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </>
  );
}
