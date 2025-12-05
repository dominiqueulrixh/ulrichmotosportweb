import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { ServiceCategory } from '../../types/homepage';

interface ServiceDetailsProps {
  onNavigateToContact?: () => void;
  content: {
    heading: string;
    subheading?: string;
    categories: ServiceCategory[];
  };
}

export function ServiceDetails({ onNavigateToContact, content }: ServiceDetailsProps) {
  const categories = content.categories ?? [];

  return (
    <section className="py-24 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 text-yellow-400 text-sm uppercase tracking-wider">
              <div className="w-8 h-px bg-yellow-400"></div>
              Service
              <div className="w-8 h-px bg-yellow-400"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl text-black dark:text-white mb-4">
            Wir halten Dein Bike im Schuss
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Wir helfen Dir bei der Individualisierung und technischen Änderungen an Deinem Bike und kümmern uns selbstverständlich auch um deinen Oldtimer oder Veteran.
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-24">
          {categories.map((category, index) => (
            <div
              id={category.title}
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={category.imageUrl ?? 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80'}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Yellow accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400"></div>

                  {/* Racing corner */}
                  <div
                    className="absolute top-0 right-0 w-28 h-28 opacity-30 grid-fade"
                    style={{ '--grid-fade-angle': 'to bottom left' } as React.CSSProperties}
                  >
                    <div className="grid grid-cols-4 grid-rows-4 h-full">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className={(i + Math.floor(i / 4)) % 2 === 0 ? 'bg-white' : 'bg-transparent'}></div>
                      ))}
                    </div>
                  </div>

                  {/* Diagonal stripe */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400 opacity-50"></div>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="inline-block bg-yellow-400 text-black px-4 py-1 text-sm mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <h3 className="text-3xl text-black dark:text-white mb-4">
                  {category.title}
                </h3>

                {category.description && (
                  <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                    {category.description}
                  </p>
                )}

                {/* Items list - improved spacing and readability (Law of Proximity) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items?.map((item, itemIndex) => (
                    <div key={`${item}-${itemIndex}`} className="flex items-start gap-3 group">
                      <div className="w-2 h-2 bg-yellow-400 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
