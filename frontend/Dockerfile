FROM node:17.2.0-bullseye as base
WORKDIR /app

USER node

COPY package*.json ./
RUN npm install

COPY --chown=node:node . .

EXPOSE 3000
CMD [npm, start]
