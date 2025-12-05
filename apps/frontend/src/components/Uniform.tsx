import React from 'react';
import logoImage from 'figma:asset/LogoColored.png';

export function Uniform() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-yellow-400 mb-4">Arbeitskleidung</h2>
        <p className="text-zinc-400 mb-8">
          Professionelle und funktionale Arbeitskleidung für das 3-köpfige Team.
        </p>
      </div>

      {/* Polo Shirts */}
      <div>
        <h3 className="text-white mb-4">Polo-Shirts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Black version */}
          <div className="bg-zinc-800 p-8 rounded-lg">
            <p className="text-zinc-400 mb-4 text-sm">Variante Schwarz (Hauptversion)</p>
            <div className="bg-zinc-900 p-8 rounded-lg">
              {/* Simplified polo shirt */}
              <div className="bg-black border-4 border-yellow-400 rounded-t-lg p-6 mx-auto max-w-xs aspect-[3/4]">
                {/* Collar */}
                <div className="h-6 bg-yellow-400 rounded-t mb-4"></div>
                
                {/* Logo on chest */}
                <div className="flex justify-center mb-8">
                  <img src={logoImage} alt="Ulrich Motosport" className="h-12 object-contain" />
                </div>

                {/* Name tag area */}
                <div className="mt-12 text-center">
                  <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded text-sm">
                    Max Mustermann
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-zinc-400">
              <p>• Logo gestickt auf linker Brust</p>
              <p>• Gelber Kragen und Ärmelabschluss</p>
              <p>• Namensschild optional</p>
            </div>
          </div>

          {/* Yellow version */}
          <div className="bg-zinc-800 p-8 rounded-lg">
            <p className="text-zinc-400 mb-4 text-sm">Variante Gelb (Alternative)</p>
            <div className="bg-zinc-900 p-8 rounded-lg">
              <div className="bg-yellow-400 border-4 border-black rounded-t-lg p-6 mx-auto max-w-xs aspect-[3/4]">
                {/* Collar */}
                <div className="h-6 bg-black rounded-t mb-4"></div>
                
                {/* Logo on chest */}
                <div className="flex justify-center mb-8 bg-white p-4 rounded">
                  <img src={logoImage} alt="Ulrich Motosport" className="h-12 object-contain" />
                </div>

                {/* Name tag area */}
                <div className="mt-12 text-center">
                  <div className="inline-block bg-black text-yellow-400 px-6 py-2 rounded text-sm">
                    Max Mustermann
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-zinc-400">
              <p>• Für Events und Messen</p>
              <p>• Hohe Sichtbarkeit</p>
              <p>• Logo auf weissem Patch</p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Jacket */}
      <div>
        <h3 className="text-white mb-4">Arbeitsjacke / Softshell</h3>
        <div className="bg-zinc-800 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto">
            <div className="bg-zinc-900 p-8 rounded-lg">
              <div className="bg-black border-4 border-yellow-400 rounded-lg p-8 mx-auto max-w-md aspect-[3/4] relative">
                {/* Yellow stripe accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-400"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-full bg-yellow-400 opacity-10"></div>
                
                {/* Logo on chest */}
                <div className="flex justify-center mt-8 mb-8">
                  <img src={logoImage} alt="Ulrich Motosport" className="h-16 object-contain" />
                </div>

                {/* Back logo indication */}
                <div className="absolute bottom-8 right-8 text-yellow-400 text-xs">
                  <p>Rücken:</p>
                  <p>Logo gross</p>
                </div>

                {/* Shoulder stripe */}
                <div className="absolute top-8 right-0 w-4 h-24 bg-yellow-400"></div>
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-yellow-400 mb-2">Features</p>
                <ul className="space-y-1 text-zinc-400">
                  <li>• Wasserabweisend</li>
                  <li>• Atmungsaktiv</li>
                  <li>• Mehrere Taschen</li>
                  <li>• Reflektierende Elemente</li>
                </ul>
              </div>
              <div>
                <p className="text-yellow-400 mb-2">Branding</p>
                <ul className="space-y-1 text-zinc-400">
                  <li>• Logo vorne (gestickt)</li>
                  <li>• Grosses Logo hinten</li>
                  <li>• Gelbe Akzentstreifen</li>
                  <li>• Name optional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Pants */}
      <div>
        <h3 className="text-white mb-4">Arbeitshose</h3>
        <div className="bg-zinc-800 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <div className="bg-zinc-800 rounded-lg h-96 relative border-2 border-zinc-700">
                {/* Simplified pants */}
                <div className="absolute top-4 right-4">
                  <div className="w-16 h-8 bg-yellow-400 rounded flex items-center justify-center text-black text-xs">
                    ULRICH
                  </div>
                </div>
                <div className="absolute top-20 left-4 space-y-2">
                  <div className="w-20 h-12 border-2 border-yellow-400 rounded"></div>
                  <div className="w-20 h-12 border-2 border-yellow-400 rounded"></div>
                </div>
                {/* Yellow accent stripe */}
                <div className="absolute bottom-12 left-0 right-0 h-1 bg-yellow-400"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div>
                <p className="text-yellow-400 mb-2">Eigenschaften</p>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li>• Strapazierfähiges Material</li>
                  <li>• Kniepolster-Taschen</li>
                  <li>• Viele praktische Taschen</li>
                  <li>• Farbe: Schwarz oder Anthrazit</li>
                </ul>
              </div>
              <div>
                <p className="text-yellow-400 mb-2">Branding</p>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li>• Kleines Logo am Oberschenkel</li>
                  <li>• Gelbe Akzentstreifen</li>
                  <li>• Reflektierende Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Set Overview */}
      <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700">
        <h3 className="text-white mb-6">Komplettes Set pro Mitarbeiter</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-700 p-6 rounded-lg">
            <p className="text-yellow-400 mb-3">Basis-Ausstattung</p>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>• 2× Polo-Shirt (Schwarz)</li>
              <li>• 1× Polo-Shirt (Gelb)</li>
              <li>• 2× Arbeitshose</li>
              <li>• 1× Softshell-Jacke</li>
            </ul>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg">
            <p className="text-yellow-400 mb-3">Optional</p>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>• T-Shirts (Sommer)</li>
              <li>• Winterjacke</li>
              <li>• Cap mit Logo</li>
              <li>• Sicherheitsschuhe</li>
            </ul>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg">
            <p className="text-yellow-400 mb-3">Events</p>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>• Racing-Shirt (gelb)</li>
              <li>• Präsentationsjacke</li>
              <li>• Team-Caps</li>
              <li>• Merchandise</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Material Info */}
      <div className="bg-yellow-400 text-black p-8 rounded-lg">
        <h3 className="mb-4">Materialien & Qualität</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-2">Professionelle Arbeitskleidung</p>
            <ul className="text-sm space-y-1">
              <li>• Strapazierfähige Gewebe</li>
              <li>• Hochwertige Stickereien</li>
              <li>• Industriewaschmaschinenfest</li>
              <li>• Formstabil und langlebig</li>
            </ul>
          </div>
          <div>
            <p className="mb-2">Empfohlene Anbieter</p>
            <ul className="text-sm space-y-1">
              <li>• Engelbert Strauss (Premium)</li>
              <li>• Kübler Workwear</li>
              <li>• Dickies (Preis/Leistung)</li>
              <li>• Lokale Stickerei für Logos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
