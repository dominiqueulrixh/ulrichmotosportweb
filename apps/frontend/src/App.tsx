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

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (!homepage) return null;
    switch (activeTab) {
      case 'home':
        return <Hero content={homepage.hero} onNavigate={handleTabChange} />;
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
      <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300">
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          contactPhone={contactPhone}
          contactEmail={contactEmail}
          tagline={homepage?.navigation.tagline}
        />
        <main>
          {loading && (
            <div className="py-24 text-center text-zinc-600 dark:text-zinc-300">Lade Inhalte...</div>
          )}
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
