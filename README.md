# Janus

Sika's LMS

[![CI](https://github.com/sikaeducation/janus/actions/workflows/main.yml/badge.svg)](https://github.com/sikaeducation/janus/actions/workflows/main.yml)

## Scripts

* `scripts/build` - Rebuild Docker containers
* `scripts/dev` - Start a development server
* `scripts/e2e/dev` - Run E2E tests in watch mode
* `scripts/e2e/ci` - Run E2E tests in CI mode
* `scripts/units/dev` - Run unit tests in watch mode
* `scripts/units/ci` - Run unit tests in CI mode

---

* `api/tools/prepare-1.ts` - Build program #1, from raw to dehydrated
* `api/tools/generate-slugs.ts` - Generate a new set of slug types

## Compose Files

* `.docker/docker-compose.yml`: Base for all environments
* `.docker/docker-compose.dev.yml`: Sets local environment variables and syncs to local volumes
* `.docker/docker-compose.e2e.base.yml`: Sets test environment variables
* `.docker/docker-compose.e2e.dev.yml`: Syncs to local volumes, runs tests in watch
* `.docker/docker-compose.e2e.ci.yml`: Runs tests once
