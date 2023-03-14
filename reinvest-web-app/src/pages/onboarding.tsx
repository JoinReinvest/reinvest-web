import { NextPage } from 'next';
import { OnboardingFlow } from 'views/onboarding';
import { OnboardingFormFlowProvider } from 'views/onboarding/form-flow';

const OnboardingPage: NextPage = () => {
  return (
    <OnboardingFormFlowProvider
      initialStoreFields={{ accountType: '', residency: undefined }}
      isResumable
    >
      <OnboardingFlow />
    </OnboardingFormFlowProvider>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: false,
    },
  };
}

export default OnboardingPage;
