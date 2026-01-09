import React from 'react';
import { Shield, BookText, Info, Mail } from 'lucide-react';

interface LegalProps {
  isDarkMode: boolean;
  onNavigateToContact?: () => void;
}

const infoHighlights = [
  {
    title: 'Alle Rechte vorbehalten',
    icon: BookText,
    description:
      'Inhalt und Aufbau dieser Website sind urheberrechtlich geschützt. Für jede Nutzung von Texten, Bildern, Filmen oder Sounds ist die ausdrückliche Zustimmung von Ulrich Motosport erforderlich.'
  },
  {
    title: 'Rechtliche Hinweise',
    icon: Info,
    description:
      'Alle Angaben wurden sorgfältig erstellt, dennoch übernehmen wir keine Haftung für Richtigkeit oder Aktualität. Verlinkte Drittseiten liegen ausserhalb unseres Verantwortungsbereichs.'
  },
  {
    title: 'Datenschutz',
    icon: Shield,
    description:
      'Der Schutz personenbezogener Daten hat höchste Priorität. Wir halten DSG, VDSG, FMG sowie die DSGVO ein und informieren transparent über jeden Verarbeitungsschritt.'
  }
];

const contactDetails = [
  {
    label: 'Adresse',
    value: ['Ulrich Motosport', 'Neuhofstrasse 1', 'CH-8630 Rüti ZH']
  },
  {
    label: 'Kontakt',
    value: ['info@ulrich-motosport.ch', '+41 (0)55 260 11 11']
  }
];

const legalSections: { title: string; paragraphs: string[] }[] = [
  {
    title: 'Alle Rechte vorbehalten',
    paragraphs: [
      'Inhalt und Aufbau dieser Website sind urheberrechtlich geschützt. Teile dieser Webseite – insbesondere Bilder, Texte, Filme oder Sounds – unterliegen dem Urheberrecht Dritter. Die entsprechenden Hinweise sind nicht zwingend vermerkt.',
      'Vervielfältigung, Weitergabe oder Verwendung der hier abgelegten Informationen bedarf der ausdrücklichen Zustimmung von Ulrich Motosport. Wir behalten uns vor, die bereitgestellten Informationen jederzeit ohne Ankündigung zu ändern oder zu ergänzen.'
    ]
  },
  {
    title: 'Rechtliche Hinweise',
    paragraphs: [
      'Alle Angaben wurden sorgfältig zusammengetragen und nach bestem Wissen veröffentlicht. Trotzdem übernehmen wir keine Garantie für Richtigkeit, Vollständigkeit oder Aktualität. Insbesondere haften wir nicht für Schäden, die durch die Nutzung dieser Website entstehen.',
      'Verlinkungen auf externe Seiten liegen ausserhalb unseres Einflussbereichs. Für deren Inhalte, Funktionsfähigkeit, Rechtmässigkeit oder Fehlerfreiheit übernehmen wir keine Verantwortung.'
    ]
  },
  {
    title: 'Datenschutz – Grundsätze',
    paragraphs: [
      'Der Schutz personenbezogener Daten hat für uns oberste Priorität. Die Nutzung unserer Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich. Werden solche Daten erhoben (z. B. Name, Anschrift oder E-Mail-Adressen), geschieht dies – soweit möglich – freiwillig und niemals ohne Ihre Zustimmung.',
      'Wir handeln nach dem schweizerischen Datenschutzgesetz (DSG), der Verordnung zum DSG (VDSG), dem Fernmeldegesetz (FMG) sowie der EU-Datenschutzgrundverordnung (DSGVO). Diese Datenschutzerklärung gilt für alle Online- und Offline-Prozesse.'
    ]
  }
];

