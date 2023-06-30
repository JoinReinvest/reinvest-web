import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';

import { useFlow } from '../form-flow';

interface Params {
  forInitialInvestment?: boolean;
  onlyRecurringInvestment?: boolean;
}

export const useInitializeFields = ({ forInitialInvestment, onlyRecurringInvestment }: Params) => {
  const { availableAccounts } = useActiveAccount();
  const { recurringInvestment, recurringInvestmentMeta } = useRecurringInvestment();
  const { updateStoreFields } = useFlow();

  useEffect(() => {
    async function initializeMetaFields() {
      await updateStoreFields({
        _forInitialInvestment: !!forInitialInvestment,
        _onlyRecurringInvestment: !!onlyRecurringInvestment,
      });
    }

    initializeMetaFields();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forInitialInvestment, onlyRecurringInvestment]);

  useEffect(() => {
    async function initializeFields() {
      const hasMoreThanAnAvailableAccount = availableAccounts.length > 0;

      await updateStoreFields({
        _hasMoreThanAnAccount: hasMoreThanAnAvailableAccount,
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
