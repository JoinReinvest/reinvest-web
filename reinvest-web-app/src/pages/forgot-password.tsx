import { NextPage } from 'next';
import { ForgotPasswordFlow } from 'views/forgot-password';
import { ForgotPasswordFormFlowProvider } from 'views/forgot-password/form-flow';

const ForgotPasswordPage: NextPage = () => (
  <ForgotPasswordFormFlowProvider initialStoreFields={{ email: '', authenticationCode: '', password: '' }}>
    <ForgotPasswordFlow />
  </ForgotPasswordFormFlowProvider>
);

export default ForgotPasswordPage;
