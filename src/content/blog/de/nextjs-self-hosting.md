---
title: "Next.js Self-Hosting mit Docker"
description: "Eine Schritt-für-Schritt Anleitung zum Self-Hosting einer Next.js App mit Docker und Caddy auf einem eigenen Server."
date: "2026-01-24"
category: "tech"
tags: ["Next.js", "Docker", "Self-Hosting", "DevOps"]
---

# Next.js Self-Hosting mit Docker

In diesem Artikel zeige ich dir, wie du eine Next.js Anwendung auf deinem eigenen Server hosten kannst. Wir nutzen Docker für die Containerisierung und Caddy als Reverse Proxy.

## Warum Self-Hosting?

Es gibt viele Gründe, warum du deine Next.js App selbst hosten möchtest:

1. **Volle Kontrolle** über deine Daten und Infrastruktur
2. **Kostenersparnis** bei hohem Traffic
3. **Lernerfahrung** im Bereich DevOps
4. **Keine Vendor Lock-in**

## Das Dockerfile

Hier ist ein optimiertes Multi-Stage Dockerfile für Next.js:

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

## Docker Compose

Die `docker-compose.yml` orchestriert alle Services:

```yaml
services:
  web:
    build: .
    restart: unless-stopped
    environment:
      - NODE_ENV=production

  caddy:
    image: caddy:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
```

## Fazit

Self-Hosting ist nicht so kompliziert wie es klingt. Mit Docker und Caddy hast du in wenigen Minuten eine produktionsreife Umgebung.

Im nächsten Artikel zeige ich, wie du automatische Deployments mit GitHub Actions einrichtest.
