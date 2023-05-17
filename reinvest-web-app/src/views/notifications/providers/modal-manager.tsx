import { createContext, PropsWithChildren, useRef, useState } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';
import { ModalProps } from 'types/modal';

interface State extends ModalProps {
  modalTitle: string;
  setShowModalWithWatermark: (value: boolean) => void;
  showModalWithWatermark: boolean;
  updateModalTitle: (value: string | null) => void;
}

const Context = createContext<State>({
  modalTitle: '',
  showModalWithWatermark: false,
  isModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onModalOpenChange: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateModalTitle: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowModalWithWatermark: () => {},
});

export const useModalManagerContext = createContextConsumer<State>(Context, 'ModalManager');

interface Props extends PropsWithChildren, ModalProps {
  initialModalTitle: string;
}

export function ModalManagerProvider({ isModalOpen, onModalOpenChange, initialModalTitle, children }: Props) {
  const defaultModalTitle = useRef(initialModalTitle);
  const [modalTitle, setModalTitle] = useState<State['modalTitle']>(initialModalTitle);
  const [showModalWithWatermark, setShowModalWithWatermark] = useState(false);

  const updateModalTitle = (value: string | null) => {
    const newModalTitle = value === null ? defaultModalTitle.current : value;
    setModalTitle(newModalTitle);
  };

  return (
    <Context.Provider value={{ modalTitle, updateModalTitle, isModalOpen, onModalOpenChange, setShowModalWithWatermark, showModalWithWatermark }}>
      {children}
    </Context.Provider>
  );
}
