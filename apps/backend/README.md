# Strapi Setup ohne Vorbelegung

Alle vordefinierten Collection Types, Components und Seed-Daten wurden entfernt. Lege die benötigten Single Types und Components in Strapi manuell an, damit das Frontend (`apps/frontend`) die erwarteten Felder findet.

## Starten
- `npm install` und `npm run develop` (oder `yarn develop`) im Ordner `apps/backend`.
- Melde dich im Strapi-Admin an und erstelle die unten beschriebenen Strukturen.
- Vergiss nicht, die Einträge zu veröffentlichen, damit das Frontend sie abrufen kann.

## Components anlegen
Erstelle die Components zuerst, damit du sie in den Single Types wiederverwenden kannst.

- `common.list-item`  
  - `text` (Text, required): Eine Zeile, z. B. für Services oder Adresszeilen.

- `homepage.hero-stat`  
  - `value` (String, required): Anzeigezahl, z. B. `20+`.  
  - `label` (String, required): Kurze Beschreibung.  
  - `description` (Text, optional).

- `homepage.service-card`  
  - `title` (String, required).  
  - `description` (Text, optional).  
  - `iconName` (String, optional): Name des Icons im Frontend (z. B. `Wrench`).

- `homepage.service-category`  
  - `title` (String, required).  
  - `description` (Text, optional).  
  - `image` (Single Media, optional).  
  - `items` (Repeatable Component: `common.list-item`, optional).

- `homepage.brand-card`  
  - `name` (String, required).  
  - `description` (Text, optional).

- `homepage.team-member`  
  - `name` (String, required).  
  - `role` (String, optional).  
  - `experience` (String, optional).  
  - `specialization` (String, optional).  
  - `photo` (Single Media, optional).

- `homepage.contact-card`  
  - `type` (Enumeration: `phone`, `email`, `address`, `hours`, required).  
  - `title` (String, required).  
  - `description` (Text, optional).  
  - `lines` (Repeatable Component: `common.list-item`, optional) – z. B. Adresse oder Öffnungszeiten.  
  - `actionValue` (String, optional) – z. B. `tel:` oder `mailto:` Ziel.

- Optional: `homepage.social-link`  
  - `platform` (String, required).  
  - `url` (String, required).  
  Wird aktuell im Frontend nicht genutzt, kann aber für spätere Erweiterungen hilfreich sein.

## Single Types erstellen
Lege folgende Single Types an (UIDs in Klammern), damit die API-Routen aus dem Frontend funktionieren.

- Navigation (`navigation`)  
  - `phone` (String).  
  - `email` (String).  
  - `tagline` (String).

- Hero (`hero`)  
  - `eyebrow` (String, optional).  
  - `title` (Text, required).  
  - `highlight` (String, optional).  
  - `primaryCtaLabel` (String).  
  - `primaryCtaTarget` (String) – Anker oder Route.  
  - `secondaryCtaLabel` (String).  
  - `secondaryCtaTarget` (String).  
  - `image` (Single Media, optional).  
  - `stats` (Repeatable Component: `homepage.hero-stat`, optional).  
  - Optional: zusätzliches Feld `images` (Multiple Media) falls du mehrere Bilder liefern willst.

- Services (`service-section`)  
  - `eyebrow` (String, optional).  
  - `heading` (String, required).  
  - `subheading` (Text, optional).  
  - `items` (Repeatable Component: `homepage.service-card`, optional).  
  - `detailsHeading` (String, optional).  
  - `detailsSubheading` (Text, optional).  
  - `categories` (Repeatable Component: `homepage.service-category`, optional).

- Marken (`brand-section`)  
  - `eyebrow` (String, optional).  
  - `heading` (String, required).  
  - `subheading` (Text, optional).  
  - `items` (Repeatable Component: `homepage.brand-card`, optional).

- Team (`team`)  
  - `eyebrow` (String, optional).  
  - `heading` (String, required).  
  - `subheading` (Text, optional).  
  - `members` (Repeatable Component: `homepage.team-member`, optional).  
  - `story` (Rich Text, optional).

- Kontakt (`contact`)  
  - `eyebrow` (String, optional).  
  - `heading` (String, required).  
  - `subheading` (Text, optional).  
  - `cards` (Repeatable Component: `homepage.contact-card`, optional).  
  - `mapEmbedUrl` (String, optional).  
  - `mapLabel` (String, optional).  
  - `mapDescription` (String, optional).

- Footer (`footer`)  
  - `description` (Text, optional).  
  - `services` (Repeatable Component: `common.list-item`, optional).  
  - `legalText` (String, optional).  
  - Optional: `socials` (Repeatable Component: `homepage.social-link`) falls benötigt.

> Hinweis: Alle oben genannten Inhalte sind Single Types. Du kannst sie später in Collection Types aufteilen, falls du mehrere Seiten mit ähnlicher Struktur brauchst – achte dann auf die UIDs und die Feldnamen, die das Frontend erwartet.
