import React from 'react';
import logoImage from 'figma:asset/LogoColored.png';

export function VehicleWrap() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-yellow-400 mb-4">Fahrzeugbeschriftung</h2>
        <p className="text-zinc-400 mb-8">
          Mobile Werbung durch professionelle Fahrzeugbeschriftung für Servicefahrzeug und Transporter.
        </p>
      </div>

      {/* Transporter Vollbeschriftung */}
      <div>
        <h3 className="text-white mb-4">Variante 1: Transporter Vollbeschriftung</h3>
        <div className="bg-zinc-800 p-8 rounded-lg">
          <div className="bg-zinc-900 p-8 rounded-lg relative overflow-hidden">
            {/* Simplified side view of van */}
            <div className="relative">
              {/* Van body */}
              <div className="bg-black rounded-lg p-8 relative h-64 border-4 border-yellow-400">
                {/* Checkered pattern on top */}
                <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden opacity-30">
                  <div className="grid grid-cols-16 h-full">
                    {[...Array(48)].map((_, i) => (
                      <div key={i} className={(i + Math.floor(i / 8)) % 2 === 0 ? 'bg-white' : 'bg-transparent'}></div>
                    ))}
                  </div>
                </div>

                {/* Logo */}
                <div className="absolute top-8 left-8">
                  <img src={logoImage} alt="Ulrich Motosport" className="h-16 object-contain" />
                </div>

                {/* Diagonal stripes */}
                <div className="absolute right-0 top-0 bottom-0 w-32">
                  <div className="absolute top-0 bottom-0 w-2 bg-yellow-400 transform -skew-x-12 left-4"></div>
                  <div className="absolute top-0 bottom-0 w-2 bg-yellow-400 transform -skew-x-12 left-12"></div>
                  <div className="absolute top-0 bottom-0 w-3 bg-yellow-400 transform -skew-x-12 left-20"></div>
                </div>

                {/* Contact info */}
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-2xl text-yellow-400 mb-2">Ihr Motorrad-Profi</p>
                  <p className="text-sm">Service • Reparatur • Tuning</p>
                  <p className="text-sm mt-4">Tel: +41 XX XXX XX XX</p>
                  <p className="text-sm">www.ulrich-motosport.ch</p>
                </div>
              </div>

              {/* Wheels representation */}
              <div className="flex justify-between px-16 -mt-6">
                <div className="w-12 h-12 bg-zinc-700 rounded-full border-4 border-yellow-400"></div>
                <div className="w-12 h-12 bg-zinc-700 rounded-full border-4 border-yellow-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PKW Teilbeschriftung */}
      <div>
        <h3 className="text-white mb-4">Variante 2: PKW Teilbeschriftung</h3>
        <div className="bg-zinc-800 p-8 rounded-lg">
          <div className="bg-zinc-900 p-8 rounded-lg">
            <div className="bg-white rounded-lg p-8 relative h-48">
              {/* Yellow accent strip */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-yellow-400"></div>
              
              {/* Logo on door */}
              <div className="absolute left-12 top-1/2 transform -translate-y-1/2">
                <img src={logoImage} alt="Ulrich Motosport" className="h-12 object-contain" />
              </div>

              {/* Contact info on side */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-right">
                <p className="text-black text-sm">+41 XX XXX XX XX</p>
                <p className="text-black text-sm">www.ulrich-motosport.ch</p>
              </div>

              {/* Small checkered pattern */}
              <div className="absolute bottom-4 right-4 w-16 h-8 opacity-20">
                <div className="grid grid-cols-8 h-full">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={(i + Math.floor(i / 8)) % 2 === 0 ? 'bg-black' : 'bg-transparent'}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heckscheibe */}
      <div>
        <h3 className="text-white mb-4">Heckscheiben-Beschriftung</h3>
        <div className="bg-zinc-800 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-lg p-12 text-center">
              <img src={logoImage} alt="Ulrich Motosport" className="h-20 object-contain mx-auto mb-6" />
              <div className="space-y-2 text-white">
                <p className="text-2xl text-yellow-400">www.ulrich-motosport.ch</p>
                <p>+41 XX XXX XX XX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spezifikationen & Elemente */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
          <h3 className="text-white mb-4">Design-Elemente</h3>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li>✓ Logo prominent auf beiden Seiten</li>
            <li>✓ Schachbrettmuster als Racing-Element</li>
            <li>✓ Diagonale gelbe Streifen für Dynamik</li>
            <li>✓ Kontaktinformationen gut lesbar</li>
            <li>✓ Website-URL auf Heckscheibe</li>
            <li>✓ Gelbe Akzente auf schwarzem Grund</li>
          </ul>
        </div>

        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
          <h3 className="text-white mb-4">Material & Umsetzung</h3>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li>• Hochwertige Plotterfolie</li>
            <li>• UV- und witterungsbeständig</li>
            <li>• Professionelle Verklebung</li>
            <li>• Haltbarkeit: 5-7 Jahre</li>
            <li>• Rückstandslos entfernbar</li>
            <li>• Reflektierende Elemente optional</li>
          </ul>
        </div>
      </div>

      {/* Zusätzliche Ideen */}
      <div className="bg-yellow-400 text-black p-8 rounded-lg">
        <h3 className="mb-4">Weitere Anwendungen</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="mb-2">🏍️ Anhänger</p>
            <p className="text-sm">Für Motorradtransport mit Vollbeschriftung</p>
          </div>
          <div>
            <p className="mb-2">🚪 Werkstatttor</p>
            <p className="text-sm">Grossflächiges Logo mit Öffnungszeiten</p>
          </div>
          <div>
            <p className="mb-2">📍 Firmenschild</p>
            <p className="text-sm">Beleuchtetes Schild an der Werkstatt</p>
          </div>
        </div>
      </div>
    </div>
  );
}
