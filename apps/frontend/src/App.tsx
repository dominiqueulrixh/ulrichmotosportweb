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

  const contactPhone = phoneCard?.description || homepage?.navigation.phone || '';
  const contactEmail = emailCard?.description || homepage?.navigation.email || '';
  const addressLines = addressCard?.lines ?? [];

  const footerContent = {
    description: homepage?.footer.description ?? '',
    services: homepage?.footer.services ?? [],
    legalText: homepage?.footer.legalText ?? '',
    addressLines,
    phone: contactPhone,
    email: contactEmail
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
            <div className="py-24 text-center text-red-500">{error}</div>
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
