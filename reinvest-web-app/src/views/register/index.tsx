import { BlackModal } from 'components/BlackModal'
import { useIsMounted } from 'hooks/is-mounted'
import { LoginLayout } from 'layouts/LoginLayout'
import { useFormFlowContext } from 'services/form-flow'

export const RegistrationView = () => {
  const isMounted = useIsMounted()

  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useFormFlowContext()

  const shouldDisplayFirstStep = isMounted() && isFirstStep
  const shouldDisplayRestOfSteps = isMounted() && !isFirstStep

  return (
    <>
      {shouldDisplayFirstStep && (
        <LoginLayout>
          <CurrentStepView />
        </LoginLayout>
      )}

      {shouldDisplayRestOfSteps && (
        <BlackModal
          isOpen={!isFirstStep}
          onOpenChange={moveToPreviousValidStep}
        >
          <CurrentStepView />
        </BlackModal>
      )}
    </>
  )
}
