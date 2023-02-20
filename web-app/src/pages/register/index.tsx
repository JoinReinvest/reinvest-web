import { NextPage } from 'next';
import { FormFlowProvider } from 'services/form-flow';
import { RegistrationView } from 'views/registration';
import { FLOW_STEPS } from 'views/registration/flow-steps';

const RegisterPage: NextPage = () => {
  return (
    <FormFlowProvider
      steps={FLOW_STEPS}
      formFieldsInitialState={{ email: '', referralCode: undefined, password: '', authenticationCode: '' }}
      onFormFieldsUpdate={async fields => {
        console.info(fields);
      }}
    >
      <RegistrationView />
    </FormFlowProvider>
  );
};

export default RegisterPage;
