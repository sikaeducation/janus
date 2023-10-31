FROM node:20.8.1-bookworm
WORKDIR /app
USER node

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY . .

CMD ["npm", "run", "_dev"]
