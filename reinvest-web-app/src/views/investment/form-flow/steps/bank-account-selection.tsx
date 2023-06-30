import { IconSpinner } from 'assets/icons/IconSpinner';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { usePlaidHandler } from '../hooks/plaid-handler';
import { Identifiers } from '../identifiers';

export const StepBankAccountSelection: StepParams<FlowFields> = {
  identifier: Identifiers.BANK_ACCOUNT_SELECTION,

  doesMeetConditionFields: fields => {
    return !fields._hasBankAccount || !!fields?._willUpdateBankAccount;
  },

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const willUpdateBankAccount = !!storeFields._willUpdateBankAccount;
    const { iFrameKey, iFrameLink, createBankAccountMeta, updateBankAccountMeta, fulfillBankAccountMeta } = usePlaidHandler({ willUpdateBankAccount });

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

        {!fulfillBankAccountMeta.isLoading && (shouldCreateBankAccountHaveSucceded || shouldUpdateBankAccountHaveSucceded) && iFrameLink && (
          <>
            <iframe
              key={iFrameKey}
              src={iFrameLink}
              className="fixed inset-0 h-full w-full"
              title="plaid connection"
            />
          </>
        )}
      </Form>
    );
  },
};
