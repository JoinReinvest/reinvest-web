import { NextPage } from 'next';
import { OnboardingFlow } from 'views/onboarding';
import { OnboardingFormFlowProvider } from 'views/onboarding/form-flow';

const OnboardingPage: NextPage = () => {
  return (
    <OnboardingFormFlowProvider
      initialStoreFields={{ residency: undefined, address: { addressLine1: '', city: '', addressLine2: '', country: 'USA', state: '', zip: '' } }}
      isResumable
    >
      <OnboardingFlow />
    </OnboardingFormFlowProvider>
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
