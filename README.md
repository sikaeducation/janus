# Janus

Sika's LMS

## Scripts

* `scripts/dev` - Start a development server
* `scripts/e2e` - Run E2E tests in watch mode
* `scripts/build` - Rebuild Docker containers
* `scripts/frontend-unit` - Run frontend unit tests in watch mode
* `scripts/ci-e2e` - Run E2E tests once
* `scripts/ci-unit` - Run all unit tests once

## Compose Files

* `.docker/docker-compose.yml`: Base for all environments
* `.docker/docker-compose.dev.yml`: Syncs to local volumes
* `.docker/docker-compose.e2e.yml`: Syncs to local volumes, runs e2e tests in watch mode
* `.docker/docker-compose.ci-unit.yml`: Unit tests, no volumes
* `.docker/docker-compose.ci-e2e.yml`: E2E tests, no volumes
