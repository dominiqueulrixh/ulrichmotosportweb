import React, { useEffect, useRef } from 'react';
import { Wrench, Settings, Sparkles, History, FileCheck, Bike, Key, Package, LucideIcon } from 'lucide-react';
import type { ServiceCard } from '../../types/homepage';

interface ServicesProps {
  content: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    items: ServiceCard[];
  };
}

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Settings,
  Sparkles,
  History,
  FileCheck,
  Bike,
  Key,
  Package
};

export function Services({ content }: ServicesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const boostRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartScrollRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const scrollAmountRef = useRef(0);
  const pausedRef = useRef(false);
  const touchStartTimeRef = useRef<number | null>(null);
  const driftRef = useRef(0);
  const horizontalLockRef = useRef(false);
  const items = content.items ?? [];
  const repeatCount = Math.max(6, Math.ceil((items.length ? 12 / items.length : 12)));
  const loopItems = Array.from({ length: repeatCount }, () => items).flat();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = scrollContainer.scrollLeft ?? 0;
    scrollAmountRef.current = scrollAmount;
    const baseSpeed = 0.5;

    const scroll = () => {
      if (pausedRef.current) return;

      const currentSpeed = baseSpeed + boostRef.current;
      scrollAmount += currentSpeed + driftRef.current;
      scrollAmountRef.current = scrollAmount;

      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;

        // Reset when reaching the end (seamless loop)
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
          scrollAmountRef.current = scrollAmount;
        }
      }

      // Smoothly decay any swipe boost so the carousel eases back to base speed.
      if (boostRef.current > 0) {
        boostRef.current = Math.max(0, boostRef.current - 0.04);
      }

      // Gradually reduce fling drift so momentum eases out.
      if (driftRef.current !== 0) {
        driftRef.current *= 0.94;
        if (Math.abs(driftRef.current) < 0.02) {
          driftRef.current = 0;
        }
      }
    };

    const intervalId = window.setInterval(scroll, 20);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [content.items]);

  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          {content.eyebrow && (
            <div className="inline-block mb-2">
              <div className="flex items-center gap-2 text-yellow-400 text-sm uppercase tracking-wider">
                <div className="w-8 h-px bg-yellow-400"></div>
                {content.eyebrow}
                <div className="w-8 h-px bg-yellow-400"></div>
              </div>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl text-black dark:text-white">
            {content.heading}
          </h2>
          {content.subheading && (
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {content.subheading}
            </p>
          )}
        </div>
      </div>

      {/* Auto-scrolling Services - full-bleed */}
      <div className="relative z-10 w-screen max-w-none left-1/2 -translate-x-1/2 transform px-0 overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden px-6 sm:px-10 touch-pan-x"
          onTouchStart={event => {
            const touch = event.touches[0];
            touchStartXRef.current = touch.clientX;
            touchStartYRef.current = touch.clientY;
            touchStartScrollRef.current = scrollRef.current?.scrollLeft ?? 0;
            touchStartTimeRef.current = event.timeStamp;
            horizontalLockRef.current = false;
            pausedRef.current = true;
            if (pauseTimeoutRef.current) {
              window.clearTimeout(pauseTimeoutRef.current);
              pauseTimeoutRef.current = null;
            }
          }}
          onTouchMove={event => {
            const touch = event.touches[0];
            if (touchStartXRef.current === null || touchStartScrollRef.current === null) return;
            const dx = touch.clientX - touchStartXRef.current;
            const dy = touch.clientY - (touchStartYRef.current ?? touch.clientY);
            if (!horizontalLockRef.current) {
              if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
                horizontalLockRef.current = true;
              } else {
                return; // let vertical scroll happen until we decide
              }
            }
            event.preventDefault();
            const targetScroll = touchStartScrollRef.current - dx;
            scrollAmountRef.current = targetScroll;
            if (scrollRef.current) {
              scrollRef.current.scrollLeft = targetScroll;
            }
          }}
          onTouchEnd={event => {
            if (touchStartXRef.current !== null && touchStartScrollRef.current !== null) {
              const endX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
              const dx = endX - touchStartXRef.current;
              const dt = Math.max(1, (event.timeStamp ?? 0) - (touchStartTimeRef.current ?? event.timeStamp - 1));
              const velocity = dx / dt; // px per ms (can be negative for backwards fling)
              if (horizontalLockRef.current) {
                driftRef.current = Math.max(-8, Math.min(8, velocity * 28));
              }
            }
            touchStartXRef.current = null;
            touchStartScrollRef.current = null;
            touchStartYRef.current = null;
            touchStartTimeRef.current = null;
            horizontalLockRef.current = false;
            pausedRef.current = false;
            pauseTimeoutRef.current = window.setTimeout(() => {
              pausedRef.current = false;
            }, 800);
          }}
          onTouchCancel={() => {
            touchStartXRef.current = null;
            touchStartScrollRef.current = null;
            touchStartYRef.current = null;
            touchStartTimeRef.current = null;
            horizontalLockRef.current = false;
            pausedRef.current = false;
          }}
          style={{ scrollBehavior: 'auto' }}
        >
          {/* Duplicate services for seamless loop - enough items to overflow on wide screens */}
          {loopItems.map((service, index) => {
            const Icon = iconMap[service.iconName ?? ''] ?? Wrench;
            return (
            <div
              key={index}
              className="flex-shrink-0 w-72 bg-white dark:bg-zinc-800 p-8 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-yellow-400 transition-all"
            >
              <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center mb-5">
                <Icon className="w-7 h-7 text-black" />
              </div>

              <h3 className="text-xl text-black dark:text-white mb-3">
                {service.title}
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
