import { GetServerSidePropsContext, NextPage } from 'next';
import { RegistrationView } from 'views/register';
import { RegisterFormFlowProvider } from 'views/register/form-flow';

interface RegisterPageProps {
  referralCode?: string;
}

const RegisterPage: NextPage = ({ referralCode }: RegisterPageProps) => {
  return (
    <RegisterFormFlowProvider initialStoreFields={{ email: '', referralCode: referralCode, password: '', authenticationCode: '' }}>
      <RegistrationView />
    </RegisterFormFlowProvider>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const referralCode = context.query.referral;

  return { props: { referralCode: referralCode || null } };
};

export default RegisterPage;
