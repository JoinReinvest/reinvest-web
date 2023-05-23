import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';

import { useInitialInvestmentFlow } from '../form-flow';

export const useInitializeFields = () => {
  const { availableAccounts } = useActiveAccount();
  const { recurringInvestment, recurringInvestmentMeta } = useRecurringInvestment();
  const { updateStoreFields } = useInitialInvestmentFlow();

  useEffect(() => {
    async function initializeFields() {
      const hasMoreThanAnAvailableAccount = availableAccounts.length > 0;

      await updateStoreFields({ _shouldAgreeToOneTimeInvestment: true, _hasMoreThanAnAccount: hasMoreThanAnAvailableAccount });
    }

    initializeFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function setShouldDisplayRecurringInvestment() {
      if (recurringInvestmentMeta.isSuccess && recurringInvestment === null) {
        await updateStoreFields({
          _shouldDisplayRecurringInvestment: true,
        });
      }
    }

    setShouldDisplayRecurringInvestment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recurringInvestmentMeta.isSuccess, recurringInvestment]);
};
