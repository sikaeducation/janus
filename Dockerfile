FROM node:20.8.1-bookworm-slim as base
WORKDIR /app
USER root

COPY ./package.json .
COPY ./package-lock.json .
COPY ./.npmrc .
RUN npm ci
COPY . .

FROM base AS dev

USER node
CMD ["npm", "run", "_dev"]

FROM base as test

USER root
# Needed for healthcheck
RUN ["apt", "update"]
RUN ["apt-get", "install", "-y", "curl"]
RUN ["npx", "playwright", "install", "--with-deps"]
CMD ["npm", "run", "_test:features"]
