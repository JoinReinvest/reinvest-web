import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';

import { useInitialInvestmentFlow } from '../form-flow';

export const useInitializeFields = () => {
  const { recurringInvestment, recurringInvestmentMeta } = useRecurringInvestment();
  const { updateStoreFields } = useInitialInvestmentFlow();

  useEffect(() => {
    updateStoreFields({ _shouldAgreeToOneTimeInvestment: true });
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
