import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import type { ContactCard } from '../../types/homepage';

interface ContactProps {
  content: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    cards: ContactCard[];
    mapEmbedUrl?: string;
    mapLabel?: string;
    mapDescription?: string;
  };
}

const iconByType: Record<ContactCard['type'], React.ReactNode> = {
  phone: <Phone className="w-7 h-7 text-black" />,
  email: <Mail className="w-7 h-7 text-black" />,
  address: <MapPin className="w-7 h-7 text-black" />,
  hours: <Clock className="w-7 h-7 text-black" />
};

export function Contact({ content }: ContactProps) {
  const cards = content.cards ?? [];

  return (
    <section id="contact" className="py-24 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">

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
          <h2 className="text-4xl md:text-5xl text-black dark:text-white mb-4">
            {content.heading}
          </h2>
          {content.subheading && (
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {content.subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map(card => {
            const Icon = iconByType[card.type];
            const isLink = card.type === 'phone' || card.type === 'email';
            const linkProps =
              card.type === 'phone'
                ? { href: `tel:${card.actionValue ?? card.description ?? ''}` }
                : card.type === 'email'
                ? { href: `mailto:${card.actionValue ?? card.description ?? ''}` }
                : {};

            const InnerContent = (
              <div className="space-y-4">
                <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {Icon}
                </div>
                <div>
                  <h3 className="text-xl text-black dark:text-white mb-2">{card.title}</h3>
                  {card.description && (
                    <span className="text-lg text-zinc-600 dark:text-zinc-400 group-hover:text-yellow-400 transition-colors break-words">
                      {card.description}
                    </span>
                  )}
                  {card.lines?.length > 0 && (
                    <div className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-1">
                      {card.lines.map((line, index) => (
                        <div key={`${line}-${index}`}>{line}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );

            const classes =
              'group bg-white dark:bg-zinc-800 p-8 rounded-2xl border-l-4 border-yellow-400 hover:border-l-8 hover:shadow-xl hover:scale-105 transition-all';

            return isLink ? (
              <a
                key={`${card.title}-${card.type}`}
                {...linkProps}
                className={`${classes} cursor-pointer block`}
              >
                {InnerContent}
              </a>
            ) : (
              <div key={`${card.title}-${card.type}`} className={classes}>
                {InnerContent}
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <div className="bg-zinc-200 dark:bg-zinc-800 h-96 flex items-center justify-center relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
            {content.mapEmbedUrl ? (
              <iframe
                src={content.mapEmbedUrl}
                title="Ulrich Motosport Standort"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <div
                  className="absolute inset-0 opacity-20 grid-fade"
                  style={{ '--grid-fade-angle': 'to bottom right', '--grid-fade-end-stop': '100%' } as React.CSSProperties}
                >
                  <div className="grid grid-cols-20 h-full">
                    {[...Array(200)].map((_, i) => (
                      <div key={i} className={(i + Math.floor(i / 20)) % 2 === 0 ? 'bg-black dark:bg-white' : 'bg-transparent'}></div>
                    ))}
                  </div>
                </div>
                <div className="relative text-center">
                  <MapPin className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {content.mapLabel}
                    <br />
                    <span className="text-sm">{content.mapDescription}</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
