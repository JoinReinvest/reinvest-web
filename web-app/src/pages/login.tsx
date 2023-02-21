import { zodResolver } from '@hookform/resolvers/zod'
import { Typography } from 'components/Typography'
import { LoginLayout } from 'layouts/LoginLayout'
import { NextPage } from 'next'
import { mockCSRFToken } from 'next-auth/client/__tests__/helpers/mocks'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import zod, { Schema } from 'zod'

import { Button } from '../components/Button'
import { EmailInput } from '../components/FormElements/EmailInput'
import { PasswordInput } from '../components/FormElements/PasswordInput'
import { URL } from '../constants/urls'
import { formValidationRules } from '../formValidationRules'

interface Fields {
  email: string;
  password: string;
}

const schema: Schema<Fields> = zod.object({
  email: formValidationRules.email,
  password: formValidationRules.password,
})

const Login: NextPage = () => {
  const form = useForm<Fields>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Fields> = async fields => {
    await signIn('credentials', {
      email: fields.email,
      password: fields.password,
    })
  }

  return (
    <LoginLayout>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="login-form z-30 flex max-w-330 flex-col items-center justify-center gap-16"
        >
          <Typography variant="h2">Sign in</Typography>
          <Typography variant="paragraph-large">Building your wealth while rebuilding our communities.</Typography>

          <EmailInput />
          <PasswordInput />

          <Link
            href={URL.forgot_password}
            className="typo-paragraph-large"
          >
            Forgot password?
          </Link>

          <Button
            type="submit"
            label="Sign In"
          />
        </form>
      </FormProvider>
    </LoginLayout>
  )
}

export default Login
