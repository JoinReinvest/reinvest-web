import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      [process.env.API_URL]: {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      },
    },
  ],
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    'src/types/graphql.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
