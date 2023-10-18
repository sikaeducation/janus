# Janus

Sika's LMS

[![CI](https://github.com/sikaeducation/janus/actions/workflows/main.yml/badge.svg)](https://github.com/sikaeducation/janus/actions/workflows/main.yml)

## Development

- Requires Docker/Docker Compose
- [Activity Service](https://github.com/sikaeducation/activity-service) must be running locally on port 4000
- Copy `.env.example` to `.env` and add values for:

```env
VITE_AUTH_ZERO_DOMAIN=xxxxxxxxxxxxxxxx.us.auth0.com
VITE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_ACTIVITY_SERVICE_BASE_URL=http://localhost:4000
VITE_AUTH_ZERO_AUDIENCE=https://xxxxxxxxxxxx.us.auth0.com/api/v2/
```

## Scripts

- `dev` - Defaults to client on `localhost:3000`
- `create:page`
- `create:component`
- `update:sika`
- `update:sika`
- `build`
- `build:docker`
- `test`
- `test:unit`
- `test:unit:watch`
- `test:features`
- `test:features:watch`
