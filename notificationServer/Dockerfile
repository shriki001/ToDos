FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .

###############################################################################

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --only=production
COPY --from=builder /app ./
CMD ["node", "./index.js"]