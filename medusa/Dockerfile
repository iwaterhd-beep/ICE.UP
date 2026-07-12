FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json turbo.json ./
COPY apps/backend/package.json ./apps/backend/

RUN npm ci

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

RUN npm run build

ENV NODE_ENV=production

EXPOSE 9000

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start -H 0.0.0.0 -p ${PORT:-9000}"]
