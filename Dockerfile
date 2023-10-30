FROM node:20.9.0-bookworm as base
WORKDIR /app
USER root

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY . .

FROM base AS dev

USER node
CMD ["npm", "run", "_dev"]

FROM base as test

USER root
RUN ["npx", "playwright", "install", "--with-deps"]
CMD ["npm", "run", "_test:features"]
