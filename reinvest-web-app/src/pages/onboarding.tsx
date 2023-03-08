import { NextPage } from 'next';
import { FormFlowProvider } from 'services/form-flow';
import { OnboardingFlow } from 'views/onboarding';
import { FLOW_STEPS } from 'views/onboarding/flow-steps';
import { DEFAULT_VALUES } from 'views/onboarding/form-fields';

const OnboardingPage: NextPage = () => {
  return (
    <FormFlowProvider
      steps={FLOW_STEPS}
      formFieldsInitialState={DEFAULT_VALUES}
      isResumable
    >
      <OnboardingFlow />
    </FormFlowProvider>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default OnboardingPage;
