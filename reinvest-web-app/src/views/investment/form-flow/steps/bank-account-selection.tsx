import { IconSpinner } from 'assets/icons/IconSpinner';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { useEffect, useMemo } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { usePlaidIntegration } from '../hooks/plaid-integration';
import { Identifiers } from '../identifiers';

export const StepBankAccountSelection: StepParams<FlowFields> = {
  identifier: Identifiers.BANK_ACCOUNT_SELECTION,

  doesMeetConditionFields: fields => {
    return !fields.bankAccount;
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const willUpdateBankAccount = !!storeFields._willUpdateBankAccount;
    const { createBankAccountMeta, createBankAccountData, updateBankAccountMeta, updateBankAccountData, fulfillBankAccountMeta, iFrameKey } =
      usePlaidIntegration();

    useEffect(() => {
      async function displayConfirmationStep() {
        if (fulfillBankAccountMeta.isSuccess) {
          await updateStoreFields({ _justAddedBankAccount: true });
          moveToNextStep();
        }
      }

      displayConfirmationStep();
    }, [fulfillBankAccountMeta.isSuccess, moveToNextStep, updateStoreFields]);

    const plaidFrameLink = useMemo(() => {
      const link = willUpdateBankAccount ? updateBankAccountData?.link : createBankAccountData?.link;

      return link ?? null;
    }, [willUpdateBankAccount, createBankAccountData, updateBankAccountData]);

    const shouldCreateBankAccountHaveSucceded = !willUpdateBankAccount && !createBankAccountMeta.isLoading && createBankAccountMeta.isSuccess;
    const shouldUpdateBankAccountHaveSucceded = willUpdateBankAccount && !updateBankAccountMeta.isLoading && updateBankAccountMeta.isSuccess;

    return (
      <Form>
        {createBankAccountMeta.error && <ErrorMessagesHandler error={createBankAccountMeta.error} />}

        {updateBankAccountMeta.error && <ErrorMessagesHandler error={updateBankAccountMeta.error} />}

        {(createBankAccountMeta.isLoading || fulfillBankAccountMeta.isLoading || updateBankAccountMeta.isLoading) && (
          <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
            <IconSpinner />
          </div>
        )}

        {!fulfillBankAccountMeta.isLoading && (shouldCreateBankAccountHaveSucceded || shouldUpdateBankAccountHaveSucceded) && plaidFrameLink && (
          <>
            <iframe
              key={iFrameKey}
              src={plaidFrameLink}
              className="fixed inset-0 h-full w-full"
              title="plaid connection"
            />
          </>
        )}
      </Form>
    );
  },
};
