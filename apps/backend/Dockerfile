FROM node:20-alpine AS base
WORKDIR /srv/app
RUN apk add --no-cache python3 make g++

FROM base AS deps
COPY package*.json ./
RUN npm install

FROM deps AS dev
COPY . .
# Ensure dependencies are installed in the mounted volume before starting Strapi okd
CMD ["sh", "-c", "npm install && npm run develop"]

FROM deps AS build
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /srv/app
ENV NODE_ENV=production
ENV PORT=1437
COPY --from=build /srv/app ./
RUN npm install --omit=dev
EXPOSE 1437
CMD ["npm", "run", "start"]
