import { InputEmail } from 'components/FormElements/InputEmail';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

import { Title } from '../../components/Title';

const EmailPage: NextPage = () => {
  const { control } = useForm<{ email: string }>();

  return (
    <>
      <Title
        title="Reset Password"
        subtitle="Enter the email associated with your account and we’ll send an email with instructions to reset your password."
      />

      <InputEmail
        control={control}
        name="email"
      />
    </>
  );
};

export default EmailPage;
