# Strapi Backend

This folder is reserved for the Strapi CMS project that powers Ulrich Motosport. You can either copy an existing Strapi codebase into `apps/backend` or bootstrap a fresh one by running the Strapi Docker image that is wired into `docker-compose.local.yml`.

## Bootstrapping

1. Copy `.env.local.example` to `.env.local` in the repository root and fill in the Strapi secrets.
2. If this folder is empty, generate a Strapi 5.31.2 project locally: `npx create-strapi-app@5.31.2 apps/backend --quickstart` (or copy your existing CMS here). Adjust database configs to Postgres afterwards.
3. Stop the container (Ctrl+C) and commit the generated Strapi files. From this point on you can edit the CMS locally and it will be used by both the dev and prod containers.

## Building

When deploying we build a custom Docker image located in `apps/backend/Dockerfile`. The Dockerfile expects the Strapi project (with `package.json`, `yarn.lock`/`package-lock.json`, etc.) to live next to it and will execute the usual `npm run build` / `npm run start` commands.


## Eigene Notizen

### Lokal Dev Umgebung:
Starten mit:
docker compose  --env-file .env.local -f docker-compose.local.yml up
Wenn änderungen in dev backend gemacht wurde dann:
docker compose --env-file .env.local -f docker-compose.local.yml build strapi-prod
docker compose --env-file .env.local -f docker-compose.local.yml up -d strapi-prod

