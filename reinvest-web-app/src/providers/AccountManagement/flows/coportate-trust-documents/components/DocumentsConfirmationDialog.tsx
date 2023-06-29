import { ModalConfirmation } from 'components/ModalConfirmation';
import { ModalProps } from 'types/modal';

const TITLE = 'Are you sure you want to update Documents?';
const DESCRIPTION = 'Any updates made will require a KYB verification, at $20 cost';
const ACTION_LABEL = 'Yes';
const CANCEL_LABEL = 'No';

interface Props extends ModalProps {
  onConfirm: () => void;
}

export const DocumentsConfirmationDialog = ({ isModalOpen, onModalOpenChange, onConfirm }: Props) => (
  <ModalConfirmation
    isOpen={isModalOpen}
    onOpenChange={onModalOpenChange}
    title={TITLE}
    description={DESCRIPTION}
    actionLabel={ACTION_LABEL}
    cancelLabel={CANCEL_LABEL}
    onAction={onConfirm}
  />
);
