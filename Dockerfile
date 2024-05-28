FROM node:alpine AS builder

WORKDIR /app

ENV GENERATED_SOURCEMAP false

COPY package.json .
RUN npm NODE_OPTIONS="--max-old-space-size=8192" install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/backoffice-spring-cda-24/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf