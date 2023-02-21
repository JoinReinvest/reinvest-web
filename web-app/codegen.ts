import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      [process.env.API_URL]: {
        headers: {
          Authorization: 'Bearer <here should be token>',
        },
      },
    },
  ],
  documents: 'src/**/!(*.d).{ts,tsx}',
  ignoreNoDocuments: true,
  generates: {
    'src/types/graphql.ts': {
      preset: 'client',
      plugins: ['typescript'],
    },
    'src/types/hooks.ts': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.tsx', baseTypesPath: 'graphql.ts' },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        withHooks: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['yarn lint --fix']
  }
}

export default config
