import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';

import { useInitialInvestmentFlow } from '../form-flow';

export const useInitializeFields = () => {
  const { activeAccount } = useActiveAccount();
  const { updateStoreFields } = useInitialInvestmentFlow();

  useEffect(() => {
    if (activeAccount && activeAccount.type) {
      const isActiveAccountIndividual = activeAccount.type === 'INDIVIDUAL';

      updateStoreFields({ _isForIndividualAccount: isActiveAccountIndividual });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAccount]);

  useEffect(() => {
    updateStoreFields({ _shouldAgreeToOneTimeInvestment: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
