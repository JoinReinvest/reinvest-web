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