const dataProcessingSections: { title: string; paragraphs: string[]; list?: string[] }[] = [
  {
    title: 'Kontakte & Verantwortliche',
    paragraphs: [
      'Ulrich Motosport, Neuhofstrasse 1, 8630 Rüti ZH, Schweiz, ist verantwortlich für die Verarbeitung personenbezogener Daten. Der Datenschutzbeauftragte und Ansprechpartner: Richard Ulrich, Geschäftsinhaber, info@ulrich-motosport.ch, +41 55 260 11 11.'
    ]
  },
  {
    title: 'Umfang und Zweck der Datenverarbeitung',
    paragraphs: [
      'Beim Aufruf unserer Website werden automatisch technische Daten verarbeitet, um Betrieb, Sicherheit und Statistik zu gewährleisten. Dazu gehören folgende Angaben:'
    ],
    list: [
      'Browsertyp und -version, Betriebssystem',
      'IP-Adresse sowie Datum und Uhrzeit des Zugriffs',
      'Referrer-URL und aufgerufene Seiten',
      'Logfiles zur Sicherstellung der Systemsicherheit'
    ]
  },
  {
    title: 'Cookies',
    paragraphs: [
      'Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten. Technisch notwendige Cookies ermöglichen grundlegende Funktionen, Analyse-Cookies werden nur mit Einwilligung verwendet.',
      'Sie können Cookies jederzeit in den Browser-Einstellungen löschen oder blockieren. Ohne Cookies stehen möglicherweise nicht alle Funktionen zur Verfügung.'
    ]
  },
  {
    title: 'Kontaktformulare & E-Mails',
    paragraphs: [
      'Daten aus Kontaktformularen oder E-Mails dienen ausschliesslich zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Ihre Einwilligung bzw. unser berechtigtes Interesse an der Kommunikation. Sobald der Zweck erfüllt ist, werden die Daten gelöscht.'
    ]
  },
  {
    title: 'Analyse & Marketing',
    paragraphs: [
      'Wir nutzen Google Analytics sowie Google Marketing- und Remarketing-Dienste, um unser Angebot zu optimieren. IP-Adressen werden anonymisiert, Nutzungsprofile bleiben pseudonym.',
      'Google ist nach EU-US- sowie Swiss-US-Privacy-Shield zertifiziert. Sie können Cookies deaktivieren oder ein Opt-out-Plugin verwenden, um die Datenerhebung zu verhindern.'
    ]
  },
  {
    title: 'Einbindung externer Inhalte',
    paragraphs: [
      'Bei der Nutzung eingebetteter Dienste (z. B. Google Fonts, YouTube, Instagram, Twitter) wird Ihre IP-Adresse an den jeweiligen Anbieter übermittelt, damit Inhalte geladen werden können. Wir wählen unsere Partner sorgfältig aus und binden Inhalte nur ein, wenn angemessene Datenschutzstandards eingehalten werden.'
    ]
  },
  {
    title: 'Weitergabe & Speicherfristen',
    paragraphs: [
      'Personenbezogene Daten geben wir nur weiter, wenn dies gesetzlich erlaubt ist, eine Einwilligung vorliegt oder ein berechtigtes Interesse besteht. Dienstleister werden vertraglich auf Datenschutz verpflichtet.',
      'Daten werden gelöscht, sobald der Verarbeitungszweck erfüllt ist oder gesetzliche Aufbewahrungsfristen ablaufen.'
    ]
  },
  {
    title: 'Datensicherheit',
    paragraphs: [
      'Wir schützen personenbezogene Daten durch technische und organisatorische Massnahmen, setzen Verschlüsselung ein und schulen Mitarbeitende im Umgang mit vertraulichen Informationen.'
    ]
  }
];

const rightsSections: { title: string; description: string }[] = [
  { title: 'Auskunft & Berichtigung', description: 'Sie können Auskunft über gespeicherte Daten verlangen und unrichtige Angaben berichtigen lassen.' },
  { title: 'Löschung & Einschränkung', description: 'Fordern Sie die Löschung oder Einschränkung der Verarbeitung an, sofern keine gesetzlichen Pflichten entgegenstehen.' },
  { title: 'Datenübertragbarkeit', description: 'Auf Wunsch stellen wir Ihre Daten in einem strukturierten, gängigen Format bereit oder übertragen sie an Dritte.' },
  { title: 'Widerspruch & Widerruf', description: 'Sie können Einwilligungen jederzeit widerrufen und der Verarbeitung – insbesondere zu Marketingzwecken – widersprechen.' },
  { title: 'Beschwerderecht', description: 'Beschwerden richten Sie an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) oder die zuständige EU-Aufsicht.' }
];

