import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { TabKey } from '../../types/navigation';
import type { HeroContent, NewsBar } from '../../types/homepage';

interface HeroProps {
  onNavigate: (tab: TabKey) => void;
  content: HeroContent;
  newsBar?: NewsBar;
}

const heroGridFadeStyle: React.CSSProperties = {
  '--grid-fade-angle': 'to bottom left',
  '--grid-fade-start-opacity': '0.08',
  '--grid-fade-mid-opacity': '0.08',
  '--grid-fade-mid-stop': '15%',
  '--grid-fade-end-stop': '65%'
};

const statCardFadeStyle: React.CSSProperties = {
  '--grid-fade-angle': 'to bottom right',
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

const gridSizingStyle: React.CSSProperties & { '--cell-size'?: string } = {
  '--cell-size': 'clamp(26px, 4.5vw, 38px)',
  width: 'calc(var(--cell-size) * 14)',
  height: 'calc(var(--cell-size) * 14)'
};

export function Hero({ onNavigate, content, newsBar }: HeroProps) {
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

  // Reset to first slide if slides change in length (e.g., after data load)
  React.useEffect(() => {
    setActiveIndex(0);
  }, [slideCount]);

  React.useEffect(() => {
    if (activeIndex >= slideCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, slideCount]);

  React.useEffect(() => {
    if (slideCount <= 1) return;
    const interval = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slideCount);
    }, 10000);
    return () => window.clearInterval(interval);
  }, [slideCount]);

  const goTo = (nextIndex: number) => {
    setActiveIndex((nextIndex + slideCount) % slideCount);
  };

  const showNewsBar = Boolean(newsBar?.title && newsBar?.text);
  const newsContentHtml = React.useMemo(() => {
    const raw = newsBar?.text ?? '';
    // Basic markdown-style bold/italic + preserve line breaks while letting existing HTML pass through.
    const withBreaks = raw.replace(/\r\n|\r|\n/g, '<br />');
    return withBreaks
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*(?!\*)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>')
      .replace(/(^|[^_])_(?!_)([^_]+?)_(?!_)/g, '$1<em>$2</em>');
  }, [newsBar?.text]);
  const [activeStat, setActiveStat] = React.useState<number | null>(null);
  const [newsActive, setNewsActive] = React.useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-zinc-50 dark:bg-zinc-900 overflow-hidden pt-32 sm:pt-20 lg:pt-16 pb-20"
    >
      {/* Subtle checkered pattern - top right with gradient fade */}
      <div
        className="absolute right-0 top-0 md:top-4 lg:top-6 grid-fade pointer-events-none"
        style={heroGridFadeStyle}
      >
        <div className="grid grid-cols-14 gap-0" style={gridSizingStyle}>
          {[...Array(196)].map((_, i) => (
            <div key={i} className={(i + Math.floor(i / 14)) % 2 === 0 ? 'bg-black dark:bg-white' : 'bg-transparent'}></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content - improved hierarchy and spacing */}
          <div className="mt-12 sm:mt-0 space-y-6 lg:space-y-8 lg:-mt-14">
            {showNewsBar && (
              <a
                href={newsBar?.linkUrl || undefined}
                target={newsBar?.linkUrl ? '_blank' : undefined}
                rel={newsBar?.linkUrl ? 'noopener noreferrer' : undefined}
                className={`group relative bg-yellow-400/30 dark:bg-yellow-400/25 rounded-2xl overflow-hidden border-2 border-yellow-400 transition-all duration-300 mb-8 block ${
                  newsActive ? 'shadow-2xl scale-[1.01]' : 'hover:shadow-2xl hover:scale-[1.01]'
                }`}
                onPointerDown={() => setNewsActive(true)}
                onPointerUp={() => setNewsActive(false)}
                onPointerCancel={() => setNewsActive(false)}
                onBlur={() => setNewsActive(false)}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-yellow-400 transform origin-left transition-transform ${
                    newsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                ></div>
                <div className="p-6 md:p-7 lg:p-8 space-y-3">
                  <h3 className="text-xl md:text-2xl lg:text-3xl text-black dark:text-white font-semibold mb-3">
                    {newsBar?.title}
                  </h3>
                  <div className="w-14 h-1 bg-yellow-400"></div>
                  <div
                    className="text-zinc-700 dark:text-zinc-300 leading-relaxed prose prose-zinc dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: newsContentHtml }}
                  />
                </div>
              </a>
            )}
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
                className="bg-yellow-400 text-black px-10 py-5 text-lg text-center rounded-xl hover:bg-yellow-500 hover:scale-105 transition-all inline-flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
              >
                <span>{content.primaryCta?.label ?? 'Termin vereinbaren'}</span>
                <span className="transform group-hover:translate-x-1 transition-transform text-xl">→</span>
              </button>
              {content.secondaryCta?.label && (
                <button
                  type="button"
                  onClick={() => onNavigate((content.secondaryCta?.target as TabKey) ?? 'services')}
                  className="border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white px-10 py-5 text-lg text-center rounded-xl hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-105 transition-all"
                >
                  {content.secondaryCta.label}
                </button>
              )}
            </div>

            {/* Stats - Racing Grid Style */}
            {content.stats?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-8 lg:pt-12 w-full max-w-3xl sm:max-w-4xl">
                {content.stats.map((stat, index) => (
                  <div
                    key={`${stat.value}-${index}`}
                    className={`relative bg-black dark:bg-zinc-900 p-6 rounded-2xl overflow-hidden group transition-all border-2 border-transparent flex flex-col items-center justify-center text-center ${
                      activeStat === index
                        ? 'bg-yellow-400 dark:bg-yellow-400 border-black text-black'
                        : 'hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:border-black dark:hover:border-black'
                    }`}
                    onPointerDown={() => setActiveStat(index)}
                    onPointerUp={() => setActiveStat(null)}
                    onPointerCancel={() => setActiveStat(null)}
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
                {slides.map((src, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <ImageWithFallback
                      key={`${src}-${index}`}
                      src={src}
                      alt="Motorrad Service"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms]"
                      style={{
                        opacity: isActive ? 1 : 0,
                        visibility: isActive ? 'visible' : 'hidden',
                        transitionTimingFunction: 'ease-in-out'
                      }}
                    />
                  );
                })}

                {/* Simple yellow accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-yellow-400"></div>

                {slideCount > 1 && (
                  <>
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 via-transparent to-black/25" />
                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-5">
                      <button
                        type="button"
                        onClick={() => goTo(activeIndex - 1)}
                        className="w-12 h-12 rounded-full bg-white/90 text-black text-2xl shadow-md hover:bg-yellow-400 transition-all pointer-events-auto"
                        aria-label="Vorheriges Bild"
                      >
                        ‹
                      </button>
                      <div className="flex items-center gap-5">
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => goTo(idx)}
                            className={`rounded-full border border-white/70 transition-all pointer-events-auto ${
                              idx === activeIndex
                                ? 'w-3 h-3 bg-yellow-400 border-yellow-400 scale-125'
                                : 'w-3 h-3 bg-black scale-90'
                            }`}
                            aria-label={`Bild ${idx + 1} anzeigen`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => goTo(activeIndex + 1)}
                        className="w-12 h-12 rounded-full bg-white/90 text-black text-2xl shadow-md hover:bg-yellow-400 transition-all pointer-events-auto"
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
