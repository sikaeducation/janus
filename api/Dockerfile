FROM node:16.13-alpine3.12 as base
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .

USER node
EXPOSE 80
CMD ["npm", "run", "dev"]

FROM base as prod
RUN npm run build
CMD ["npm", "start"]
