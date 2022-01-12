# Janus

Sika's LMS

## Scripts

* `scripts/build` - Rebuild Docker containers
* `scripts/dev` - Start a development server
* `scripts/e2e/dev` - Run E2E tests in watch mode
* `scripts/e2e/ci` - Run E2E tests in CI mode
* `scripts/units/dev` - Run unit tests in watch mode
* `scripts/units/ci` - Run unit tests in CI mode

## Compose Files

* `.docker/docker-compose.yml`: Base for all environments
* `.docker/docker-compose.dev.yml`: Syncs to local volumes
* `.docker/docker-compose.e2e.yml`: Syncs to local volumes, runs e2e tests in watch mode
* `.docker/docker-compose.ci-unit.yml`: Unit tests, no volumes
* `.docker/docker-compose.ci-e2e.yml`: E2E tests, no volumes
