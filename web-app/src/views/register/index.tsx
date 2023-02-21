import { useFormFlowContext } from 'services/form-flow'

export const RegistrationView = () => {
  const { CurrentStepView } = useFormFlowContext()

  return <CurrentStepView />
}
