import { OnPlaidResponseParams, usePlaidIntegration } from 'hooks/plaid-integration';
import { useBankAccount } from 'providers/BankAccount';
import { useEffect } from 'react';
import { MutationMeta } from 'types/queries';

import { useFlow } from '../flow';

interface Returns {
  fulfillBankAccountMeta: MutationMeta;
  iFrameKey: number;
  iFrameLink: string;
  updateBankAccountMeta: MutationMeta;
}

export function usePlaidHandler(): Returns {
  const { updateStoreFields, moveToNextValidStep } = useFlow();
  const { updateBankAccount, updateBankAccountLink, fulfillBankAccount, updateBankAccountMeta, fulfillBankAccountMeta } = useBankAccount();

  async function onPlaidResponse({ hashedBankAccount, plaidResponse }: OnPlaidResponseParams) {
    await fulfillBankAccount({ input: plaidResponse });
    await updateStoreFields({ hashedBankAccount });
    moveToNextValidStep();
  }

  const { iFrameKey } = usePlaidIntegration({ onPlaidResponse });

  useEffect(() => {
    async function generatePlaidLink() {
      await updateBankAccount();
    }

    generatePlaidLink();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { iFrameKey, iFrameLink: updateBankAccountLink?.link ?? '', updateBankAccountMeta, fulfillBankAccountMeta };
}
