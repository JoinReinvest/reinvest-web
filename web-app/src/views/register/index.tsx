import { BlackModal } from 'components/BlackModal';
import { useIsMounted } from 'hooks/is-mounted';
import { LoginLayout } from 'layouts/LoginLayout';
import { MainLayout } from 'layouts/MainLayout';
import { useFormFlowContext } from 'services/form-flow';

export const RegistrationView = () => {
  const isMounted = useIsMounted();

  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useFormFlowContext();

  return (
    <>
      {isMounted() && !isFirstStep ? (
        <MainLayout>
          <BlackModal
            isOpen={!isFirstStep}
            onOpenChange={moveToPreviousValidStep}
          >
            <CurrentStepView />
          </BlackModal>
        </MainLayout>
      ) : (
        <LoginLayout>
          <CurrentStepView />
        </LoginLayout>
      )}
    </>
  );
};
