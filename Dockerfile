FROM node:19.1.0-bullseye AS base
WORKDIR /app
USER root

COPY .npmrc ./
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
USER node
CMD ["npm", "start"]

FROM base AS production
ENV NODE_ENV=production
CMD ["npm", "run", "build"]
