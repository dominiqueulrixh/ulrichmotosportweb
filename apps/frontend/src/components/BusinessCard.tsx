import React from 'react';
import logoImage from 'figma:asset/LogoColored.png';
import { Phone, Mail, MapPin } from 'lucide-react';

export function BusinessCard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-yellow-400 mb-4">Visitenkarten</h2>
        <p className="text-zinc-400 mb-8">
          Die Visitenkarten nutzen Racing-Elemente und schaffen eine starke Wiedererkennbarkeit.
        </p>
      </div>

      {/* Variante 1 - Racing Style */}
      <div>
        <h3 className="text-white mb-4">Variante 1: Racing Style (empfohlen)</h3>
        <div className="bg-zinc-800 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto">
            {/* Vorderseite */}
            <div className="mb-8">
              <p className="text-zinc-500 mb-3 text-sm">Vorderseite</p>
              <div className="bg-black p-8 rounded-lg aspect-[85/55] relative overflow-hidden border-2 border-yellow-400">
                {/* Checkered pattern background */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                  <div className="grid grid-cols-4 h-full">
                    {[...Array(32)].map((_, i) => (
                      <div key={i} className={(i + Math.floor(i / 4)) % 2 === 0 ? 'bg-white' : 'bg-transparent'}></div>
                    ))}
                  </div>
                </div>
                
                {/* Diagonal stripe */}
                <div className="absolute top-0 right-0 w-2 h-full bg-yellow-400 transform skew-x-12"></div>
                
                <div className="relative h-full flex flex-col justify-between">
                  <img src={logoImage} alt="Ulrich Motosport" className="h-12 object-contain object-left" />
                  
                  <div className="text-yellow-400">
                    <p className="text-xl">Max Mustermann</p>
                    <p className="text-sm text-zinc-400">Motorradmechaniker</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rückseite */}
            <div>
              <p className="text-zinc-500 mb-3 text-sm">Rückseite</p>
              <div className="bg-white p-8 rounded-lg aspect-[85/55] relative overflow-hidden">
                {/* Yellow stripe accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black"></div>
                
                <div className="relative h-full flex flex-col justify-center space-y-3 text-black">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">+41 XX XXX XX XX</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">info@ulrich-motosport.ch</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">Werkstattstrasse XX, XXXX Ort</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-200">
                    <p className="text-sm text-zinc-600">www.ulrich-motosport.ch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variante 2 - Minimalist */}
      <div>
        <h3 className="text-white mb-4">Variante 2: Minimalistisch</h3>
        <div className="bg-zinc-800 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <p className="text-zinc-500 mb-3 text-sm">Vorderseite</p>
              <div className="bg-zinc-900 p-8 rounded-lg aspect-[85/55] relative overflow-hidden border border-zinc-700">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400 rounded-bl-full opacity-20"></div>
                
                <div className="relative h-full flex flex-col justify-between">
                  <img src={logoImage} alt="Ulrich Motosport" className="h-10 object-contain object-left" />
                  
                  <div>
                    <p className="text-white text-lg">Max Mustermann</p>
                    <p className="text-sm text-zinc-500">Motorradmechaniker</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-zinc-500 mb-3 text-sm">Rückseite</p>
              <div className="bg-zinc-900 p-8 rounded-lg aspect-[85/55] relative overflow-hidden border border-zinc-700">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>
                
                <div className="relative h-full flex flex-col justify-center space-y-2">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Phone className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">+41 XX XXX XX XX</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Mail className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">info@ulrich-motosport.ch</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <MapPin className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">Werkstattstrasse XX, XXXX Ort</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spezifikationen */}
      <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
        <h3 className="text-white mb-4">Technische Spezifikationen</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-yellow-400 mb-2">Format</p>
            <p className="text-zinc-400">85 × 55 mm (Standard)</p>
          </div>
          <div>
            <p className="text-yellow-400 mb-2">Material</p>
            <p className="text-zinc-400">350g Karton, matt oder glänzend</p>
          </div>
          <div>
            <p className="text-yellow-400 mb-2">Veredelung</p>
            <p className="text-zinc-400">Optional: Spotlack auf Gelb</p>
          </div>
        </div>
      </div>
    </div>
  );
}
