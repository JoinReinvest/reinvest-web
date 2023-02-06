import Link from 'next/link';
import { LoginFormFields } from 'pages/login';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from './Button';
import { TextInput } from './TextInput';
import { Typography } from './Typography';

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { control } = useFormContext<LoginFormFields>();

  return (
    <>
      <TextInput
        value={email}
        name="email"
        placeholder="Email Address"
        onChange={event => setEmail(event.target.value)}
        control={control}
      />
      <TextInput
        value={password}
        name="password"
        placeholder="Password"
        type="password"
        control={control}
        onChange={event => setPassword(event.target.value)}
      />
      <Link href="/">
        <Typography
          variant="link"
          className="underline"
        >
          Forgot password?
        </Typography>
      </Link>
      <Button
        type="submit"
        label="Sign In"
        className="w-full bg-white"
      />
    </>
  );
};
