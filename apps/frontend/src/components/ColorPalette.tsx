import React from 'react';

export function ColorPalette() {
  const colors = [
    {
      name: 'Racing Gelb',
      hex: '#FACC15',
      rgb: 'RGB(250, 204, 21)',
      usage: 'Hauptfarbe für Logo, Akzente, Call-to-Actions',
      bg: 'bg-yellow-400'
    },
    {
      name: 'Motorsport Schwarz',
      hex: '#000000',
      rgb: 'RGB(0, 0, 0)',
      usage: 'Hintergrundfarbe, Texte, primäre Flächen',
      bg: 'bg-black',
      border: true
    },
    {
      name: 'Rein Weiss',
      hex: '#FFFFFF',
      rgb: 'RGB(255, 255, 255)',
      usage: 'Texte auf dunklem Grund, Hintergründe',
      bg: 'bg-white',
      textDark: true
    },
    {
      name: 'Asphalt Grau',
      hex: '#3F3F46',
      rgb: 'RGB(63, 63, 70)',
      usage: 'Sekundäre Elemente, Schatten, Trennlinien',
      bg: 'bg-zinc-700'
    },
    {
      name: 'Stahl Grau',
      hex: '#71717A',
      rgb: 'RGB(113, 113, 122)',
      usage: 'Tertiäre Texte, deaktivierte Elemente',
      bg: 'bg-zinc-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-yellow-400 mb-4">Farbpalette</h2>
        <p className="text-zinc-400 mb-8">
          Die Farbpalette basiert auf den Racing-Farben Gelb und Schwarz und vermittelt Energie, 
          Geschwindigkeit und Professionalität.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {colors.map(color => (
          <div key={color.hex} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
            <div className={`${color.bg} h-40 ${color.border ? 'border-b-2 border-zinc-700' : ''}`}></div>
            <div className="p-6">
              <h3 className={`mb-2 ${color.textDark ? 'text-zinc-900' : 'text-white'}`}>{color.name}</h3>
              <div className="space-y-1 mb-4">
                <p className="text-zinc-400 text-sm">{color.hex}</p>
                <p className="text-zinc-400 text-sm">{color.rgb}</p>
              </div>
              <p className="text-zinc-400 text-sm">{color.usage}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700">
        <h3 className="text-white mb-6">Farbkombinationen</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-zinc-400 mb-3 text-sm">Primär</p>
            <div className="flex h-24 rounded-lg overflow-hidden border border-zinc-700">
              <div className="flex-1 bg-yellow-400"></div>
              <div className="flex-1 bg-black"></div>
            </div>
            <p className="text-zinc-400 mt-2 text-sm">Logo, Hauptelemente</p>
          </div>
          <div>
            <p className="text-zinc-400 mb-3 text-sm">Kontrast</p>
            <div className="flex h-24 rounded-lg overflow-hidden border border-zinc-700">
              <div className="flex-1 bg-black"></div>
              <div className="flex-1 bg-white"></div>
            </div>
            <p className="text-zinc-400 mt-2 text-sm">Text, Dokumente</p>
          </div>
          <div>
            <p className="text-zinc-400 mb-3 text-sm">Akzent</p>
            <div className="flex h-24 rounded-lg overflow-hidden border border-zinc-700">
              <div className="flex-1 bg-zinc-700"></div>
              <div className="flex-1 bg-yellow-400"></div>
            </div>
            <p className="text-zinc-400 mt-2 text-sm">UI-Elemente, Buttons</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-400 text-black p-8 rounded-lg">
        <h3 className="mb-4">Anwendungsbeispiele</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black text-white p-6 rounded">
            <h4 className="text-yellow-400 mb-2">Dunkle Hintergründe</h4>
            <p className="text-sm">Gelbe Akzente auf schwarzem Grund sorgen für maximale Sichtbarkeit und Racing-Atmosphäre.</p>
          </div>
          <div className="bg-white text-black p-6 rounded">
            <h4 className="mb-2">Helle Hintergründe</h4>
            <p className="text-sm">Schwarze Texte auf weissem Grund für Dokumente und Formulare mit gelben Highlights.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
