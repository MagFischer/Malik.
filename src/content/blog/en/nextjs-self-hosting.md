---
title: "Next.js Self-Hosting with Docker"
description: "A step-by-step guide to self-hosting a Next.js app with Docker and Caddy on your own server."
date: "2026-01-24"
category: "tech"
tags: ["Next.js", "Docker", "Self-Hosting", "DevOps"]
---

# Next.js Self-Hosting with Docker

In this article, I'll show you how to host a Next.js application on your own server. We'll use Docker for containerization and Caddy as a reverse proxy.

## Why Self-Hosting?

There are many reasons why you might want to self-host your Next.js app:

1. **Full control** over your data and infrastructure
2. **Cost savings** with high traffic
3. **Learning experience** in DevOps
4. **No vendor lock-in**

## The Dockerfile

Here's an optimized multi-stage Dockerfile for Next.js:

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

The `docker-compose.yml` orchestrates all services:

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

## Conclusion

Self-hosting isn't as complicated as it sounds. With Docker and Caddy, you'll have a production-ready environment in minutes.

In the next article, I'll show you how to set up automatic deployments with GitHub Actions.
