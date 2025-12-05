FROM node:20-alpine AS base
WORKDIR /usr/src/app

# Nur die package-Dateien des Frontends kopieren
COPY package*.json ./
RUN npm install

FROM base AS dev
# Restlicher Frontend-Code
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base AS build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Code nochmal kopieren (sauberer Build-Stage)
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS production
# Vite-Build liegt jetzt in /usr/src/app/build (not dist)
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
