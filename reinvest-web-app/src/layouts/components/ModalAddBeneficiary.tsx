import { ModalConfirmation } from 'components/ModalConfirmation';
import { ModalWhite } from 'components/ModalWhite';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { ComponentProps } from 'react';
import { useBeneficiaryCreationFlow } from 'views/beneficiary-creation';

type PrimitiveProps = Pick<ComponentProps<typeof ModalWhite>, 'isOpen' | 'onOpenChange'>;
type Props = PrimitiveProps;

export const ModalAddBeneficiary = ({ isOpen, onOpenChange }: Props) => {
  const { activeAccount } = useActiveAccount();
  const { CurrentStepView, getStoreFields, moveToFirstStep, resetStoreFields, meta } = useBeneficiaryCreationFlow();
  const [isConfirmationModalOpen, toggleIsConfirmationModalOpen] = useToggler(false);

  const handleOpenChange = async (state: boolean) => {
    const storeFields = getStoreFields();
    const hasFilledAnyFields = Object.values(storeFields || {}).some(value => value !== '');

    if (!state && hasFilledAnyFields && !meta.isLastStep) {
      toggleIsConfirmationModalOpen(true);
    } else {
      onOpenChange(state);
    }
  };

  const onConfirmationAction = async () => {
    toggleIsConfirmationModalOpen(false);
    onOpenChange(false);
    await resetStoreFields();
    moveToFirstStep();
  };

  return (
    <>
      <ModalWhite
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="Add Beneficiary"
        activeAccount={activeAccount}
      >
        <CurrentStepView />
      </ModalWhite>

      <ModalConfirmation
        isOpen={isConfirmationModalOpen}
        onOpenChange={toggleIsConfirmationModalOpen}
        title="Are you sure you want to return to dashboard?"
        description="Any updates made will be lost."
        onAction={onConfirmationAction}
      />
    </>
  );
};
