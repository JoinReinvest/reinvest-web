import { IconSpinner } from 'assets/icons/IconSpinner';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { usePlaidHandler } from '../hooks/plaid-handler';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepBankAccountSelection: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_BANK_ACCOUNT,

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const willUpdateBankAccount = !!storeFields?._willUpdateBankAccount;
    const { iFrameKey, iFrameLink, updateBankAccountMeta, fulfillBankAccountMeta, createBankAccountMeta } = usePlaidHandler({ willUpdateBankAccount });

    const shouldCreateBankAccountHaveSucceded = !willUpdateBankAccount && !createBankAccountMeta.isLoading && createBankAccountMeta.isSuccess;
    const shouldUpdateBankAccountHaveSucceded = willUpdateBankAccount && !updateBankAccountMeta.isLoading && updateBankAccountMeta.isSuccess;
    const willShowIFrame = !fulfillBankAccountMeta.isLoading && (shouldCreateBankAccountHaveSucceded || shouldUpdateBankAccountHaveSucceded) && iFrameLink;

    return (
      <Form>
        {willUpdateBankAccount && updateBankAccountMeta.error && <ErrorMessagesHandler error={updateBankAccountMeta.error} />}
        {!willUpdateBankAccount && createBankAccountMeta.error && <ErrorMessagesHandler error={createBankAccountMeta.error} />}

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
