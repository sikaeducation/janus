# Janus

[![Netlify Status](https://api.netlify.com/api/v1/badges/f7120ac5-3f99-4075-9dc5-6796886020af/deploy-status)](https://app.netlify.com/sites/boring-northcutt-64d2d3/deploys)

Sika's LMS

## Scripts

* `scripts/dev` - Start a development server
* `scripts/e2e` - Run E2E tests in watch mode
* `scripts/build` - Rebuild Docker containers

## Compose Files

* `docker-compose.yml`: Base for all environments
* `docker-compose.dev.yml`: Syncs to local volumes
* `docker-compose.test.yml`: Base for all tests
* `docker-compose.e2e.yml`: Syncs to local volumes, runs e2e tests in watch mode
