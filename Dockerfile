# Base
FROM node:19.1.0-bullseye AS base
WORKDIR /app
USER root

COPY . .

RUN npm install

# Dev
FROM base AS dev
EXPOSE 3000
USER node
ENV NODE_ENV=production
CMD ["npm", "start"]

# Production
FROM base AS production
COPY --from=base /app .
RUN npm run build

# Test
FROM dev AS test
COPY --from=base /app .

USER root
RUN npx playwright install --with-deps
RUN npm install concurrently http-server wait-on
RUN npm run build
RUN npm run build-storybook --quiet

ENTRYPOINT npm run test:unit \
  && npx concurrently -k -s first -n "Storybook,Component Tests" -c "bgGray.white,auto" \
    "npx http-server storybook-static --port 6006 --silent" \
    "npx wait-on tcp:6006 && npm run test:components" \
  && npx concurrently -k -s first -n "App,Feature Tests" -c "bgGray.white,auto" \
    "npx http-server build --port 3000 --silent" \
    "npx wait-on tcp:3000 && npm run test:features"
