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
  const lastTouchXRef = useRef<number | null>(null);
  const lastTouchTimeRef = useRef<number | null>(null);
  const items = content.items ?? [];
  const repeatCount = Math.max(6, Math.ceil((items.length ? 12 / items.length : 12)));
  const loopItems = Array.from({ length: repeatCount }, () => items).flat();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const baseSpeed = 0.5;

    const scroll = () => {
      const currentSpeed = baseSpeed + boostRef.current;
      scrollAmount += currentSpeed;
      
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;
        
        // Reset when reaching the end (seamless loop)
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }

      // Smoothly decay any swipe boost so the carousel eases back to base speed.
      if (boostRef.current > 0) {
        boostRef.current = Math.max(0, boostRef.current - 0.04);
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
          className="flex gap-6 overflow-x-hidden px-6 sm:px-10"
          onTouchStart={event => {
            const touch = event.touches[0];
            lastTouchXRef.current = touch.clientX;
            lastTouchTimeRef.current = event.timeStamp;
          }}
          onTouchMove={event => {
            const touch = event.touches[0];
            const lastX = lastTouchXRef.current;
            const lastTime = lastTouchTimeRef.current;
            if (lastX !== null && lastTime !== null) {
              const delta = Math.abs(touch.clientX - lastX);
              const timeDelta = Math.max(1, event.timeStamp - lastTime); // ms
              const velocity = delta / timeDelta; // px per ms
              // Boost scales with swipe velocity so quick flicks accelerate noticeably on mobile.
              boostRef.current = Math.min(6, velocity * 12);
            }
            lastTouchXRef.current = touch.clientX;
            lastTouchTimeRef.current = event.timeStamp;
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
