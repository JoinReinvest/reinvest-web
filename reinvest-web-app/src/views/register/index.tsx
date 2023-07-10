import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { useIsMounted } from 'hooks/is-mounted';
import { LoginLayout } from 'layouts/LoginLayout';

import { RegisterFormFlowProvider, useRegisterFormFlow } from './form-flow';

interface Props {
  referralCode?: string;
}

const InnerRegistrationView = () => {
  const isMounted = useIsMounted();

  const {
    getStoreFields,
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useRegisterFormFlow();

  // eslint-disable-next-line no-console
  console.info({ storeFields: getStoreFields() });

  const shouldDisplayFirstStep = isMounted() && isFirstStep;
  const shouldDisplayRestOfSteps = isMounted() && !isFirstStep;

  return (
    <>
      {shouldDisplayFirstStep && (
        <LoginLayout className="lg:!gap-128">
          <CurrentStepView />
        </LoginLayout>
      )}

      {shouldDisplayRestOfSteps && (
        <ModalBlackFullscreen
          isOpen={!isFirstStep}
          onOpenChange={moveToPreviousValidStep}
        >
          <CurrentStepView />
        </ModalBlackFullscreen>
      )}
    </>
  );
};

export const RegistrationView = ({ referralCode }: Props) => {
  return (
    <RegisterFormFlowProvider initialStoreFields={{ email: '', referralCode, password: '', authenticationCode: '' }}>
      <InnerRegistrationView />
    </RegisterFormFlowProvider>
  );
};
