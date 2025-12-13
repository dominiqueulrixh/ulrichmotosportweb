import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logoLight from '../../assets/LogoUlrichMotosportLight.png';
import logoDark from '../../assets/LogoUlrichMotosportDark.png';
import { TabKey } from '../../types/navigation';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export function Header({
  isDarkMode,
  setIsDarkMode,
  activeTab,
  onTabChange
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { label: string; tab: TabKey; gtmLabel: string }[] = [
    { label: 'Home', tab: 'home', gtmLabel: 'nav_home' },
    { label: 'Services', tab: 'services', gtmLabel: 'nav_services' },
    { label: 'Marken', tab: 'brands', gtmLabel: 'nav_brands' },
    { label: 'Occasionen', tab: 'occasions', gtmLabel: 'nav_occasions' },
    { label: 'Über uns', tab: 'about', gtmLabel: 'nav_about' },
    { label: 'Kontakt', tab: 'contact', gtmLabel: 'nav_contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-950 backdrop-blur-sm border-b-4 border-yellow-400 transition-colors">
      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <button
            type="button"
            onClick={() => onTabChange('home')}
            className="flex items-center"
            data-gtm-nav="logo_home"
          >
            <img src={logoLight} alt="Ulrich Motosport" className="h-16 md:h-20 object-contain dark:hidden" />
            <img src={logoDark} alt="Ulrich Motosport" className="h-16 md:h-20 object-contain hidden dark:block" />
          </button>

          {/* Desktop Navigation - improved spacing and touch targets */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(link => (
              <button
                key={link.tab}
                type="button"
                onClick={() => onTabChange(link.tab)}
                data-gtm-nav={link.gtmLabel}
                className={`text-black dark:text-white hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors py-2 px-1 relative group ${
                  activeTab === link.tab ? 'text-yellow-400 dark:text-yellow-400 font-semibold' : ''
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all ${
                    activeTab === link.tab ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu - larger touch targets (Fitts's Law) */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-yellow-400 hover:text-black transition-all hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - improved touch targets and visual grouping (Law of Common Region) */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
            {navLinks.map(link => (
              <button
                key={link.tab}
                type="button"
                onClick={() => {
                  onTabChange(link.tab);
                  setIsMenuOpen(false);
                }}
                data-gtm-nav={link.gtmLabel}
                className={`w-full text-left py-4 px-3 -mx-3 rounded-lg text-black dark:text-white hover:text-yellow-400 dark:hover:text-yellow-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all ${
                  activeTab === link.tab ? 'bg-zinc-100 dark:bg-zinc-800 text-yellow-400' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
