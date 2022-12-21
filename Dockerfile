FROM node:19.1.0-bullseye AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]

FROM base AS production

CMD ["npm", "run", "build"]
