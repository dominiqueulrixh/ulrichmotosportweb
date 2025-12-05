# Strapi-Konfiguration für Ulrich Motosport

## Installation & Start

```bash
cd apps/backend
npm install
npm run develop
```

Der Admin (http://localhost:1337/admin) wird beim ersten Start eingerichtet. Die Oberfläche ist nun nach Tabs/Sektionen aufgeteilt und besteht ausschließlich aus **Single Types** + **Components** (keine Collection Types).

---

## Single Types

| Name (API UID) | Felder / Hinweise                                                                 |
|----------------|------------------------------------------------------------------------------------|
| `Navigation` (`navigation`) | `phone`, `email`, `tagline`                                          |
| `Hero` (`hero`) | `eyebrow`, `title` (Mehrzeilen via `\n`), `highlight`, CTA-Labels/Ziele, **Media** `image`, **Component** `hero-stats` |
| `Services` (`service-section`) | `eyebrow`, `heading`, `subheading`, **Component** `service-card`, sowie `detailsHeading`, `detailsSubheading`, **Component** `service-category` |
| `Brands` (`brand-section`) | `eyebrow`, `heading`, `subheading`, **Component** `brand-card`        |
| `Team` (`team`) | `eyebrow`, `heading`, `subheading`, **Component** `team-member`, `story` (Richtext) |
| `Contact` (`contact`) | `eyebrow`, `heading`, `subheading`, **Component** `contact-card`, `mapEmbedUrl`, `mapLabel`, `mapDescription` |
| `Footer` (`footer`) | `description`, **Component** `list-item` (Services), **Component** `social-link`, `legalText` |

Jede Sektion entspricht exakt einem Tab im Frontend. Bilder (Hero, Service-Kategorien, Team) werden über Strapis Media-Library gepflegt.

---

## Components (alle unter `sections`)

| Component                | Felder                                                                 |
|------------------------- |------------------------------------------------------------------------|
| `hero-stat`              | `value`, `label`, `description` (optional)                             |
| `service-card`           | `title`, `description`, `iconName` (z. B. `Wrench`, `Settings`, …)      |
| `service-category`       | `title`, `description`, **Media** `image`, wiederholbare `items` (List Item)  |
| `list-item`              | `text`                                                                 |
| `brand-card`             | `name`, `description`                                                  |
| `team-member`            | `name`, `role`, `experience`, `specialization`, **Media** `photo`      |
| `contact-card`           | `type` (`phone`, `email`, `address`, `hours`), `title`, `description` (optional), `lines` (List Items), `actionValue` (z. B. Telefonnummer) |
| `social-link`            | `platform` (z. B. `facebook`, `instagram`, `youtube`), `url`            |

---

## Frontend-Verknüpfung

- `.env` im Frontend benötigt `VITE_STRAPI_URL` (oder `VITE_API_URL` in Docker) mit Standard `http://localhost:1437`.
- Beim Start lädt `apps/frontend` jede Single Type (`/navigation`, `/hero`, `/service-section`, `/brand-section`, …) mit `populate=*` über `src/lib/api.ts` und kombiniert die Daten für die Tabs.
- Hero, Services, Brand/Team, Kontakt, Footer usw. lesen ihre Texte und Listen vollständig aus Strapi.
- Bildfelder werden über Media Assets ausgeliefert (kein manuelles URL-Feld mehr); das Frontend generiert automatisch absolute URLs.
- Occasions bleiben aktuell weiterhin statisch.

Damit ist jede sichtbare Sektion (außer Occasionen) über Strapi konfigurierbar. Änderungen in Strapi (Felder oder Komponenten) erfordern ein Frontend-Update, daher das Schema bei Erweiterungen synchron halten. ***
