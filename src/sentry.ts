import * as Sentry from "@sentry/react";

const SENTRY_API_REGEX = String(import.meta.env.VITE_SENTRY_API_REGEX);
const SENTRY_DSN = String(import.meta.env.VITE_SENTRY_API_DSN);

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: String(SENTRY_DSN),
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: [new RegExp(SENTRY_API_REGEX)],
      }),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
