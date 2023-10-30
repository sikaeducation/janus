FROM node:20.8.1-bookworm
WORKDIR /app
USER root

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY . .

USER node
CMD ["npm", "run", "_dev"]
