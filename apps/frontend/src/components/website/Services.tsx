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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;
        
        // Reset when reaching the end (seamless loop)
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 20);

    return () => clearInterval(intervalId);
  }, [content.items]);

  return (
    <section id="services" className="py-16 bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* Technical lines decoration */}
      <div className="absolute right-0 top-1/3 w-64 h-px bg-yellow-400 opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 space-y-4">
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
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {content.subheading}
            </p>
          )}
        </div>

        {/* Auto-scrolling Services */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          {/* Duplicate services for seamless loop - improved visual hierarchy (Law of Common Region) */}
          {[...(content.items ?? []), ...(content.items ?? [])].map((service, index) => {
            const Icon = iconMap[service.iconName ?? ''] ?? Wrench;
            return (
            <div
              key={index}
              className="flex-shrink-0 w-72 bg-zinc-50 dark:bg-zinc-800 p-8 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-yellow-400 transition-all"
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
