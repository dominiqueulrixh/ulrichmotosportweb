import React, { useEffect } from 'react';

interface OccasionsProps {
  isDarkMode: boolean;
}

export function Occasions({ isDarkMode }: OccasionsProps) {
  useEffect(() => {
    const scriptSrc = 'https://www.motorradhandel.ch/extern/remote_inserate.js';
    // Remove any existing instance so the feed reinitializes when theme changes.
    document.querySelectorAll(`script[src="${scriptSrc}"]`).forEach((node) => node.remove());

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script tag to avoid duplicates on quick toggles.
      script.remove();
    };
  }, [isDarkMode]);

  return (
    <section id="occasions" className="py-24 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block mb-2">
            <div className="flex items-center gap-2 text-yellow-400 text-sm uppercase tracking-wider">
              <div className="w-8 h-px bg-yellow-400"></div>
              Occasionen
              <div className="w-8 h-px bg-yellow-400"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl text-black dark:text-white">
            Geprüfte Gebrauchtmotorräder
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Alle Occasionen werden von uns technisch geprüft und sind sofort fahrbereit
          </p>
        </div>

        {/* External Motorradhandel feed */}
        <div
          key={isDarkMode ? 'occasions-dark' : 'occasions-light'}
          className="wrapper wrapperJSON"
          data-ui="1245"
          data-fzl={isDarkMode ? '1518' : '1519'}
        ></div>
      </div>
    </section>
  );
}
