FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install -qy
COPY . .

CMD ["npm", "run", "start"]