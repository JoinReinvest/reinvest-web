import { NextPage } from 'next';
import { OnboardingFlow } from 'views/onboarding';
import { OnboardingFormFlowProvider } from 'views/onboarding/form-flow';

const OnboardingPage: NextPage = () => {
  return (
    <OnboardingFormFlowProvider
      initialStoreFields={{ residency: undefined }}
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
