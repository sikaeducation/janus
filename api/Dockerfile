FROM node:16.13-alpine3.12 as base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --chown=node:node . .

USER node
EXPOSE 80
CMD ["npm", "run", "dev"]
