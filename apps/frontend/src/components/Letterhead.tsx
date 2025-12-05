import React from 'react';
import logoImage from 'figma:asset/LogoColored.png';

export function Letterhead() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-yellow-400 mb-4">Briefpapier & Dokumentvorlagen</h2>
        <p className="text-zinc-400 mb-8">
          Professionelle Vorlagen für alle Geschäftsdokumente mit konsistentem Design.
        </p>
      </div>

      {/* Briefpapier */}
      <div>
        <h3 className="text-white mb-4">Briefpapier</h3>
        <div className="bg-zinc-800 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-start mb-12 pb-4 border-b-2 border-yellow-400">
              <img src={logoImage} alt="Ulrich Motosport" className="h-12 object-contain" />
              <div className="text-right text-xs text-zinc-600">
                <p>Werkstattstrasse XX</p>
                <p>XXXX Ort</p>
                <p className="mt-2">Tel: +41 XX XXX XX XX</p>
                <p>info@ulrich-motosport.ch</p>
              </div>
            </div>

            {/* Absender */}
            <div className="text-xs text-zinc-500 mb-8">
              Ulrich Motosport • Werkstattstrasse XX • XXXX Ort
            </div>

            {/* Empfänger */}
            <div className="mb-12">
              <p className="text-sm text-black">Herr Max Muster</p>
              <p className="text-sm text-black">Musterstrasse 123</p>
              <p className="text-sm text-black">1234 Musterstadt</p>
            </div>

            {/* Datum */}
            <div className="text-right mb-8">
              <p className="text-sm text-zinc-600">Ort, 27. November 2024</p>
            </div>

            {/* Betreff */}
            <div className="mb-6">
              <p className="text-black">Betreff: <span className="text-black">Beispielbrief</span></p>
            </div>

            {/* Content */}
            <div className="space-y-4 text-sm text-black min-h-[200px]">
              <p>Sehr geehrter Herr Muster,</p>
              <p className="text-zinc-600">[Briefinhalt]</p>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-zinc-200">
              <div className="grid grid-cols-3 gap-4 text-xs text-zinc-600">
                <div>
                  <p className="text-black mb-1">Kontakt</p>
                  <p>Tel: +41 XX XXX XX XX</p>
                  <p>info@ulrich-motosport.ch</p>
                  <p>www.ulrich-motosport.ch</p>
                </div>
                <div>
                  <p className="text-black mb-1">Bankverbindung</p>
                  <p>IBAN: CH00 0000 0000 0000 0000 0</p>
                  <p>Bank: Musterbank AG</p>
                </div>
                <div>
                  <p className="text-black mb-1">Rechtliches</p>
                  <p>UID: CHE-XXX.XXX.XXX</p>
                  <p>Handelsregister: CH-XXX-XXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rechnung */}
      <div>
        <h3 className="text-white mb-4">Rechnungsvorlage</h3>
        <div className="bg-zinc-800 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <img src={logoImage} alt="Ulrich Motosport" className="h-12 object-contain" />
              <div className="text-right">
                <p className="text-2xl text-black mb-2">RECHNUNG</p>
                <p className="text-sm text-zinc-600">Nr. 2024-001</p>
                <p className="text-sm text-zinc-600">Datum: 27.11.2024</p>
              </div>
            </div>

            <div className="h-1 bg-yellow-400 mb-8"></div>

            {/* Addresses */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs text-yellow-600 mb-2">VON</p>
                <p className="text-sm text-black">Ulrich Motosport</p>
                <p className="text-sm text-zinc-600">Werkstattstrasse XX</p>
                <p className="text-sm text-zinc-600">XXXX Ort</p>
                <p className="text-sm text-zinc-600 mt-2">UID: CHE-XXX.XXX.XXX</p>
              </div>
              <div>
                <p className="text-xs text-yellow-600 mb-2">AN</p>
                <p className="text-sm text-black">Max Muster</p>
                <p className="text-sm text-zinc-600">Musterstrasse 123</p>
                <p className="text-sm text-zinc-600">1234 Musterstadt</p>
              </div>
            </div>

            {/* Table */}
            <div className="mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-black text-yellow-400">
                    <th className="text-left p-3">Position</th>
                    <th className="text-right p-3">Menge</th>
                    <th className="text-right p-3">Preis</th>
                    <th className="text-right p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-200">
                    <td className="p-3 text-black">Service & Inspektion</td>
                    <td className="text-right p-3 text-zinc-600">1</td>
                    <td className="text-right p-3 text-zinc-600">CHF 250.00</td>
                    <td className="text-right p-3 text-black">CHF 250.00</td>
                  </tr>
                  <tr className="border-b border-zinc-200">
                    <td className="p-3 text-black">Ersatzteile</td>
                    <td className="text-right p-3 text-zinc-600">-</td>
                    <td className="text-right p-3 text-zinc-600">-</td>
                    <td className="text-right p-3 text-black">CHF 180.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Zwischensumme:</span>
                  <span className="text-black">CHF 430.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">MwSt. 8.1%:</span>
                  <span className="text-black">CHF 34.83</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-yellow-400">
                  <span className="text-black">Total CHF:</span>
                  <span className="text-xl text-black">CHF 464.83</span>
                </div>
              </div>
            </div>

            {/* Payment info */}
            <div className="bg-zinc-50 p-4 rounded text-xs text-zinc-600">
              <p className="text-black mb-2">Zahlbar innerhalb von 30 Tagen</p>
              <p>IBAN: CH00 0000 0000 0000 0000 0</p>
              <p>Referenz: 2024-001</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spezifikationen */}
      <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
        <h3 className="text-white mb-4">Weitere Vorlagen</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-zinc-700 p-4 rounded">
            <p className="text-yellow-400 mb-2">✓ Angebot</p>
            <p className="text-zinc-400 text-sm">Mit Gültigkeitsdauer und Konditionen</p>
          </div>
          <div className="bg-zinc-700 p-4 rounded">
            <p className="text-yellow-400 mb-2">✓ Lieferschein</p>
            <p className="text-zinc-400 text-sm">Für Teillieferungen und Abholungen</p>
          </div>
          <div className="bg-zinc-700 p-4 rounded">
            <p className="text-yellow-400 mb-2">✓ Serviceprotokoll</p>
            <p className="text-zinc-400 text-sm">Dokumentation durchgeführter Arbeiten</p>
          </div>
        </div>
      </div>
    </div>
  );
}
