import { CodegenConfig } from '@graphql-codegen/cli'

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
    'src/graphql/types.ts': {
      plugins: ['typescript'],
    },
    'src/graphql/hooks.ts': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.tsx', baseTypesPath: 'types.ts' },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        withHooks: true,
      },
    },
  }
}

export default config
