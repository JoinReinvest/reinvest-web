import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      [process.env.API_URL]: {
        headers: {
          Authorization:
            'Bearer eyJraWQiOiJ1dlwvaXJGTWZWWmhwMm1TUnhsQlF4Q0dFNUJQVyt2Rk1JSGlDdndqUDlkYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwZGI1YTczMy01NGY3LTQ0NTAtODJhMC1hM2RhMTU1YTk4ODYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9Mb2oyZmwzdTYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIxdGZya2tmMmpobGpyNmg0NmhzYmVmN2piNiIsImV2ZW50X2lkIjoiYjgzNzk0MzMtNzljMy00Y2U2LTlkZjUtNDkyYTdhY2ZhODZhIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImF1dGhfdGltZSI6MTY3NzAwNDY2MCwiZXhwIjoxNjc3MDMzNDYwLCJpYXQiOjE2NzcwMDQ2NjAsImp0aSI6IjMxYmRlNjk4LTI5NWUtNDkyYi1iMWEwLTNhMjE4ZGM3NWM2NCIsInVzZXJuYW1lIjoiMGRiNWE3MzMtNTRmNy00NDUwLTgyYTAtYTNkYTE1NWE5ODg2In0.sE0He1fS-V5wiC6C-byLXe900ZGVMPdjOjYVO0tmrzOUE-dXLW5M4cNBRSSBBrxsxjnUA9TyyitgH1sb8wfTO0dUknxh6AXOE2HxAgNlumETbdbKjvQ63F5cOPbM2KusbSGjfl8lrdzJyjEx7yiy4lJicbbxTgGqdSvI_XZztitSm9rXn966JWd68bAjSYzsKph31kcaMBHPGPKxa1ilNdcUr25NsbmYaDN8OHQ_rRbIPkpkSHeCLAgWezyiVd1ram1Hd6ByEqGii2trQXCoVrMdJ6lGsinNyr7D4yJZsHhVuxIa7JRwmdhJGyDZqdyuSPyzqrE-04WZY8Y57qG7JQ',
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
