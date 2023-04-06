import { Integrations } from "@sentry/tracing";

export const config = {
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [new Integrations.BrowserTracing()],
  enabled: process.env.NODE_ENV !== 'development',
  hideSourceMaps: true,
}
