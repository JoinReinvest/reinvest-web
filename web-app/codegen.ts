import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'https://k9lwef47wf.execute-api.us-east-1.amazonaws.com/api': {
        headers: {
          Authorization: 'Bearer <here should be token>',
        },
      },
    },
  ],
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    'src/gql/types.ts': {
      plugins: ['typescript'],
    },
    'src/gql/hooks.ts': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.tsx', baseTypesPath: 'types.ts' },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
