FROM node:22.12.0-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22.12.0-alpine3.21
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.build/production /app/.build/production
CMD ["node", "--enable-source-maps", "./.build/production/index.js"]
