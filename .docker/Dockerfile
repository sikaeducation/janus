FROM node:20.8.1-bookworm as base
WORKDIR /app
USER root

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY . .

FROM base as dev
USER node
CMD ["npm", "run", "_dev"]

FROM base as test
USER node
CMD ["npm", "run", "_dev"]
