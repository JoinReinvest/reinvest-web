import { z } from 'zod';

interface envInterface {
  analyze: boolean;
  apiUrl: string;
  aws: {
    cognito: {
      clientId: string;
      userPoolId: string;
    };
  };
  isProduction: boolean;
  site: {
    name: string;
    url: string;
  };
}

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
    }),
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
    },
  },
  apiUrl: process.env.API_URL,
});
