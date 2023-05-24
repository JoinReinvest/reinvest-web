import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';

import { useInvestmentFlow } from '../form-flow';

export function useInitializeFields() {
  const { availableAccounts } = useActiveAccount();
  const { updateStoreFields } = useInvestmentFlow();
  const { recurringInvestment, recurringInvestmentMeta } = useRecurringInvestment();

  useEffect(() => {
    async function setAvailableAccounts() {
      await updateStoreFields({
        _availableAccounts: availableAccounts,
      });
    }

    setAvailableAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableAccounts]);

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
}
