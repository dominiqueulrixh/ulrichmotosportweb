# Strapi Setup: Sektionen als Single Types, Listen als Collection Types

Alle vordefinierten Inhalte sind entfernt. Lege die Sektionen als **Single Types** an und die Listen als **Collection Types**. Das Frontend (`apps/frontend`) ruft die Sektionen über Single-Type-Endpoints ab und die Listen über Collection-Endpoints.

## Starten
- `npm install` und `npm run develop` (oder `yarn develop`) im Ordner `apps/backend`.
- Single Types und Collection Types wie unten anlegen, Inhalte veröffentlichen.
- Öffentliche Rolle: `find` und `findOne` für alle genannten Types aktivieren.

## Single Types (jeweils 1 Eintrag anlegen & veröffentlichen)
- **Navigation** (`navigation`)
  - `phone` (Text, Short)
  - `email` (Email)
  - `tagline` (Text, Short)

- **Hero** (`hero`)
  - `eyebrow` (Text, Short, optional)
  - `title` (Text, Long)
  - `highlight` (Text, Short, optional)
  - `primaryCtaLabel` (Text, Short)
  - `primaryCtaTarget` (Text, Short)
  - `secondaryCtaLabel` (Text, Short)
  - `secondaryCtaTarget` (Text, Short)
  - `image` (Media, Single)

- **Service Section** (`service-section`)
  - `eyebrow` (Text, Short, optional)
  - `heading` (Text, Short)
  - `subheading` (Text, Long, optional)
  - `detailsHeading` (Text, Short, optional)
  - `detailsSubheading` (Text, Long, optional)

- **Brand Section** (`brand-section`)
  - `eyebrow` (Text, Short, optional)
  - `heading` (Text, Short)
  - `subheading` (Text, Long, optional)

- **Team Section** (`team`)
  - `eyebrow` (Text, Short, optional)
  - `heading` (Text, Short)
  - `subheading` (Text, Long, optional)
  - `story` (Rich Text, optional)

- **Contact Section** (`contact`)
  - `eyebrow` (Text, Short, optional)
  - `heading` (Text, Short)
  - `subheading` (Text, Long, optional)
  - `mapEmbedUrl` (Text, Long, optional)
  - `mapLabel` (Text, Short, optional)
  - `mapDescription` (Text, Short, optional)

- **Footer** (`footer`)
  - `description` (Text, Long, optional)
  - `servicesText` (Text, Long, optional) – eine Zeile pro Service.
  - `legalText` (Text, Short, optional)

## Collection Types (beliebig viele Einträge)
- **Hero Stats** (`hero-stats`)
  - `value` (Text, Short)
  - `label` (Text, Short)
  - `description` (Text, Long, optional)
  - `order` (Number, Integer, optional)

- **Services** (`services`)
  - `title` (Text, Short)
  - `description` (Text, Long, optional)
  - `iconName` (Text, Short, optional) – Icon-Name aus dem Frontend (z. B. `Wrench`).
  - `order` (Number, Integer, optional)

- **Service Categories** (`service-categories`)
  - `title` (Text, Short)
  - `description` (Text, Long, optional)
  - `image` (Media, Single, optional)
  - `itemsText` (Text, Long, optional) – eine Zeile pro Bullet.
  - `order` (Number, Integer, optional)

- **Brands** (`brands`)
  - `name` (Text, Short)
  - `description` (Text, Long, optional)
  - `order` (Number, Integer, optional)

- **Team Members** (`team-members`)
  - `name` (Text, Short)
  - `role` (Text, Short, optional)
  - `experience` (Text, Short, optional)
  - `specialization` (Text, Short, optional)
  - `photo` (Media, Single, optional)
  - `order` (Number, Integer, optional)

- **Contact Cards** (`contact-cards`)
  - `type` (Enumeration: `phone`, `email`, `address`, `hours`)
  - `title` (Text, Short)
  - `description` (Text, Long, optional)
  - `linesText` (Text, Long, optional) – eine Zeile pro Adresse/Öffnungszeit.
  - `actionValue` (Text, Short, optional) – z. B. `+4155...`, `info@...`.
  - `order` (Number, Integer, optional)

## Wie das Frontend die Daten nutzt
- Single Types: `navigation`, `hero`, `service-section`, `brand-section`, `team`, `contact`, `footer`.
- Listen: `hero-stats`, `services`, `service-categories`, `brands`, `team-members`, `contact-cards` (sortiert nach `order`).
- Text-Listen (`itemsText`, `linesText`, `servicesText`) werden zeilenweise getrennt und als Arrays ins UI gemappt.

## API-Berechtigungen
- Settings → Users & Permissions → Roles → Public
- Für alle genannten Single und Collection Types: `find` und `findOne` aktivieren.

## Beispiel-Inhalte (wie ursprüngliches Setup)
Nutze diese Vorschläge, um schnell eine startklare Seite zu bekommen. Alle Felder sind Texte/Media wie oben beschrieben.

### Navigation
- phone: `+41552201570`
- email: `info@ulrich-motosport.ch`
- tagline: `20+ Jahre Erfahrung`

### Hero
- eyebrow: `Ulrich Motosport`
- title: `Dein Motorrad\nin besten`
- highlight: `Händen`
- primaryCtaLabel: `Termin vereinbaren`
- primaryCtaTarget: `contact`
- secondaryCtaLabel: `Unsere Services`
- secondaryCtaTarget: `services`
- image: (optional Bild)
- Hero Stats (Collection `hero-stats`):
  - 1) value: `20+`, label: `Jahre Erfahrung`, description: `Jahre Erfahrung`, order: 1
  - 2) value: `3`, label: `Markenvertretungen`, description: `Markenvertretungen`, order: 2
  - 3) value: `100%`, label: `Leidenschaft`, description: `Leidenschaft`, order: 3

