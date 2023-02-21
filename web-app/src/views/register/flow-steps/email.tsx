import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { EmailInput } from 'components/FormElements/EmailInput'
import { Typography } from 'components/Typography'
import { formValidationRules } from 'formValidationRules'
import { LoginLayout } from 'layouts/LoginLayout'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StepParams } from 'services/form-flow'
import zod, { Schema } from 'zod'
import { URL } from '../../../constants/urls'

import { FormFields } from '../form-fields'

type Fields = Pick<FormFields, 'email'>;

export const StepEmail: StepParams<FormFields> = {
  Component: ({ storeFields, updateStoreFields, moveToNextStep }) => {
    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
    })

    const { handleSubmit, control } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) })

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields)

      // Validate that the email is not used
      moveToNextStep()
    }

    return (
      <LoginLayout>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="register-form z-30 flex w-full max-w-330 flex-col items-center justify-center gap-16"
        >
          <Typography variant="h2">Sign up</Typography>
          <Typography variant="paragraph-large">Enter your email below to get started.</Typography>

          <EmailInput {...control} />

          <Link
            href={URL.login}
            className="typo-paragraph-large"
          >
            Already have an account?
          </Link>

          <Button
            type="submit"
            label="Sign Up"
          />
        </form>
      </LoginLayout>
    )
  },
}
