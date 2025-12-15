import React, { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react@8.6.0';
import AutoScroll from 'embla-carousel-auto-scroll';
import {
    Wrench,
    Settings,
    Sparkles,
    History,
    FileCheck,
    Bike,
    Key,
    Package,
    LucideIcon,
    Battery,
    Cable
} from 'lucide-react';
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
    Battery,
    Bike,
    FileCheck,
    History,
    Key,
    Package,
    Settings,
    Sparkles,
    Wrench,
    Cable,
};

export function Services({ content }: ServicesProps) {
  const items = content.items ?? [];
  const repeatCount = Math.max(6, Math.ceil(items.length ? 12 / items.length : 12));
  const loopItems = Array.from({ length: repeatCount }, () => items).flat();

  const autoScroll = useRef(
    AutoScroll({
      speed: 1,
      startDelay: 800,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
      stopOnFocusIn: false
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'x',
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps',
      watchDrag: true,
      dragFree: false
    },
    [autoScroll.current]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const autoScrollApi = autoScroll.current;

    const ensurePlaying = () => {
      if (!autoScrollApi) return;
      if (!autoScrollApi.isPlaying()) autoScrollApi.play();
    };

    const pause = () => autoScrollApi?.stop();

    emblaApi.on('pointerDown', pause);
    emblaApi.on('dragStart', pause);
    emblaApi.on('pointerUp', ensurePlaying);
    emblaApi.on('dragEnd', ensurePlaying);
    emblaApi.on('reInit', ensurePlaying);

    ensurePlaying();

    return () => {
      emblaApi.off('pointerDown', pause);
      emblaApi.off('dragStart', pause);
      emblaApi.off('pointerUp', ensurePlaying);
      emblaApi.off('dragEnd', ensurePlaying);
      emblaApi.off('reInit', ensurePlaying);
    };
  }, [emblaApi]);

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
        <div className="px-0">
          <div
            ref={emblaRef}
            className="overflow-hidden touch-pan-x overscroll-x-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-6">
              {loopItems.map((service, index) => {
                const Icon = iconMap[service.iconName ?? ''] ?? Wrench;
                return (
                  <div
                    key={`${service.title}-${index}`}
                    className="flex-shrink-0 basis-72 w-72 bg-white dark:bg-zinc-800 p-8 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-yellow-400 transition-all select-none"
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
        </div>
      </div>
    </section>
  );
}
