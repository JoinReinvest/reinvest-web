import { IconSpinner } from 'assets/icons/IconSpinner';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { OnBankAccountFulfillParams, usePlaidIntegration } from 'hooks/plaid-integration';
import { useMemo } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepBankAccountSelection: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_BANK_ACCOUNT,

  doesMeetConditionFields: fields => !!fields._willUpdateBankAccount,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    async function onBankAccountFulfill({ hashedBankAccount }: OnBankAccountFulfillParams) {
      await updateStoreFields({ hashedBankAccount });
      moveToNextStep();
    }

    const { updateBankAccountMeta, updateBankAccountData, fulfillBankAccountMeta, iFrameKey } = usePlaidIntegration({
      willUpdateBankAccount: true,
      onBankAccountFulfill,
    });

    const iFrameLink = useMemo(() => updateBankAccountData?.link ?? null, [updateBankAccountData?.link]);

    const willShowIFrame = !fulfillBankAccountMeta.isLoading && !updateBankAccountMeta.isLoading && updateBankAccountMeta.isSuccess && iFrameLink;

    return (
      <Form>
        {updateBankAccountMeta.error && <ErrorMessagesHandler error={updateBankAccountMeta.error} />}

        {(fulfillBankAccountMeta.isLoading || updateBankAccountMeta.isLoading) && (
          <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
            <IconSpinner />
          </div>
        )}

        {willShowIFrame && (
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
