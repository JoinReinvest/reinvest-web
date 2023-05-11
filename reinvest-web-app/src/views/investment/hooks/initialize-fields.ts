import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';

import { useInvestmentFlow } from '../form-flow';

export function useInitializeFields() {
  const { availableAccounts } = useActiveAccount();
  const { updateStoreFields } = useInvestmentFlow();

  useEffect(() => {
    async function setAvailableAccounts() {
      await updateStoreFields({
        _availableAccounts: availableAccounts,
      });
    }

    setAvailableAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableAccounts]);

  // TO-DO: We have to display the recurring investment agreement and steps if the user
  //    doesn't have a recurring investment set up.
}
