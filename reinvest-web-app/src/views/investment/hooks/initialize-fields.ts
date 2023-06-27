import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';

import { useInvestmentFlow } from '../form-flow';

interface Params {
  forInitialInvestment?: boolean;
}

export const useInitializeFields = ({ forInitialInvestment }: Params) => {
  const { availableAccounts } = useActiveAccount();
  const { recurringInvestment, recurringInvestmentMeta } = useRecurringInvestment();
  const { updateStoreFields } = useInvestmentFlow();

  useEffect(() => {
    async function initializeFields() {
      const hasMoreThanAnAvailableAccount = availableAccounts.length > 0;

      await updateStoreFields({
        _shouldAgreeToOneTimeInvestment: true,
        _hasMoreThanAnAccount: hasMoreThanAnAvailableAccount,
        _forInitialInvestment: !!forInitialInvestment,
      });
    }

    initializeFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableAccounts.length, forInitialInvestment]);

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
