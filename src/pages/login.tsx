import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from 'components/AuthProvider';
import { InputEmail } from 'components/FormElements/InputEmail';
import { InputPassword } from 'components/FormElements/InputPassword';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { LoginLayout } from 'layouts/LoginLayout';
import { NextPage } from 'next';
import { useContext, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import zod, { Schema } from 'zod';

import { Button } from '../components/Button';
import { URL } from '../constants/urls';
import { formValidationRules } from '../formValidationRules';

interface Fields {
  email: string;
  password: string;
}

const schema: Schema<Fields> = zod.object({
  email: formValidationRules.email,
  password: formValidationRules.password,
});

const Login: NextPage = () => {
  const [error, setError] = useState<string>('');
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<Fields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Fields> = async fields => {
    setIsLoading(true);
    const { email, password } = fields;
    const result = await authContext.actions.signin(email, password);

    if (result instanceof Error) {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <LoginLayout>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="login-form z-30 flex max-w-330 flex-col items-center justify-center gap-16"
        >
          <Typography variant="h2">Sign in</Typography>
          <Typography variant="paragraph-large">Building your wealth while rebuilding our communities.</Typography>

          {error && (
            <Typography
              variant="paragraph-large"
              className="text-tertiary-error"
            >
              {error}
            </Typography>
          )}

          <InputEmail
            name="email"
            control={form.control}
          />

          <InputPassword
            name="password"
            control={form.control}
          />

          <Link
            href={URL.forgot_password}
            className="typo-paragraph-large"
            title="Forgot Password"
          >
            Forgot password?
          </Link>

          <Link
            href={URL.register}
            className="typo-paragraph-large"
            title="Don't have an account?"
          >
            Don’t have an account?
          </Link>

          <Button
            type="submit"
            label="Sign In"
            loading={isLoading}
          />
        </form>
      </FormProvider>
    </LoginLayout>
  );
};

export default Login;
