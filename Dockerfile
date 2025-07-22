FROM node:22.17.1-alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22.17.1-alpine3.22
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.build/production ./.build/production
CMD ["node", "--enable-source-maps", "./.build/production/index.js"]
