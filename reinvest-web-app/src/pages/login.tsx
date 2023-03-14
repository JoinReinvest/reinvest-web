import { NextPage } from 'next';
import { LoginView } from 'views/login';
import { LoginFormFlowProvider } from 'views/login/form-flow';

const LoginPage: NextPage = () => {
  return (
    <LoginFormFlowProvider initialStoreFields={{ email: '', password: '', authenticationCode: '' }}>
      <LoginView />
    </LoginFormFlowProvider>
  );
};

export default LoginPage;
