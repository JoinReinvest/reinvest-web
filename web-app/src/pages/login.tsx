import { zodResolver } from '@hookform/resolvers/zod';
import { Logo } from 'assets/Logo';
import { LoginForm } from 'components/LoginForm';
import { Typography } from 'components/Typography';
import { NextPage } from 'next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import zod, { Schema } from 'zod';

export interface LoginFormFields {
  email: string;
  password: string;
}

export const formSchema: Schema<LoginFormFields> = zod.object({
  email: zod.string({ required_error: 'This field is required' }).email('Please provide a valid email'),
  password: zod.string({ required_error: 'This field is required' }),
});

const Login: NextPage = () => {
  const form = useForm<LoginFormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async () => {
    console.log(form.getValues('email'));
    console.log(form.getValues('password'));
  };

  return (
    <div className="gap-83 relative flex h-screen flex-col items-center justify-center text-white">
      <video
        autoPlay
        loop
        muted
        className="absolute h-screen w-screen object-cover"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <Logo className="z-30" />
      <div className="max-w-332 z-30 flex flex-col gap-24">
        <div className="flex flex-col items-center justify-center gap-16 text-center">
          <Typography variant="h1">Sign in</Typography>
          <Typography variant="p-large">Building your wealth while rebuilding our communities.</Typography>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-16"
          >
            <LoginForm />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
