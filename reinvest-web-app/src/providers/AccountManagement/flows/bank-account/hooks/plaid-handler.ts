import { OnPlaidResponseParams, usePlaidIntegration } from 'hooks/plaid-integration';
import { useBankAccount } from 'providers/BankAccount';
import { useEffect, useMemo } from 'react';
import { MutationMeta } from 'types/queries';

import { useFlow } from '../flow';

interface Params {
  willUpdateBankAccount: boolean;
}

interface Returns {
  createBankAccountMeta: MutationMeta;
  fulfillBankAccountMeta: MutationMeta;
  iFrameKey: number;
  iFrameLink: string;
  updateBankAccountMeta: MutationMeta;
}

export function usePlaidHandler({ willUpdateBankAccount }: Params): Returns {
  const { updateStoreFields, moveToNextValidStep, moveToPreviousValidStep } = useFlow();

  const {
    updateBankAccount,
    updateBankAccountLink,
    fulfillBankAccount,
    updateBankAccountMeta,
    fulfillBankAccountMeta,
    createBankAccount,
    createBankAccountLink,
    createBankAccountMeta,
  } = useBankAccount();

  async function onPlaidResponse({ hashedBankAccount, plaidResponse }: OnPlaidResponseParams) {
    if (plaidResponse && hashedBankAccount) {
      await fulfillBankAccount({ input: plaidResponse });
      await updateStoreFields({ hashedBankAccount });

      return moveToNextValidStep();
    }

    return moveToPreviousValidStep();
  }

  const { iFrameKey } = usePlaidIntegration({ onPlaidResponse });

  const iFrameLink = useMemo(
    () => updateBankAccountLink?.link ?? createBankAccountLink?.link ?? '',
    [updateBankAccountLink?.link, createBankAccountLink?.link],
  );

  useEffect(() => {
    async function generatePlaidLink() {
      if (willUpdateBankAccount) {
        await updateBankAccount();
      } else {
        await createBankAccount();
      }
    }

    generatePlaidLink();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { iFrameKey, iFrameLink, updateBankAccountMeta, createBankAccountMeta, fulfillBankAccountMeta };
}
