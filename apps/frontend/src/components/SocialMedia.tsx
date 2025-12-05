import React from 'react';
import logoImage from 'figma:asset/LogoColored.png';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export function SocialMedia() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-yellow-400 mb-4">Social Media & Digital</h2>
        <p className="text-zinc-400 mb-8">
          Vorlagen für Social Media Posts, Stories und digitale Kommunikation.
        </p>
      </div>

      {/* Instagram Post */}
      <div>
        <h3 className="text-white mb-4">Instagram Post Vorlagen</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Template 1 - Service Announcement */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 mb-3 text-sm">Service / Angebot</p>
            <div className="aspect-square bg-black rounded-lg overflow-hidden relative">
              {/* Checkered background */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-10">
                <div className="grid grid-cols-8 grid-rows-8 h-full">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className={(i + Math.floor(i / 8)) % 2 === 0 ? 'bg-white' : 'bg-transparent'}></div>
                  ))}
                </div>
              </div>

              {/* Diagonal stripe */}
              <div className="absolute top-0 right-0 w-2 h-full bg-yellow-400 transform skew-x-12"></div>

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                <img src={logoImage} alt="Ulrich Motosport" className="h-8 object-contain object-left" />
                
                <div>
                  <h4 className="text-yellow-400 text-xl mb-2">Service-Aktion</h4>
                  <p className="text-white text-sm mb-4">20% Rabatt auf Inspektion</p>
                  <p className="text-zinc-400 text-xs">Gültig bis 31.12.2024</p>
                </div>

                <div className="text-yellow-400 text-xs">
                  www.ulrich-motosport.ch
                </div>
              </div>
            </div>
          </div>

          {/* Template 2 - Before/After */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 mb-3 text-sm">Vorher / Nachher</p>
            <div className="aspect-square bg-zinc-900 rounded-lg overflow-hidden relative">
              {/* Split design */}
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-zinc-800 flex items-center justify-center">
                  <p className="text-zinc-500 text-sm">VORHER</p>
                </div>
                <div className="w-1 bg-yellow-400"></div>
                <div className="flex-1 bg-black flex items-center justify-center">
                  <p className="text-yellow-400 text-sm">NACHHER</p>
                </div>
              </div>

              {/* Logo at bottom */}
              <div className="absolute bottom-4 left-4">
                <img src={logoImage} alt="Ulrich Motosport" className="h-6 object-contain" />
              </div>
            </div>
          </div>

          {/* Template 3 - Quote/Tip */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 mb-3 text-sm">Tipp / Zitat</p>
            <div className="aspect-square bg-yellow-400 rounded-lg overflow-hidden relative p-6">
              {/* Subtle pattern */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-10">
                <div className="grid grid-cols-12 h-full">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className={(i + Math.floor(i / 12)) % 2 === 0 ? 'bg-black' : 'bg-transparent'}></div>
                  ))}
                </div>
              </div>

              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4">"</div>
                  <p className="text-black text-lg">Profi-Tipp: Regelmässige Wartung verlängert die Lebensdauer Ihres Motorrads</p>
                </div>

                <div>
                  <img src={logoImage} alt="Ulrich Motosport" className="h-8 object-contain bg-black px-2 py-1 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Story */}
      <div>
        <h3 className="text-white mb-4">Instagram Story Vorlagen</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 mb-3 text-sm">Story Format</p>
            <div className="aspect-[9/16] max-w-xs mx-auto bg-black rounded-2xl overflow-hidden relative">
              {/* Top bar area */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
                <img src={logoImage} alt="Ulrich Motosport" className="h-6 object-contain" />
              </div>

              {/* Main content area */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-yellow-400 text-2xl mb-4">Neue Öffnungszeiten</p>
                  <div className="bg-yellow-400 text-black p-4 rounded-lg text-sm">
                    <p>Mo-Fr: 08:00 - 18:00</p>
                    <p>Sa: 09:00 - 13:00</p>
                  </div>
                </div>
              </div>

              {/* Bottom CTA area */}
              <div className="absolute bottom-8 left-4 right-4">
                <div className="bg-yellow-400 text-black py-3 rounded-full text-center text-sm">
                  Swipe Up • Mehr Infos
                </div>
              </div>

              {/* Racing stripe */}
              <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-yellow-400"></div>
            </div>
          </div>

          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 mb-3 text-sm">Story Highlight Cover</p>
            <div className="grid grid-cols-3 gap-4">
              {['Service', 'Team', 'Projekte'].map((label, i) => (
                <div key={label} className="aspect-square rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <p className="text-yellow-400 text-xs">{label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm text-zinc-400">
              <p>• Einheitliche Highlight Covers</p>
              <p>• Gelber Ring als Markenzeichen</p>
              <p>• Icons für verschiedene Kategorien</p>
            </div>
          </div>
        </div>
      </div>

      {/* Facebook Cover */}
      <div>
        <h3 className="text-white mb-4">Facebook Titelbild</h3>
        <div className="bg-zinc-800 p-6 rounded-lg">
          <div className="bg-black rounded-lg overflow-hidden relative h-64">
            {/* Checkered pattern background */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-20 h-full">
                {[...Array(100)].map((_, i) => (
                  <div key={i} className={(i + Math.floor(i / 20)) % 2 === 0 ? 'bg-white' : 'bg-transparent'}></div>
                ))}
              </div>
            </div>

            {/* Diagonal stripes */}
            <div className="absolute right-0 top-0 bottom-0 w-64">
              <div className="absolute top-0 bottom-0 w-2 bg-yellow-400 transform -skew-x-12 left-8 opacity-50"></div>
              <div className="absolute top-0 bottom-0 w-3 bg-yellow-400 transform -skew-x-12 left-16 opacity-70"></div>
              <div className="absolute top-0 bottom-0 w-4 bg-yellow-400 transform -skew-x-12 left-24"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-between px-12">
              <div>
                <img src={logoImage} alt="Ulrich Motosport" className="h-20 object-contain mb-4" />
                <p className="text-white text-xl">Ihr Motorrad-Spezialist seit 20XX</p>
                <p className="text-yellow-400">Service • Reparatur • Tuning • Teile</p>
              </div>

              <div className="text-right text-white">
                <p className="text-2xl text-yellow-400 mb-2">+41 XX XXX XX XX</p>
                <p>Werkstattstrasse XX</p>
                <p>XXXX Ort</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Signature */}
      <div>
        <h3 className="text-white mb-4">E-Mail Signatur</h3>
        <div className="bg-zinc-800 p-6 rounded-lg">
          <div className="bg-white p-6 rounded-lg max-w-2xl">
            <div className="flex gap-6 items-start">
              <img src={logoImage} alt="Ulrich Motosport" className="h-16 object-contain" />
              <div className="flex-1">
                <p className="text-black text-sm">Mit freundlichen Grüssen</p>
                <p className="text-black mt-2">Max Mustermann</p>
                <p className="text-zinc-600 text-sm">Motorradmechaniker</p>
                
                <div className="mt-4 pt-4 border-t border-zinc-200 space-y-1 text-xs text-zinc-600">
                  <p className="text-black">Ulrich Motosport</p>
                  <p>Werkstattstrasse XX | XXXX Ort</p>
                  <p>Tel: +41 XX XXX XX XX | info@ulrich-motosport.ch</p>
                  <p className="text-yellow-600">www.ulrich-motosport.ch</p>
                </div>

                <div className="flex gap-3 mt-3">
                  <Instagram className="w-4 h-4 text-zinc-400" />
                  <Facebook className="w-4 h-4 text-zinc-400" />
                  <Youtube className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Ideas */}
      <div className="bg-yellow-400 text-black p-8 rounded-lg">
        <h3 className="mb-4">Content-Ideen für Social Media</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="mb-2">📸 Regelmässige Posts</p>
            <ul className="space-y-1">
              <li>• Aktuelle Projekte & Umbauten</li>
              <li>• Vorher/Nachher Vergleiche</li>
              <li>• Team bei der Arbeit</li>
              <li>• Kundenmotorräder (mit Erlaubnis)</li>
              <li>• Wartungstipps & Tricks</li>
            </ul>
          </div>
          <div>
            <p className="mb-2">🎯 Story-Content</p>
            <ul className="space-y-1">
              <li>• Behind the Scenes</li>
              <li>• Werkstatt-Alltag</li>
              <li>• Schnelle Tipps</li>
              <li>• Neuigkeiten & Updates</li>
              <li>• Umfragen & Interaktionen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
