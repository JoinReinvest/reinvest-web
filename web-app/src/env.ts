import { z } from 'zod';

interface envInterface {
  analyze: boolean;
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
});

export const env: envInterface = envSchema.parse({
  analyze: process.env.ANALYZE === 'true',
  site: {
    name: process.env.SITE_NAME,
  },
  isProduction: process.env.NODE_ENV === 'production',
});
