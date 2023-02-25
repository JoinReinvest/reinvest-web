import { NextPage } from 'next';
import { FormFlowProvider } from 'services/form-flow';
import { ForgotPasswordFlow } from 'views/forgot-password';
import { FLOW_STEPS } from 'views/forgot-password/flow-steps';

const ForgotPasswordPage: NextPage = () => {
  return (
    <FormFlowProvider
      steps={FLOW_STEPS}
      formFieldsInitialState={{ email: '', authenticationCode: '', password: '' }}
    >
      <ForgotPasswordFlow />
    </FormFlowProvider>
  );
};

export default ForgotPasswordPage;
