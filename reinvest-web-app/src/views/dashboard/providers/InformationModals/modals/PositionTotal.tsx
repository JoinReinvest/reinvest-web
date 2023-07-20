import { ModalInformation } from 'components/ModalInformation';
import { ModalProps } from 'types/modal';

const TITLE = 'Position Total';

export const PositionTotalModal = ({ isModalOpen, onModalOpenChange }: ModalProps) => (
  <ModalInformation
    title={TITLE}
    isModalOpen={isModalOpen}
    onModalOpenChange={onModalOpenChange}
  >
    lorem ipsum text to be entered here to describe what each if these terms mean.
  </ModalInformation>
);
