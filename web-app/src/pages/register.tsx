import { NextPage } from 'next';
import { FormFlowProvider } from 'services/form-flow';
import { RegistrationView } from 'views/register';
import { FLOW_STEPS } from 'views/register/flow-steps';

const RegisterPage: NextPage = () => {
  return (
    <FormFlowProvider
      steps={FLOW_STEPS}
      formFieldsInitialState={{
        email: '',
        referralCode: undefined,
        password: '',
        passwordConfirmation: '',
        authenticationCode: '',
        authenticationCodeConfirm: false,
      }}
      onFormFieldsUpdate={async fields => {
        console.info(fields);
      }}
    >
      <RegistrationView />
    </FormFlowProvider>
  );
};

export default RegisterPage;
