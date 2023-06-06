import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect, useState } from 'react';
import { useCreateBankAccount } from 'reinvest-app-common/src/services/queries/createBankAccount';
import { useFulfillBankAccount } from 'reinvest-app-common/src/services/queries/fulfillBankAccount';
import { useUpdateBankAccount } from 'reinvest-app-common/src/services/queries/updateBankAccount';
import { BankAccountLink, FulfillBankAccountInput, Maybe } from 'reinvest-app-common/src/types/graphql';
import { mapPlaidDataForApi, PlaidEvent } from 'reinvest-app-common/src/utilities/plaid';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';
import { useCounter } from 'usehooks-ts';

import { useInvestmentFlow } from '../index';

interface Returns {
  createBankAccountMeta: MutationMeta;
  fulfillBankAccountMeta: MutationMeta;
  iFrameKey: number;
  updateBankAccountMeta: MutationMeta;
  createBankAccountData?: Maybe<BankAccountLink>;
  updateBankAccountData?: Maybe<BankAccountLink>;
}

export function usePlaidIntegration(): Returns {
  const { activeAccount } = useActiveAccount();
  const { updateStoreFields, getStoreFields } = useInvestmentFlow();
  const [plaidDataForApi, setPlaidDataForApi] = useState<FulfillBankAccountInput>();
  const { count: iFrameKey, increment: refreshIFrame } = useCounter();

  const { mutateAsync: createBankAccountMutation, data: createBankAccountData, ...createBankAccountMeta } = useCreateBankAccount(getApiClient);

  const { mutateAsync: fulfillBankAccountMutation, ...fulfillBankAccountMeta } = useFulfillBankAccount(getApiClient);

  const { data: updateBankAccountData, mutateAsync: updateBankAccountMutation, ...updateBankAccountMeta } = useUpdateBankAccount(getApiClient);

  useEffect(() => {
    async function getBankAccountLink() {
      const accountId = activeAccount?.id ?? null;
      const storeFields = getStoreFields();

      if (accountId) {
        if (storeFields?._willUpdateBankAccount) {
          await updateBankAccountMutation({ accountId });
        } else {
          await createBankAccountMutation({ accountId });
        }
      }
    }

    getBankAccountLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAccount?.id]);

  useEffect(() => {
    const handler = (event: PlaidEvent) => {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

      if (data.plaidAccountDetails?.length) {
        const dataForApi = mapPlaidDataForApi(data.plaidAccountDetails[0]);
        setPlaidDataForApi(dataForApi);
      }

      if (data?.errorCode) {
        refreshIFrame();
      }
    };

    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fulfillBankAccount() {
      if (plaidDataForApi && activeAccount?.id) {
        const lastFourDigits = plaidDataForApi.accountNumber.slice(-4);
        const hashedBankAccount = `**** **** **** ${lastFourDigits}`;

        await fulfillBankAccountMutation({ accountId: activeAccount.id, input: plaidDataForApi });
        await updateStoreFields({ bankAccount: hashedBankAccount, bankAccountType: plaidDataForApi.accountType });
      }
    }

    fulfillBankAccount();
  }, [plaidDataForApi, activeAccount?.id, fulfillBankAccountMutation, updateStoreFields]);

  return { createBankAccountData, createBankAccountMeta, updateBankAccountMeta, updateBankAccountData, fulfillBankAccountMeta, iFrameKey };
}
