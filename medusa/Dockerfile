FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_OPTIONS=--max-old-space-size=4096

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json turbo.json .npmrc ./
COPY apps/backend/package.json ./apps/backend/

RUN npm ci

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

RUN npm run build

ENV NODE_ENV=production

EXPOSE 9000

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start -H 0.0.0.0 -p ${PORT:-9000}"]
