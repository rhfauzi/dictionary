# Stage 1: install dependencies
FROM node:18.16.1-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY vendor ./vendor
RUN apk update
RUN apk add git
RUN yarn install

# Stage 2: build
FROM node:18.16.1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY pages ./pages
COPY public ./public
COPY .env package.json tsconfig.json next.config.js ./
RUN yarn build

# Stage 3: run
FROM node:18.16.1-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.env ./
#COPY --from=builder /app/.env.local ./

ENV NODE_ENV production
ENV NEXT_PUBLIC_API_BASE_URL_1 https://gateway.epc-dev.nabatisnack.co.id:8181/eds-sales/
ENV NEXT_PUBLIC_API_BASE_URL_2 https://gateway.epc-dev.nabatisnack.co.id:8181/eds-logistic/
ENV NEXT_PUBLIC_API_BASE_URL_3 https://gateway.epc-dev.nabatisnack.co.id:8181/eds-sales/


EXPOSE 3000

CMD ["yarn", "start"]
