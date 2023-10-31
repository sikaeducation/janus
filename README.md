# Janus

[![CI](https://github.com/sikaeducation/janus/actions/workflows/main.yml/badge.svg)](https://github.com/sikaeducation/janus/actions/workflows/main.yml)

Sika's LMS

## Development

- Requires Docker/Docker Compose
  - Needs these ports open:
    - 3000 for development
    - 3001 for the Playwright inspector UI
    - 5173 for the playwright test server
- Use the Playwright UI by running `npm run tests:features:ui` (or `npm run tfu`) and connecting to port 3001. Works over SSH forwarding and doesn't require X11!
- [Activity Service](https://github.com/sikaeducation/activity-service) must be running locally on port 4000
- Copy `.env.example` to `.env` and add values for:

```env
VITE_AUTH_ZERO_DOMAIN=xxxxxxxxxxxxxxxx.us.auth0.com
VITE_AUTH_ZERO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_ACTIVITY_API_BASE_URL=http://localhost:4000
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
