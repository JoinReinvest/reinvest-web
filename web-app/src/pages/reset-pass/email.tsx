import { NextPage } from 'next';

import { EmailInput } from '../../components/FormElements/EmailInput';
import { Title } from '../../components/Title';

const EmailPage: NextPage = () => {
  return (
    <>
      <Title
        title="Reset Password"
        subtitle="Enter the email associated with your account and we’ll send an email with instructions to reset your password."
      />

      <EmailInput />
    </>
  );
};

export default EmailPage;
