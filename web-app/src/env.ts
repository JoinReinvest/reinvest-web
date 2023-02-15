import { z } from 'zod';

interface envInterface {
  analyze: boolean;
  awsCognito: {
    clientId: string;
    userPoolId: string;
  };
  isProduction: boolean;
  site: {
    name: string;
  };
}

const envSchema = z.object({
  analyze: z.boolean().default(false),
  site: z.object({
    name: z.string(),
  }),
  isProduction: z.boolean().default(false),
  awsCognito: z.object({
    clientId: z.string(),
    userPoolId: z.string(),
  }),
});

export const env: envInterface = envSchema.parse({
  analyze: process.env.ANALYZE === 'true',
  site: {
    name: process.env.SITE_NAME,
  },
  isProduction: process.env.NODE_ENV === 'production',
  awsCognito: {
    clientId: process.env.AWS_COGNITO_CLIENT_ID,
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  },
});
