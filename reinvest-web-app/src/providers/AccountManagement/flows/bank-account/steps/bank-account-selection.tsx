import { IconSpinner } from 'assets/icons/IconSpinner';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { StepParams } from 'reinvest-app-common/src/services/form-flow';

import { usePlaidHandler } from '../hooks/plaid-handler';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepBankAccountSelection: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_BANK_ACCOUNT,

  doesMeetConditionFields: fields => !!fields._willUpdateBankAccount,

  Component: () => {
    const { iFrameKey, iFrameLink, updateBankAccountMeta, fulfillBankAccountMeta } = usePlaidHandler();
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
