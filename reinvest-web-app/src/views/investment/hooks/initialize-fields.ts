import { useActiveAccountConfiguration } from 'providers/ActiveAccountConfigurationProvider';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useBankAccount } from 'providers/BankAccount';
import { useOneTimeInvestment } from 'providers/OneTimeInvestment';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';

import { useFlow } from '../form-flow';
import { useOneTimeInvestment } from '../providers/OneTimeInvestment';

interface Params {
  forInitialInvestment?: boolean;
  onlyRecurringInvestment?: boolean;
}

export const useInitializeFields = ({ forInitialInvestment, onlyRecurringInvestment }: Params) => {
  const { availableAccounts } = useActiveAccount();
  const { activeAccountConfigurationMeta } = useActiveAccountConfiguration();
  const { currentBankAccountMeta } = useBankAccount();
  const { recurringInvestment, recurringInvestmentMeta } = useRecurringInvestment();
  const { updateStoreFields } = useFlow();
  const { investmentSummaryMeta, createInvestmentMeta, createSubscriptionAgreementMeta } = useOneTimeInvestment();

  useEffect(() => {
    investmentSummaryMeta.remove();
    createInvestmentMeta.reset();
    createSubscriptionAgreementMeta.reset();
    recurringInvestmentMeta.remove();
    activeAccountConfigurationMeta.remove();

    // There's a race condition when checking if the account has been connected to
    // Plaid after onboarding them. Need to enforce a check on the query to make sure
    // that the account is connected before allowing the user to proceed.
    currentBankAccountMeta.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function initializeMetaFields() {
      await updateStoreFields({
        _forInitialInvestment: !!forInitialInvestment,
        _onlyRecurringInvestment: !!onlyRecurringInvestment,
        _shouldAgreeToRecurringInvestment: !!onlyRecurringInvestment,
        _willSetUpRecurringInvestment: !!onlyRecurringInvestment,
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
