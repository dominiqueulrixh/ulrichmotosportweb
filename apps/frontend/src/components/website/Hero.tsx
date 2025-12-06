import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { TabKey } from '../../types/navigation';
import type { HeroContent } from '../../types/homepage';

interface HeroProps {
  onNavigate: (tab: TabKey) => void;
  content: HeroContent;
}

const heroGridFadeStyle: React.CSSProperties = {
  '--grid-fade-angle': 'to bottom left',
  '--grid-fade-start-opacity': '0.08',
  '--grid-fade-mid-opacity': '0.08',
  '--grid-fade-mid-stop': '15%',
  '--grid-fade-end-stop': '65%'
};

const statCardFadeStyle: React.CSSProperties = {
  '--grid-fade-angle': 'to bottom left',
  '--grid-fade-mid-stop': '60%',
  '--grid-fade-end-stop': '100%'
};

const statCardPatternStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(45deg, var(--stat-grid-color) 25%, transparent 25%, transparent 75%, var(--stat-grid-color) 75%, var(--stat-grid-color)),
    linear-gradient(45deg, var(--stat-grid-color) 25%, transparent 25%, transparent 75%, var(--stat-grid-color) 75%, var(--stat-grid-color))
  `,
  backgroundSize: '40px 40px',
  backgroundPosition: '0 0, 20px 20px',
  '--stat-grid-color': 'rgba(255, 255, 255, 0.9)'
};

const cornerGridFadeStyle: React.CSSProperties = {
  '--grid-fade-angle': 'to bottom left',
  '--grid-fade-mid-stop': '45%',
  '--grid-fade-end-stop': '100%'
};

export function Hero({ onNavigate, content }: HeroProps) {
  const rawTitle = content.title ?? '';
  const splitTitle = rawTitle.split('\n').filter(Boolean);
  const effectiveLines = splitTitle.length > 0 ? splitTitle : [rawTitle];
  const mainLines = effectiveLines.slice(0, -1);
  const lastLine = effectiveLines.at(-1) ?? '';
  const fallbackImage = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80';
  const slides = (content.images && content.images.length > 0
    ? content.images
    : content.imageUrl
      ? [content.imageUrl]
      : [fallbackImage]
  ).filter(Boolean);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const slideCount = slides.length;

  React.useEffect(() => {
    if (activeIndex >= slideCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, slideCount]);

  React.useEffect(() => {
    if (slideCount <= 1) return;
    const interval = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slideCount);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [slideCount]);

  const goTo = (nextIndex: number) => {
    setActiveIndex((nextIndex + slideCount) % slideCount);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-start bg-white dark:bg-zinc-900 overflow-hidden pt-12 pb-8">
      {/* Subtle checkered pattern - top right with gradient fade */}
      <div 
        className="absolute top-0 right-0 w-[55vw] h-[60vh] grid-fade"
        style={heroGridFadeStyle}
      >
        <div className="grid grid-cols-14 h-full gap-0">
          {[...Array(196)].map((_, i) => (
            <div key={i} className={(i + Math.floor(i / 14)) % 2 === 0 ? 'bg-black dark:bg-white aspect-square' : 'bg-transparent aspect-square'}></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content - improved hierarchy and spacing */}
          <div className="space-y-6 lg:space-y-8 lg:-mt-14">
            {/* Main heading - clear hierarchy */}
            <div className="space-y-4">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl text-black dark:text-white leading-[1.1] break-words"
                style={{ wordBreak: 'break-word', hyphens: 'auto' }}
              >
                {mainLines.map((line, index) => (
                  <React.Fragment key={`${line}-${index}`}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
                {lastLine}{' '}
                {content.highlight && <span className="text-yellow-400">{content.highlight}</span>}
              </h1>
              
              <div className="w-20 h-1 bg-yellow-400"></div>
            </div>

            {/* CTAs - grouped together with clear hierarchy (Fitts's Law + Von Restorff Effect) */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <button
                type="button"
                onClick={() => onNavigate((content.primaryCta?.target as TabKey) ?? 'contact')}
                className="bg-yellow-400 text-black px-10 py-5 text-lg text-center hover:bg-yellow-500 hover:scale-105 transition-all inline-flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
              >
                <span>{content.primaryCta?.label ?? 'Termin vereinbaren'}</span>
                <span className="transform group-hover:translate-x-1 transition-transform text-xl">→</span>
              </button>
              {content.secondaryCta?.label && (
                <button
                  type="button"
                  onClick={() => onNavigate((content.secondaryCta?.target as TabKey) ?? 'services')}
                  className="border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white px-10 py-5 text-lg text-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-105 transition-all"
                >
                  {content.secondaryCta.label}
                </button>
              )}
            </div>

            {/* Stats - Racing Grid Style */}
            {content.stats?.length > 0 && (
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 lg:pt-12 w-full max-w-3xl sm:max-w-4xl">
                {content.stats.map((stat, index) => (
                  <div
                    key={`${stat.value}-${index}`}
                    className="relative bg-black dark:bg-zinc-900 p-6 rounded-2xl overflow-hidden group hover:bg-yellow-400 dark:hover:bg-yellow-400 transition-all border-2 border-transparent hover:border-black dark:hover:border-black flex flex-col items-center justify-center text-center"
                  >
                    <div
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity grid-fade group-hover:[--stat-grid-color:rgba(0,0,0,0.85)]"
                      style={{ ...statCardFadeStyle, ...statCardPatternStyle }}
                    ></div>
                    <div className="absolute top-0 right-0 w-2 h-full bg-yellow-400 rounded-tr-2xl group-hover:bg-black"></div>
                    <div className="relative space-y-2 px-2 sm:px-4">
                      <div
                        className="text-3xl lg:text-4xl text-yellow-400 group-hover:text-black dark:group-hover:text-black transition-colors leading-none break-words"
                        style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-xs text-white group-hover:text-black dark:group-hover:text-black leading-tight uppercase tracking-wider transition-colors whitespace-pre-line break-words"
                        style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image - clean and focused */}
          <div className="relative">
            <div className="relative aspect-square max-w-sm mx-auto lg:max-w-[26rem] mb-16 lg:mb-0">
              {/* Main image container with rounded corners */}
              <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-[2rem] overflow-hidden">
                {slides.map((src, index) => (
                  <ImageWithFallback
                    key={`${src}-${index}`}
                    src={src}
                    alt="Motorrad Service"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}

                {/* Simple yellow accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-yellow-400"></div>
                
                {/* Minimal checkered corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-30 rounded-tr-[2rem] overflow-hidden grid-fade" style={cornerGridFadeStyle}>
                  <div className="grid grid-cols-5 grid-rows-5 h-full">
                    {[...Array(25)].map((_, i) => (
                      <div key={i} className={(i + Math.floor(i / 5)) % 2 === 0 ? 'bg-white' : 'bg-transparent'}></div>
                    ))}
                  </div>
                </div>

                {slideCount > 1 && (
                  <>
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 via-transparent to-black/25" />
                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => goTo(activeIndex - 1)}
                        className="w-10 h-10 rounded-full bg-white/90 text-black shadow-md hover:bg-yellow-400 transition-colors pointer-events-auto"
                        aria-label="Vorheriges Bild"
                      >
                        ‹
                      </button>
                      <div className="flex items-center gap-2">
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => goTo(idx)}
                            className={`w-2.5 h-2.5 rounded-full border border-white/60 transition-all pointer-events-auto ${idx === activeIndex ? 'bg-yellow-400 border-yellow-400 scale-110' : 'bg-white/70'}`}
                            aria-label={`Bild ${idx + 1} anzeigen`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => goTo(activeIndex + 1)}
                        className="w-10 h-10 rounded-full bg-white/90 text-black shadow-md hover:bg-yellow-400 transition-colors pointer-events-auto"
                        aria-label="Nächstes Bild"
                      >
                        ›
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Diagonal stripe element - subtle */}
              <div className="absolute -right-4 top-1/4 w-1 h-1/2 bg-yellow-400 hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
