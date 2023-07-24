import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { useIsMounted } from 'hooks/is-mounted';
import { LoginLayout } from 'layouts/LoginLayout';

import { INITIAL_STORE_FIELDS } from './constants';
import { RegisterFormFlowProvider, useRegisterFormFlow } from './form-flow';
import { useInitializeFields } from './hooks/initialize-fields';

interface Props {
  referralCode?: string;
}

const InnerRegistrationView = () => {
  const isMounted = useIsMounted();
  useInitializeFields();

  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useRegisterFormFlow();

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

export const RegistrationView = (props: Props) => {
  return (
    <RegisterFormFlowProvider initialStoreFields={{ ...INITIAL_STORE_FIELDS, referralCode: props.referralCode }}>
      <InnerRegistrationView />
    </RegisterFormFlowProvider>
  );
};
