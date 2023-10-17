# Base
FROM node:19.1.0-bullseye AS base
WORKDIR /app
USER root

COPY . .

RUN npm ci

FROM base AS dev
EXPOSE 3000
USER node
ENV NODE_ENV=production
CMD ["npm", "dev"]
