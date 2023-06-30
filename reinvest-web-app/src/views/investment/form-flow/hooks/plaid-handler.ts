import { OnPlaidResponseParams, usePlaidIntegration } from 'hooks/plaid-integration';
import { useBankAccount } from 'providers/BankAccount';
import { useEffect, useMemo } from 'react';
import { MutationMeta } from 'types/queries';

import { useFlow } from '../index';

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
  const { updateStoreFields, moveToNextValidStep } = useFlow();
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

  async function onPlaidResponse({ plaidResponse, hashedBankAccount }: OnPlaidResponseParams) {
    fulfillBankAccountMeta.reset();
    await fulfillBankAccount({ input: plaidResponse });

    await updateStoreFields({
      _justAddedBankAccount: true,
      _hasBankAccount: true,
      _bankAccount: hashedBankAccount,
      _bankAccountType: plaidResponse.accountType,
    });

    moveToNextValidStep();
  }

  const { iFrameKey } = usePlaidIntegration({ onPlaidResponse });
  const iFrameLink = useMemo(
    () => updateBankAccountLink?.link ?? createBankAccountLink?.link ?? '',
    [updateBankAccountLink?.link, createBankAccountLink?.link],
  );

  useEffect(() => {
    async function generatePlaidLink() {
      updateBankAccountMeta.reset();
      createBankAccountMeta.reset();

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
