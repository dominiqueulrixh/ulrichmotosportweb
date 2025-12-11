import React from 'react';
import type { BrandCard } from '../../types/homepage';

interface BrandsProps {
  content: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    items: BrandCard[];
  };
}

export function Brands({ content }: BrandsProps) {
  const brands = content.items ?? [];

  return (
    <section id="brands" className="py-24 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
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
          <h2 className="text-4xl md:text-5xl text-black dark:text-white mb-4">
            {content.heading}
          </h2>
          {content.subheading && (
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {content.subheading}
            </p>
          )}
        </div>

        {/* Brands Grid - improved visual hierarchy and hover states (Law of Similarity) */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {brands.map((brand, index) => (
            <a
              key={index}
              href={brand.linkUrl ?? undefined}
              target={brand.linkUrl ? '_blank' : undefined}
              rel={brand.linkUrl ? 'noopener noreferrer' : undefined}
              className="group relative bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 hover:border-yellow-400 hover:shadow-2xl hover:scale-105 transition-all duration-300 block focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
            >
              {/* Racing stripe */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

              <div className="p-10 text-center">
                <div className="relative">
                  {brand.logoUrl ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="mx-auto h-20 w-auto object-contain mb-6 grayscale group-hover:grayscale-0 transition duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <h3
                      className="text-4xl md:text-5xl text-black dark:text-white mb-4 break-words"
                      style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                    >
                      {brand.name}
                    </h3>
                  )}
                  <div className="w-16 h-1 bg-yellow-400 mx-auto mb-5"></div>
                  {brand.description && (
                    <p
                      className="text-zinc-600 dark:text-zinc-400 leading-relaxed break-words"
                      style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                    >
                      {brand.description}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-8 py-6 rounded-2xl border-l-4 border-yellow-400">
              Neben unseren Vertretungen reparieren wir alle Motorradmarken
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
