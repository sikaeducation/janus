# Base
FROM node:19.1.0-bullseye AS base
WORKDIR /app
USER root

COPY . .

RUN npm ci

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
FROM production AS test
COPY --from=production /app/dist ./dist

USER root
RUN npx playwright install --with-deps

ENTRYPOINT ["npm", "run", "test:ci"]
