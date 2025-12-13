import React, { useState, useEffect } from 'react';
import { Header } from './components/website/Header';
import { Hero } from './components/website/Hero';
import { Services } from './components/website/Services';
import { Brands } from './components/website/Brands';
import { ServiceDetails } from './components/website/ServiceDetails';
import { Occasions } from './components/website/Occasions';
import { Team } from './components/website/Team';
import { Contact } from './components/website/Contact';
import { Footer } from './components/website/Footer';
import { Legal } from './components/website/Legal';
import { TabKey } from './types/navigation';
import { fetchHomepageContent } from './lib/api';
import type { HomepageContent } from './types/homepage';
import { LoadingOverlay } from './components/website/LoadingOverlay';
import FaviconBlack from './assets/FaviconUlrichMotosportBlack.png';

const validTabs: TabKey[] = ['home', 'services', 'brands', 'occasions', 'about', 'contact', 'legal'];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Preserve theme for the session; default to dark if not set.
    if (typeof window === 'undefined') return true;
    const stored = sessionStorage.getItem('isDarkMode');
    return stored ? stored === 'true' : true;
  });
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore last visited tab for the current session (falls back to home if invalid).
  useEffect(() => {
    const stored = sessionStorage.getItem('activeTab');
    if (stored && validTabs.includes(stored as TabKey)) {
      setActiveTab(stored as TabKey);
    }
  }, []);

  useEffect(() => {
    fetchHomepageContent()
      .then(data => setHomepage(data))
      .catch(() => setError('Inhalte konnten nicht geladen werden.'))
      .finally(() => setLoading(false));
  }, []);

  const phoneCard = homepage?.contact.cards.find(card => card.type === 'phone');
  const emailCard = homepage?.contact.cards.find(card => card.type === 'email');
  const addressCard = homepage?.contact.cards.find(card => card.type === 'address');
  const hoursCard = homepage?.contact.cards.find(card => card.type === 'hours');

  const contactPhone = phoneCard?.description || homepage?.navigation.phone || '';
  const contactEmail = emailCard?.description || homepage?.navigation.email || '';
  const contactHours = hoursCard?.lines ?? (hoursCard?.description ? [hoursCard.description] : []);
  const addressLines = addressCard?.lines ?? [];

  const footerContent = {
    description: homepage?.footer.description ?? '',
    services: homepage?.footer.services ?? [],
    legalText: homepage?.footer.legalText ?? '',
    addressLines,
    phone: contactPhone,
    email: contactEmail,
    hours: contactHours
  };

  const handleTabChange = (tab: TabKey) => {
    if (!validTabs.includes(tab)) return;
    sessionStorage.setItem('activeTab', tab);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persist theme choice for the duration of the session.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('isDarkMode', String(isDarkMode));
  }, [isDarkMode]);

  const renderContent = () => {
    if (!homepage) return null;
    switch (activeTab) {
      case 'home':
        return <Hero content={homepage.hero} newsBar={homepage.newsBar} onNavigate={handleTabChange} />;
      case 'services':
        return (
          <>
            <Services content={homepage.services} />
            <ServiceDetails
              content={homepage.serviceDetails}
              onNavigateToContact={() => handleTabChange('contact')}
            />
          </>
        );
      case 'brands':
        return <Brands content={homepage.brands} />;
      case 'occasions':
        return <Occasions isDarkMode={isDarkMode} />;
      case 'about':
        return <Team content={homepage.team} />;
      case 'contact':
        return <Contact content={homepage.contact} />;
      case 'legal':
        return <Legal isDarkMode={isDarkMode} onNavigateToContact={() => handleTabChange('contact')} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // Scroll to top whenever the main tab/section changes.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {loading && <LoadingOverlay />}
        <main className={`transition-all duration-300 ${loading ? 'opacity-0 blur-sm pointer-events-none select-none' : 'opacity-100'}`}>
          {error && (
            <div className="py-24 flex justify-center">
                  <div className="relative max-w-2xl w-full bg-white dark:bg-zinc-900 border-2 border-yellow-400 rounded-2xl p-8 shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400 animate-pulse"></div>
                    <div className="flex flex-col items-center gap-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-3xl text-black shadow-lg">
                        <img
                          src={FaviconBlack}
                          alt="Ulrich Motosport Logo"
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl text-black dark:text-white font-semibold">
                          Unser Motor ist kurz abgesoffen…
                        </h2>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300">
                      Wir schrauben schon dran! Versuch es gleich nochmal oder lade die Seite neu.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg shadow hover:shadow-lg hover:-translate-y-0.5 transition-transform"
                  >
                    Neu laden
                  </button>
                </div>
              </div>
            </div>
          )}
          {!loading && !error && renderContent()}
        </main>
        {homepage && (
          <Footer
            onNavigate={handleTabChange}
            content={footerContent}
          />
        )}
      </div>
    </div>
  );
}
