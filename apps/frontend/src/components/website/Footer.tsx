import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoImage from 'figma:asset/LogoColored.png';
import { TabKey } from '../../types/navigation';

interface FooterProps {
  onNavigate: (tab: TabKey) => void;
  content: {
    description?: string;
    services: string[];
    legalText?: string;
    addressLines: string[];
    phone?: string;
    email?: string;
  };
}

const footerLinks: { label: string; tab: TabKey }[] = [
  { label: 'Home', tab: 'home' },
  { label: 'Services', tab: 'services' },
  { label: 'Marken', tab: 'brands' },
  { label: 'Occasionen', tab: 'occasions' },
  { label: 'Über uns', tab: 'about' },
  { label: 'Kontakt', tab: 'contact' }
];

export function Footer({ onNavigate, content }: FooterProps) {
  return (
    <footer className="bg-zinc-900 text-white relative overflow-hidden">
      {/* Yellow top border */}
      <div className="h-2 bg-yellow-400"></div>

      {/* Checkered pattern background */}
      <div
        className="absolute top-0 right-0 w-64 h-64 grid-fade"
        style={{
          opacity: 0.25,
          '--grid-fade-angle': 'to bottom left',
          '--grid-fade-start-opacity': '0.35',
          '--grid-fade-mid-opacity': '0.08',
          '--grid-fade-mid-stop': '35%',
          '--grid-fade-end-stop': '78%'
        } as React.CSSProperties}
      >
        <div className="grid grid-cols-8 grid-rows-8 h-full">
          {[...Array(64)].map((_, i) => (
            <div key={i} className={(i + Math.floor(i / 8)) % 2 === 0 ? 'bg-white' : 'bg-transparent'}></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <img src={logoImage} alt="Ulrich Motosport" className="h-12 object-contain mb-6" />
            {content.description && (
              <p className="text-zinc-400 text-sm mb-4">
                {content.description}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-400 mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map(link => (
                <li key={link.tab}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.tab)}
                    className="text-zinc-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-yellow-400 mb-4">Leistungen</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              {content.services.map(service => (
                <li key={service}>• {service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-yellow-400 mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-400 leading-relaxed">
                  {content.addressLines.map((line, index) => (
                    <React.Fragment key={`${line}-${index}`}>
                      {line}
                      {index < content.addressLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </li>
              {content.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <a href={`tel:${content.phone}`} className="text-zinc-400 hover:text-yellow-400 transition-colors">
                    {content.phone}
                  </a>
                </li>
              )}
              {content.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <a href={`mailto:${content.email}`} className="text-zinc-400 hover:text-yellow-400 transition-colors break-all">
                    {content.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-zinc-400">
              {content.legalText ?? '© Ulrich Motosport. Alle Rechte vorbehalten.'}
            </div>
            <div className="flex gap-6 text-sm">
              <button
                type="button"
                onClick={() => onNavigate('legal')}
                className="text-zinc-400 hover:text-yellow-400 transition-colors"
              >
                Impressum & Datenschutz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Racing stripe bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </footer>
  );
}
