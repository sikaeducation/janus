FROM node:17.2.0-bullseye as base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG PORT
EXPOSE ${PORT}
CMD [npm, start]

FROM base as build
RUN npm run build

FROM nginx:1.21.4 as production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
