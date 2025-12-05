# Lokale Entwicklung (Docker)

1. `cp .env.local.example .env.local` und alle Secrets/Ports eintragen.
2. Strapi 5.31.2 einmalig installieren (z.B. `npx create-strapi-app@5.31.2 apps/backend --quickstart` oder vorhandenes Projekt nach `apps/backend` kopieren). Stelle sicher, dass `package.json` & `package-lock.json` vorhanden sind.
3. Danach `docker compose -f docker-compose.local.yml up --build` ausführen. Folgende Container laufen:
   - `frontend`: Vite Dev-Server auf Port `FRONTEND_PORT` (Standard: 5173).
   - `strapi-dev`: CMS für Component-/Schema-Anpassungen (Port `STRAPI_DEV_PORT`, Standard: 1438).
   - `strapi-prod`: CMS in Production-Mode für Content-Befüllung (Port `STRAPI_PROD_PORT`, Standard: 1437).
   - `postgres-dev` und `postgres-prod`: getrennte Datenbanken.

Die Frontend-App greift lokal standardmässig auf `http://strapi-prod:1437` zu. Passe `FRONTEND_DEV_API_URL` in `.env.local` an, wenn du eine andere Quelle nutzen möchtest.

## Wichtige Befehle

```bash
# Container stoppen
docker compose -f docker-compose.local.yml down

# Datenbanken und Uploads löschen (ACHTUNG: Daten gehen verloren)
docker compose -f docker-compose.local.yml down -v
```

Uploads werden in benannten Docker-Volumes gespeichert (`strapi-dev-uploads` / `strapi-prod-uploads`), sodass sie Neustarts überleben.
