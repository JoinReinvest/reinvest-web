import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useModalCheck } from 'providers/ModalCheck';
import { ModalProps } from 'types/modal';

import { FlowIdentifiers } from '../enums';

interface Params {
  setCurrentFlowIdentifier: (state: FlowIdentifiers | null) => void;
}

interface Returns extends ModalProps {
  toggleShouldRefetchAccounts: (state: boolean) => void;
}

export function useModal({ setCurrentFlowIdentifier }: Params): Returns {
  const { toggleHasModalOpen } = useModalCheck();
  const { allAccountsMeta } = useActiveAccount();
  const [isModalOpen, toggleIsModalOpen] = useToggler(false);
  const [shouldRefetchAccounts, toggleShouldRefetchAccounts] = useToggler(false);

  const onModalOpenChange = (willBeOpen: boolean) => {
    if (!willBeOpen) {
      setCurrentFlowIdentifier(null);
    }

    toggleIsModalOpen(willBeOpen);

    if (shouldRefetchAccounts) {
      allAccountsMeta.refetch();
      toggleShouldRefetchAccounts(false);
    }

    toggleHasModalOpen(willBeOpen);
  };

  return { isModalOpen, toggleShouldRefetchAccounts, onModalOpenChange };
}
