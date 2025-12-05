import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Phone, Mail } from 'lucide-react';
import logoImage from 'figma:asset/LogoColored.png';
import { TabKey } from '../../types/navigation';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  contactPhone?: string;
  contactEmail?: string;
  tagline?: string;
}

export function Header({
  isDarkMode,
  setIsDarkMode,
  activeTab,
  onTabChange,
  contactPhone,
  contactEmail,
  tagline
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { label: string; tab: TabKey }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Services', tab: 'services' },
    { label: 'Marken', tab: 'brands' },
    { label: 'Occasionen', tab: 'occasions' },
    { label: 'Über uns', tab: 'about' },
    { label: 'Kontakt', tab: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-950 backdrop-blur-sm border-b-4 border-yellow-400 transition-colors">
      {/* Top bar with contact - improved touch targets (Fitts's Law) */}
      <div className="bg-black dark:bg-zinc-950 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4 md:gap-6">
            {contactPhone && (
              <a
                href={`tel:${contactPhone}`}
                className="flex items-center gap-2 hover:text-yellow-400 transition-colors py-1 px-2 -mx-2 rounded hover:bg-zinc-900"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">{contactPhone}</span>
              </a>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2 hover:text-yellow-400 transition-colors py-1 px-2 -mx-2 rounded hover:bg-zinc-900"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">{contactEmail}</span>
              </a>
            )}
            {!contactPhone && !contactEmail && (
              <>
                <a href="tel:+41552201570" className="flex items-center gap-2 hover:text-yellow-400 transition-colors py-1 px-2 -mx-2 rounded hover:bg-zinc-900">
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">055 220 15 70</span>
                </a>
                <a href="mailto:info@ulrich-motosport.ch" className="flex items-center gap-2 hover:text-yellow-400 transition-colors py-1 px-2 -mx-2 rounded hover:bg-zinc-900">
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">info@ulrich-motosport.ch</span>
                </a>
              </>
            )}
          </div>
          <div className="text-yellow-400 text-xs md:text-sm uppercase tracking-wider">
            {tagline || '20+ Jahre Erfahrung'}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img src={logoImage} alt="Ulrich Motosport" className="h-12 md:h-16 object-contain" />
          </a>

          {/* Desktop Navigation - improved spacing and touch targets */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(link => (
              <button
                key={link.tab}
                type="button"
                onClick={() => onTabChange(link.tab)}
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
