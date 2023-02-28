// import { zodResolver } from '@hookform/resolvers/zod';
// import { InputEmail } from 'components/FormElements/InputEmail';
// import { InputPassword } from 'components/FormElements/InputPassword';
// import { Link } from 'components/Link';
// import { Typography } from 'components/Typography';
// import { LoginLayout } from 'layouts/LoginLayout';
// import { NextPage } from 'next';
// import { useRouter } from 'next/router';
// import { signIn } from 'next-auth/react';
// import { useState } from 'react';
// import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
// import zod, { Schema } from 'zod';

// import { Button } from '../components/Button';
// import { URL } from '../constants/urls';
// import { formValidationRules } from '../formValidationRules';

// interface Fields {
//   email: string;
//   password: string;
// }

// const schema: Schema<Fields> = zod.object({
//   email: formValidationRules.email,
//   password: formValidationRules.password,
// });

// const Login: NextPage = () => {
//   const [error, setError] = useState<string>('');
//   const form = useForm<Fields>({
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//     resolver: zodResolver(schema),
//   });

// const router = useRouter();
// const callbackUrl = (router.query?.callbackUrl as string) ?? '/';

// const onSubmit: SubmitHandler<Fields> = async fields => {
//   const result = await signIn('credentials', {
//     email: fields.email,
//     password: fields.password,
//     redirect: false,
//     callbackUrl,
//   });

//   if (result?.error) {
//     setError(result.error);
//   } else {
//     await router.push(callbackUrl);
//   }
// };

//   return (
//     <LoginLayout>
//       <FormProvider {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="login-form z-30 flex max-w-330 flex-col items-center justify-center gap-16"
//         >
//           <Typography variant="h2">Sign in</Typography>
//           <Typography variant="paragraph-large">Building your wealth while rebuilding our communities.</Typography>

//           {error && (
//             <Typography
//               variant="paragraph-large"
//               className="text-tertiary-error"
//             >
//               {error}
//             </Typography>
//           )}

//           <InputEmail
//             name="email"
//             control={form.control}
//           />

//           <InputPassword
//             name="password"
//             control={form.control}
//           />

//           <Link
//             href={URL.forgot_password}
//             className="typo-paragraph-large"
//             title="Forgot Password"
//           >
//             Forgot password?
//           </Link>

//           <Button
//             type="submit"
//             label="Sign In"
//           />
//         </form>
//       </FormProvider>
//     </LoginLayout>
//   );
// };

// export default Login;

import { NextPage } from 'next';
import { FormFlowProvider } from 'services/form-flow';
import { LoginView } from 'views/login';
import { FLOW_STEPS } from 'views/login/flow-steps';

const LoginPage: NextPage = () => {
  return (
    <FormFlowProvider
      steps={FLOW_STEPS}
      formFieldsInitialState={{ email: '', password: '', authenticationCode: '' }}
    >
      <LoginView />
    </FormFlowProvider>
  );
};

export default LoginPage;
