
# Ulrich Motosport – Monorepo

Das Projekt besteht jetzt aus drei logisch getrennten Bereichen:

- `apps/frontend` – Vite/React Frontend.
- `apps/backend` – Strapi CMS (wird beim ersten Start per Docker generiert).
- `docs` – zentrale Dokumentation für Setup & Deployment.

## Lokales Setup (Docker)

1. `.env.local.example` nach `.env.local` kopieren und Secrets eintragen.
2. Strapi 5.31.2 Projekt bereitstellen (z.B. via `npx create-strapi-app@5.31.2 apps/backend --quickstart`, anschliessend DB-Einstellungen auf Postgres umstellen oder vorhandenes Projekt hineinkopieren).
3. `docker compose -f docker-compose.local.yml up --build` startet:
   - `frontend` (Vite Dev Server, Port 5173),
   - `strapi-dev` (Schemen-/Component-Entwicklung, Port 1438),
   - `strapi-prod` (Content-Befüllung, Port 1437),
   - je eine Postgres-DB für Dev & Prod.

Details siehe `docs/LOCAL_DEVELOPMENT.md`.

## Produktion / NAS

- `.env.production.example` → `.env.production` kopieren, falls du das produktive Compose-Setup lokal testen willst.
- `docker-compose.prod.yml` bündelt die drei Images (Frontend, Backend, Postgres) für lokale Smoke-Tests.
- `deploy/synology/docker-compose.yml` ist für das Synology NAS gedacht. Die GitHub Action `.github/workflows/deploy.yml` baut/pusht die Images nach GHCR und triggert via SSH ein `docker compose pull && docker compose up -d` auf dem NAS.
- Beispiel-Env für das NAS: `deploy/synology/.env.example`.
- Standard-Ports für das Deployment (konfliktfrei zu bestehenden Diensten): Backend 1437 (`BACKEND_PORT`), Frontend 8081 (`FRONTEND_HOST_PORT`), Postgres 5543 (`POSTGRES_HOST_PORT` → Container 5432).

Mehr zur Deployment-Pipeline steht in `docs/DEPLOYMENT.md`.


# Dokumentation

Die wichtigsten Einstiegspunkte:

- `LOCAL_DEVELOPMENT.md` erklärt das lokale Docker-Setup mit zwei Strapi-Instanzen.
- `DEPLOYMENT.md` beschreibt das Build-&-Deploy-Setup (GitHub Actions → Synology NAS).
- `../README.md` fasst die Projektstruktur für neue Teammitglieder zusammen.