const closingSections: { title: string; paragraphs: string[] }[] = [
  {
    title: 'Links, Weitergaben & Auftragsverarbeitung',
    paragraphs: [
      'Links zu Websites anderer Anbieter verlassen unseren Einflussbereich. Für deren Inhalte übernehmen wir keine Verantwortung. Die Nutzung externer Angebote erfolgt auf eigene Gefahr.',
      'Personenbezogene Daten geben wir nur weiter, wenn Sie eingewilligt haben, eine gesetzliche Pflicht besteht oder ein berechtigtes Interesse vorliegt. Dienstleister wie Suzuki Automobile Schweiz AG, KSR Kölliken oder Amsler & Co. AG werden vertraglich zum Datenschutz verpflichtet.'
    ]
  },
  {
    title: 'Speicherdauer & Datensicherheit',
    paragraphs: [
      'Wir verarbeiten personenbezogene Daten nur so lange, wie es gesetzliche Pflichten oder legitime Zwecke erfordern. Danach werden die Daten gelöscht oder anonymisiert.',
      'Technische und organisatorische Massnahmen wie Verschlüsselung, Zugriffsbeschränkungen und Schulungen schützen Ihre Daten vor Verlust oder Missbrauch.'
    ]
  },
  {
    title: 'Benutzung der Website & Gewährleistung',
    paragraphs: [
      'Der gesamte Inhalt dieser Website ist urheberrechtlich geschützt. Einzelne Seiten dürfen ausschließlich für private Zwecke gespeichert oder ausgedruckt werden, sofern Copyright-Vermerke erhalten bleiben.',
      'Die bereitgestellten Informationen stellen keine Angebotsempfehlung dar. Ulrich Motosport übernimmt keine Haftung für Verluste, die durch den Zugriff oder die Nutzung entstehen.'
    ]
  },
  {
    title: 'Änderungen & Schlussbemerkung',
    paragraphs: [
      'Diese Datenschutzerklärung kann aufgrund gesetzlicher Änderungen oder neuer Angebote angepasst werden. Massgeblich ist stets die auf unserer Website veröffentlichte Version.',
      'Fragen, Anregungen oder Wünsche richten Sie bitte an unseren Datenschutzbeauftragten. Wir behalten uns vor, zur Identifikation geeignete Nachweise zu verlangen.'
    ]
  }
];

export function Legal({ isDarkMode, onNavigateToContact }: LegalProps) {
  return (
    <section id="legal" className="py-20 md:py-28 bg-zinc-50 dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 text-yellow-400 text-sm uppercase tracking-wider">
              <div className="w-10 h-px bg-yellow-400"></div>
              Transparenz & Verantwortung
              <div className="w-10 h-px bg-yellow-400"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-black dark:text-white mb-4">
            Impressum & Datenschutz
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Alle rechtlichen Hinweise zu Urheberrecht, Datenschutz und der Nutzung unserer digitalen Angebote – klar strukturiert
            und jederzeit abrufbar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {infoHighlights.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-3"
            >
              <item.icon className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-xl text-black dark:text-white mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {contactDetails.map((detail) => (
            <div
              key={detail.label}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-black dark:text-white"
            >
              <h4 className="text-sm uppercase tracking-[0.2em] text-yellow-500 mb-2">{detail.label}</h4>
              <ul className="space-y-1 text-lg font-medium">
                {detail.value.map((line) => (
                  <li key={line}>
                    {line === 'Ulrich Motosport' ? <span translate="no">{line}</span> : line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          {legalSections.map((section) => (
            <div key={section.title} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-2xl text-black dark:text-white mb-4">{section.title}</h2>
              <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {section.paragraphs.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          {dataProcessingSections.map((section) => (
            <div key={section.title} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl text-black dark:text-white mb-4">{section.title}</h3>
              <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {section.paragraphs.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
          <h3 className="text-2xl text-black dark:text-white mb-6">Ihre Rechte</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {rightsSections.map((right) => (
              <div key={right.title} className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <h4 className="text-lg text-black dark:text-white mb-2">{right.title}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{right.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {closingSections.map((section) => (
            <div key={section.title} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">
              <h3 className="text-xl text-black dark:text-white mb-4">{section.title}</h3>
              <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {section.paragraphs.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm text-center space-y-4">
          <p className="uppercase tracking-[0.3em] text-yellow-400 text-xs">Kontakt</p>
          <h3 className="text-2xl text-black dark:text-white">Fragen zu Impressum oder Datenschutz?</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto">
            Unser Team beantwortet deine Fragen gerne persönlich. Gehe zu unserer Kontaktseite und nutze dein bevorzugtes Kommunikationsmittel.
          </p>
          {onNavigateToContact && (
            <button
              type="button"
              onClick={onNavigateToContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-500 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Zum Kontaktbereich
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
