import { GetServerSidePropsContext, NextPage } from 'next';
import { FormFlowProvider } from 'services/form-flow';
import { RegistrationView } from 'views/register';
import { FLOW_STEPS } from 'views/register/flow-steps';

interface RegisterPageProps {
  referralCode?: string;
}

const RegisterPage: NextPage = ({ referralCode }: RegisterPageProps) => {
  return (
    <FormFlowProvider
      steps={FLOW_STEPS}
      formFieldsInitialState={{ email: '', referralCode: referralCode, password: '', authenticationCode: '' }}
    >
      <RegistrationView />
    </FormFlowProvider>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const referralCode = context.query.referral;

  return { props: { referralCode: referralCode || null } };
};

export default RegisterPage;
