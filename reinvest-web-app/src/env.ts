import { z } from 'zod';

type envInterface = z.infer<typeof envSchema>;

const envSchema = z.object({
  apiUrl: z.string().url(),
  analyze: z.boolean().default(false),
  site: z.object({
    name: z.string(),
    url: z.string(),
  }),
  isProduction: z.boolean().default(false),
  aws: z.object({
    cognito: z.object({
      clientId: z.string(),
      userPoolId: z.string(),
      region: z.string(),
    }),
  }),
  google: z.object({
    maps: z.object({
      apiKey: z.string(),
      urls: z.object({
        placeDetails: z.string(),
        addressSuggestions: z.string(),
      }),
    }),
  }),
  sentry: z.object({
    dsn: z.string(),
  }),
});

export const env: envInterface = envSchema.parse({
  analyze: process.env.ANALYZE === 'true',
  site: {
    name: process.env.SITE_NAME,
    url: process.env.REINVEST_SITE_URL,
  },
  isProduction: process.env.NODE_ENV === 'production',
  aws: {
    cognito: {
      clientId: process.env.AWS_COGNITO_CLIENT_ID,
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      region: process.env.AWS_COGNITO_REGION,
    },
  },
  apiUrl: process.env.API_URL,
  google: {
    maps: {
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
      urls: {
        placeDetails: process.env.GOOGLE_MAPS_PLACES_URL,
        addressSuggestions: process.env.GOOGLE_MAPS_AUTOCOMPLETE_URL,
      },
    },
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
});
