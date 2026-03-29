'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { isMobile } from '@/lib/animations';

interface BorderBeamCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  borderClass?: string;
  glowColor?: string;
}

export function BorderBeamCard({
  children,
  className,
  borderClass = 'bg-[var(--bg-secondary)]',
  glowColor = 'rgba(200, 164, 110, 0.12)', // Warm amber glow, matching accent
  ...props
}: BorderBeamCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile()) return;

    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl p-[1px] group',
        className
      )}
      {...props}
    >
      {/* Background container that actually reveals the glowing gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      {/* Inner card blocking the gradient except for the 1px padding of the parent */}
      <div className={cn('relative h-full w-full rounded-[15px]', borderClass)}>
        {children}
      </div>
    </div>
  );
}