### Service Section
- eyebrow: `Leistungen`
- heading: `Was wir für dich tun`
- subheading: `Von Service über Reparaturen bis zu Umbauten – wir kümmern uns um dein Bike.`
- detailsHeading: `Wir halten Dein Bike im Schuss`
- detailsSubheading: `Wir helfen Dir bei der Individualisierung und technischen Änderungen an Deinem Bike und kümmern uns selbstverständlich auch um deinen Oldtimer oder Veteran.`
- Services (Collection `services`, je Eintrag mit order):
  1) title: `Motorrad Service`, description: `Professionelle Wartung und Inspektion für alle Marken`, iconName: `Wrench`, order: 1
  2) title: `Reparaturen`, description: `Von Ölwechsel bis Motorrevision`, iconName: `Settings`, order: 2
  3) title: `Individualisierung`, description: `Gestalte dein Bike nach deinen Wünschen`, iconName: `Sparkles`, order: 3
  4) title: `Oldtimer / Veteranen`, description: `Restauration klassischer Motorräder`, iconName: `History`, order: 4
  5) title: `MFK Bereitstellung`, description: `Vorbereitung für die Kontrolle`, iconName: `FileCheck`, order: 5
  6) title: `Occasionen`, description: `Geprüfte Gebrauchtmotorräder`, iconName: `Bike`, order: 6
  7) title: `Motorradvermietung`, description: `Miete dein Traumbike`, iconName: `Key`, order: 7
  8) title: `Motorrad Zubehör`, description: `Teile und Zubehör für dein Bike`, iconName: `Package`, order: 8
- Service Categories (Collection `service-categories`, itemsText = Zeilen):
  1) title: `Service / Reparaturen`, description: `Vom Ölwechsel ... durch die Saison kommst.`, itemsText:
     ```
     Ölwechsel & Filterwechsel
     Reifenwechsel & Auswuchten
     Bremswartung & Bremsflüssigkeit
     Kettenservice & Ritzelwechsel
     Motorrevision
     Elektrik & Elektronik
     ```
  2) title: `Individualisierung`, description: `Du möchtest Deinem Bike ... gestalten.`, itemsText:
     ```
     Auspuffanlagen & Sound-Tuning
     Heck-Umbauten
     Lenker & Fussrasten
     Navigation & Elektronik
     Lackierung & Folierung
     Performance-Upgrades
     ```
  3) title: `Oldtimer / Veteranen`, description: `Gerne kümmern wir uns ... garantieren Dir Zuverlässigkeit.`, itemsText:
     ```
     Restauration & Aufbereitung
     Originalteile-Beschaffung
     Motor-Überholung
     Vergaser-Service
     Lackrestaurierung
     Historische Prüfungen
     ```

### Brand Section
- eyebrow: `Marken`
- heading: `Offizielle Vertretungen`
- subheading: `Wir sind stolze Partner führender Motorradmarken.`
- Brands (Collection `brands`, order):
  1) name: `SUZUKI`, description: `Offizielle Vertretung für Motorräder und Ersatzteile`, order: 1
  2) name: `NIU`, description: `Elektrische Motorroller der neuesten Generation`, order: 2
  3) name: `BETA`, description: `Racing Motorräder für höchste Ansprüche`, order: 3

### Team Section
- eyebrow: `Über uns`
- heading: `Unser Team`
- subheading: `Drei Profis mit einer gemeinsamen Leidenschaft: Motorräder`
- story (Rich Text): (siehe ursprünglicher Text)
- Team Members (Collection `team-members`, order):
  1) name: `Richi`, role: `Geschäftsführer & Motorradmechaniker`, experience: `20+ Jahre Erfahrung`, specialization: `Spezialist für Oldtimer & Restaurationen`, order: 1, photo: (optional Media)
  2) name: `Tarik`, role: `Motorradmechaniker`, experience: `15 Jahre Erfahrung`, specialization: `Spezialist für Elektronik & Tuning`, order: 2
  3) name: `Claudia`, role: `Motorradmechaniker`, experience: `8 Jahre Erfahrung`, specialization: `Spezialist für Sportmotorräder`, order: 3

### Contact Section
- eyebrow: `Kontakt`
- heading: `Besuche uns in Rüti`
- subheading: `Wir freuen uns auf deinen Besuch oder deine Nachricht`
- mapEmbedUrl: `https://www.google.com/maps?q=Ulrich+Motosport+R%C3%BCti+ZH&output=embed&z=15`
- mapLabel: `Google Maps Integration`
- mapDescription: `8630 Rüti ZH`
- Contact Cards (Collection `contact-cards`, order):
  1) type: `phone`, title: `Telefon`, description: `055 220 15 70`, actionValue: `+41552201570`, order: 1
  2) type: `email`, title: `E-Mail`, description: `info@ulrich-motosport.ch`, actionValue: `info@ulrich-motosport.ch`, order: 2
  3) type: `address`, title: `Adresse`, linesText:
     ```
     Werkstattstrasse XX
     8630 Rüti ZH
     Schweiz
     ```
     order: 3
  4) type: `hours`, title: `Öffnungszeiten`, linesText:
     ```
     Mo - Fr: 08:00 - 12:00 / 13:30 - 18:00
     Sa: 08:00 - 12:00
     So: Geschlossen
     ```
     order: 4

### Footer
- description: `Ihr Motorrad-Spezialist in Rüti seit über 20 Jahren. Service, Reparatur und Occasionen für alle Marken.`
- servicesText:
  ```
  Motorrad Service
  Reparaturen
  MFK Bereitstellung
  Individualisierung
  Oldtimer Service
  Vermietung
  ```
- legalText: `© 2024 Ulrich Motosport. Alle Rechte vorbehalten.`
